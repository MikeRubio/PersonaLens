import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'en', name: t('english'), flag: '🇺🇸' },
    { code: 'es', name: t('spanish'), flag: '🇪🇸' }
  ];

  return (
    <div className="flex items-center space-x-2">
      <Globe size={16} className="text-gray-500" />
      <select
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        className="text-xs bg-transparent border-none focus:outline-none text-gray-600 cursor-pointer"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}