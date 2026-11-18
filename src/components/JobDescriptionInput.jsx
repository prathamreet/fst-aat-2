import React from 'react';
import { SAMPLE_JOB_DESCRIPTIONS } from '../data/sampleData.js';

export default function JobDescriptionInput({ jdText, setJdText, selectedJdId, setSelectedJdId }) {
  const wordCount = jdText.trim() ? jdText.trim().split(/\s+/).length : 0;
  const charCount = jdText.length;

  const loadSampleJd = (sample) => {
    setJdText(sample.text);
    setSelectedJdId(sample.id);
  };

  const clearJd = () => {
    setJdText('');
    setSelectedJdId(null);
  };

  return (
    <div className="bg-white rounded-lg border border-zinc-200 p-5 flex flex-col h-full shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Target Job Description
          </h2>
          <p className="text-xs text-zinc-900 font-medium mt-0.5">
            Role requirements, required stack, and credentials
          </p>
        </div>

        {wordCount > 0 && (
          <span className="text-[11px] font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
            {wordCount} words
          </span>
        )}
      </div>

      {/* Preset Roles Bar */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] text-zinc-500 font-medium">
          Presets:
        </span>
        <div className="flex items-center space-x-1.5">
          {SAMPLE_JOB_DESCRIPTIONS.map((sample) => {
            const shortRole = sample.role.includes('Full Stack')
              ? 'Senior Full-Stack'
              : sample.role.includes('Frontend')
              ? 'Frontend'
              : 'Data Analyst';
            const isSelected = selectedJdId === sample.id;

            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => loadSampleJd(sample)}
                className={`px-2 py-0.5 text-xs rounded-md border transition-colors cursor-pointer ${
                  isSelected
                    ? 'border-zinc-900 bg-zinc-900 text-white font-medium'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 hover:border-zinc-300'
                }`}
                title={sample.company}
              >
                {shortRole}
              </button>
            );
          })}
        </div>
      </div>

      {/* Textarea Input */}
      <div className="mt-3 flex-1 flex flex-col">
        <textarea
          rows={10}
          value={jdText}
          onChange={(e) => {
            setJdText(e.target.value);
            setSelectedJdId(null);
          }}
          placeholder="Paste target job description requirements, responsibilities, and required qualifications..."
          className="w-full flex-1 p-3 text-xs font-mono text-zinc-900 bg-white border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 resize-y leading-relaxed"
        />

        {jdText && (
          <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500">
            <span>Evaluates hard skills, tenure thresholds, and degree criteria.</span>
            <button
              type="button"
              onClick={clearJd}
              className="text-red-600 hover:underline cursor-pointer font-medium"
            >
              Clear job description
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
