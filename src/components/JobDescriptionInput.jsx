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
    <div className="bg-white rounded-2xl border border-[#e6e6e6] p-6 flex flex-col h-full shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#e6e6e6]">
        <div>
          <h2 className="text-sm font-bold text-[#1d1d1d] tracking-tight">
            Target Job Description
          </h2>
          <p className="text-xs text-[#696969] mt-0.5">
            Role prerequisites, required competencies, and experience
          </p>
        </div>

        {wordCount > 0 && (
          <span className="text-[11px] text-[#696969] font-medium bg-[#f4ede4] px-2.5 py-1 rounded-full border border-[#e8d8c8]">
            {wordCount} words · {charCount} chars
          </span>
        )}
      </div>

      {/* Preset Roles Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] text-[#696969] font-bold uppercase tracking-[0.96px]">
          Demo role:
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
                className={`px-3 py-1 text-xs rounded-full font-bold transition-all ${
                  isSelected
                    ? 'bg-[#4a154b] text-white shadow-2xs'
                    : 'bg-[#f9f0ff] text-[#4a154b] border border-[#ebd5fc] hover:bg-[#eedcfc]'
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
      <div className="mt-4 flex-1 flex flex-col">
        <textarea
          rows={10}
          value={jdText}
          onChange={(e) => {
            setJdText(e.target.value);
            setSelectedJdId(null);
          }}
          placeholder="Paste target job requirements, engineering stack, tenure expectations, and qualifications..."
          className="w-full flex-1 p-3.5 text-xs bg-[#ffffff] border border-[#e6e6e6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a154b]/20 focus:border-[#4a154b] text-[#1d1d1d] resize-y leading-relaxed font-sans placeholder:text-[#696969]"
        />

        {jdText && (
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#696969]">
            <span>NLP analyzes technical skills, tenure threshold, and education degree level.</span>
            <button
              type="button"
              onClick={clearJd}
              className="text-[#cc4117] hover:underline font-bold"
            >
              Clear job description
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
