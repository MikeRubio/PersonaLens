import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Key, ExternalLink, Eye, EyeOff } from 'lucide-react';

interface SettingsPanelProps {
  apiKey: string;
  onSaveApiKey: (key: string) => void;
  onClose: () => void;
}

export function SettingsPanel({ apiKey, onSaveApiKey, onClose }: SettingsPanelProps) {
  const { t } = useTranslation();
  const [tempApiKey, setTempApiKey] = useState(apiKey);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    onSaveApiKey(tempApiKey);
    
    // Show feedback
    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 500);
  };

  return (
    <div className="w-full h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 px-4 py-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
            aria-label={t('goBack')}
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">{t('settingsTitle')}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* API Key Section */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Key size={18} className="text-blue-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-900">{t('apiKeySection')}</h2>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-800">
              PersonaLens uses your API key to authenticate with our service. Get your API key from the PersonaLens website.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="apiKey" className="block text-sm font-semibold text-gray-700">
              PersonaLens API Key
            </label>
            <div className="relative">
              <input
                id="apiKey"
                type={showApiKey ? 'text' : 'password'}
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder="pl_..."
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-2 top-2 p-1 text-gray-500 hover:text-gray-700"
                aria-label={showApiKey ? t('hideApiKey') : t('showApiKey')}
              >
                {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving || !tempApiKey.trim()}
            className={`w-full py-3 px-4 rounded-xl font-medium transition-all shadow-sm hover:shadow-md ${
              isSaving || !tempApiKey.trim()
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
            }`}
          >
            {isSaving ? t('saving') : t('saveApiKey')}
          </button>
        </div>

        {/* Help Section */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900">Get Your PersonaLens API Key</h2>
          
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-2 shadow-sm">
            <p className="text-sm text-gray-700">
              1. Visit the PersonaLens website
            </p>
            <p className="text-sm text-gray-700">
              2. Create an account or sign in
            </p>
            <p className="text-sm text-gray-700">
              3. Copy your API key from the dashboard
            </p>
          </div>

          <a
            href="https://personalens.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 w-full py-3 px-4 bg-white border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md"
          >
            <span>Open PersonaLens Website</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Privacy Note */}
        <div className="bg-gradient-to-r from-gray-100 to-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-600">
            <strong>Privacy:</strong> Your API key is stored locally in your browser and never shared. Page content is sent to PersonaLens for analysis only when you run tests.
          </p>
        </div>
      </div>
    </div>
  );
}