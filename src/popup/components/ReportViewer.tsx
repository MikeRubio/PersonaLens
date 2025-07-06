import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, AlertTriangle, Info, CheckCircle, RotateCcw, TrendingUp, TrendingDown, Minus, Download, Share2 } from 'lucide-react';

interface Issue {
  type: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  suggestion: string;
}

interface TestReport {
  persona: string;
  issues: Issue[];
  summary: string;
  timestamp: string;
}

interface ReportViewerProps {
  report: TestReport;
  onRunNewTest: () => void;
}

export function ReportViewer({ report, onRunNewTest }: ReportViewerProps) {
  const { t } = useTranslation();
  
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <TrendingUp size={18} className="text-red-600" />;
      case 'medium':
        return <Minus size={18} className="text-yellow-600" />;
      case 'low':
        return <TrendingDown size={18} className="text-green-600" />;
      default:
        return <Info size={18} className="text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-gradient-to-r from-red-50 to-red-100 border-red-200 shadow-red-100';
      case 'medium':
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200 shadow-yellow-100';
      case 'low':
        return 'bg-gradient-to-r from-green-50 to-green-100 border-green-200 shadow-green-100';
      default:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 shadow-gray-100';
    }
  };

  const getSeverityLabel = (severity: string) => {
    return t(`severity.${severity}`);
  };

  const getPersonaName = (persona: string) => {
    return t(`personas.${persona}.name`);
  };

  const downloadReport = () => {
    const reportData = {
      ...report,
      generatedBy: 'PersonaLens',
      version: '1.0.0',
      exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `personalens-report-${report.persona}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const shareReport = async () => {
    const shareText = `PersonaLens Accessibility Report\n\nPersona: ${getPersonaName(report.persona)}\nIssues Found: ${report.issues.length}\nSummary: ${report.summary}\n\nGenerated at ${new Date(report.timestamp).toLocaleString()}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'PersonaLens Accessibility Report',
          text: shareText
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareText);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareText);
    }
  };
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText size={18} className="text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">{t('testReport')}</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={shareReport}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all shadow-sm hover:shadow-md"
            aria-label="Share report"
          >
            <Share2 size={16} />
          </button>
          <button
            onClick={downloadReport}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all shadow-sm hover:shadow-md"
            aria-label={t('downloadReport')}
          >
            <Download size={16} />
          </button>
          <button
            onClick={onRunNewTest}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all shadow-sm hover:shadow-md"
            aria-label={t('runNewTest')}
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Persona & Summary */}
      <div className="bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-semibold text-gray-900">{getPersonaName(report.persona)}</h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {new Date(report.timestamp).toLocaleTimeString()}
          </span>
        </div>
        <p className="text-sm text-gray-700 leading-relaxed">{report.summary}</p>
      </div>

      {/* Issues */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-gray-900 flex items-center space-x-2">
          <span>{t('issuesFound', { count: report.issues.length })}</span>
          {report.issues.length === 0 && <CheckCircle size={20} className="text-green-600" />}
        </h3>
        
        {report.issues.length === 0 ? (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle size={20} className="text-green-600" />
              </div>
              <p className="text-sm text-green-800 font-medium">
                {t('noIssues')}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 max-h-72 overflow-y-auto">
            {report.issues.map((issue, index) => (
              <div
                key={index}
                className={`border rounded-xl p-4 shadow-sm ${getSeverityColor(issue.severity)}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getSeverityIcon(issue.severity)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-sm font-semibold text-gray-900">
                        {issue.type}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        issue.severity === 'high' ? 'bg-red-200 text-red-800' :
                        issue.severity === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-green-200 text-green-800'
                      }`}>
                        {getSeverityLabel(issue.severity)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                      {issue.description}
                    </p>
                    <div className="p-3 bg-white bg-opacity-70 rounded-lg border border-white border-opacity-50">
                      <p className="text-xs text-gray-700 leading-relaxed">
                        <strong className="text-gray-900">{t('suggestion')}</strong> {issue.suggestion}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}