import { ACTION_VERBS, EDUCATION_KEYWORDS } from '../data/skillsDatabase.js';

/**
 * Extracts plain text from a File object (PDF, TXT)
 */
export async function extractTextFromFile(file) {
  if (!file) {
    throw new Error('No file provided');
  }

  const fileType = file.name.split('.').pop()?.toLowerCase();

  if (fileType === 'txt') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result || '');
      reader.onerror = () => reject(new Error('Failed to read text file.'));
      reader.readAsText(file);
    });
  }

  if (fileType === 'pdf') {
    try {
      // Dynamically load pdfjs-dist
      const pdfjsLib = await import('pdfjs-dist');
      
      // Configure worker
      if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.10.38'}/pdf.worker.min.mjs`;
      }

      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;

      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(' ');
        fullText += pageText + '\n\n';
      }

      const cleaned = fullText.trim();
      if (!cleaned) {
        throw new Error('PDF appears to be empty or contains scanned images without selectable text.');
      }
      return cleaned;
    } catch (err) {
      console.error('PDF parsing error:', err);
      throw new Error(
        `Failed to parse PDF (${err.message || 'Unknown error'}). If your PDF is an image scan, please copy-paste the text directly.`
      );
    }
  }

  throw new Error(`Unsupported file format (.${fileType}). Please upload a PDF or TXT file.`);
}

/**
 * Extracts candidate profile metadata from raw resume text
 */
export function parseResumeDetails(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    return {
      name: 'Unknown',
      email: null,
      phone: null,
      linkedin: null,
      github: null,
      detectedSections: [],
      missingSections: [],
      estimatedYearsOfExperience: 0,
      detectedDegree: null,
      metricsCount: 0,
      actionVerbsCount: 0,
      actionVerbsFound: [],
      wordCount: 0
    };
  }

  const text = rawText.trim();
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);

  // 1. Email extraction
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i;
  const emailMatch = text.match(emailRegex);
  const email = emailMatch ? emailMatch[1] : null;

  // 2. Phone extraction
  const phoneRegex = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?|(\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/;
  const phoneMatch = text.match(phoneRegex);
  const phone = phoneMatch ? phoneMatch[0].trim() : null;

  // 3. Links (LinkedIn & GitHub)
  const linkedinRegex = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i;
  const linkedinMatch = text.match(linkedinRegex);
  const linkedin = linkedinMatch ? linkedinMatch[0] : null;

  const githubRegex = /(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i;
  const githubMatch = text.match(githubRegex);
  const github = githubMatch ? githubMatch[0] : null;

  // 4. Candidate Name Heuristic
  let name = 'Candidate';
  for (let i = 0; i < Math.min(lines.length, 5); i++) {
    const line = lines[i];
    // Skip if it contains email, url, phone, or standard header keywords
    if (
      !line.includes('@') &&
      !line.toLowerCase().includes('resume') &&
      !line.toLowerCase().includes('curriculum') &&
      !line.toLowerCase().includes('summary') &&
      !line.includes('http') &&
      line.length >= 3 &&
      line.length <= 40 &&
      /^[A-Za-z\s.'-]+$/.test(line)
    ) {
      name = line;
      break;
    }
  }

  // 5. Section Detection
  const standardSections = [
    { key: 'summary', title: 'Summary / Objective', patterns: [/summary/i, /objective/i, /profile/i, /about\s+me/i] },
    { key: 'experience', title: 'Experience / Work History', patterns: [/experience/i, /work\s+history/i, /employment/i, /professional\s+background/i] },
    { key: 'skills', title: 'Technical Skills', patterns: [/skills/i, /competencies/i, /technologies/i, /technical\s+expertise/i] },
    { key: 'education', title: 'Education', patterns: [/education/i, /academic/i, /degrees?/i, /qualifications?/i] },
    { key: 'projects', title: 'Projects', patterns: [/projects?/i, /portfolio/i, /open\s+source/i] },
    { key: 'certifications', title: 'Certifications', patterns: [/certifications?/i, /licenses?/i, /credentials?/i] }
  ];

  const detectedSections = [];
  const missingSections = [];

  standardSections.forEach((sec) => {
    const isDetected = sec.patterns.some((pattern) => pattern.test(text));
    if (isDetected) {
      detectedSections.push(sec.title);
    } else {
      missingSections.push(sec.title);
    }
  });

  // 6. Action Verbs analysis
  const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
  const actionVerbsFound = Array.from(new Set(words.filter((w) => ACTION_VERBS.includes(w))));
  const actionVerbsCount = actionVerbsFound.length;

  // 7. Measurable metrics & quantifiers detection
  const metricRegex = /(\b\d+(?:\.\d+)?%\b|\$\d+(?:,\d+)*(?:\.\d+)?[kKmMbB]?|\b\d+[kKmMbB]\+?|\b\d+\s*(?:users|clients|customers|members|endpoints|features|teams|releases|projects|hours|ms|seconds|minutes)\b|\b(?:reduced|increased|improved|boosted|cut|saved)\s+by\s+\d+)/gi;
  const metricsMatches = text.match(metricRegex) || [];
  const metricsCount = metricsMatches.length;

  // 8. Highest Degree Detection
  let detectedDegree = 'Not specified';
  const lowerText = text.toLowerCase();
  for (const edu of EDUCATION_KEYWORDS) {
    if (edu.terms.some((term) => new RegExp(`\\b${term.replace('.', '\\.')}\\b`, 'i').test(lowerText))) {
      detectedDegree = edu.level;
      break;
    }
  }

  // 9. Estimated Years of Experience
  const currentYear = new Date().getFullYear();
  const yearPattern = /\b(199\d|20[0-2]\d)\b(?:\s*[-–—to]+\s*(?:(199\d|20[0-2]\d)|present|current|now))?/gi;
  let minYear = currentYear;
  let maxYear = currentYear;
  let yearMatchesFound = 0;

  let match;
  while ((match = yearPattern.exec(text)) !== null) {
    const startYear = parseInt(match[1], 10);
    const endYearStr = match[2];
    let endYear = currentYear;

    if (endYearStr) {
      endYear = parseInt(endYearStr, 10);
    }

    if (startYear >= 1995 && startYear <= currentYear) {
      yearMatchesFound++;
      if (startYear < minYear) minYear = startYear;
      if (endYear > maxYear && endYear <= currentYear + 1) maxYear = endYear;
    }
  }

  // Explicit mention check: e.g. "3+ years of experience"
  const explicitExpMatch = text.match(/(\d+)\+?\s*years?(?:\s*of)?\s*(?:professional\s*)?experience/i);
  let estimatedYears = 0;

  if (explicitExpMatch) {
    estimatedYears = parseInt(explicitExpMatch[1], 10);
  } else if (yearMatchesFound >= 2 && minYear < currentYear) {
    estimatedYears = Math.min(Math.max(currentYear - minYear, 0), 30);
  } else if (yearMatchesFound === 1) {
    estimatedYears = Math.min(Math.max(currentYear - minYear, 0), 10);
  }

  return {
    name,
    email,
    phone,
    linkedin,
    github,
    detectedSections,
    missingSections,
    estimatedYearsOfExperience: estimatedYears,
    detectedDegree,
    metricsCount,
    metricsMatches: metricsMatches.slice(0, 8),
    actionVerbsCount,
    actionVerbsFound: actionVerbsFound.slice(0, 15),
    wordCount: words.length
  };
}
