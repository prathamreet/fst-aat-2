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
    <div className="bg-white rounded-lg border border-zinc-200 p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900">
            Resume Document
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Upload candidate credentials in PDF or plain text
          </p>
        </div>

        {/* View Mode Segment */}
        <div className="flex items-center bg-zinc-100 p-0.5 rounded-md text-xs">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2.5 py-1 rounded transition-colors ${
              mode === 'upload'
                ? 'bg-white text-zinc-900 font-medium shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            File Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('text')}
            className={`px-2.5 py-1 rounded transition-colors ${
              mode === 'text'
                ? 'bg-white text-zinc-900 font-medium shadow-xs'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Direct Text
          </button>
        </div>
      </div>

      {/* Preset Profiles Bar */}
      <div className="mt-3.5 flex items-center justify-between">
        <span className="text-[11px] text-zinc-500 font-medium">
          Load preset:
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
                className={`px-2 py-1 text-xs rounded border transition-colors ${
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

              <div className="w-8 h-8 rounded-md bg-white border border-zinc-200 flex items-center justify-center text-zinc-600 mb-2.5 shadow-xs">
                {isParsing ? (
                  <div className="w-4 h-4 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
              </div>

              {isParsing ? (
                <div>
                  <p className="text-xs font-medium text-zinc-900">Parsing PDF layers...</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Extracting plain text streams</p>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-medium text-zinc-900">
                    Click to select file or drag and drop
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Supports PDF and TXT formats
                  </p>
                </div>
              )}
            </div>

            {/* Error Message */}
            {parseError && (
              <div className="mt-3 p-3 bg-zinc-50 border border-red-200 rounded-md flex items-start space-x-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">File Parse Warning</p>
                  <p className="mt-0.5 text-zinc-600">{parseError}</p>
                </div>
              </div>
            )}

            {/* Parsed File Meta Bar */}
            {resumeMeta && (
              <div className="mt-3 p-3 bg-zinc-50 rounded-md border border-zinc-200 flex items-center justify-between">
                <div className="flex items-center space-x-2.5 truncate">
                  <div className="w-7 h-7 rounded bg-white border border-zinc-200 text-zinc-700 flex items-center justify-center shrink-0">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-medium text-zinc-900 truncate">
                      {resumeMeta.fileName}
                    </p>
                    <p className="text-[11px] text-zinc-500 font-mono">
                      {resumeMeta.fileSize} · {resumeMeta.wordCount} words
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setMode('text')}
                    className="p-1 text-zinc-500 hover:text-zinc-900 rounded hover:bg-zinc-200 transition-colors"
                    title="View & Edit Extracted Text"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={clearResume}
                    className="p-1 text-zinc-400 hover:text-red-600 rounded hover:bg-zinc-200 transition-colors"
                    title="Remove File"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-zinc-700">
                Raw Resume Text
              </label>
              {resumeText && (
                <span className="text-[11px] text-zinc-500 font-mono">
                  {resumeText.split(/\s+/).filter(Boolean).length} words
                </span>
              )}
            </div>
            <textarea
              rows={11}
              value={resumeText}
              onChange={(e) => {
                const text = e.target.value;
                setResumeText(text);
                setResumeMeta({
                  fileName: 'Manual_Entry.txt',
                  fileSize: (new Blob([text]).size / 1024).toFixed(1) + ' KB',
                  fileType: 'TXT',
                  wordCount: text.split(/\s+/).filter(Boolean).length
                });
              }}
              placeholder="Paste plain resume text here..."
              className="w-full flex-1 p-3 text-xs font-mono bg-zinc-50 border border-zinc-300 rounded-md focus:ring-1 focus:ring-zinc-900 focus:bg-white text-zinc-900 resize-y leading-relaxed"
            />
            {resumeText && (
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={clearResume}
                  className="text-xs text-zinc-500 hover:text-red-600 hover:underline"
                >
                  Clear Resume
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
