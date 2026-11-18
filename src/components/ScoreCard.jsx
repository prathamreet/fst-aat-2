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

  let badgeColor = 'bg-zinc-900 text-white';
  let summaryText = 'Strong alignment with target role prerequisites. The candidate satisfies primary keyword and qualification requirements.';

  if (overallScore < 60) {
    badgeColor = 'bg-zinc-100 text-zinc-800 border border-zinc-300';
    summaryText = 'Noticeable discrepancies identified in core technical requirements and domain experience.';
  } else if (overallScore < 80) {
    badgeColor = 'bg-zinc-800 text-zinc-100';
    summaryText = 'Solid baseline qualification. Incorporating specific missing keywords will improve ATS pass-through probability.';
  }

  const criteria = [
    {
      title: 'Technical Keywords',
      weight: '40%',
      score: scoreBreakdown.skills.score,
      max: scoreBreakdown.skills.max,
      detail: `${keywords.matched.length} of ${keywords.totalJdKeywords} skills matched`
    },
    {
      title: 'Experience & Tenure',
      weight: '20%',
      score: scoreBreakdown.experience.score,
      max: scoreBreakdown.experience.max,
      detail: `${candidateProfile.yearsExperience} yrs vs ${jobRequirements.requiredYears ? jobRequirements.requiredYears + '+ yrs' : 'open'}`
    },
    {
      title: 'Education & Degree',
      weight: '10%',
      score: scoreBreakdown.education.score,
      max: scoreBreakdown.education.max,
      detail: `${candidateProfile.degree} degree`
    },
    {
      title: 'ATS Format & Structure',
      weight: '15%',
      score: scoreBreakdown.formatting.score,
      max: scoreBreakdown.formatting.max,
      detail: `${candidateProfile.detectedSections.length}/6 standard sections`
    },
    {
      title: 'Semantic Relevance',
      weight: '15%',
      score: scoreBreakdown.relevance.score,
      max: scoreBreakdown.relevance.max,
      detail: 'TF-IDF vector alignment'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-zinc-200 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Overall Score Summary */}
        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-zinc-100 pb-5 lg:pb-0 lg:pr-6">
          <div className="flex items-baseline space-x-3">
            <span className="text-5xl font-bold tracking-tight text-zinc-900 font-mono">
              {overallScore}
            </span>
            <span className="text-zinc-400 text-sm font-mono">
              / 100
            </span>
            <span className={`px-2.5 py-0.5 rounded text-xs font-medium tracking-normal ${badgeColor}`}>
              {matchCategory}
            </span>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-semibold text-zinc-900">
              {candidateProfile.name || 'Candidate'}
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Target: {jobRequirements.mustHaveSkills.slice(0, 3).join(', ') || 'Software Engineer'}
            </p>
          </div>

          <p className="text-xs text-zinc-600 mt-3 leading-relaxed border-t border-zinc-100 pt-3">
            {summaryText}
          </p>

          <div className="mt-3 text-[11px] text-zinc-400 font-mono">
            Model: Weighted Deterministic Heuristics (0–100)
          </div>
        </div>

        {/* Right: Diagnostic Category Ledger */}
        <div className="lg:col-span-7">
          <h4 className="text-xs font-semibold text-zinc-700 mb-3 tracking-wide">
            Component Breakdown
          </h4>

          <div className="space-y-3">
            {criteria.map((item) => {
              const pct = Math.round((item.score / item.max) * 100);

              return (
                <div key={item.title} className="text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-zinc-900">{item.title}</span>
                      <span className="text-[11px] text-zinc-400 font-mono">({item.weight})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] text-zinc-500">{item.detail}</span>
                      <span className="font-mono font-medium text-zinc-900 w-12 text-right">
                        {item.score}/{item.max}
                      </span>
                    </div>
                  </div>
                  {/* Subtle clean progress track */}
                  <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-zinc-800 h-full rounded-full transition-all"
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
