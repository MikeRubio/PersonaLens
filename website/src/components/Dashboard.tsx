import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function Dashboard() {
  const { user, signOut } = useAuth();
  const [copied, setCopied] = useState(false);

  const apiKey = user?.user_metadata?.api_key || "No API key found";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="min-h-screen bg-darkBg py-10 font-inter">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-darkAccent to-darkAccent2 rounded-2xl flex items-center justify-center text-darkText font-bold text-2xl shadow-accent">
              PL
            </div>
            <h1 className="text-3xl font-extrabold text-darkText tracking-tight">
              PersonaLens
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-darkSubtle font-medium">{user?.email}</p>
            {/* <img
              src={user?.photoURL || "/default-avatar.png"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-darkAccent"
            /> */}
          </div>
        </header>

        {/* Main Card */}
        <div className="bg-glass backdrop-blur-xl rounded-2xl shadow-glass border border-darkBorder p-10">
          {/* API Key */}
          <div className="bg-gradient-to-br from-darkAccent/30 to-darkAccent2/20 border border-darkAccent2/30 rounded-xl p-6 mb-10">
            <h3 className="text-lg font-semibold text-darkText mb-2">
              Your API Key
            </h3>
            <div className="flex items-center space-x-2">
              <code className="bg-darkCard px-3 py-2 rounded border border-darkBorder text-sm font-mono flex-1 break-all text-darkText">
                {apiKey}
              </code>
              <button
                onClick={copyToClipboard}
                className="bg-gradient-to-r from-darkAccent to-darkAccent2 hover:from-darkAccent2 hover:to-darkAccent text-darkText font-semibold px-4 py-2 rounded-lg shadow-accent transition-colors flex items-center space-x-1"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
            <p className="text-sm text-darkAccent2 mt-2">
              Copy this API key and paste it in the PersonaLens extension
              settings to start testing.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-gradient-to-br from-darkAccent/20 to-darkAccent2/10 rounded-xl p-6 shadow-glass">
              <h4 className="font-semibold text-darkText mb-2">
                Usage Statistics
              </h4>
              <p className="text-3xl font-extrabold text-darkAccent2">0</p>
              <p className="text-sm text-darkSubtle">Tests run this month</p>
            </div>
            <div className="bg-gradient-to-br from-darkAccent2/20 to-darkAccent/10 rounded-xl p-6 shadow-glass">
              <h4 className="font-semibold text-darkText mb-2">
                Account Status
              </h4>
              <p className="text-3xl font-extrabold text-darkAccent">Active</p>
              <p className="text-sm text-darkSubtle">Free tier</p>
            </div>
          </div>

          {/* Getting Started */}
          <div className="bg-darkCard/80 border border-darkAccent/30 rounded-xl p-6 mb-10">
            <h4 className="font-semibold text-darkAccent mb-2">
              Getting Started
            </h4>
            <ol className="text-sm text-darkText space-y-1 list-decimal list-inside">
              <li>Install the PersonaLens Chrome extension</li>
              <li>Open the extension and go to Settings</li>
              <li>Paste your API key above</li>
              <li>Start testing websites for accessibility!</li>
            </ol>
          </div>

          {/* Sign Out */}
          <div className="pt-6 border-t border-darkBorder flex justify-end">
            <button
              onClick={signOut}
              className="text-red-400 hover:text-red-300 font-semibold transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
