import React from 'react';
import { X } from 'lucide-react';

export default function AcademicModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-xl w-full border border-zinc-200 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-zinc-900">
              Scoring Model & Architecture
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              AI Resume Analyzer and ATS Score Matcher Using Job Description · College Minor Project
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 p-1 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 text-xs text-zinc-700 max-h-[75vh] overflow-y-auto">
          {/* Methodology */}
          <div>
            <h4 className="font-semibold text-zinc-900 text-xs mb-1">
              Methodology & Evaluation Pipeline
            </h4>
            <p className="text-zinc-600 leading-relaxed">
              This system replicates the multi-stage parsing and ranking architecture of modern Applicant Tracking Systems (ATS). The engine uses deterministic natural language processing (NLP) to benchmark candidate qualifications against target job descriptions with full mathematical explainability.
            </p>
          </div>

          {/* Scoring Table */}
          <div>
            <h4 className="font-semibold text-zinc-900 text-xs mb-2">
              Weighted Evaluation Model (Total: 100%)
            </h4>
            <div className="border border-zinc-200 rounded-md overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-zinc-50 border-b border-zinc-200 text-[11px] font-semibold text-zinc-700">
                  <tr>
                    <th className="py-2 px-3">Criteria</th>
                    <th className="py-2 px-3">Weight</th>
                    <th className="py-2 px-3">Algorithmic Basis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-[11px]">
                  <tr>
                    <td className="py-2 px-3 font-medium text-zinc-900">Technical Keywords</td>
                    <td className="py-2 px-3 font-mono font-semibold text-zinc-900">40%</td>
                    <td className="py-2 px-3 text-zinc-600">
                      Exact & semantic taxonomy matching against Job Description technical keywords.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-zinc-900">Relevant Experience</td>
                    <td className="py-2 px-3 font-mono font-semibold text-zinc-900">20%</td>
                    <td className="py-2 px-3 text-zinc-600">
                      Detected career year ranges vs requested minimum years, with bonus for metrics.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-zinc-900">Education Level</td>
                    <td className="py-2 px-3 font-mono font-semibold text-zinc-900">10%</td>
                    <td className="py-2 px-3 text-zinc-600">
                      Graduation degree level (Bachelors, Masters, PhD) evaluated against prerequisites.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-zinc-900">ATS Structure & Format</td>
                    <td className="py-2 px-3 font-mono font-semibold text-zinc-900">15%</td>
                    <td className="py-2 px-3 text-zinc-600">
                      Contact entities (Email, Phone, LinkedIn/GitHub), 6 standard section headers, and active verbs.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-zinc-900">Semantic Relevance</td>
                    <td className="py-2 px-3 font-mono font-semibold text-zinc-900">15%</td>
                    <td className="py-2 px-3 text-zinc-600">
                      Term Frequency-Inverse Document Frequency (TF-IDF) Cosine Similarity vector projection.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-md">
            <h4 className="font-semibold text-zinc-900 text-xs mb-1">
              Privacy & Local Processing
            </h4>
            <p className="text-zinc-600 text-[11px] leading-relaxed">
              Core ATS parsing and mathematical matching operate 100% locally in the browser using Web Workers. No candidate resumes or job postings are stored or shared.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-zinc-50 border-t border-zinc-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
