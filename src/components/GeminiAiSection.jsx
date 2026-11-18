import React, { useState, useEffect } from 'react';
import { Copy, Check, RefreshCw, FileText, Sparkles } from 'lucide-react';
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
    <div className="bg-white rounded-2xl border border-[#e6e6e6] p-7 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e6e6e6]">
        <div>
          <div className="flex items-center space-x-2.5">
            <h3 className="text-sm font-bold text-[#1d1d1d] tracking-tight">
              AI Recruiter Audit & Optimization
            </h3>
            <span className="text-[11px] font-bold text-[#4a154b] bg-[#f9f0ff] px-3 py-0.5 rounded-full border border-[#ebd5fc]">
              Gemini 3.5 Flash
            </span>
          </div>
          <p className="text-xs text-[#696969] mt-0.5">
            Executive hiring critique, Google XYZ bullet rewrites, and gap-targeted interview prep
          </p>
        </div>

        {/* Action Button - Slack Pill Button */}
        <div>
          <button
            type="button"
            disabled={isGenerating}
            onClick={handleLiveReanalyze}
            className={`inline-flex items-center px-4 py-2 text-xs font-bold rounded-full border transition-all ${
              isGenerating
                ? 'bg-[#f4ede4] border-[#e8d8c8] text-[#696969] cursor-wait'
                : 'bg-[#f9f0ff] border-[#ebd5fc] text-[#4a154b] hover:bg-[#eedcfc] cursor-pointer shadow-2xs'
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1.5 text-[#4a154b]" />
                Querying Google API...
              </>
            ) : (
              <>
                <RefreshCw className="w-3.5 h-3.5 mr-1.5 text-[#4a154b]" />
                Live Re-evaluate
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI Results Body */}
      <div className="mt-6 space-y-6">
        {/* 1. Recruiter Executive Assessment - Slack Warm Cream Editorial Block */}
        <div className="bg-[#f4ede4] border-l-4 border-[#4a154b] p-5 rounded-r-2xl border-y border-r border-[#e8d8c8]">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#4a154b]" />
            <span className="text-xs font-bold text-[#4a154b] uppercase tracking-[0.96px]">
              Executive Recruiter Critique
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#1d1d1d] leading-[1.6]">
            {geminiData?.executiveCritique}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-3.5 border-t border-[#e8d8c8] text-xs">
            <div>
              <span className="font-bold text-[#007a5a] flex items-center mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#007a5a] mr-1.5" />
                Verified Candidate Strengths:
              </span>
              <ul className="space-y-1.5 text-[#1d1d1d] text-xs">
                {geminiData?.strengthsHighlight?.map((str, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-1.5 text-[#007a5a] font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-bold text-[#cc4117] flex items-center mb-1.5">
                <span className="w-2 h-2 rounded-full bg-[#cc4117] mr-1.5" />
                Key Discrepancies to Address:
              </span>
              <ul className="space-y-1.5 text-[#1d1d1d] text-xs">
                {geminiData?.criticalGaps?.map((gap, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-1.5 text-[#cc4117] font-bold">•</span>
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Optimized Resume Bullet Points */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-[#1d1d1d] uppercase tracking-[0.96px]">
              Targeted Bullet Point Rewrites (Google XYZ Formula)
            </h4>
            <span className="text-[11px] text-[#696969] font-medium">
              Accomplished [X] measured by [Y] by doing [Z]
            </span>
          </div>

          <div className="space-y-3">
            {geminiData?.optimizedBulletPoints?.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-[#e6e6e6] bg-white hover:border-[#ebd5fc] transition-all shadow-2xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-[#4a154b] bg-[#f9f0ff] px-2.5 py-0.5 rounded-full border border-[#ebd5fc] uppercase tracking-wider">
                    {item.originalConcept}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(item.rewrittenBullet, `bullet-${idx}`)}
                    className="px-3 py-1 rounded-full bg-[#f9f0ff] text-[#4a154b] hover:bg-[#eedcfc] border border-[#ebd5fc] text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer shadow-2xs"
                    title="Copy optimized bullet"
                  >
                    {copiedItem === `bullet-${idx}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#007a5a]" />
                        <span className="text-[#007a5a]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#4a154b]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-[#1d1d1d] font-medium leading-[1.6]">
                  • {item.rewrittenBullet}
                </p>

                {item.keywordsInjected && item.keywordsInjected.length > 0 && (
                  <div className="mt-2.5 flex items-center space-x-2">
                    <span className="text-[11px] text-[#696969] font-medium">Injected Keywords:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.keywordsInjected.map((kw, k) => (
                        <span
                          key={k}
                          className="px-2.5 py-0.5 rounded-full text-[11px] bg-[#e6f4ea] border border-[#b7e1cd] text-[#007a5a] font-bold"
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
          <h4 className="text-xs font-bold text-[#1d1d1d] uppercase tracking-[0.96px] mb-3">
            Predicted Technical Interview Questions
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {geminiData?.predictedInterviewQuestions?.map((q, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-[#e6e6e6] bg-white flex flex-col justify-between shadow-2xs"
              >
                <div>
                  <span className="text-[10px] font-bold text-[#1264a3] bg-[#f0f7fc] px-2.5 py-0.5 rounded-full border border-[#cbe2f5] uppercase tracking-wider inline-block mb-2">
                    {q.category}
                  </span>
                  <p className="text-xs font-bold text-[#1d1d1d] leading-snug">
                    "{q.question}"
                  </p>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-[#e6e6e6] text-[11px] text-[#696969]">
                  <span className="text-[#1d1d1d] font-bold block mb-0.5">Recruiter Focus:</span>
                  <p className="line-clamp-3 leading-relaxed">{q.expectedAnswerSummary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Tailored Cover Letter */}
        {geminiData?.tailoredCoverLetter && (
          <div className="border border-[#e8d8c8] rounded-2xl p-5 bg-[#fdfaf7] shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#4a154b] flex items-center">
                <FileText className="w-4 h-4 mr-1.5 text-[#4a154b]" />
                Tailored Cover Letter
              </span>
              <button
                type="button"
                onClick={() => handleCopy(geminiData.tailoredCoverLetter, 'cover-letter')}
                className="inline-flex items-center px-4 py-1.5 text-xs font-bold rounded-full bg-[#4a154b] text-white hover:bg-[#611f69] transition-all cursor-pointer shadow-2xs"
              >
                {copiedItem === 'cover-letter' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white mr-1.5" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1.5 text-white" />
                    <span>Copy Letter</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 bg-white border border-[#e6e6e6] rounded-xl text-xs text-[#1d1d1d] leading-relaxed whitespace-pre-wrap select-text font-sans">
              {geminiData.tailoredCoverLetter}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
