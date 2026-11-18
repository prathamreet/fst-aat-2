import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

export default function AcademicModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1d1d1d]/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-[#e6e6e6] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header - Slack Aubergine Band */}
        <div className="bg-[#4a154b] text-white px-7 py-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#d9bdde] uppercase tracking-[0.96px] block mb-1">
              Deterministic Academic Model
            </span>
            <h3 className="text-base font-bold text-white tracking-tight">
              Scoring Methodology & Formula Architecture
            </h3>
            <p className="text-xs text-[#d9bdde] mt-0.5">
              AI Resume Analyzer and ATS Score Matcher Using Job Description · College Minor Project
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#d9bdde] hover:text-white hover:bg-[#611f69] p-2 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-7 space-y-6 text-xs text-[#1d1d1d] max-h-[75vh] overflow-y-auto leading-[1.55]">
          {/* Methodology */}
          <div>
            <h4 className="font-bold text-[#1d1d1d] text-xs uppercase tracking-[0.96px] mb-2">
              System Architecture & Evaluation Pipeline
            </h4>
            <p className="text-[#696969] leading-relaxed">
              This system replicates the multi-stage parsing and lexical ranking mechanisms of contemporary enterprise Applicant Tracking Systems (Workday, Taleo, Greenhouse). The engine uses transparent natural language processing (NLP) to benchmark candidate qualifications against target job descriptions with full mathematical explainability.
            </p>
          </div>

          {/* Scoring Table */}
          <div>
            <h4 className="font-bold text-[#1d1d1d] text-xs uppercase tracking-[0.96px] mb-2.5">
              Weighted Evaluation Model (Total: 100%)
            </h4>
            <div className="border border-[#e6e6e6] rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#f4ede4] border-b border-[#e8d8c8] text-[11px] font-bold text-[#1d1d1d]">
                  <tr>
                    <th className="py-2.5 px-3.5">Component</th>
                    <th className="py-2.5 px-3.5">Weight</th>
                    <th className="py-2.5 px-3.5">Algorithmic Formulation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e6e6e6] text-[11px]">
                  <tr>
                    <td className="py-2.5 px-3.5 font-bold text-[#4a154b]">Technical Keywords</td>
                    <td className="py-2.5 px-3.5 font-bold text-[#1d1d1d]">40%</td>
                    <td className="py-2.5 px-3.5 text-[#696969]">
                      Exact and semantic taxonomy matching against target job description technical skills.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3.5 font-bold text-[#007a5a]">Relevant Experience</td>
                    <td className="py-2.5 px-3.5 font-bold text-[#1d1d1d]">20%</td>
                    <td className="py-2.5 px-3.5 text-[#696969]">
                      Detected career year ranges vs requested minimum years, with bonus for quantified metrics.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3.5 font-bold text-[#1264a3]">Education Level</td>
                    <td className="py-2.5 px-3.5 font-bold text-[#1d1d1d]">10%</td>
                    <td className="py-2.5 px-3.5 text-[#696969]">
                      Graduation degree level (Doctorate, Master, Bachelor, Associate) evaluated against prerequisites.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3.5 font-bold text-[#611f69]">ATS Structure & Format</td>
                    <td className="py-2.5 px-3.5 font-bold text-[#1d1d1d]">15%</td>
                    <td className="py-2.5 px-3.5 text-[#696969]">
                      Contact entities (Email, Phone, LinkedIn/GitHub), 6 standard section headers, and active verbs.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3.5 font-bold text-[#481a54]">Semantic Relevance</td>
                    <td className="py-2.5 px-3.5 font-bold text-[#1d1d1d]">15%</td>
                    <td className="py-2.5 px-3.5 text-[#696969]">
                      Term Frequency-Inverse Document Frequency (TF-IDF) Cosine Similarity vector projection.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Privacy Note - Slack Lavender Card */}
          <div className="p-4 bg-[#f9f0ff] border border-[#ebd5fc] rounded-2xl flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-[#4a154b] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-[#4a154b] text-xs uppercase tracking-[0.96px] mb-1">
                Zero-PII Privacy & Local Browser Execution
              </h4>
              <p className="text-xs text-[#1d1d1d] leading-relaxed">
                All resume parsing (via pdfjs-dist Web Workers) and deterministic heuristic scoring execute 100% locally in your browser. No resumes, telephone numbers, or employment records are uploaded to remote cloud databases.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-7 py-4 bg-[#fdfaf7] border-t border-[#e8d8c8] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-bold rounded-full bg-[#4a154b] text-white hover:bg-[#611f69] transition-all cursor-pointer shadow-2xs"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
}
