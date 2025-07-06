import React from "react";
import { Eye } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface NavigationProps {
  onSignInClick: () => void;
  onSignUpClick: () => void;
}

export function Navigation({ onSignInClick, onSignUpClick }: NavigationProps) {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-glass backdrop-blur-md shadow-glass border-b border-darkBorder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-darkAccent to-darkAccent2 rounded-lg flex items-center justify-center shadow-accent">
              <Eye className="w-5 h-5 text-darkText" />
            </div>
            <h1 className="text-2xl font-extrabold text-darkText tracking-tight">
              PersonaLens
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <button
                onClick={signOut}
                className="text-darkSubtle hover:text-darkText font-medium"
              >
                Sign Out
              </button>
            ) : (
              <>
                <button
                  onClick={onSignInClick}
                  className="text-darkSubtle hover:text-darkText font-medium"
                >
                  Sign In
                </button>
                <button
                  onClick={onSignUpClick}
                  className="bg-gradient-to-r from-darkAccent to-darkAccent2 text-darkText px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
