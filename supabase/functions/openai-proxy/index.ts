/*
  # OpenAI Proxy Edge Function

  1. Purpose
    - Proxy OpenAI API calls through Supabase
    - Validate PersonaLens API keys
    - Centralize OpenAI usage for monetization

  2. Security
    - Validates PersonaLens API keys against user_metadata
    - OpenAI API key stored securely as environment variable
    - CORS headers for extension access

  3. Functionality
    - Receives requests from PersonaLens extension
    - Validates API key against Supabase auth
    - Makes OpenAI API call with secure key
    - Returns formatted response
*/

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-personalens-key',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

interface RequestPayload {
  pageData: any;
  persona: string;
  apiKey: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Parse request body
    const { pageData, persona, apiKey }: RequestPayload = await req.json()

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'PersonaLens API key is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate PersonaLens API key
    const { data: users, error: userError } = await supabase.auth.admin.listUsers()
    
    if (userError) {
      console.error('Error fetching users:', userError)
      return new Response(
        JSON.stringify({ error: 'Authentication service error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Find user with matching API key
    const validUser = users.users.find(user => 
      user.user_metadata?.api_key === apiKey
    )

    if (!validUser) {
      return new Response(
        JSON.stringify({ error: 'Invalid PersonaLens API key' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get OpenAI API key from environment
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI service not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Generate the prompt
    const prompt = createPrompt(pageData, persona)

    // Make OpenAI API call
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an accessibility expert analyzing web pages for different user personas. Provide specific, actionable feedback in JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1500,
        temperature: 0.3
      })
    })

    if (!openaiResponse.ok) {
      const errorText = await openaiResponse.text()
      console.error('OpenAI API error:', errorText)
      return new Response(
        JSON.stringify({ error: `OpenAI API error: ${openaiResponse.status}` }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const openaiData = await openaiResponse.json()
    const content = openaiData.choices[0].message.content

    // Parse and clean the response
    let cleanContent = content
    if (content.startsWith('```json') && content.endsWith('```')) {
      cleanContent = content.slice(7, -3).trim()
    } else if (content.startsWith('```') && content.endsWith('```')) {
      cleanContent = content.slice(3, -3).trim()
    }

    let parsedContent
    try {
      parsedContent = JSON.parse(cleanContent)
    } catch (jsonParseError) {
      console.error("Failed to parse OpenAI response as JSON:", jsonParseError)
      console.error("Raw OpenAI content:", content)
      
      const contentSnippet = cleanContent.length > 200 ? cleanContent.substring(0, 200) + "..." : cleanContent
      
      parsedContent = {
        issues: [{
          type: 'JSON Parsing Error',
          description: `Could not parse the accessibility analysis results. Raw response snippet: "${contentSnippet}"`,
          severity: 'high',
          suggestion: 'Check the browser console for the full response. This may be due to an OpenAI API error, prompt issues, or response truncation. Try running the test again, or check your API key and quota.'
        }],
        summary: 'There was an error processing the accessibility analysis - the AI response was not in the expected JSON format.'
      }
    }

    // Log usage (optional - for analytics)
    console.log(`API call from user ${validUser.email} for persona ${persona}`)

    // Return formatted response
    const response = {
      persona,
      issues: parsedContent.issues || [],
      summary: parsedContent.summary || 'Analysis completed',
      timestamp: new Date().toISOString()
    }

    return new Response(
      JSON.stringify(response),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

function createPrompt(pageData: any, persona: string) {
  const basePrompt = `
Analyze this web page for accessibility and usability issues from the perspective of a ${getPersonaDescription(persona)}.

Page Data:
- URL: ${pageData.url}
- Title: ${pageData.title}
- Text Content: ${JSON.stringify(pageData.textContent?.slice(0, 20) || [])}
- Color Information: ${JSON.stringify(pageData.colorInfo?.slice(0, 10) || [])}
- Images: ${JSON.stringify(pageData.imageInfo?.slice(0, 10) || [])}
- Forms: ${JSON.stringify(pageData.formInfo || {})}
- Navigation: ${JSON.stringify(pageData.navigationInfo || {})}
- Heading Structure: ${JSON.stringify(pageData.headingStructure || [])}

Please analyze this page and return your findings in the following JSON format:
{
  "issues": [
    {
      "type": "Issue Category",
      "description": "Specific description of the problem",
      "severity": "high|medium|low",
      "suggestion": "Specific actionable recommendation"
    }
  ],
  "summary": "Brief overall assessment of the page's accessibility for this persona"
}

Focus on issues most relevant to ${getPersonaDescription(persona)}.
`

  return basePrompt
}

function getPersonaDescription(persona: string): string {
  switch (persona) {
    case 'colorblind':
      return 'a user with deuteranopia (red-green colorblindness). Focus on color contrast, use of color alone to convey information, and alternative visual cues'
    case 'nonNative':
      return 'a non-native English speaker with B1 level proficiency. Focus on language complexity, clarity of instructions, cultural references, and comprehensibility'
    case 'elderly':
      return 'an elderly user (65+) who may have age-related vision, hearing, or motor difficulties. Focus on font size, button size, clear navigation, simple language, and avoiding rapid animations'
    case 'motorImpaired':
      return 'a user with limited fine motor control who may use assistive devices like head pointers or voice control. Focus on large click targets, keyboard navigation, avoiding hover-only interactions, and sufficient spacing between elements'
    case 'lowVision':
      return 'a user with low vision who relies on screen readers and high contrast. Focus on semantic HTML, proper heading structure, alt text for images, sufficient color contrast, and compatibility with assistive technologies'
    case 'cognitiveImpaired':
      return 'a user with cognitive impairments or learning disabilities. Focus on simple language, clear instructions, consistent navigation, minimal cognitive load, error prevention, and clear feedback'
    default:
      return 'a user with specific accessibility needs'
  }
}