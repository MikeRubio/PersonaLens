import React from 'react';
import { useTranslation } from 'react-i18next';
import { Zap, AlertCircle, Settings, Loader2, Brain, Eye, Search } from 'lucide-react';

interface TestRunnerProps {
  selectedPersona: string;
  isRunning: boolean;
  onRunTest: () => void;
  hasApiKey: boolean;
  progress?: number;
}

export function TestRunner({ selectedPersona, isRunning, onRunTest, hasApiKey, progress = 0 }: TestRunnerProps) {
  const { t } = useTranslation();
  const canRunTest = selectedPersona && hasApiKey && !isRunning;
  
  const getPersonaName = (persona: string) => {
    return t(`personas.${persona}.name`);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium text-gray-900">{t('runTest')}</h2>
      
      {!hasApiKey && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
          <div className="flex items-start space-x-2">
            <AlertCircle size={16} className="text-amber-600 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800">
                {t('apiKeyRequired')}
              </p>
              <p className="text-xs text-amber-700 mt-1">
                {t('configureApiKey')}
              </p>
            </div>
          </div>
        </div>
      )}

      {isRunning && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <Loader2 size={24} className="text-blue-600 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-blue-900">{t('analyzingPage')}</p>
              <p className="text-xs text-blue-700">{t('testingFor', { persona: getPersonaName(selectedPersona) })}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-blue-700">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-4 text-xs text-blue-600">
            <div className="flex items-center space-x-1">
              <Search size={12} />
              <span>Scanning page</span>
            </div>
            <div className="flex items-center space-x-1">
              <Brain size={12} />
              <span>AI analysis</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye size={12} />
              <span>Generating report</span>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={onRunTest}
        disabled={!canRunTest}
        className={`w-full py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center space-x-2 shadow-sm hover:shadow-md ${
          canRunTest
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
        }`}
      >
        <Zap size={16} />
        <span>{isRunning ? t('analyzing') : t('runTestButton')}</span>
      </button>

      {selectedPersona && !isRunning && (
        <p className="text-xs text-gray-500 text-center">
          {t('testingFor', { persona: getPersonaName(selectedPersona) })}
        </p>
      )}
    </div>
  );
}