import React from "react";

const steps = [
  {
    number: 1,
    title: "Install Extension",
    description:
      "Add PersonaLens to your browser and create your account to get your API key.",
  },
  {
    number: 2,
    title: "Select Persona",
    description:
      "Choose which user perspective you want to test from our comprehensive persona library.",
  },
  {
    number: 3,
    title: "Get Insights",
    description:
      "Receive detailed AI-powered reports with actionable recommendations for improvement.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-darkCard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-darkText mb-4">
            How PersonaLens Works
          </h2>
          <p className="text-xl text-darkSubtle">
            Simple, powerful accessibility testing in three steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-darkAccent to-darkAccent2 rounded-full flex items-center justify-center mx-auto mb-4 shadow-accent">
                <span className="text-2xl font-bold text-darkText">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-darkText mb-2">
                {step.title}
              </h3>
              <p className="text-darkSubtle">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
