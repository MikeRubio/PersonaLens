import React, { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: "signin" | "signup";
}

export function AuthModal({ isOpen, onClose, initialMode }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(initialMode === "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signUp, signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password);

      if (result.error) {
        setError(result.error.message);
      } else {
        onClose();
        if (isSignUp) {
          alert(
            "Account created! Please check your email to verify your account."
          );
        }
        // Reset form
        setEmail("");
        setPassword("");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-glass backdrop-blur-lg rounded-2xl p-8 max-w-md w-full mx-4 border border-darkBorder shadow-glass relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-darkSubtle hover:text-darkText"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-darkText mb-2">
            {isSignUp ? "Create Your Account" : "Welcome Back"}
          </h2>
          <p className="text-darkSubtle">Get your API key to start testing</p>
        </div>

        {error && (
          <div className="bg-red-900 border border-red-700 rounded-lg p-3 mb-4">
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-darkSubtle mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-darkBorder rounded-lg bg-darkCard text-darkText focus:outline-none focus:ring-2 focus:ring-darkAccent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-darkSubtle mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-darkBorder rounded-lg bg-darkCard text-darkText focus:outline-none focus:ring-2 focus:ring-darkAccent"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-darkAccent to-darkAccent2 text-darkText py-2 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={toggleMode}
            className="text-darkAccent hover:text-darkAccent2"
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}
