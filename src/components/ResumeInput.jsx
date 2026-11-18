import React, { useRef, useState } from 'react';
import { Upload, Check, AlertCircle, Edit2, X, FileText } from 'lucide-react';
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
    <div className="bg-white rounded-lg border border-zinc-200 p-5 flex flex-col h-full shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Candidate Resume
          </h2>
          <p className="text-xs text-zinc-900 font-medium mt-0.5">
            Ingest credentials in PDF or plain text
          </p>
        </div>

        {/* Compact Segmented Switcher */}
        <div className="flex items-center bg-zinc-100 p-0.5 rounded-md text-xs font-medium">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              mode === 'upload'
                ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            File Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('text')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              mode === 'text'
                ? 'bg-white text-zinc-900 shadow-2xs font-semibold'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Direct Text
          </button>
        </div>
      </div>

      {/* Preset Profiles Bar */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] text-zinc-500 font-medium">
          Presets:
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
                className={`px-2 py-0.5 text-xs rounded-md border transition-colors cursor-pointer ${
                  isSelected
                    ? 'border-zinc-900 bg-zinc-900 text-white font-medium'
                    : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:bg-zinc-100 hover:border-zinc-300'
                }`}
              >
                {shortName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Body */}
      <div className="mt-3 flex-1 flex flex-col">
        {mode === 'upload' ? (
          <div>
            {/* Dropzone */}
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                isDragging
                  ? 'border-zinc-900 bg-zinc-50'
                  : 'border-zinc-300 hover:border-zinc-400 bg-zinc-50/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt"
                className="hidden"
                onChange={onFileChange}
              />

              <div className="w-8 h-8 rounded-md bg-white border border-zinc-200 flex items-center justify-center text-zinc-700 mb-2 shadow-2xs">
                {isParsing ? (
                  <div className="w-4 h-4 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
              </div>

              {isParsing ? (
                <div>
                  <p className="text-xs font-medium text-zinc-900">Extracting text layers...</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Running in-browser Web Worker parser</p>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-medium text-zinc-900">
                    Click to select resume or drag and drop
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Supports PDF and plain text · 100% in-browser
                  </p>
                </div>
              )}
            </div>

            {/* Error Message */}
            {parseError && (
              <div className="mt-2.5 p-3 bg-red-50 border border-red-200 rounded-md flex items-start space-x-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Parse Error</p>
                  <p className="mt-0.5">{parseError}</p>
                </div>
              </div>
            )}

            {/* Uploaded File Chip */}
            {resumeMeta && (
              <div className="mt-3 p-3 bg-zinc-50 border border-zinc-200 rounded-md flex items-center justify-between">
                <div className="flex items-center space-x-2.5 truncate">
                  <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-medium text-zinc-900 truncate">
                      {resumeMeta.fileName}
                    </p>
                    <p className="text-[11px] text-zinc-500 font-mono">
                      {resumeMeta.fileSize} · {resumeMeta.wordCount} words · {resumeMeta.fileType}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setMode('text')}
                    className="p-1 text-zinc-500 hover:text-zinc-900 rounded transition-colors cursor-pointer"
                    title="View text stream"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={clearResume}
                    className="p-1 text-zinc-400 hover:text-red-600 rounded transition-colors cursor-pointer"
                    title="Clear file"
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
              placeholder="Paste resume content here..."
              className="flex-1 w-full min-h-[175px] p-3 text-xs font-mono text-zinc-900 bg-white border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 resize-none leading-relaxed"
            />
            <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <span>{resumeText.split(/\s+/).filter(Boolean).length} words</span>
              {resumeText && (
                <button
                  type="button"
                  onClick={clearResume}
                  className="text-red-600 hover:underline cursor-pointer"
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
