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
import { ChevronRight, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
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

      // Smooth scroll to results section
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
    <div className="min-h-screen bg-white flex flex-col text-[#1d1d1d] font-sans antialiased">
      {/* Top Navigation - Slack nav-bar-light */}
      <Navbar
        onReset={handleReset}
        onPrint={handlePrint}
        onOpenInfo={() => setIsInfoModalOpen(true)}
        hasResults={Boolean(analysisResults)}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* Slack Signature Hero Banner - Pastel-Mesh Gradient Backdrop */}
        {!analysisResults && (
          <div className="mb-8 p-8 sm:p-12 rounded-3xl slack-pastel-mesh border border-[#e6e6e6] shadow-sm relative overflow-hidden">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4ede4] border border-[#e8d8c8] text-[#4a154b] text-[11px] font-bold tracking-[0.96px] uppercase mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#4a154b]" />
              <span>Slack Design System · College Minor Project</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1d1d1d] tracking-[-0.768px] leading-[1.12] max-w-3xl">
              AI Resume Analyzer and ATS Score Matcher Using Job Description
            </h1>

            <p className="text-[#696969] text-base sm:text-lg leading-[1.55] mt-4 max-w-2xl font-normal">
              An explainable 5-layer natural language processing engine and Google Gemini 3.5 Flash copilot built on Slack's aubergine and cream visual language. 100% private in-browser evaluation.
            </p>

            {/* Hero Quick Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={loadFullDemo}
                className="inline-flex items-center px-6 py-3 text-sm font-bold rounded-full bg-[#4a154b] text-white hover:bg-[#611f69] active:bg-[#481a54] transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                <span>Load Sample Candidate</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>

              <button
                type="button"
                onClick={() => setIsInfoModalOpen(true)}
                className="inline-flex items-center px-5 py-3 text-sm font-bold rounded-full bg-[#f9f0ff] text-[#4a154b] hover:bg-[#eedcfc] border border-[#ebd5fc] transition-all cursor-pointer"
              >
                <span>Explore Scoring Formula</span>
              </button>
            </div>
          </div>
        )}

        {/* Input Panels Section */}
        <div className="no-print">
          {/* Collapsible status header if results are already loaded */}
          {analysisResults && (
            <div className="mb-5 flex items-center justify-between bg-[#f4ede4] px-5 py-3.5 rounded-2xl border border-[#e8d8c8] text-xs">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#007a5a]" />
                <span className="text-[#1d1d1d] font-medium">
                  Active Analysis Target: <strong className="text-[#4a154b] font-bold">{analysisResults.jobRequirements.mustHaveSkills.slice(0, 4).join(', ') || 'Software Engineer'}</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsInputsCollapsed(!isInputsCollapsed)}
                className="inline-flex items-center px-4 py-1.5 text-xs font-bold text-[#4a154b] bg-white border border-[#e6e6e6] rounded-full hover:bg-[#f9f0ff] transition-all shadow-2xs cursor-pointer"
              >
                <span>{isInputsCollapsed ? 'Edit Resume & JD' : 'Collapse Input Panels'}</span>
                <ChevronRight className={`w-3.5 h-3.5 ml-1 transition-transform ${isInputsCollapsed ? '' : 'rotate-90'}`} />
              </button>
            </div>
          )}

          {/* Dual Input Cards: Resume & Job Description */}
          {(!analysisResults || !isInputsCollapsed) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Resume Input Card */}
              <ResumeInput
                resumeText={resumeText}
                setResumeText={setResumeText}
                resumeMeta={resumeMeta}
                setResumeMeta={setResumeMeta}
              />

              {/* Job Description Input Card */}
              <JobDescriptionInput
                jdText={jdText}
                setJdText={setJdText}
                selectedJdId={selectedJdId}
                setSelectedJdId={setSelectedJdId}
              />
            </div>
          )}

          {/* Action Execution Bar - Slack Over-Padded Pill CTA */}
          {(!analysisResults || !isInputsCollapsed) && (
            <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-[#f9f0ff] rounded-2xl border border-[#ebd5fc] shadow-2xs">
              <div className="text-xs text-[#696969]">
                {hasInputs ? (
                  <span className="text-[#007a5a] font-bold flex items-center text-sm">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-[#007a5a]" />
                    Both documents parsed and ready for ATS evaluation.
                  </span>
                ) : (
                  <span className="text-[#696969]">
                    Upload a resume and paste a job description (or use presets above) to run scoring.
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                {analysisResults && (
                  <button
                    type="button"
                    onClick={() => setIsInputsCollapsed(true)}
                    className="px-5 py-3 text-xs font-bold rounded-full bg-white border border-[#e6e6e6] text-[#1d1d1d] hover:bg-[#f4ede4] transition-all w-full sm:w-auto cursor-pointer"
                  >
                    View Current Report
                  </button>
                )}

                <button
                  type="button"
                  disabled={!hasInputs || isAnalyzing}
                  onClick={handleRunAnalysis}
                  className={`inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold rounded-full transition-all w-full sm:w-auto ${
                    hasInputs && !isAnalyzing
                      ? 'bg-[#4a154b] text-white hover:bg-[#611f69] active:bg-[#481a54] cursor-pointer shadow-md hover:shadow-lg'
                      : 'bg-[#e6e6e6] text-[#696969] cursor-not-allowed'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Evaluating ATS Compatibility...
                    </>
                  ) : (
                    <>
                      <span>Analyze Match & ATS Score</span>
                      <span className="ml-2.5 font-mono text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
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
            <div className="mb-6 p-4 bg-[#fdf2f2] border border-[#f5c6cb] rounded-2xl text-xs text-[#cc4117] font-medium flex items-center">
              <span className="w-2 h-2 rounded-full bg-[#cc4117] mr-2 shrink-0" />
              {errorMsg}
            </div>
          )}
        </div>

        {/* RESULTS SECTION - CLEAN CONTINUOUS SLACK WORKSPACE */}
        {analysisResults && (
          <div id="results-section" className="space-y-6">
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

            {/* Slack Closing Signature: Aubergine Band Card */}
            <div className="mt-12 p-8 sm:p-12 rounded-3xl bg-[#4a154b] text-white shadow-lg relative overflow-hidden no-print">
              <div className="max-w-2xl">
                <span className="inline-block px-3 py-1 rounded-full bg-[#592466] text-[#d9bdde] text-[11px] font-bold uppercase tracking-[0.96px] mb-3">
                  Production Evaluation Complete
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.464px] leading-tight">
                  Ready to optimize another candidate application?
                </h2>
                <p className="text-[#d9bdde] text-sm sm:text-base mt-2 leading-[1.55]">
                  Reset the workspace to evaluate a new resume, export this comprehensive diagnostic report as a PDF, or inspect the mathematical formula table.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 rounded-full bg-white text-[#4a154b] hover:bg-[#f9f0ff] font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer"
                  >
                    Evaluate Another Resume
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-6 py-3 rounded-full bg-[#592466] text-white hover:bg-[#611f69] border border-[#d9bdde]/30 font-bold text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    Export Printable Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer - Slack Aubergine Muted Style */}
      <footer className="bg-white border-t border-[#e6e6e6] py-6 mt-auto text-xs text-[#696969] no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#1d1d1d] font-medium">
            AI Resume Analyzer and ATS Score Matcher Using Job Description · College Minor Project
          </p>
          <div className="flex items-center space-x-3 text-[11px] text-[#696969]">
            <span className="hover:text-[#1264a3] transition-colors cursor-pointer" onClick={() => setIsInfoModalOpen(true)}>Scoring Model</span>
            <span>·</span>
            <span>Deterministic NLP (40/20/10/15/15)</span>
            <span>·</span>
            <span>Google Gemini 3.5 Flash</span>
            <span>·</span>
            <a href="https://github.com/prathamreet/fst-aat-2" target="_blank" rel="noreferrer" className="text-[#1264a3] hover:underline font-bold">
              GitHub Repo
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
