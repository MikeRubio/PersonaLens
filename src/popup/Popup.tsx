import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PersonaSelector } from "./components/PersonaSelector";
import { TestRunner } from "./components/TestRunner";
import { ReportViewer } from "./components/ReportViewer";
import { SettingsPanel } from "./components/SettingsPanel";
import { LanguageSelector } from "./components/LanguageSelector";
import { Settings, User, FileText, Zap, AlertCircle } from "lucide-react";

interface TestReport {
  persona: string;
  issues: Array<{
    type: string;
    description: string;
    severity: "high" | "medium" | "low";
    suggestion: string;
  }>;
  summary: string;
  timestamp: string;
}

export function Popup() {
  const { t } = useTranslation();
  const [selectedPersona, setSelectedPersona] = useState<string>("");
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [currentReport, setCurrentReport] = useState<TestReport | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [testProgress, setTestProgress] = useState(0);

  useEffect(() => {
    // Load saved data
    chrome.storage.local.get(["selectedPersona", "apiKey"], (result) => {
      if (result.selectedPersona) setSelectedPersona(result.selectedPersona);
      if (result.apiKey) setApiKey(result.apiKey);
    });
  }, []);

  const handlePersonaSelect = (persona: string) => {
    setSelectedPersona(persona);
    chrome.storage.local.set({ selectedPersona: persona });
  };

  const handleRunTest = async () => {
    if (!selectedPersona || !apiKey) {
      setErrorMessage(t("configureApiKey"));
      return;
    }

    setIsTestRunning(true);
    setCurrentReport(null);
    setErrorMessage("");
    setTestProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setTestProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      // Get current tab info
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      setTestProgress(30);

      // Ensure content script is loaded before sending messages
      await ensureContentScriptLoaded(tab.id!, tab.url!);

      setTestProgress(50);

      // Send message to content script to analyze page
      const pageData = await chrome.tabs.sendMessage(tab.id!, {
        action: "analyzePage",
        persona: selectedPersona,
      });

      setTestProgress(70);

      // Send to background script for OpenAI analysis
      const report = await chrome.runtime.sendMessage({
        action: "generateReport",
        pageData,
        persona: selectedPersona,
        apiKey,
      });

      clearInterval(progressInterval);
      setTestProgress(100);

      if (report.error) {
        setErrorMessage(`API Error: ${report.error}`);
      } else {
        // Small delay to show 100% completion
        setTimeout(() => {
          setCurrentReport(report);
        }, 300);
      }
    } catch (error) {
      console.error("Test failed:", error);
      setErrorMessage(
        `Test failed: ${error.message || "Unknown error occurred"}`
      );
    } finally {
      setTimeout(() => {
        setIsTestRunning(false);
        setTestProgress(0);
      }, 300);
    }
  };

  const ensureContentScriptLoaded = async (tabId: number, tabUrl: string) => {
    // Check if we're on a restricted page where content scripts cannot run
    if (
      tabUrl.startsWith("chrome://") ||
      tabUrl.startsWith("chrome-extension://") ||
      tabUrl.startsWith("edge://") ||
      tabUrl.startsWith("about:") ||
      tabUrl.startsWith("moz-extension://")
    ) {
      throw new Error(
        "Cannot run tests on browser internal pages. Please navigate to a regular website and try again."
      );
    }

    // Check for other restricted URLs
    if (
      tabUrl.includes("chrome.google.com/webstore") ||
      tabUrl.includes("addons.mozilla.org") ||
      tabUrl.includes("microsoftedge.microsoft.com")
    ) {
      throw new Error(
        "Cannot run tests on browser extension stores. Please navigate to a regular website and try again."
      );
    }

    try {
      // Try to ping the content script
      await chrome.tabs.sendMessage(tabId, { action: "ping" });
    } catch (error) {
      // If ping fails, inject the content script
      console.log("Content script not found, injecting...");
      try {
        await chrome.scripting.executeScript({
          target: { tabId },
          files: ["content.js"],
        });

        // Wait a moment for the script to initialize
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Verify the script is now loaded
        await chrome.tabs.sendMessage(tabId, { action: "ping" });
      } catch (injectionError) {
        console.error("Content script injection failed:", injectionError);
        throw new Error(
          `Failed to load content script: ${
            injectionError.message || "Unknown injection error"
          }. Please refresh the page and try again.`
        );
      }
    }
  };

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    chrome.storage.local.set({ apiKey: key });
  };

  if (showSettings) {
    return (
      <div className="w-full h-full bg-gray-50">
        <SettingsPanel
          apiKey={apiKey}
          onSaveApiKey={handleSaveApiKey}
          onClose={() => setShowSettings(false)}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-sm">
              <User size={18} className="text-white" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900">
              {t("appName")}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <LanguageSelector />
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label={t("settings")}
            >
              <Settings size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {!currentReport ? (
          <div className="p-4 space-y-4">
            {errorMessage && (
              <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-3 shadow-sm">
                <div className="flex items-start space-x-2">
                  <AlertCircle
                    size={16}
                    className="text-red-600 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm font-medium text-red-800">
                      {t("testFailed")}
                    </p>
                    <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
                    <button
                      onClick={() => setErrorMessage("")}
                      className="text-xs text-red-600 hover:text-red-800 mt-2 underline"
                    >
                      {t("dismiss")}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <PersonaSelector
              selectedPersona={selectedPersona}
              onPersonaSelect={handlePersonaSelect}
            />

            <TestRunner
              selectedPersona={selectedPersona}
              isRunning={isTestRunning}
              onRunTest={handleRunTest}
              hasApiKey={!!apiKey}
              progress={testProgress}
            />
          </div>
        ) : (
          <ReportViewer
            report={currentReport}
            onRunNewTest={() => setCurrentReport(null)}
          />
        )}
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-white to-gray-50 border-t border-gray-200 px-4 py-2">
        <p className="text-xs text-gray-500 text-center">{t("footer")}</p>
      </div>
    </div>
  );
}
