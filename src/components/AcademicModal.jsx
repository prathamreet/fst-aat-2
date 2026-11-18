import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

export default function AcademicModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full border border-zinc-200 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-100 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-0.5">
              Deterministic Academic Model
            </span>
            <h3 className="text-base font-semibold text-zinc-900 tracking-tight">
              Scoring Methodology & Rubric Architecture
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              AI Resume Analyzer and ATS Score Matcher Using Job Description · College Minor Project
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 p-1.5 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 text-xs text-zinc-800 max-h-[75vh] overflow-y-auto leading-normal">
          {/* Methodology */}
          <div>
            <h4 className="font-semibold text-zinc-900 text-xs mb-1.5">
              System Architecture & Evaluation Pipeline
            </h4>
            <p className="text-zinc-600 leading-relaxed">
              This system replicates the multi-stage parsing and lexical ranking mechanisms of contemporary enterprise Applicant Tracking Systems (Workday, Taleo, Greenhouse). The engine uses transparent natural language processing (NLP) to benchmark candidate qualifications against target job descriptions with mathematical explainability.
            </p>
          </div>

          {/* Scoring Table */}
          <div>
            <h4 className="font-semibold text-zinc-900 text-xs mb-2">
              Weighted Evaluation Model (Total: 100%)
            </h4>
            <div className="border border-zinc-200 rounded-md overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-zinc-50 border-b border-zinc-200 text-[11px] font-mono font-medium text-zinc-700">
                  <tr>
                    <th className="py-2 px-3">Component</th>
                    <th className="py-2 px-3">Weight</th>
                    <th className="py-2 px-3">Algorithmic Formulation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-xs">
                  <tr>
                    <td className="py-2 px-3 font-medium text-zinc-900">Technical Keywords</td>
                    <td className="py-2 px-3 font-mono font-semibold text-zinc-900">40%</td>
                    <td className="py-2 px-3 text-zinc-600">
                      Exact and taxonomy-based token matching against target job description requirements.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-zinc-900">Relevant Experience</td>
                    <td className="py-2 px-3 font-mono font-semibold text-zinc-900">20%</td>
                    <td className="py-2 px-3 text-zinc-600">
                      Calculated career year ranges vs requested minimum years, with bonus for quantified metrics.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-zinc-900">Education Level</td>
                    <td className="py-2 px-3 font-mono font-semibold text-zinc-900">10%</td>
                    <td className="py-2 px-3 text-zinc-600">
                      Graduation degree level (Doctorate, Master, Bachelor, Associate) evaluated against prerequisites.
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
          <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-md flex items-start space-x-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-zinc-900 text-xs mb-0.5">
                Client-Side Privacy & Local In-Browser Execution
              </h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                All resume parsing (via pdfjs-dist Web Workers) and deterministic heuristic scoring execute 100% locally in your browser. No resumes, telephone numbers, or employment records are uploaded to remote cloud databases.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-zinc-50 border-t border-zinc-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium rounded-md bg-zinc-900 text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
