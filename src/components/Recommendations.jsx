import React from 'react';

export default function Recommendations({ strengths = [], weaknesses = [], recommendations = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e6e6e6] p-7 shadow-xs">
      <div className="pb-4 border-b border-[#e6e6e6]">
        <h3 className="text-sm font-bold text-[#1d1d1d] tracking-tight">
          Diagnostic Audit & Recommendations
        </h3>
        <p className="text-xs text-[#696969] mt-0.5">
          Algorithmic observations to maximize ATS scoring and interview shortlisting
        </p>
      </div>

      {/* Strengths & Weaknesses Split Ledger */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {/* Strengths - Slack Success Green */}
        <div className="bg-[#e6f4ea]/40 border border-[#b7e1cd] rounded-2xl p-5">
          <h4 className="text-xs font-bold text-[#007a5a] mb-3 flex items-center uppercase tracking-[0.96px]">
            <span className="w-2 h-2 rounded-full bg-[#007a5a] mr-2" />
            Detected Strengths ({strengths.length})
          </h4>
          <ul className="space-y-2">
            {strengths.map((str, idx) => (
              <li key={idx} className="text-xs text-[#1d1d1d] flex items-start leading-[1.55]">
                <span className="text-[#007a5a] font-bold mr-2">•</span>
                <span>{str}</span>
              </li>
            ))}
            {strengths.length === 0 && (
              <li className="text-xs text-[#696969] italic">No significant strengths identified.</li>
            )}
          </ul>
        </div>

        {/* Weaknesses - Slack Refined Alert */}
        <div className="bg-[#fdf2f2]/40 border border-[#f5c6cb] rounded-2xl p-5">
          <h4 className="text-xs font-bold text-[#cc4117] mb-3 flex items-center uppercase tracking-[0.96px]">
            <span className="w-2 h-2 rounded-full bg-[#cc4117] mr-2" />
            Optimization Gaps ({weaknesses.length})
          </h4>
          <ul className="space-y-2">
            {weaknesses.map((weak, idx) => (
              <li key={idx} className="text-xs text-[#1d1d1d] flex items-start leading-[1.55]">
                <span className="text-[#cc4117] font-bold mr-2">•</span>
                <span>{weak}</span>
              </li>
            ))}
            {weaknesses.length === 0 && (
              <li className="text-xs text-[#696969] italic">No major vulnerabilities detected.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Prioritized Remediation Action Items */}
      <div className="mt-7 pt-5 border-t border-[#e6e6e6]">
        <h4 className="text-xs font-bold text-[#1d1d1d] uppercase tracking-[0.96px] mb-3.5">
          Prioritized Action Items
        </h4>

        <div className="space-y-3">
          {recommendations.map((rec, idx) => {
            let priorityLabel = 'P1 · High Impact';
            let priorityBadge = 'text-[#cc4117] bg-[#fdf2f2] border-[#f5c6cb]';

            if (rec.type === 'medium') {
              priorityLabel = 'P2 · Medium Impact';
              priorityBadge = 'text-[#1264a3] bg-[#f0f7fc] border-[#cbe2f5]';
            } else if (rec.type === 'format') {
              priorityLabel = 'Format Compliance';
              priorityBadge = 'text-[#4a154b] bg-[#f9f0ff] border-[#ebd5fc]';
            } else if (rec.type === 'low') {
              priorityLabel = 'Advisory';
              priorityBadge = 'text-[#696969] bg-[#f4ede4] border-[#e8d8c8]';
            }

            return (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-[#e6e6e6] bg-white flex items-start space-x-3.5 text-xs hover:border-[#ebd5fc] transition-all shadow-2xs"
              >
                <span className="font-bold text-[#4a154b] text-xs w-5 shrink-0 pt-0.5">
                  #{idx + 1}
                </span>
                <div className="flex-1">
                  <div className="flex items-center space-x-2.5">
                    <span className="font-bold text-[#1d1d1d] text-xs sm:text-sm">
                      {rec.title}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${priorityBadge}`}>
                      {priorityLabel}
                    </span>
                  </div>
                  <p className="text-[#696969] mt-1.5 leading-[1.55]">
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
