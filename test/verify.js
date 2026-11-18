import { calculateAtsMatch, parseJobDescription, extractSkills } from '../src/utils/atsMatcher.js';
import { parseResumeDetails } from '../src/utils/textParser.js';
import { SAMPLE_RESUMES, SAMPLE_JOB_DESCRIPTIONS } from '../src/data/sampleData.js';

console.log('====================================================');
console.log('🧪 TEST SUITE: AI Resume Analyzer and ATS Score Matcher Using Job Description');
console.log('====================================================\n');

// Test 1: Alex Rivera (Full Stack) vs Senior Full Stack JD
console.log('Test 1: Alex Rivera vs Senior Full Stack JD');
const alexResume = SAMPLE_RESUMES[0].text;
const fullstackJd = SAMPLE_JOB_DESCRIPTIONS[0].text;

const result1 = calculateAtsMatch(alexResume, fullstackJd);
console.log(`  -> Overall ATS Score: ${result1.overallScore}/100`);
console.log(`  -> Match Category: ${result1.matchCategory}`);
console.log(`  -> Matched Keywords count: ${result1.keywords.matched.length}`);
console.log(`  -> Matched Keywords: ${result1.keywords.matched.slice(0, 8).join(', ')}...`);
console.log(`  -> Missing Keywords count: ${result1.keywords.missing.length}`);
console.log(`  -> Detected Candidate: ${result1.candidateProfile.name}`);
console.log(`  -> Detected Experience: ~${result1.candidateProfile.yearsExperience} years`);
console.log(`  -> Detected Degree: ${result1.candidateProfile.degree}`);
console.log(`  -> Metrics Count: ${result1.candidateProfile.metricsCount}`);

if (result1.overallScore >= 80) {
  console.log('  ✅ PASS: High compatibility correctly determined for matched candidate.\n');
} else {
  console.error('  ❌ FAIL: Expected score >= 80, got', result1.overallScore);
  process.exit(1);
}

// Test 2: Priya Sharma (Frontend) vs Senior Full Stack JD
console.log('Test 2: Priya Sharma (Frontend) vs Senior Full Stack JD');
const priyaResume = SAMPLE_RESUMES[1].text;
const result2 = calculateAtsMatch(priyaResume, fullstackJd);
console.log(`  -> Overall ATS Score: ${result2.overallScore}/100`);
console.log(`  -> Match Category: ${result2.matchCategory}`);
console.log(`  -> Matched Keywords: ${result2.keywords.matched.join(', ')}`);
console.log(`  -> Missing Keywords: ${result2.keywords.missing.join(', ')}`);

if (result2.overallScore < result1.overallScore && result2.keywords.missing.length > 0) {
  console.log('  ✅ PASS: Differentiated scoring correctly flags missing backend/cloud skills.\n');
} else {
  console.error('  ❌ FAIL: Frontend dev should score lower than Full Stack dev for Full Stack role');
  process.exit(1);
}

// Test 3: Jordan Lee (Data Analyst) vs Senior Full Stack JD (Mismatched domains)
console.log('Test 3: Jordan Lee (Data Analyst) vs Senior Full Stack JD');
const jordanResume = SAMPLE_RESUMES[2].text;
const result3 = calculateAtsMatch(jordanResume, fullstackJd);
console.log(`  -> Overall ATS Score: ${result3.overallScore}/100`);
console.log(`  -> Match Category: ${result3.matchCategory}`);
console.log(`  -> Matched Keywords: ${result3.keywords.matched.join(', ')}`);
console.log(`  -> Missing Keywords: ${result3.keywords.missing.length}`);

if (result3.overallScore <= 55 && result3.matchCategory === 'Low Match') {
  console.log('  ✅ PASS: Domain mismatch correctly identified with low compatibility.\n');
} else {
  console.error('  ❌ FAIL: Expected Low Match (<= 55), got', result3.overallScore);
  process.exit(1);
}

// Test 4: Jordan Lee (Data Analyst) vs Data Analyst JD (Target Domain match)
console.log('Test 4: Jordan Lee (Data Analyst) vs Data Analyst JD');
const dataJd = SAMPLE_JOB_DESCRIPTIONS[2].text;
const result4 = calculateAtsMatch(jordanResume, dataJd);
console.log(`  -> Overall ATS Score: ${result4.overallScore}/100`);
console.log(`  -> Match Category: ${result4.matchCategory}`);
console.log(`  -> Matched Keywords: ${result4.keywords.matched.join(', ')}`);

if (result4.overallScore >= 75) {
  console.log('  ✅ PASS: Domain-matched role scores highly as expected.\n');
} else {
  console.error('  ❌ FAIL: Data Analyst should score >= 75 on Data Analyst JD, got', result4.overallScore);
  process.exit(1);
}

// Test 5: Contact info extraction checks
console.log('Test 5: Contact Info and Entity Parser');
const parsedAlex = parseResumeDetails(alexResume);
if (parsedAlex.email && parsedAlex.phone && parsedAlex.linkedin && parsedAlex.github) {
  console.log(`  -> Email: ${parsedAlex.email}`);
  console.log(`  -> Phone: ${parsedAlex.phone}`);
  console.log(`  -> LinkedIn: ${parsedAlex.linkedin}`);
  console.log(`  -> GitHub: ${parsedAlex.github}`);
  console.log('  ✅ PASS: Contact info cleanly extracted.\n');
} else {
  console.error('  ❌ FAIL: Expected all contact info fields to be parsed, got', parsedAlex);
  process.exit(1);
}

console.log('====================================================');
console.log('🎉 ALL 5 INTEGRATION TESTS PASSED PERFECTLY!');
console.log('====================================================');
