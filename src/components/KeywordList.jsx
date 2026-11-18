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
    <div className="bg-white rounded-lg border border-zinc-200 p-6">
      {/* Header & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">
            Keyword Analysis Matrix
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Technical terms and domain skills matched against job posting
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-60">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-md focus:bg-white focus:border-zinc-900 focus:outline-none text-zinc-800 transition-colors"
          />
        </div>
      </div>

      {/* Filter Segment Control */}
      <div className="flex items-center space-x-1.5 mt-4 pb-3 border-b border-zinc-100">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
            activeTab === 'all'
              ? 'bg-zinc-900 text-white'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          All ({matched.length + missing.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('matched')}
          className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
            activeTab === 'matched'
              ? 'bg-zinc-900 text-white'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          Matched ({matched.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('missing')}
          className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
            activeTab === 'missing'
              ? 'bg-zinc-900 text-white'
              : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
          }`}
        >
          Missing ({missing.length})
        </button>
        {relatedMatches.length > 0 && (
          <button
            type="button"
            onClick={() => setActiveTab('related')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
              activeTab === 'related'
                ? 'bg-zinc-900 text-white'
                : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
            }`}
          >
            Alternatives ({relatedMatches.length})
          </button>
        )}
      </div>

      {/* Content */}
      <div className="mt-4 space-y-5">
        {/* Matched Keywords */}
        {(activeTab === 'all' || activeTab === 'matched') && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-900 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-2" />
                Present in Resume ({filteredMatched.length})
              </span>
            </div>

            {filteredMatched.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {filteredMatched.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 text-zinc-800 border border-zinc-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-400 italic">No matched keywords found.</p>
            )}
          </div>
        )}

        {/* Missing Keywords */}
        {(activeTab === 'all' || activeTab === 'missing') && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-900 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2" />
                Missing from Resume ({filteredMissing.length})
              </span>
              <span className="text-[11px] text-zinc-400">
                Click chip to copy keyword
              </span>
            </div>

            {filteredMissing.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {filteredMissing.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => handleCopy(skill)}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-white text-zinc-700 border border-zinc-300 hover:border-zinc-800 hover:text-zinc-900 transition-colors group"
                    title="Copy keyword"
                  >
                    <span>{skill}</span>
                    <span className="ml-1.5 text-zinc-400 group-hover:text-zinc-700">
                      {copiedSkill === skill ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-zinc-400 italic">No missing keywords found.</p>
            )}
          </div>
        )}

        {/* Alternative / Related Matches */}
        {(activeTab === 'all' || activeTab === 'related') && relatedMatches.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-zinc-900 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mr-2" />
                Equivalent / Alternative Competencies ({relatedMatches.length})
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {relatedMatches.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-md border border-zinc-200 bg-zinc-50 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-zinc-700 capitalize">
                      {item.detectedAlternative}
                    </span>
                    <ArrowRight className="w-3 h-3 text-zinc-400" />
                    <span className="font-semibold text-zinc-900 capitalize">
                      {item.required}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    Related
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
