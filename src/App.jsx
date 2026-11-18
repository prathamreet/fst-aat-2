import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ResumeInput from './components/ResumeInput';
import JobDescriptionInput from './components/JobDescriptionInput';
import ScoreCard from './components/ScoreCard';
import KeywordList from './components/KeywordList';
import Recommendations from './components/Recommendations';
import ParsedProfile from './components/ParsedProfile';
import RawComparison from './components/RawComparison';
import AcademicModal from './components/AcademicModal';
import GeminiAiSection from './components/GeminiAiSection';
import { calculateAtsMatch } from './utils/atsMatcher';
import { ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react';
import { SAMPLE_RESUMES, SAMPLE_JOB_DESCRIPTIONS } from './data/sampleData';

export default function App() {
  const [resumeText, setResumeText] = useState('');
  const [resumeMeta, setResumeMeta] = useState(null);
  const [jdText, setJdText] = useState('');
  const [selectedJdId, setSelectedJdId] = useState(null);

  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isInputsCollapsed, setIsInputsCollapsed] = useState(false);

  // Keyboard shortcut: Ctrl/Cmd + Enter to trigger analysis
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (resumeText && jdText && !isAnalyzing) {
          handleRunAnalysis();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resumeText, jdText, isAnalyzing]);

  const handleRunAnalysis = () => {
    setErrorMsg(null);
    if (!resumeText.trim()) {
      setErrorMsg('Please upload a resume or paste resume text first.');
      return;
    }
    if (!jdText.trim()) {
      setErrorMsg('Please paste a job description or select a preset role.');
      return;
    }

    setIsAnalyzing(true);
    try {
      const matchData = calculateAtsMatch(resumeText, jdText);
      setAnalysisResults(matchData);
      setIsInputsCollapsed(true);

      // Smooth scroll to results
      setTimeout(() => {
        const el = document.getElementById('results-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Error occurred while calculating ATS score.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResumeText('');
    setResumeMeta(null);
    setJdText('');
    setSelectedJdId(null);
    setAnalysisResults(null);
    setErrorMsg(null);
    setIsInputsCollapsed(false);
  };

  const handlePrint = () => {
    window.print();
  };

  // Quick preset loader
  const loadFullDemo = () => {
    const sampleResume = SAMPLE_RESUMES[0];
    const sampleJd = SAMPLE_JOB_DESCRIPTIONS[0];

    setResumeText(sampleResume.text);
    setResumeMeta({
      fileName: `${sampleResume.title.split('(')[0].trim()}.txt`,
      fileSize: (new Blob([sampleResume.text]).size / 1024).toFixed(1) + ' KB',
      fileType: 'PRESET',
      wordCount: sampleResume.text.split(/\s+/).filter(Boolean).length
    });

    setJdText(sampleJd.text);
    setSelectedJdId(sampleJd.id);
    setErrorMsg(null);
  };

  const hasInputs = Boolean(resumeText.trim() && jdText.trim());

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col text-zinc-900 font-sans antialiased">
      {/* Top Navigation */}
      <Navbar
        onReset={handleReset}
        onPrint={handlePrint}
        onOpenInfo={() => setIsInfoModalOpen(true)}
        hasResults={Boolean(analysisResults)}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* Workspace Intro Header - Restrained, Clean SaaS Header */}
        {!analysisResults && (
          <div className="mb-6 pb-5 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-1.5">
                <span className="inline-flex items-center text-[11px] font-mono font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 mr-1 text-emerald-600" />
                  100% In-Browser Privacy
                </span>
                <span className="text-[11px] font-mono text-zinc-400">·</span>
                <span className="text-[11px] font-mono text-zinc-500">
                  Deterministic Heuristics + Gemini 3.5 Flash
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-zinc-950">
                AI Resume Analyzer and ATS Score Matcher Using Job Description
              </h1>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1 max-w-2xl leading-relaxed">
                Benchmark candidate resumes against job requisitions. Calculates an explainable 0–100 ATS compatibility score based on keyword coverage, career tenure, degree prerequisites, and structural compliance.
              </p>
            </div>

            <button
              type="button"
              onClick={loadFullDemo}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50 hover:border-zinc-400 transition-colors shrink-0 shadow-2xs self-start sm:self-center cursor-pointer"
            >
              <span>Load Full-Stack Sample</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 text-zinc-400" />
            </button>
          </div>
        )}

        {/* Input Panels Section */}
        <div className="no-print">
          {/* Collapsible toggle bar when analysis results exist */}
          {analysisResults && (
            <div className="mb-4 flex items-center justify-between bg-white px-4 py-2.5 rounded-lg border border-zinc-200 text-xs shadow-2xs">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span className="text-zinc-600">
                  Evaluating against: <strong className="text-zinc-900 font-semibold">{analysisResults.jobRequirements.mustHaveSkills.slice(0, 4).join(', ') || 'Software Engineer'}</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsInputsCollapsed(!isInputsCollapsed)}
                className="text-zinc-700 hover:text-zinc-950 font-medium flex items-center space-x-1 cursor-pointer"
              >
                <span>{isInputsCollapsed ? 'Edit Documents' : 'Collapse Inputs'}</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isInputsCollapsed ? '' : 'rotate-90'}`} />
              </button>
            </div>
          )}

          {/* Dual Input Cards: Resume & Job Description */}
          {(!analysisResults || !isInputsCollapsed) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <ResumeInput
                resumeText={resumeText}
                setResumeText={setResumeText}
                resumeMeta={resumeMeta}
                setResumeMeta={setResumeMeta}
              />

              <JobDescriptionInput
                jdText={jdText}
                setJdText={setJdText}
                selectedJdId={selectedJdId}
                setSelectedJdId={setSelectedJdId}
              />
            </div>
          )}

          {/* Action Execution Bar */}
          {(!analysisResults || !isInputsCollapsed) && (
            <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 bg-white rounded-lg border border-zinc-200 shadow-2xs">
              <div className="text-xs text-zinc-500">
                {hasInputs ? (
                  <span className="text-zinc-900 font-medium flex items-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 mr-2" />
                    Both documents ready for analysis.
                  </span>
                ) : (
                  <span>
                    Upload candidate resume (PDF/TXT) and paste target job description to evaluate.
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2.5 w-full sm:w-auto">
                {analysisResults && (
                  <button
                    type="button"
                    onClick={() => setIsInputsCollapsed(true)}
                    className="px-3.5 py-1.5 text-xs font-medium rounded-md border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition-colors w-full sm:w-auto cursor-pointer"
                  >
                    View Report
                  </button>
                )}

                <button
                  type="button"
                  disabled={!hasInputs || isAnalyzing}
                  onClick={handleRunAnalysis}
                  className={`inline-flex items-center justify-center px-4 py-2 text-xs font-medium rounded-md transition-colors w-full sm:w-auto ${
                    hasInputs && !isAnalyzing
                      ? 'bg-zinc-900 text-white hover:bg-zinc-800 active:bg-zinc-950 cursor-pointer shadow-xs'
                      : 'bg-zinc-100 text-zinc-400 border border-zinc-200 cursor-not-allowed'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Evaluating ATS Compatibility...
                    </>
                  ) : (
                    <>
                      <span>Analyze Match</span>
                      <span className="ml-2 font-mono text-[10px] text-zinc-400 border border-zinc-700 px-1 py-0.2 rounded">
                        ⌘↵
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {errorMsg && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-md text-xs text-red-700 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2 shrink-0" />
              {errorMsg}
            </div>
          )}
        </div>

        {/* RESULTS SECTION - CLEAN CONTINUOUS PRODUCTION WORKSPACE */}
        {analysisResults && (
          <div id="results-section" className="space-y-4">
            {/* 1. Score Card & Component Ledger */}
            <ScoreCard results={analysisResults} />

            {/* 2. Keyword Matrix */}
            <KeywordList keywords={analysisResults.keywords} />

            {/* 3. AI Recruiter Audit & Optimization */}
            <GeminiAiSection
              resumeText={resumeText}
              jdText={jdText}
              matchResults={analysisResults}
            />

            {/* 4. Diagnostic Audit & Remediation */}
            <Recommendations
              strengths={analysisResults.strengths}
              weaknesses={analysisResults.weaknesses}
              recommendations={analysisResults.recommendations}
            />

            {/* 5. Telemetry & Entity Verification */}
            <ParsedProfile profile={analysisResults.candidateProfile} />

            {/* 6. Raw Source Inspector */}
            <RawComparison resumeText={resumeText} jdText={jdText} />
          </div>
        )}
      </main>

      {/* Engineering Footer */}
      <footer className="bg-white border-t border-zinc-200 py-4 mt-auto text-xs text-zinc-500 no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p className="text-zinc-600">
            AI Resume Analyzer and ATS Score Matcher Using Job Description · College Minor Project
          </p>
          <div className="flex items-center space-x-3 text-[11px] font-mono text-zinc-400">
            <button
              type="button"
              onClick={() => setIsInfoModalOpen(true)}
              className="hover:text-zinc-900 transition-colors cursor-pointer"
            >
              Scoring Model
            </button>
            <span>·</span>
            <span>Deterministic NLP</span>
            <span>·</span>
            <span>Gemini 3.5 Flash</span>
            <span>·</span>
            <a
              href="https://github.com/prathamreet/fst-aat-2"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-600 hover:text-zinc-950 font-medium"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* Model Overview Modal */}
      <AcademicModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </div>
  );
}
