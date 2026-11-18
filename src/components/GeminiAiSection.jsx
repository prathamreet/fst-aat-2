import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw, FileText } from 'lucide-react';
import { generateGeminiInsights, GEMINI_API_KEY } from '../utils/geminiAi.js';
import { buildContextualGeminiAnalysis } from '../data/geminiDemoData.js';

export default function GeminiAiSection({ resumeText, jdText, matchResults }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [liveData, setLiveData] = useState(null);
  const [copiedItem, setCopiedItem] = useState(null);

  // Derive contextual AI analysis instantly, using live API data if fetched
  const geminiData = liveData || buildContextualGeminiAnalysis(resumeText, jdText, matchResults);

  // Reset live data when candidate/match changes
  useEffect(() => {
    setLiveData(null);
  }, [matchResults]);

  // Live re-analysis with Google Gemini API
  const handleLiveReanalyze = async () => {
    setIsGenerating(true);
    try {
      const data = await generateGeminiInsights(GEMINI_API_KEY, resumeText, jdText, matchResults);
      if (data) {
        setLiveData(data);
      }
    } catch (err) {
      console.warn('Re-analyze notice:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 1800);
  };

  return (
    <div className="bg-white rounded-lg border border-zinc-200 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-semibold text-zinc-900">
              AI Recruiter Audit & Optimization
            </h3>
            <span className="text-[11px] font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
              Gemini 3.5 Flash
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            Recruiter evaluation, Google XYZ bullet-point rewrites, and interview preparation
          </p>
        </div>

        {/* Action Button */}
        <div>
          <button
            type="button"
            disabled={isGenerating}
            onClick={handleLiveReanalyze}
            className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
              isGenerating
                ? 'bg-zinc-100 border-zinc-200 text-zinc-400 cursor-wait'
                : 'bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 cursor-pointer'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1.5 text-zinc-500" />
                Querying Model...
              </>
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-zinc-400" />
                Re-evaluate
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI Results Body */}
      <div className="mt-5 space-y-6">
        {/* 1. Recruiter Executive Assessment */}
        <div className="border-l-2 border-zinc-900 pl-4 py-1">
          <span className="text-xs font-semibold text-zinc-900 block mb-1">
            Executive Assessment
          </span>
          <p className="text-xs text-zinc-700 leading-relaxed">
            {geminiData?.executiveCritique}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pt-3 border-t border-zinc-100 text-xs">
            <div>
              <span className="font-medium text-zinc-900 block mb-1">
                Core Advantages:
              </span>
              <ul className="space-y-1 text-zinc-600 text-[11px]">
                {geminiData?.strengthsHighlight?.map((str, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-1.5 text-zinc-400">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-medium text-zinc-900 block mb-1">
                Gaps to Clarify:
              </span>
              <ul className="space-y-1 text-zinc-600 text-[11px]">
                {geminiData?.criticalGaps?.map((gap, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-1.5 text-zinc-400">•</span>
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Optimized Resume Bullet Points */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="text-xs font-semibold text-zinc-900">
              Suggested Bullet Point Rewrites (Google XYZ Formula)
            </h4>
            <span className="text-[11px] text-zinc-400">
              Accomplished [X] measured by [Y] by doing [Z]
            </span>
          </div>

          <div className="space-y-2.5">
            {geminiData?.optimizedBulletPoints?.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-md border border-zinc-200 bg-zinc-50/50 hover:bg-zinc-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">
                    {item.originalConcept}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(item.rewrittenBullet, `bullet-${idx}`)}
                    className="p-1 rounded text-zinc-400 hover:text-zinc-900 hover:bg-zinc-200 text-xs flex items-center space-x-1 transition-colors"
                    title="Copy bullet"
                  >
                    {copiedItem === `bullet-${idx}` ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-[10px] text-emerald-700 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span className="text-[10px]">Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-zinc-900 font-medium leading-relaxed">
                  • {item.rewrittenBullet}
                </p>

                {item.keywordsInjected && item.keywordsInjected.length > 0 && (
                  <div className="mt-2 flex items-center space-x-1.5">
                    <span className="text-[10px] text-zinc-400">Target Keywords:</span>
                    <div className="flex flex-wrap gap-1">
                      {item.keywordsInjected.map((kw, k) => (
                        <span
                          key={k}
                          className="px-1.5 py-0.5 rounded text-[10px] bg-white border border-zinc-200 text-zinc-700 font-mono"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Predicted Interview Questions */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-900 mb-2.5">
            Predicted Technical Interview Questions
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {geminiData?.predictedInterviewQuestions?.map((q, idx) => (
              <div
                key={idx}
                className="p-3 rounded-md border border-zinc-200 bg-white flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1.5">
                    {q.category}
                  </span>
                  <p className="text-xs font-medium text-zinc-900 leading-snug">
                    "{q.question}"
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-zinc-100 text-[11px] text-zinc-500">
                  <span className="text-zinc-700 font-medium block mb-0.5">Focus:</span>
                  <p className="line-clamp-3">{q.expectedAnswerSummary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Tailored Cover Letter */}
        {geminiData?.tailoredCoverLetter && (
          <div className="border border-zinc-200 rounded-md p-4 bg-zinc-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-900 flex items-center">
                <FileText className="w-3.5 h-3.5 mr-1.5 text-zinc-400" />
                Tailored Cover Letter
              </span>
              <button
                type="button"
                onClick={() => handleCopy(geminiData.tailoredCoverLetter, 'cover-letter')}
                className="inline-flex items-center px-2 py-1 text-xs font-medium rounded border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
              >
                {copiedItem === 'cover-letter' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600 mr-1" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 mr-1 text-zinc-400" />
                    <span>Copy Letter</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3 bg-white border border-zinc-200 rounded text-xs font-serif text-zinc-800 leading-relaxed whitespace-pre-wrap select-text">
              {geminiData.tailoredCoverLetter}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
