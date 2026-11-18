import { SKILLS_TAXONOMY, ALL_SKILLS, EDUCATION_KEYWORDS, ACTION_VERBS } from '../data/skillsDatabase.js';
import { parseResumeDetails } from './textParser.js';

/**
 * Normalizes text and tokenizes into words and n-grams
 */
function cleanText(text) {
  return (text || '').toLowerCase().replace(/[^a-z0-9+#.\s]/g, ' ');
}

/**
 * Checks if a specific skill is present in the text with safe boundaries
 */
function matchSkillInText(skill, text) {
  const s = skill.toLowerCase();
  
  // Special boundary handling for single/double char tech like C, R, Go, C++, C#
  if (s === 'c') {
    return /\bc\b/i.test(text) && !/\bc\+\+|\bc#/i.test(text);
  }
  if (s === 'r') {
    return /\b[rR]\s+(?:programming|scripting|studio|language)\b|\b(?:using|with)\s+[rR]\b/.test(text);
  }
  if (s === 'go' || s === 'golang') {
    return /\bgolang\b/i.test(text) || /\bgo\s+(?:language|lang|developer|backend)\b/i.test(text);
  }
  if (s === 'c++') {
    return /c\+\+/i.test(text);
  }
  if (s === 'c#') {
    return /c#/i.test(text);
  }
  if (s === '.net' || s === '.net core') {
    return /\.net\b/i.test(text);
  }

  // General regex escaped match
  const escaped = s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(^|[^a-zA-Z0-9])${escaped}([^a-zA-Z0-9]|$)`, 'i');
  return regex.test(text);
}

/**
 * Extracts skills from text based on taxonomy
 */
export function extractSkills(text) {
  const foundSkills = [];
  const categorized = {};

  Object.entries(SKILLS_TAXONOMY).forEach(([category, skills]) => {
    categorized[category] = [];
    skills.forEach((skill) => {
      if (matchSkillInText(skill, text)) {
        if (!foundSkills.includes(skill)) {
          foundSkills.push(skill);
          categorized[category].push(skill);
        }
      }
    });
  });

  return {
    all: foundSkills,
    categorized
  };
}

/**
 * Extracts requirements and details from Job Description
 */
export function parseJobDescription(jdText) {
  const text = (jdText || '').trim();
  const lower = text.toLowerCase();

  // 1. Extract required experience
  let requiredYears = 0;
  const expMatch = text.match(/(\d+)\+?\s*(?:to\s*\d+\s*)?years?(?:\s*of)?\s*(?:relevant|professional|hands-on|industry)?\s*experience/i);
  if (expMatch) {
    requiredYears = parseInt(expMatch[1], 10);
  }

  // 2. Extract required degree
  let requiredDegree = 'Any / Not specified';
  for (const edu of EDUCATION_KEYWORDS) {
    if (edu.terms.some((term) => new RegExp(`\\b${term.replace('.', '\\.')}\\b`, 'i').test(lower))) {
      requiredDegree = edu.level;
      break;
    }
  }

  // 3. Extract skills mentioned in JD
  const jdSkills = extractSkills(text);

  // 4. Split JD into Required vs Bonus sections if present
  const requiredSectionMatch = text.match(/(?:requirements|qualifications|must\s+have|what\s+you(?:'ll|\s+will)\s+need)([\s\S]*?)(?:nice\s+to\s+have|bonus|plus|preferred|about\s+us|benefits|$)/i);
  const bonusSectionMatch = text.match(/(?:nice\s+to\s+have|bonus|plus|preferred|desirable)([\s\S]*?)(?:benefits|about\s+us|what\s+we\s+offer|$)/i);

  const mustHaveSkills = [];
  const niceToHaveSkills = [];

  const reqText = requiredSectionMatch ? requiredSectionMatch[1] : text;
  const bonusText = bonusSectionMatch ? bonusSectionMatch[1] : '';

  jdSkills.all.forEach((skill) => {
    if (bonusText && matchSkillInText(skill, bonusText) && !matchSkillInText(skill, reqText)) {
      niceToHaveSkills.push(skill);
    } else {
      mustHaveSkills.push(skill);
    }
  });

  return {
    requiredYears,
    requiredDegree,
    skills: jdSkills.all,
    mustHaveSkills: mustHaveSkills.length > 0 ? mustHaveSkills : jdSkills.all,
    niceToHaveSkills,
    categorizedSkills: jdSkills.categorized,
    wordCount: text.split(/\s+/).filter(Boolean).length
  };
}

/**
 * Computes Cosine Similarity based on TF-IDF vectors
 */
function computeCosineSimilarity(doc1, doc2) {
  const stopWords = new Set([
    'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren',
    'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
    'can', 'couldn', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from',
    'further', 'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself',
    'his', 'how', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just', 'me', 'more', 'most',
    'my', 'myself', 'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'our',
    'ours', 'ourselves', 'out', 'over', 'own', 'same', 'she', 'should', 'so', 'some', 'such', 'than',
    'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this',
    'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when',
    'where', 'which', 'while', 'who', 'whom', 'why', 'with', 'would', 'you', 'your', 'yours'
  ]);

  const tokenize = (str) =>
    (str || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !stopWords.has(w));

  const words1 = tokenize(doc1);
  const words2 = tokenize(doc2);

  if (words1.length === 0 || words2.length === 0) return 0;

  const freq1 = {};
  const freq2 = {};
  const allVocab = new Set();

  words1.forEach((w) => {
    freq1[w] = (freq1[w] || 0) + 1;
    allVocab.add(w);
  });
  words2.forEach((w) => {
    freq2[w] = (freq2[w] || 0) + 1;
    allVocab.add(w);
  });

  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;

  allVocab.forEach((term) => {
    const tf1 = freq1[term] || 0;
    const tf2 = freq2[term] || 0;
    dotProduct += tf1 * tf2;
    norm1 += tf1 * tf1;
    norm2 += tf2 * tf2;
  });

  if (norm1 === 0 || norm2 === 0) return 0;
  return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
}

/**
 * Main ATS Score Calculation and Analysis Engine
 */
export function calculateAtsMatch(resumeText, jdText) {
  if (!resumeText || !jdText) {
    throw new Error('Both resume text and job description are required for ATS analysis.');
  }

  // 1. Parse both documents
  const resumeDetails = parseResumeDetails(resumeText);
  const jdDetails = parseJobDescription(jdText);
  const resumeSkills = extractSkills(resumeText);

  // 2. Keyword & Skills Matching
  const jdSkillSet = new Set(jdDetails.skills.map((s) => s.toLowerCase()));
  const resumeSkillSet = new Set(resumeSkills.all.map((s) => s.toLowerCase()));

  const matchedKeywords = [];
  const missingKeywords = [];

  jdDetails.skills.forEach((skill) => {
    if (resumeSkillSet.has(skill.toLowerCase())) {
      matchedKeywords.push(skill);
    } else {
      missingKeywords.push(skill);
    }
  });

  // Calculate Partial / Related Skills
  const relatedMatches = [];
  const relatedSkillPairs = [
    { target: 'postgresql', alternatives: ['mysql', 'sql', 'sqlite', 'mongodb'] },
    { target: 'react', alternatives: ['next.js', 'vue', 'angular', 'svelte'] },
    { target: 'aws', alternatives: ['azure', 'gcp', 'google cloud', 'docker'] },
    { target: 'docker', alternatives: ['kubernetes', 'containerization'] },
    { target: 'express', alternatives: ['node.js', 'nest.js', 'fastapi', 'flask'] },
    { target: 'jest', alternatives: ['vitest', 'cypress', 'mocha', 'unit testing'] },
    { target: 'typescript', alternatives: ['javascript'] },
    { target: 'tableau', alternatives: ['power bi', 'looker', 'metabase'] }
  ];

  missingKeywords.forEach((missingSkill) => {
    const mLower = missingSkill.toLowerCase();
    const pair = relatedSkillPairs.find((p) => p.target === mLower);
    if (pair) {
      const foundAlt = pair.alternatives.find((alt) => resumeSkillSet.has(alt));
      if (foundAlt) {
        relatedMatches.push({
          required: missingSkill,
          detectedAlternative: foundAlt
        });
      }
    }
  });

  // 3. Category-wise Scoring Breakdown (Total: 100 points)

  // a) Skills Match (40 points)
  let skillsScore = 0;
  if (jdDetails.skills.length > 0) {
    const matchRatio = matchedKeywords.length / jdDetails.skills.length;
    skillsScore = Math.round(matchRatio * 40);
  } else {
    // If JD has few explicit tech keywords, default to 30 based on general tech presence
    skillsScore = Math.min(resumeSkills.all.length * 2, 40);
  }

  // b) Experience Match (20 points)
  let experienceScore = 0;
  const reqExp = jdDetails.requiredYears;
  const candExp = resumeDetails.estimatedYearsOfExperience;

  if (reqExp === 0) {
    experienceScore = 20; // No strict requirement specified
  } else if (candExp >= reqExp) {
    experienceScore = 20; // Meets or exceeds
  } else if (candExp === reqExp - 1) {
    experienceScore = 15; // Close match
  } else if (candExp > 0) {
    experienceScore = Math.round((candExp / reqExp) * 15);
  } else {
    experienceScore = 5; // Entry / not specified
  }

  // Add bonus for quantified metrics in experience
  if (resumeDetails.metricsCount >= 3) {
    experienceScore = Math.min(20, experienceScore + 2);
  }

  // c) Education Match (10 points)
  let educationScore = 10;
  const eduWeights = { Doctorate: 5, Master: 4, Bachelor: 3, Associate: 2, 'High School': 1, 'Not specified': 1 };
  const reqDegreeWeight = eduWeights[jdDetails.requiredDegree] || 3;
  const candDegreeWeight = eduWeights[resumeDetails.detectedDegree] || 2;

  if (jdDetails.requiredDegree === 'Any / Not specified') {
    educationScore = 10;
  } else if (candDegreeWeight >= reqDegreeWeight) {
    educationScore = 10;
  } else if (candDegreeWeight === reqDegreeWeight - 1) {
    educationScore = 7;
  } else {
    educationScore = 5;
  }

  // d) Resume Completeness & ATS Formatting (15 points)
  let formattingScore = 0;
  if (resumeDetails.email) formattingScore += 3;
  if (resumeDetails.phone) formattingScore += 2;
  if (resumeDetails.linkedin || resumeDetails.github) formattingScore += 2;

  // Standard section completeness (5 points)
  const sectionsCount = resumeDetails.detectedSections.length;
  if (sectionsCount >= 5) formattingScore += 5;
  else if (sectionsCount >= 3) formattingScore += 3;
  else formattingScore += 1;

  // Action verbs usage (3 points)
  if (resumeDetails.actionVerbsCount >= 6) formattingScore += 3;
  else if (resumeDetails.actionVerbsCount >= 3) formattingScore += 2;
  else formattingScore += 1;

  // e) Text Relevance & Semantic Similarity (15 points)
  const similarity = computeCosineSimilarity(resumeText, jdText);
  const relevanceScore = Math.min(15, Math.round(similarity * 25));

  // Overall Score Calculation (Clamped 0 - 100)
  const overallScore = Math.min(100, Math.max(0, skillsScore + experienceScore + educationScore + formattingScore + relevanceScore));

  // Rating Badge & Classification
  let matchCategory = 'Poor Match';
  let matchBadgeColor = 'red';
  if (overallScore >= 80) {
    matchCategory = 'Strong Match';
    matchBadgeColor = 'emerald';
  } else if (overallScore >= 60) {
    matchCategory = 'Moderate Match';
    matchBadgeColor = 'blue';
  } else if (overallScore >= 40) {
    matchCategory = 'Low Match';
    matchBadgeColor = 'amber';
  }

  // 4. Strengths & Weaknesses Identification
  const strengths = [];
  const weaknesses = [];

  if (matchedKeywords.length >= 6) {
    strengths.push(`High technical overlap: ${matchedKeywords.length} core keywords matched directly from the job description.`);
  } else if (matchedKeywords.length >= 3) {
    strengths.push(`Foundational skills present: matches essential competencies including ${matchedKeywords.slice(0, 3).join(', ')}.`);
  }

  if (resumeDetails.metricsCount >= 3) {
    strengths.push(`Impact-driven bullet points: detected ${resumeDetails.metricsCount} quantifiable achievements and performance metrics.`);
  }

  if (resumeDetails.actionVerbsCount >= 5) {
    strengths.push(`Active language: uses strong engineering action verbs (${resumeDetails.actionVerbsFound.slice(0, 4).join(', ')}).`);
  }

  if (candExp >= reqExp && reqExp > 0) {
    strengths.push(`Experience criteria satisfied: estimated ~${candExp} years aligns with the requested ${reqExp}+ years.`);
  }

  if (missingKeywords.length > 0) {
    weaknesses.push(`Missing ${missingKeywords.length} key technical terms specified in the job posting (e.g., ${missingKeywords.slice(0, 4).join(', ')}).`);
  }

  if (resumeDetails.metricsCount < 2) {
    weaknesses.push('Few quantifiable metrics: accomplishments lack numeric indicators (e.g., %, $, throughput, speedups).');
  }

  if (resumeDetails.missingSections.length > 0) {
    weaknesses.push(`Missing standard ATS section headers: ${resumeDetails.missingSections.join(', ')}.`);
  }

  if (!resumeDetails.linkedin && !resumeDetails.github) {
    weaknesses.push('No professional profile links (LinkedIn or GitHub) detected in contact information.');
  }

  if (candExp < reqExp && reqExp > 0) {
    weaknesses.push(`Experience gap: job requests ${reqExp}+ years, while resume indicates ~${candExp} years.`);
  }

  // 5. Actionable Improvement Recommendations
  const recommendations = [];

  if (missingKeywords.length > 0) {
    recommendations.push({
      type: 'critical',
      title: 'Integrate Essential Missing Keywords',
      description: `Incorporate high-priority missing keywords like ${missingKeywords.slice(0, 5).join(', ')} into your project descriptions and experience bullets where you have working knowledge.`
    });
  }

  if (resumeDetails.metricsCount < 3) {
    recommendations.push({
      type: 'medium',
      title: 'Quantify Engineering Impact',
      description: 'Upgrade your experience bullets using the Google XYZ formula: "Accomplished [X], as measured by [Y], by doing [Z]". Example: "Reduced query latency by 35% using Redis caching".'
    });
  }

  if (relatedMatches.length > 0) {
    const pair = relatedMatches[0];
    recommendations.push({
      type: 'low',
      title: 'Bridge Related Technologies',
      description: `You listed "${pair.detectedAlternative}", but the role explicitly requests "${pair.required}". Consider referencing both (e.g., "${pair.required} / ${pair.detectedAlternative}") to satisfy keyword scanners.`
    });
  }

  if (resumeDetails.missingSections.length > 0) {
    recommendations.push({
      type: 'format',
      title: 'Standardize Resume Section Headers',
      description: `ATS parsers look for standard naming conventions. Add explicit headers for: ${resumeDetails.missingSections.join(', ')}.`
    });
  }

  if (!resumeDetails.linkedin || !resumeDetails.github) {
    recommendations.push({
      type: 'format',
      title: 'Add Verifiable Tech Links',
      description: 'Add direct clickable links to your LinkedIn profile and GitHub portfolio at the top of your resume header.'
    });
  }

  return {
    overallScore,
    matchCategory,
    matchBadgeColor,
    scoreBreakdown: {
      skills: { score: skillsScore, max: 40, weight: '40%' },
      experience: { score: experienceScore, max: 20, weight: '20%' },
      education: { score: educationScore, max: 10, weight: '10%' },
      formatting: { score: formattingScore, max: 15, weight: '15%' },
      relevance: { score: relevanceScore, max: 15, weight: '15%' }
    },
    keywords: {
      matched: matchedKeywords,
      missing: missingKeywords,
      relatedMatches,
      totalJdKeywords: jdDetails.skills.length,
      matchPercentage: jdDetails.skills.length > 0 ? Math.round((matchedKeywords.length / jdDetails.skills.length) * 100) : 0
    },
    candidateProfile: {
      name: resumeDetails.name,
      email: resumeDetails.email,
      phone: resumeDetails.phone,
      linkedin: resumeDetails.linkedin,
      github: resumeDetails.github,
      yearsExperience: candExp,
      degree: resumeDetails.detectedDegree,
      detectedSections: resumeDetails.detectedSections,
      missingSections: resumeDetails.missingSections,
      actionVerbsCount: resumeDetails.actionVerbsCount,
      actionVerbs: resumeDetails.actionVerbsFound,
      metricsCount: resumeDetails.metricsCount,
      metricsExamples: resumeDetails.metricsMatches,
      wordCount: resumeDetails.wordCount
    },
    jobRequirements: {
      requiredYears: jdDetails.requiredYears,
      requiredDegree: jdDetails.requiredDegree,
      mustHaveSkills: jdDetails.mustHaveSkills,
      niceToHaveSkills: jdDetails.niceToHaveSkills,
      totalKeywordsCount: jdDetails.skills.length
    },
    strengths,
    weaknesses,
    recommendations
  };
}
