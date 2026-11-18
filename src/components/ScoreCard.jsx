import React from 'react';

export default function ScoreCard({ results }) {
  if (!results) return null;

  const {
    overallScore,
    matchCategory,
    scoreBreakdown,
    candidateProfile,
    jobRequirements,
    keywords
  } = results;

  let badgeColor = 'bg-[#e6f4ea] text-[#007a5a] border border-[#b7e1cd]';
  let summaryText = 'Strong alignment with target role prerequisites. The candidate satisfies primary keyword and qualification requirements.';

  if (overallScore < 60) {
    badgeColor = 'bg-[#fdf2f2] text-[#cc4117] border border-[#f5c6cb]';
    summaryText = 'Noticeable discrepancies identified in core technical requirements and domain experience.';
  } else if (overallScore < 80) {
    badgeColor = 'bg-[#f9f0ff] text-[#4a154b] border border-[#ebd5fc]';
    summaryText = 'Solid baseline qualification. Incorporating specific missing keywords will improve ATS pass-through probability.';
  }

  const criteria = [
    {
      title: 'Technical Keywords',
      weight: '40%',
      score: scoreBreakdown.skills.score,
      max: scoreBreakdown.skills.max,
      detail: `${keywords.matched.length} of ${keywords.totalJdKeywords} skills matched`,
      barColor: 'bg-[#4a154b]'
    },
    {
      title: 'Experience & Tenure',
      weight: '20%',
      score: scoreBreakdown.experience.score,
      max: scoreBreakdown.experience.max,
      detail: `${candidateProfile.yearsExperience} yrs vs ${jobRequirements.requiredYears ? jobRequirements.requiredYears + '+ yrs' : 'open'}`,
      barColor: 'bg-[#007a5a]'
    },
    {
      title: 'Education & Degree',
      weight: '10%',
      score: scoreBreakdown.education.score,
      max: scoreBreakdown.education.max,
      detail: `${candidateProfile.degree} degree`,
      barColor: 'bg-[#1264a3]'
    },
    {
      title: 'ATS Format & Structure',
      weight: '15%',
      score: scoreBreakdown.formatting.score,
      max: scoreBreakdown.formatting.max,
      detail: `${candidateProfile.detectedSections.length}/6 standard sections`,
      barColor: 'bg-[#611f69]'
    },
    {
      title: 'Semantic Relevance',
      weight: '15%',
      score: scoreBreakdown.relevance.score,
      max: scoreBreakdown.relevance.max,
      detail: 'TF-IDF cosine similarity',
      barColor: 'bg-[#481a54]'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#e6e6e6] p-7 shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left: Overall Score Summary - Slack card-stat representation */}
        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#e6e6e6] pb-6 lg:pb-0 lg:pr-7">
          <div className="flex items-baseline space-x-3.5">
            <span className="text-5xl sm:text-6xl font-bold tracking-[-0.6px] text-[#4a154b] leading-none">
              {overallScore}
            </span>
            <span className="text-[#696969] text-base font-bold">
              / 100
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${badgeColor}`}>
              {matchCategory}
            </span>
          </div>

          <div className="mt-4">
            <h3 className="text-base font-bold text-[#1d1d1d] tracking-tight">
              {candidateProfile.name || 'Candidate Evaluation'}
            </h3>
            <p className="text-xs text-[#696969] mt-0.5">
              Target: <span className="font-semibold text-[#1d1d1d]">{jobRequirements.mustHaveSkills.slice(0, 3).join(', ') || 'Software Engineer'}</span>
            </p>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-[#f4ede4] border border-[#e8d8c8] text-xs text-[#1d1d1d] leading-[1.55]">
            <p className="font-medium">{summaryText}</p>
          </div>

          <div className="mt-3 text-[11px] text-[#696969] flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4a154b]" />
            <span>5-Factor Deterministic Algorithm · Zero-PII Processing</span>
          </div>
        </div>

        {/* Right: Diagnostic Category Ledger */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold text-[#1d1d1d] uppercase tracking-[0.96px]">
              ATS Component Breakdown
            </h4>
            <span className="text-[11px] text-[#696969] font-medium">
              Weighted Scale (Total: 100%)
            </span>
          </div>

          <div className="space-y-4">
            {criteria.map((item) => {
              const pct = Math.round((item.score / item.max) * 100);

              return (
                <div key={item.title} className="text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-[#1d1d1d]">{item.title}</span>
                      <span className="text-[11px] text-[#696969] bg-[#f9f0ff] px-2 py-0.5 rounded-full border border-[#ebd5fc] font-bold">
                        {item.weight}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2.5">
                      <span className="text-[11px] text-[#696969]">{item.detail}</span>
                      <span className="font-bold text-[#1d1d1d] w-12 text-right">
                        {item.score}/{item.max}
                      </span>
                    </div>
                  </div>
                  {/* Slack custom styled progress track */}
                  <div className="w-full bg-[#f4ede4] h-2 rounded-full overflow-hidden border border-[#e8d8c8]/50">
                    <div
                      className={`${item.barColor} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
