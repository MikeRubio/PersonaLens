// Background script for Chrome extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'generateReport') {
    generateAccessibilityReport(request.pageData, request.persona, request.apiKey)
      .then(report => sendResponse(report))
      .catch(error => sendResponse({ error: error.message }));
    return true; // Keep message channel open for async response
  }
});

async function generateAccessibilityReport(pageData: any, persona: string, apiKey: string) {
  try {
    // Call our Supabase Edge Function instead of OpenAI directly
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/openai-proxy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'x-personalens-key': apiKey
      },
      body: JSON.stringify({
        pageData,
        persona,
        apiKey
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to generate report:', error);
    throw new Error(`Failed to generate report: ${error.message}`);
  }
}