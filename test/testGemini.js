import { generateGeminiInsights, GEMINI_API_KEY } from '../src/utils/geminiAi.js';
import { SAMPLE_RESUMES, SAMPLE_JOB_DESCRIPTIONS } from '../src/data/sampleData.js';
import { calculateAtsMatch } from '../src/utils/atsMatcher.js';

async function main() {
  console.log('Testing Gemini API call with key...');
  const resume = SAMPLE_RESUMES[0].text;
  const jd = SAMPLE_JOB_DESCRIPTIONS[0].text;
  const match = calculateAtsMatch(resume, jd);

  const start = Date.now();
  try {
    const result = await generateGeminiInsights(GEMINI_API_KEY, resume, jd, match);
    console.log('SUCCESS in', Date.now() - start, 'ms');
    console.log('Model Used:', result.modelUsed);
    console.log('Executive Critique:', result.executiveCritique?.slice(0, 100));
    console.log('Optimized Bullets:', result.optimizedBulletPoints?.length);
    console.log('Interview Questions:', result.predictedInterviewQuestions?.length);
  } catch (err) {
    console.error('FAILED:', err);
  }
}

main();
