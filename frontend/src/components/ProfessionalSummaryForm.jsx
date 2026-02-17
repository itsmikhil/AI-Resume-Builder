import { Loader2, Sparkles } from "lucide-react";
import React, { useState } from "react";

const ProfessionalSummaryForm = ({ data, onChange }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = () => {
    if (!data) return;

    setIsGenerating(true);

    setTimeout(() => {
      const enhanced = `Results-driven professional with proven expertise in delivering high-impact solutions and driving measurable outcomes. Skilled in problem-solving, cross-functional collaboration, and continuous improvement, with a strong focus on achieving organizational goals.`;

      onChange(enhanced);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add summary for your resume here
          </p>
        </div>

        <button
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50"
          disabled={isGenerating || !data}
          onClick={generateSummary}
        >
          {isGenerating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          {isGenerating ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <div className="mt-6">
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          className="w-full p-3 px-4 mt-2 border text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
          placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
        />
        <p className="text-xs text-gray-500 max-w-4/5 mx-auto text-center">
          Tip: Keep it concise (3-4 sentences) and focus on your most relevent
          acheivements and skills.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
