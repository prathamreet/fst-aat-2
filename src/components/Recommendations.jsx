import React from 'react';

export default function Recommendations({ strengths = [], weaknesses = [], recommendations = [] }) {
  return (
    <div className="bg-white rounded-lg border border-zinc-200 p-6">
      <div className="pb-4 border-b border-zinc-100">
        <h3 className="text-sm font-semibold text-zinc-900">
          Diagnostic Audit & Recommendations
        </h3>
        <p className="text-xs text-zinc-500 mt-0.5">
          Targeted observations to improve ATS filter pass-through
        </p>
      </div>

      {/* Strengths & Weaknesses Split Ledger */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Strengths */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-900 mb-2.5 flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-2" />
            Detected Strengths ({strengths.length})
          </h4>
          <ul className="space-y-2">
            {strengths.map((str, idx) => (
              <li key={idx} className="text-xs text-zinc-700 flex items-start leading-relaxed">
                <span className="text-zinc-400 mr-2">•</span>
                <span>{str}</span>
              </li>
            ))}
            {strengths.length === 0 && (
              <li className="text-xs text-zinc-400 italic">No significant strengths identified.</li>
            )}
          </ul>
        </div>

        {/* Weaknesses */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-900 mb-2.5 flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mr-2" />
            Optimization Gaps ({weaknesses.length})
          </h4>
          <ul className="space-y-2">
            {weaknesses.map((weak, idx) => (
              <li key={idx} className="text-xs text-zinc-700 flex items-start leading-relaxed">
                <span className="text-zinc-400 mr-2">•</span>
                <span>{weak}</span>
              </li>
            ))}
            {weaknesses.length === 0 && (
              <li className="text-xs text-zinc-400 italic">No major vulnerabilities detected.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Prioritized Remediation Action Items */}
      <div className="mt-6 pt-5 border-t border-zinc-100">
        <h4 className="text-xs font-semibold text-zinc-900 mb-3">
          Prioritized Action Items
        </h4>

        <div className="space-y-2.5">
          {recommendations.map((rec, idx) => {
            let priorityLabel = 'P1 · High';
            let priorityBadge = 'text-zinc-900 bg-zinc-100 border-zinc-300';

            if (rec.type === 'medium') {
              priorityLabel = 'P2 · Medium';
              priorityBadge = 'text-zinc-700 bg-zinc-50 border-zinc-200';
            } else if (rec.type === 'format') {
              priorityLabel = 'Format';
              priorityBadge = 'text-zinc-600 bg-zinc-50 border-zinc-200';
            } else if (rec.type === 'low') {
              priorityLabel = 'Advisory';
              priorityBadge = 'text-zinc-500 bg-white border-zinc-200';
            }

            return (
              <div
                key={idx}
                className="p-3 rounded-md border border-zinc-200 bg-zinc-50/50 flex items-start space-x-3 text-xs"
              >
                <span className="font-mono text-zinc-400 text-xs w-4 shrink-0">
                  {idx + 1}.
                </span>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-zinc-900">
                      {rec.title}
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${priorityBadge}`}>
                      {priorityLabel}
                    </span>
                  </div>
                  <p className="text-zinc-600 mt-1 leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
