import React, { useState } from 'react';
import { Search, Copy, Check, ArrowRight } from 'lucide-react';

export default function KeywordList({ keywords }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'matched' | 'missing' | 'related'
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedSkill, setCopiedSkill] = useState(null);

  const { matched = [], missing = [], relatedMatches = [] } = keywords || {};

  const handleCopy = (skill) => {
    navigator.clipboard.writeText(skill);
    setCopiedSkill(skill);
    setTimeout(() => setCopiedSkill(null), 1800);
  };

  const filteredMatched = matched.filter((s) =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredMissing = missing.filter((s) =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-[#e6e6e6] p-7 shadow-xs">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e6e6e6]">
        <div>
          <h3 className="text-sm font-bold text-[#1d1d1d] tracking-tight">
            Keyword Analysis Matrix
          </h3>
          <p className="text-xs text-[#696969] mt-0.5">
            Technical competencies and domain skills extracted against target job posting
          </p>
        </div>

        {/* Search Input - Slack Pill Form */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#696969] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#ffffff] border border-[#e6e6e6] rounded-full focus:outline-none focus:ring-2 focus:ring-[#4a154b]/20 focus:border-[#4a154b] text-[#1d1d1d] placeholder:text-[#696969] transition-all"
          />
        </div>
      </div>

      {/* Filter Segment Control - Slack Pills */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pb-4 border-b border-[#e6e6e6]">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-4 py-1.5 text-xs rounded-full font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-[#4a154b] text-white shadow-2xs'
              : 'bg-[#f9f0ff] text-[#4a154b] border border-[#ebd5fc] hover:bg-[#eedcfc]'
          }`}
        >
          All ({matched.length + missing.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('matched')}
          className={`px-4 py-1.5 text-xs rounded-full font-bold transition-all ${
            activeTab === 'matched'
              ? 'bg-[#007a5a] text-white shadow-2xs'
              : 'bg-[#e6f4ea] text-[#007a5a] border border-[#b7e1cd] hover:bg-[#d6f0df]'
          }`}
        >
          Matched ({matched.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('missing')}
          className={`px-4 py-1.5 text-xs rounded-full font-bold transition-all ${
            activeTab === 'missing'
              ? 'bg-[#cc4117] text-white shadow-2xs'
              : 'bg-[#fdf2f2] text-[#cc4117] border border-[#f5c6cb] hover:bg-[#fae2e2]'
          }`}
        >
          Missing ({missing.length})
        </button>
        {relatedMatches.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveTab('related')}
            className={`px-4 py-1.5 text-xs rounded-full font-bold transition-all ${
              activeTab === 'related'
                ? 'bg-[#1264a3] text-white shadow-2xs'
                : 'bg-[#f0f7fc] text-[#1264a3] border border-[#cbe2f5] hover:bg-[#e1effa]'
            }`}
          >
            Alternatives ({relatedMatches.length})
          </button>
        )}
      </div>

      {/* Content */}
      <div className="mt-5 space-y-6">
        {/* Matched Keywords */}
        {(activeTab === 'all' || activeTab === 'matched') && (
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-[#1d1d1d] flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#007a5a] mr-2" />
                Verified in Candidate Resume ({filteredMatched.length})
              </span>
            </div>

            {filteredMatched.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {filteredMatched.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-[#e6f4ea] text-[#007a5a] border border-[#b7e1cd] shadow-2xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#696969] italic">No matched keywords found.</p>
            )}
          </div>
        )}

        {/* Missing Keywords */}
        {(activeTab === 'all' || activeTab === 'missing') && (
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-[#1d1d1d] flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#cc4117] mr-2" />
                Missing Qualifications ({filteredMissing.length})
              </span>
              <span className="text-[11px] text-[#696969] font-medium">
                Click chip to copy missing term
              </span>
            </div>

            {filteredMissing.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {filteredMissing.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleCopy(skill)}
                    className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold bg-[#fdf2f2] text-[#cc4117] border border-[#f5c6cb] hover:bg-[#fae2e2] transition-all group cursor-pointer shadow-2xs"
                    title="Click to copy keyword"
                  >
                    <span>{skill}</span>
                    <span className="ml-2 text-[#cc4117]/60 group-hover:text-[#cc4117]">
                      {copiedSkill === skill ? (
                        <Check className="w-3.5 h-3.5 text-[#007a5a]" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#696969] italic">No missing keywords found.</p>
            )}
          </div>
        )}

        {/* Alternative / Related Matches */}
        {(activeTab === 'all' || activeTab === 'related') && relatedMatches.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-[#1d1d1d] flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#1264a3] mr-2" />
                Equivalent / Alternative Competencies ({relatedMatches.length})
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedMatches.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl border border-[#ebd5fc] bg-[#f9f0ff] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-[#4a154b] capitalize">
                      {item.detectedAlternative}
                    </span>
                    <ArrowRight className="w-3 h-3 text-[#696969]" />
                    <span className="font-bold text-[#1d1d1d] capitalize">
                      {item.required}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#1264a3] font-bold bg-white px-2 py-0.5 rounded-full border border-[#cbe2f5]">
                    Semantic
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
