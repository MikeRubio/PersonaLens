# PersonaLens Website

This is the companion website for the PersonaLens Chrome extension. Users can create accounts and get their API keys here.

## Setup Instructions

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Get your project URL and anon key from the API settings

2. **Configure the Website**
   - Open `app.js`
   - Replace `YOUR_SUPABASE_URL` with your Supabase project URL
   - Replace `YOUR_SUPABASE_ANON_KEY` with your Supabase anon key

3. **Set up Authentication**
   - In your Supabase dashboard, go to Authentication > Settings
   - Configure your site URL (where you'll host this website)
   - Enable email authentication

4. **Deploy**
   - You can deploy this to any static hosting service like:
     - Netlify
     - Vercel
     - GitHub Pages
     - Supabase hosting

## Features

- User registration and login
- API key generation and management
- Responsive design
- Integration with PersonaLens extension

## File Structure

- `index.html` - Main website page
- `app.js` - JavaScript functionality and Supabase integration
- `README.md` - This file

## Customization

You can customize the website by:
- Modifying the colors and styling in the HTML
- Adding more features to the dashboard
- Implementing usage tracking
- Adding payment integration for premium features