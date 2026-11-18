import React from 'react';
import { HelpCircle, Printer, RotateCcw } from 'lucide-react';

export default function Navbar({ onReset, onPrint, onOpenInfo, hasResults }) {
  return (
    <header className="bg-white border-b border-[#e6e6e6] sticky top-0 z-30 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3.5">
          {/* Slack Iconic Hashtag / Grid Mark */}
          <div className="w-8 h-8 rounded-lg bg-[#4a154b] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
            <span className="font-mono text-base font-extrabold leading-none">#</span>
          </div>
          <div className="flex flex-col truncate">
            <span className="text-sm sm:text-base font-bold text-[#1d1d1d] tracking-[-0.256px] truncate">
              AI Resume Analyzer and ATS Score Matcher Using Job Description
            </span>
            <span className="text-[11px] font-medium text-[#696969] hidden sm:block tracking-[0.1px]">
              Slack Design System · 5-Layer Deterministic ATS & Gemini Copilot
            </span>
          </div>
        </div>

        {/* Action Buttons - Slack Pill Geometry */}
        <div className="flex items-center space-x-2.5 no-print">
          <button
            type="button"
            onClick={onOpenInfo}
            className="inline-flex items-center px-4 py-2 text-xs font-bold text-[#4a154b] bg-[#f9f0ff] border border-[#ebd5fc] rounded-full hover:bg-[#eedcfc] transition-all shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4a154b]"
          >
            <HelpCircle className="w-3.5 h-3.5 mr-1.5 text-[#4a154b]" />
            <span>Scoring Model</span>
          </button>

          {hasResults && (
            <>
              <button
                type="button"
                onClick={onPrint}
                className="inline-flex items-center px-4 py-2 text-xs font-bold text-[#1264a3] bg-[#f9f0ff] border border-[#ebd5fc] rounded-full hover:bg-[#eedcfc] transition-all shadow-2xs"
              >
                <Printer className="w-3.5 h-3.5 mr-1.5 text-[#1264a3]" />
                <span>Export Report</span>
              </button>

              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center px-3 py-1.5 text-xs font-bold text-[#696969] hover:text-[#cc4117] hover:bg-[#fdf2f2] rounded-full transition-all"
                title="Reset workspace"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1" />
                <span>Reset</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
