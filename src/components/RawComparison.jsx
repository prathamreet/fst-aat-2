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
          <mark key={i} className="bg-amber-100 text-amber-900 border border-amber-300 px-1 py-0.2 rounded font-mono font-semibold">
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

  const resumeWordCount = resumeText ? resumeText.split(/\s+/).filter(Boolean).length : 0;
  const jdWordCount = jdText ? jdText.split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="bg-white rounded-lg border border-zinc-200 p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 gap-3">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 tracking-tight">
            Source Text Inspector
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Side-by-side parsed candidate stream alongside original job description requirements
          </p>
        </div>

        {/* Live Highlighter Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search & highlight token..."
            value={highlightWord}
            onChange={(e) => setHighlightWord(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-zinc-200 rounded-md focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 text-zinc-900 placeholder:text-zinc-400 transition-colors font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        {/* Resume Column */}
        <div className="flex flex-col">
          <div className="text-xs font-medium text-zinc-900 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-zinc-900"></span>
              Parsed Resume Stream
            </span>
            <span className="text-[11px] font-mono text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
              {resumeWordCount} words
            </span>
          </div>
          <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-md h-80 overflow-y-auto text-[11px] font-mono leading-relaxed text-zinc-800 whitespace-pre-wrap select-text">
            {renderHighlighted(resumeText)}
          </div>
        </div>

        {/* Job Description Column */}
        <div className="flex flex-col">
          <div className="text-xs font-medium text-zinc-900 mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Target Job Description
            </span>
            <span className="text-[11px] font-mono text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
              {jdWordCount} words
            </span>
          </div>
          <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-md h-80 overflow-y-auto text-[11px] font-mono leading-relaxed text-zinc-800 whitespace-pre-wrap select-text">
            {renderHighlighted(jdText)}
          </div>
        </div>
      </div>
    </div>
  );
}
