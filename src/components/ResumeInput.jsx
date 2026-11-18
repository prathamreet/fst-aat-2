import React, { useRef, useState } from 'react';
import { Upload, FileText, Check, AlertCircle, Edit2, X } from 'lucide-react';
import { extractTextFromFile } from '../utils/textParser.js';
import { SAMPLE_RESUMES } from '../data/sampleData.js';

export default function ResumeInput({ resumeText, setResumeText, resumeMeta, setResumeMeta }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState(null);
  const [mode, setMode] = useState('upload'); // 'upload' | 'text'
  const fileInputRef = useRef(null);

  const handleFileProcess = async (file) => {
    if (!file) return;
    setParseError(null);
    setIsParsing(true);

    try {
      const extracted = await extractTextFromFile(file);
      setResumeText(extracted);
      setResumeMeta({
        fileName: file.name,
        fileSize: (file.size / 1024).toFixed(1) + ' KB',
        fileType: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        wordCount: extracted.split(/\s+/).filter(Boolean).length
      });
    } catch (err) {
      console.error(err);
      setParseError(err.message || 'Failed to extract text from file.');
    } finally {
      setIsParsing(false);
    }
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileProcess(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileProcess(file);
  };

  const loadSample = (sample) => {
    setParseError(null);
    setResumeText(sample.text);
    setResumeMeta({
      fileName: `${sample.title.split('(')[0].trim()}.txt`,
      fileSize: (new Blob([sample.text]).size / 1024).toFixed(1) + ' KB',
      fileType: 'PRESET',
      wordCount: sample.text.split(/\s+/).filter(Boolean).length
    });
  };

  const clearResume = () => {
    setResumeText('');
    setResumeMeta(null);
    setParseError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e6e6e6] p-6 flex flex-col h-full shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#e6e6e6]">
        <div>
          <h2 className="text-sm font-bold text-[#1d1d1d] tracking-tight">
            Candidate Resume
          </h2>
          <p className="text-xs text-[#696969] mt-0.5">
            Ingest credentials in PDF or plain-text format
          </p>
        </div>

        {/* Slack Pill Switcher */}
        <div className="flex items-center bg-[#f9f0ff] p-1 rounded-full border border-[#ebd5fc] text-xs">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              mode === 'upload'
                ? 'bg-[#4a154b] text-white shadow-2xs'
                : 'text-[#696969] hover:text-[#1d1d1d]'
            }`}
          >
            File Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('text')}
            className={`px-3 py-1 rounded-full font-bold transition-all ${
              mode === 'text'
                ? 'bg-[#4a154b] text-white shadow-2xs'
                : 'text-[#696969] hover:text-[#1d1d1d]'
            }`}
          >
            Direct Text
          </button>
        </div>
      </div>

      {/* Preset Profiles Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] text-[#696969] font-bold uppercase tracking-[0.96px]">
          Demo candidate:
        </span>
        <div className="flex items-center space-x-1.5">
          {SAMPLE_RESUMES.map((sample) => {
            const shortName = sample.title.includes('Alex')
              ? 'Full-Stack'
              : sample.title.includes('Priya')
              ? 'Frontend'
              : 'Data Analyst';
            const isSelected = resumeMeta?.fileName?.includes(shortName) || resumeText === sample.text;

            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => loadSample(sample)}
                className={`px-3 py-1 text-xs rounded-full font-bold transition-all ${
                  isSelected
                    ? 'bg-[#4a154b] text-white shadow-2xs'
                    : 'bg-[#f9f0ff] text-[#4a154b] border border-[#ebd5fc] hover:bg-[#eedcfc]'
                }`}
              >
                {shortName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Body */}
      <div className="mt-4 flex-1 flex flex-col">
        {mode === 'upload' ? (
          <div>
            {/* Dropzone with Slack Cream / Peach Tint */}
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-[#4a154b] bg-[#f9f0ff]'
                  : 'border-[#d9bdde] hover:border-[#4a154b] bg-[#fdfaf7]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt"
                className="hidden"
                onChange={onFileChange}
              />

              <div className="w-10 h-10 rounded-full bg-white border border-[#e6e6e6] flex items-center justify-center text-[#4a154b] mb-2.5 shadow-2xs">
                {isParsing ? (
                  <div className="w-4 h-4 border-2 border-[#4a154b] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload className="w-4 h-4 text-[#4a154b]" />
                )}
              </div>

              {isParsing ? (
                <div>
                  <p className="text-xs font-bold text-[#1d1d1d]">Parsing PDF via Web Worker...</p>
                  <p className="text-[11px] text-[#696969] mt-0.5">Extracting local text stream without server upload</p>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-bold text-[#1d1d1d]">
                    Choose PDF or plain text resume
                  </p>
                  <p className="text-[11px] text-[#696969] mt-0.5">
                    Click to browse or drop file here · 100% private in-browser
                  </p>
                </div>
              )}
            </div>

            {/* Error Message */}
            {parseError && (
              <div className="mt-3 p-3 bg-[#fdf2f2] border border-[#f5c6cb] rounded-xl flex items-start space-x-2 text-xs text-[#cc4117]">
                <AlertCircle className="w-4 h-4 text-[#cc4117] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">File Parsing Warning</p>
                  <p className="mt-0.5">{parseError}</p>
                </div>
              </div>
            )}

            {/* Uploaded File Metadata Chip */}
            {resumeMeta && (
              <div className="mt-3.5 p-3.5 bg-[#f9f0ff] border border-[#ebd5fc] rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-3 truncate">
                  <div className="w-7 h-7 rounded-full bg-[#007a5a] text-white flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-[#1d1d1d] truncate">
                      {resumeMeta.fileName}
                    </p>
                    <p className="text-[11px] text-[#696969]">
                      {resumeMeta.fileSize} · {resumeMeta.wordCount} words · {resumeMeta.fileType}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setMode('text')}
                    className="p-1 text-[#696969] hover:text-[#4a154b] rounded-full transition-colors"
                    title="View extracted text"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={clearResume}
                    className="p-1 text-[#696969] hover:text-[#cc4117] rounded-full transition-colors"
                    title="Remove file"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <textarea
              value={resumeText}
              onChange={(e) => {
                setResumeText(e.target.value);
                setResumeMeta({
                  fileName: 'Manual Text Ingestion',
                  fileSize: (new Blob([e.target.value]).size / 1024).toFixed(1) + ' KB',
                  fileType: 'TXT',
                  wordCount: e.target.value.split(/\s+/).filter(Boolean).length
                });
              }}
              placeholder="Paste plain resume text here..."
              className="flex-1 w-full min-h-[175px] p-3.5 text-xs text-[#1d1d1d] bg-[#ffffff] border border-[#e6e6e6] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4a154b]/20 focus:border-[#4a154b] resize-none font-sans"
            />
            <div className="mt-2 flex items-center justify-between text-[11px] text-[#696969]">
              <span>{resumeText.split(/\s+/).filter(Boolean).length} words</span>
              {resumeText && (
                <button
                  type="button"
                  onClick={clearResume}
                  className="text-[#cc4117] hover:underline font-bold"
                >
                  Clear text
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
