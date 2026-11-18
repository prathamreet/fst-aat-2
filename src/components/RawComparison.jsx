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
          <mark key={i} className="bg-amber-200 text-zinc-900 px-0.5 rounded-xs">
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
    <div className="bg-white rounded-lg border border-zinc-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-100 gap-3">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">
            Source Text Inspector
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Compare parsed resume stream alongside original job requirements
          </p>
        </div>

        {/* Live Highlighter Input */}
        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Highlight term in both..."
            value={highlightWord}
            onChange={(e) => setHighlightWord(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:border-zinc-900 focus:outline-none text-zinc-800 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Resume Column */}
        <div className="flex flex-col">
          <div className="text-xs font-semibold text-zinc-700 mb-1.5 flex items-center justify-between">
            <span>Parsed Resume Stream</span>
            <span className="text-[11px] font-mono text-zinc-400">
              {resumeText.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>
          <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-md h-96 overflow-y-auto text-[11px] font-mono leading-relaxed text-zinc-800 whitespace-pre-wrap select-text">
            {renderHighlighted(resumeText)}
          </div>
        </div>

        {/* Job Description Column */}
        <div className="flex flex-col">
          <div className="text-xs font-semibold text-zinc-700 mb-1.5 flex items-center justify-between">
            <span>Target Job Description</span>
            <span className="text-[11px] font-mono text-zinc-400">
              {jdText.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>
          <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-md h-96 overflow-y-auto text-[11px] font-mono leading-relaxed text-zinc-800 whitespace-pre-wrap select-text">
            {renderHighlighted(jdText)}
          </div>
        </div>
      </div>
    </div>
  );
}
