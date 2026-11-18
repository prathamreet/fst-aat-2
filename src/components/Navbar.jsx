import React from 'react';
import { HelpCircle, Printer, RotateCcw, FileCheck2 } from 'lucide-react';

export default function Navbar({ onReset, onPrint, onOpenInfo, hasResults }) {
  return (
    <header className="bg-white border-b border-zinc-200 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-13 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-2.5 truncate">
          <div className="w-7 h-7 rounded-md bg-zinc-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <FileCheck2 className="w-3.5 h-3.5 text-zinc-100" />
          </div>
          <div className="flex items-center space-x-2 truncate">
            <span className="text-sm font-semibold text-zinc-900 tracking-tight truncate">
              AI Resume Analyzer and ATS Score Matcher Using Job Description
            </span>
            <span className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-zinc-100 text-zinc-600 border border-zinc-200">
              Deterministic NLP + Gemini
            </span>
          </div>
        </div>

        {/* Action Controls - Purpose-Built SaaS Buttons */}
        <div className="flex items-center space-x-2 no-print shrink-0">
          <button
            type="button"
            onClick={onOpenInfo}
            className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-zinc-700 bg-white border border-zinc-200 rounded-md hover:bg-zinc-50 hover:text-zinc-900 hover:border-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 shadow-2xs"
          >
            <HelpCircle className="w-3.5 h-3.5 mr-1.5 text-zinc-500" />
            <span>Scoring Model</span>
          </button>

          {hasResults && (
            <>
              <button
                type="button"
                onClick={onPrint}
                className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-zinc-700 bg-white border border-zinc-200 rounded-md hover:bg-zinc-50 hover:text-zinc-900 hover:border-zinc-300 transition-colors shadow-2xs"
              >
                <Printer className="w-3.5 h-3.5 mr-1.5 text-zinc-500" />
                <span>Export Report</span>
              </button>

              <button
                type="button"
                onClick={onReset}
                className="inline-flex items-center px-2 py-1.5 text-xs font-medium text-zinc-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
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
