import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function RawComparison({ resumeText, jdText }) {
  const [highlightWord, setHighlightWord] = useState('');

  const renderHighlighted = (text) => {
    if (!highlightWord.trim()) return text;
    try {
      const parts = text.split(new RegExp(`(${highlightWord.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
      return parts.map((part, i) =>
        part.toLowerCase() === highlightWord.trim().toLowerCase() ? (
          <mark key={i} className="bg-[#f9f0ff] text-[#4a154b] border border-[#ebd5fc] px-1 py-0.5 rounded font-bold">
            {part}
          </mark>
        ) : (
          part
        )
      );
    } catch {
      return text;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e6e6e6] p-7 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#e6e6e6] gap-3">
        <div>
          <h3 className="text-sm font-bold text-[#1d1d1d] tracking-tight">
            Source Text Inspector
          </h3>
          <p className="text-xs text-[#696969] mt-0.5">
            Compare parsed resume stream alongside original target job requirements
          </p>
        </div>

        {/* Live Highlighter Input - Slack Pill Form */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#696969] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Highlight word in both..."
            value={highlightWord}
            onChange={(e) => setHighlightWord(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#ffffff] border border-[#e6e6e6] rounded-full focus:outline-none focus:ring-2 focus:ring-[#4a154b]/20 focus:border-[#4a154b] text-[#1d1d1d] placeholder:text-[#696969] transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {/* Resume Column */}
        <div className="flex flex-col">
          <div className="text-xs font-bold text-[#1d1d1d] mb-2 flex items-center justify-between">
            <span>Parsed Candidate Resume Stream</span>
            <span className="text-[11px] font-bold text-[#4a154b] bg-[#f9f0ff] px-2.5 py-0.5 rounded-full border border-[#ebd5fc]">
              {resumeText.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>
          <div className="p-4 bg-[#fdfaf7] border border-[#e8d8c8] rounded-2xl h-96 overflow-y-auto text-[11px] font-mono leading-relaxed text-[#1d1d1d] whitespace-pre-wrap select-text">
            {renderHighlighted(resumeText)}
          </div>
        </div>

        {/* Job Description Column */}
        <div className="flex flex-col">
          <div className="text-xs font-bold text-[#1d1d1d] mb-2 flex items-center justify-between">
            <span>Target Job Description</span>
            <span className="text-[11px] font-bold text-[#1264a3] bg-[#f0f7fc] px-2.5 py-0.5 rounded-full border border-[#cbe2f5]">
              {jdText.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>
          <div className="p-4 bg-[#fdfaf7] border border-[#e8d8c8] rounded-2xl h-96 overflow-y-auto text-[11px] font-mono leading-relaxed text-[#1d1d1d] whitespace-pre-wrap select-text">
            {renderHighlighted(jdText)}
          </div>
        </div>
      </div>
    </div>
  );
}
