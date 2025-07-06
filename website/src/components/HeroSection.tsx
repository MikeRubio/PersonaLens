import { Eye } from "lucide-react";

interface HeroSectionProps {
  onSignUpClick: () => void;
}

export function HeroSection({ onSignUpClick }: HeroSectionProps) {
  const handleDownloadExtension = () => {
    // This would link to the Chrome Web Store when published
    window.open("https://chrome.google.com/webstore", "_blank");
  };

  return (
    <section className="relative py-28 bg-darkBg overflow-hidden">
      {/* Background gradient glow */}
      <div
        aria-hidden
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-br from-darkAccent/30 via-darkAccent2/20 to-transparent rounded-full blur-3xl pointer-events-none"
      />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-glass backdrop-blur-xl border border-darkBorder rounded-3xl shadow-glass px-10 py-16 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-darkAccent to-darkAccent2 rounded-2xl flex items-center justify-center mb-6 shadow-accent">
            <Eye className="w-9 h-9 text-darkText" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-darkText mb-6 tracking-tight">
            See Your Website
            <br />
            <span className="bg-gradient-to-r from-darkAccent to-darkAccent2 bg-clip-text text-transparent">
              Through Every User’s Eyes
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-darkSubtle mb-10 max-w-2xl">
            PersonaLens reveals accessibility and usability gaps by letting you
            test your site as real users experience it—across abilities,
            languages, and devices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={onSignUpClick}
              className="bg-gradient-to-r from-darkAccent to-darkAccent2 text-darkText px-8 py-3 rounded-xl font-semibold shadow-accent hover:opacity-90 transition w-full sm:w-auto"
            >
              Start Testing for Free
            </button>
            <button
              onClick={handleDownloadExtension}
              className="border border-darkAccent text-darkAccent px-8 py-3 rounded-xl font-semibold hover:bg-darkAccent hover:text-darkText transition w-full sm:w-auto"
            >
              Download Extension
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
