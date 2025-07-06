import { Eye, Globe, Users, Hand, EyeOff, Brain } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Colorblind Users",
    description:
      "Test color contrast and accessibility for users with deuteranopia and other color vision deficiencies.",
    gradient: "from-purple-800/70 to-purple-900/90",
    border: "border-purple-700/50",
    iconBg: "bg-purple-600/80",
    glow: "shadow-[0_0_24px_0_rgba(139,92,246,0.18)]",
  },
  {
    icon: Globe,
    title: "Non-Native Speakers",
    description:
      "Evaluate language complexity and clarity for users with different English proficiency levels.",
    gradient: "from-cyan-800/70 to-cyan-900/90",
    border: "border-cyan-700/50",
    iconBg: "bg-cyan-600/80",
    glow: "shadow-[0_0_24px_0_rgba(34,211,238,0.18)]",
  },
  {
    icon: Users,
    title: "Elderly Users",
    description:
      "Test for age-related accessibility needs including larger text and simplified navigation.",
    gradient: "from-blue-800/70 to-blue-900/90",
    border: "border-blue-700/50",
    iconBg: "bg-blue-600/80",
    glow: "shadow-[0_0_24px_0_rgba(59,130,246,0.18)]",
  },
  {
    icon: Hand,
    title: "Motor Impaired",
    description:
      "Evaluate usability for users with limited fine motor control and mobility challenges.",
    gradient: "from-orange-800/70 to-orange-900/90",
    border: "border-orange-700/50",
    iconBg: "bg-orange-600/80",
    glow: "shadow-[0_0_24px_0_rgba(251,146,60,0.18)]",
  },
  {
    icon: EyeOff,
    title: "Low Vision",
    description:
      "Test screen reader compatibility and high contrast requirements for visually impaired users.",
    gradient: "from-red-800/70 to-red-900/90",
    border: "border-red-700/50",
    iconBg: "bg-red-600/80",
    glow: "shadow-[0_0_24px_0_rgba(239,68,68,0.18)]",
  },
  {
    icon: Brain,
    title: "Cognitive Impaired",
    description:
      "Evaluate clarity and cognitive load for users with learning disabilities and cognitive challenges.",
    gradient: "from-indigo-800/70 to-indigo-900/90",
    border: "border-indigo-700/50",
    iconBg: "bg-indigo-600/80",
    glow: "shadow-[0_0_24px_0_rgba(99,102,241,0.18)]",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-darkBg relative overflow-hidden">
      {/* Subtle glowing background effect */}
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-gradient-to-br from-darkAccent/20 via-darkAccent2/10 to-transparent rounded-full blur-3xl pointer-events-none"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-darkText mb-4 tracking-tight">
            Test From Multiple Perspectives
          </h2>
          <p className="text-xl text-darkSubtle">
            Our AI analyzes your website through the lens of different user
            personas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`bg-glass backdrop-blur-lg bg-gradient-to-br ${feature.gradient} border ${feature.border} rounded-2xl p-7 flex flex-col items-center text-center transition-shadow hover:scale-[1.03] hover:shadow-xl ${feature.glow}`}
              >
                <div
                  className={`w-14 h-14 ${feature.iconBg} rounded-xl flex items-center justify-center mb-5 shadow-lg`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-darkText mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-darkSubtle">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
