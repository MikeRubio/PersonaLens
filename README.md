# PersonaLens Chrome Extension

PersonaLens is a Chrome extension that helps developers test their websites for accessibility and usability from different user personas. It uses AI to analyze web pages and provide actionable feedback.

## Features

- **Multiple Personas**: Test from the perspective of colorblind users, non-native English speakers, elderly users, motor-impaired users, low vision users, and cognitively impaired users
- **AI-Powered Analysis**: Uses OpenAI's GPT models to provide detailed accessibility reports
- **Real-time Testing**: Analyze any webpage with a single click
- **Detailed Reports**: Get specific, actionable recommendations for improvement
- **Multi-language Support**: Available in English and Spanish
- **Report Export**: Download reports as JSON files

## Architecture

PersonaLens uses a secure architecture with:
- **Chrome Extension**: Frontend interface for selecting personas and viewing reports
- **Supabase Edge Function**: Secure proxy for OpenAI API calls
- **Web Dashboard**: User authentication and API key management
- **Supabase Auth**: User management and API key validation

## Setup Instructions

### 1. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the API settings
3. Add your OpenAI API key as a secret in the Supabase dashboard:
   - Go to Settings > Edge Functions
   - Add `OPENAI_API_KEY` as a secret

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Deploy Edge Function

Deploy the OpenAI proxy function to Supabase:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Deploy the edge function
supabase functions deploy openai-proxy
```

### 4. Build Extension

```bash
# Install dependencies
npm install

# Build the extension
npm run build
```

### 5. Load Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the `dist` folder

### 6. Deploy Website

Deploy the `website` folder to any static hosting service (Netlify, Vercel, etc.) and update the Supabase auth settings with your website URL.

## Usage

1. **Get API Key**: Visit the PersonaLens website, create an account, and copy your API key
2. **Configure Extension**: Open the extension, go to settings, and paste your API key
3. **Select Persona**: Choose which user perspective you want to test from
4. **Run Test**: Click "Run Test" to analyze the current webpage
5. **Review Report**: Get detailed feedback and actionable recommendations

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## File Structure

```
├── src/
│   ├── background/          # Service worker
│   ├── content/            # Content script
│   ├── popup/              # Extension popup UI
│   └── i18n.ts            # Internationalization
├── supabase/
│   └── functions/
│       └── openai-proxy/   # Edge function for OpenAI calls
├── website/                # User dashboard website
├── manifest.json          # Extension manifest
└── dist/                  # Built extension files
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support, please visit [personalens.com](https://personalens.com) or create an issue in this repository.