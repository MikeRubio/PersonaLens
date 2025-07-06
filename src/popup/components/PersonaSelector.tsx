import React from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, Globe, Users, Hand, EyeOff, Brain } from 'lucide-react';

interface PersonaSelectorProps {
  selectedPersona: string;
  onPersonaSelect: (persona: string) => void;
}

const personas = [
  {
    id: 'colorblind', 
    icon: Eye,
    color: 'bg-purple-100 text-purple-700 border-purple-200'
  },
  {
    id: 'nonNative',
    icon: Globe,
    color: 'bg-green-100 text-green-700 border-green-200'
  },
  {
    id: 'elderly',
    icon: Users,
    color: 'bg-blue-100 text-blue-700 border-blue-200'
  },
  {
    id: 'motorImpaired',
    icon: Hand,
    color: 'bg-orange-100 text-orange-700 border-orange-200'
  },
  {
    id: 'lowVision',
    icon: EyeOff,
    color: 'bg-red-100 text-red-700 border-red-200'
  },
  {
    id: 'cognitiveImpaired',
    icon: Brain,
    color: 'bg-indigo-100 text-indigo-700 border-indigo-200'
  }
];

export function PersonaSelector({ selectedPersona, onPersonaSelect }: PersonaSelectorProps) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium text-gray-900">{t('selectPersona')}</h2>
      
      <div className="grid grid-cols-1 gap-2 max-h-80 overflow-y-auto">
        {personas.map((persona) => {
          const Icon = persona.icon;
          const isSelected = selectedPersona === persona.id;
          
          return (
            <button
              key={persona.id}
              onClick={() => onPersonaSelect(persona.id)}
              className={`w-full p-3 rounded-xl border-2 transition-all text-left shadow-sm hover:shadow-md ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${persona.color}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900">
                    {t(`personas.${persona.id}.name`)}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {t(`personas.${persona.id}.description`)}
                  </p>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}