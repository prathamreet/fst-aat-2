import React from 'react';
import { Check, X } from 'lucide-react';

export default function ParsedProfile({ profile }) {
  if (!profile) return null;

  return (
    <div className="bg-white rounded-lg border border-zinc-200 p-6 shadow-xs">
      <div className="pb-4 border-b border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 tracking-tight">
            Parser Telemetry & Extracted Metadata
          </h3>
          <p className="text-xs text-zinc-500 mt-0.5">
            Deterministic entity extraction verification for ATS compliance and keyword indexing
          </p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-zinc-100 text-zinc-700 border border-zinc-200 w-fit">
          Local Parser Telemetry
        </span>
      </div>

      {/* Primary Metadata Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-5 text-xs">
        <div className="p-3.5 rounded-lg border border-zinc-200 bg-zinc-50/50">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
            Candidate Name
          </span>
          <span className="font-semibold text-zinc-900 text-sm truncate block">
            {profile.name || 'Not detected'}
          </span>
        </div>

        <div className="p-3.5 rounded-lg border border-zinc-200 bg-zinc-50/50">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
            Email Contact
          </span>
          <span className="font-medium text-zinc-900 truncate block" title={profile.email}>
            {profile.email || <span className="text-rose-600 font-mono text-[11px]">Missing</span>}
          </span>
        </div>

        <div className="p-3.5 rounded-lg border border-zinc-200 bg-zinc-50/50">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
            Phone Number
          </span>
          <span className="font-medium text-zinc-900 truncate block">
            {profile.phone || <span className="text-rose-600 font-mono text-[11px]">Missing</span>}
          </span>
        </div>

        <div className="p-3.5 rounded-lg border border-zinc-200 bg-zinc-50/50">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
            Profiles & Repos
          </span>
          <div className="flex items-center space-x-2 text-zinc-700 font-medium">
            <span className={profile.linkedin ? 'text-zinc-900 font-semibold' : 'text-zinc-400'}>
              LinkedIn {profile.linkedin ? '✓' : '—'}
            </span>
            <span className="text-zinc-300">/</span>
            <span className={profile.github ? 'text-zinc-900 font-semibold' : 'text-zinc-400'}>
              GitHub {profile.github ? '✓' : '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-3.5 text-xs">
        <div className="p-3.5 rounded-lg border border-zinc-200 bg-zinc-50/50">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-2">
            Experience & Credentials
          </span>
          <div className="space-y-1.5 text-zinc-800">
            <div className="flex justify-between items-center">
              <span className="text-zinc-500">Career Tenure:</span>
              <span className="font-mono font-medium text-zinc-900">~{profile.yearsExperience} Years</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500">Academic Degree:</span>
              <span className="font-medium text-zinc-900">{profile.degree}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500">Document Length:</span>
              <span className="font-mono text-zinc-900">{profile.wordCount} words</span>
            </div>
          </div>
        </div>

        {/* Section Header Health */}
        <div className="p-3.5 rounded-lg border border-zinc-200 bg-zinc-50/50">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-2">
            Standard ATS Sections ({profile.detectedSections.length}/6)
          </span>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            {['Summary', 'Experience', 'Skills', 'Education', 'Projects', 'Certifications'].map((sec) => {
              const isFound = profile.detectedSections.some((d) => d.toLowerCase().includes(sec.toLowerCase().slice(0, 4)));
              return (
                <div key={sec} className="flex items-center space-x-1.5">
                  {isFound ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  )}
                  <span className={isFound ? 'text-zinc-900 font-medium' : 'text-zinc-400'}>
                    {sec}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Impact Language & Metrics */}
        <div className="p-3.5 rounded-lg border border-zinc-200 bg-zinc-50/50">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-2">
            Language & Impact Signals
          </span>
          <div className="space-y-1.5 text-zinc-800">
            <div className="flex justify-between items-center">
              <span className="text-zinc-500">Action Verbs:</span>
              <span className="font-mono font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                {profile.actionVerbsCount || 0} verbs
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500">Quantified Metrics:</span>
              <span className="font-mono font-medium text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                {profile.metricsCount || 0} metrics
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-zinc-500">Format Structure:</span>
              <span className="font-mono text-zinc-700">Single Column Plain</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
