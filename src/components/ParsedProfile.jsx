import React from 'react';
import { Check, X } from 'lucide-react';

export default function ParsedProfile({ profile }) {
  if (!profile) return null;

  return (
    <div className="bg-white rounded-2xl border border-[#e6e6e6] p-7 shadow-xs">
      <div className="pb-4 border-b border-[#e6e6e6] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-[#1d1d1d] tracking-tight">
            Parser Telemetry & Extracted Metadata
          </h3>
          <p className="text-xs text-[#696969] mt-0.5">
            Internal entity extraction verification for ATS compliance and keyword indexing
          </p>
        </div>
        <span className="text-[11px] font-bold text-[#4a154b] bg-[#f9f0ff] px-3 py-1 rounded-full border border-[#ebd5fc] w-fit">
          Telemetry Verifier
        </span>
      </div>

      {/* Metadata Table Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5 text-xs">
        <div className="p-4 rounded-2xl border border-[#e6e6e6] bg-[#ffffff] shadow-2xs">
          <span className="text-[11px] text-[#696969] font-bold uppercase tracking-[0.96px] block mb-1">
            Candidate Name
          </span>
          <span className="font-bold text-[#1d1d1d] text-sm truncate block">
            {profile.name || 'Not detected'}
          </span>
        </div>

        <div className="p-4 rounded-2xl border border-[#e6e6e6] bg-[#ffffff] shadow-2xs">
          <span className="text-[11px] text-[#696969] font-bold uppercase tracking-[0.96px] block mb-1">
            Email Contact
          </span>
          <span className="font-bold text-[#1d1d1d] truncate block" title={profile.email}>
            {profile.email || <span className="text-[#cc4117]">Missing</span>}
          </span>
        </div>

        <div className="p-4 rounded-2xl border border-[#e6e6e6] bg-[#ffffff] shadow-2xs">
          <span className="text-[11px] text-[#696969] font-bold uppercase tracking-[0.96px] block mb-1">
            Phone Number
          </span>
          <span className="font-bold text-[#1d1d1d] truncate block">
            {profile.phone || <span className="text-[#cc4117]">Missing</span>}
          </span>
        </div>

        <div className="p-4 rounded-2xl border border-[#e6e6e6] bg-[#ffffff] shadow-2xs">
          <span className="text-[11px] text-[#696969] font-bold uppercase tracking-[0.96px] block mb-1">
            Social Profiles
          </span>
          <div className="flex items-center space-x-2 text-[#1d1d1d] font-bold">
            <span className={profile.linkedin ? 'text-[#1264a3]' : 'text-[#696969]'}>LinkedIn</span>
            <span className="text-[#e6e6e6]">·</span>
            <span className={profile.github ? 'text-[#4a154b]' : 'text-[#696969]'}>GitHub</span>
          </div>
        </div>
      </div>

      {/* Secondary Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs">
        <div className="p-4 rounded-2xl border border-[#e6e6e6] bg-[#ffffff] shadow-2xs">
          <span className="text-[11px] text-[#696969] font-bold uppercase tracking-[0.96px] block mb-2">
            Experience & Credentials
          </span>
          <div className="space-y-1.5 text-[#1d1d1d]">
            <div className="flex justify-between items-center">
              <span className="text-[#696969]">Career Tenure:</span>
              <span className="font-bold text-[#4a154b]">~{profile.yearsExperience} Years</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#696969]">Academic Degree:</span>
              <span className="font-bold text-[#1d1d1d]">{profile.degree}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#696969]">Document Length:</span>
              <span className="font-bold text-[#1d1d1d]">{profile.wordCount} words</span>
            </div>
          </div>
        </div>

        {/* Section Header Health */}
        <div className="p-4 rounded-2xl border border-[#e6e6e6] bg-[#ffffff] shadow-2xs">
          <span className="text-[11px] text-[#696969] font-bold uppercase tracking-[0.96px] block mb-2">
            ATS Section Compliance ({profile.detectedSections.length}/6)
          </span>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            {['Summary', 'Experience', 'Skills', 'Education', 'Projects', 'Certifications'].map((sec) => {
              const isFound = profile.detectedSections.some((d) => d.toLowerCase().includes(sec.toLowerCase().slice(0, 4)));
              return (
                <div key={sec} className="flex items-center space-x-1.5">
                  {isFound ? (
                    <Check className="w-3.5 h-3.5 text-[#007a5a] shrink-0" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-[#cc4117] shrink-0" />
                  )}
                  <span className={isFound ? 'text-[#1d1d1d] font-bold' : 'text-[#696969]'}>
                    {sec}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Impact Language & Metrics */}
        <div className="p-4 rounded-2xl border border-[#e6e6e6] bg-[#ffffff] shadow-2xs">
          <span className="text-[11px] text-[#696969] font-bold uppercase tracking-[0.96px] block mb-2">
            Language & Impact Signals
          </span>
          <div className="space-y-1.5 text-[#1d1d1d]">
            <div className="flex justify-between items-center">
              <span className="text-[#696969]">Action Verbs Count:</span>
              <span className="font-bold text-[#007a5a]">{profile.actionVerbsCount || 0} verbs</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#696969]">Quantified Metrics:</span>
              <span className="font-bold text-[#1264a3]">{profile.metricsCount || 0} metrics</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#696969]">Readability Index:</span>
              <span className="font-bold text-[#4a154b]">Standard Resume Format</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
