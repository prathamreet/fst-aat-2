import React from 'react';
import { Check, X } from 'lucide-react';

export default function ParsedProfile({ profile }) {
  if (!profile) return null;

  return (
    <div className="bg-white rounded-lg border border-zinc-200 p-6">
      <div className="pb-4 border-b border-zinc-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">
            Parser Telemetry & Extracted Metadata
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Internal entity extraction verification for ATS ingestion
          </p>
        </div>
        <span className="text-[11px] font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
          Raw Telemetry
        </span>
      </div>

      {/* Metadata Table Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-xs">
        <div className="p-3 rounded border border-zinc-200 bg-zinc-50/50">
          <span className="text-[11px] text-zinc-400 font-medium block mb-1">
            Candidate Name
          </span>
          <span className="font-semibold text-zinc-900 truncate block">
            {profile.name || 'Not detected'}
          </span>
        </div>

        <div className="p-3 rounded border border-zinc-200 bg-zinc-50/50">
          <span className="text-[11px] text-zinc-400 font-medium block mb-1">
            Email Contact
          </span>
          <span className="font-mono text-zinc-900 truncate block" title={profile.email}>
            {profile.email || <span className="text-zinc-400">Missing</span>}
          </span>
        </div>

        <div className="p-3 rounded border border-zinc-200 bg-zinc-50/50">
          <span className="text-[11px] text-zinc-400 font-medium block mb-1">
            Phone Number
          </span>
          <span className="font-mono text-zinc-900 truncate block">
            {profile.phone || <span className="text-zinc-400">Missing</span>}
          </span>
        </div>

        <div className="p-3 rounded border border-zinc-200 bg-zinc-50/50">
          <span className="text-[11px] text-zinc-400 font-medium block mb-1">
            Profiles
          </span>
          <div className="flex items-center space-x-1.5 text-zinc-700">
            <span>{profile.linkedin ? 'LinkedIn' : 'No LinkedIn'}</span>
            <span className="text-zinc-300">·</span>
            <span>{profile.github ? 'GitHub' : 'No GitHub'}</span>
          </div>
        </div>
      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs">
        <div className="p-3 rounded border border-zinc-200 bg-zinc-50/50">
          <span className="text-[11px] text-zinc-400 font-medium block mb-1">
            Experience & Credentials
          </span>
          <div className="space-y-1 text-zinc-800">
            <div className="flex justify-between">
              <span className="text-zinc-500">Tenure:</span>
              <span className="font-mono font-medium">~{profile.yearsExperience} Years</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Degree:</span>
              <span className="font-medium">{profile.degree}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Document Size:</span>
              <span className="font-mono">{profile.wordCount} words</span>
            </div>
          </div>
        </div>

        {/* Section Header Health */}
        <div className="p-3 rounded border border-zinc-200 bg-zinc-50/50">
          <span className="text-[11px] text-zinc-400 font-medium block mb-1.5">
            Section Headers ({profile.detectedSections.length}/6)
          </span>
          <div className="grid grid-cols-2 gap-1 text-[11px]">
            {['Summary', 'Experience', 'Skills', 'Education', 'Projects', 'Certifications'].map((sec) => {
              const isFound = profile.detectedSections.some((d) => d.toLowerCase().includes(sec.toLowerCase().slice(0, 4)));
              return (
                <div key={sec} className="flex items-center space-x-1">
                  {isFound ? (
                    <Check className="w-3 h-3 text-zinc-900 shrink-0" />
                  ) : (
                    <X className="w-3 h-3 text-zinc-300 shrink-0" />
                  )}
                  <span className={isFound ? 'text-zinc-800 font-medium' : 'text-zinc-400'}>
                    {sec}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quantifiers & Verbs */}
        <div className="p-3 rounded border border-zinc-200 bg-zinc-50/50">
          <span className="text-[11px] text-zinc-400 font-medium block mb-1">
            Syntactic Indicators
          </span>
          <div className="space-y-1 text-zinc-800">
            <div className="flex justify-between">
              <span className="text-zinc-500">Metrics Detected:</span>
              <span className="font-mono font-medium">{profile.metricsCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">Action Verbs:</span>
              <span className="font-mono font-medium">{profile.actionVerbsCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics chips */}
      {profile.metricsExamples && profile.metricsExamples.length > 0 && (
        <div className="mt-4 pt-3 border-t border-zinc-100">
          <span className="text-[11px] text-zinc-500 font-medium block mb-1.5">
            Extracted Metrics:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {profile.metricsExamples.map((item, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-100 text-zinc-800 border border-zinc-200"
              >
                "{item}"
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
