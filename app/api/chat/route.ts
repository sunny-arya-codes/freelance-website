import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dbConnect from '@/lib/db';
import Profile from '@/models/profile';
import Skill from '@/models/skill';
import Experience from '@/models/experience';
import Project from '@/models/project';
import Education from '@/models/education';
import Training from '@/models/training';
import Achievement from '@/models/achievement';
import Additional from '@/models/additional';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const MAX_RETRIES = 2;
const INITIAL_DELAY_MS = 1000;

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10; // Max 10 requests per minute
const REQUEST_COOLDOWN_MS = 3000; // 3 seconds between requests

// In-memory cache for responses (simple implementation)
const responseCache = new Map<string, { response: string; timestamp: number }>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

// Track requests per IP
const requestTracker = new Map<string, number[]>();
let lastRequestTime = 0;

function getClientIP(req: NextRequest): string {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') ||
    'unknown';
  console.log(`[DEBUG] Client IP identified: ${ip}`);
  return ip;
}

function isRateLimited(ip: string): { limited: boolean; retryAfter?: number } {
  const now = Date.now();
  const requests = requestTracker.get(ip) || [];

  // Remove old requests outside the window
  const recentRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW_MS);

  if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldestRequest = Math.min(...recentRequests);
    const retryAfter = Math.ceil((oldestRequest + RATE_LIMIT_WINDOW_MS - now) / 1000);
    console.log(`[DEBUG] IP ${ip} rate limited: Too many requests. Retry after ${retryAfter}s.`);
    return { limited: true, retryAfter };
  }

  // Check cooldown between requests
  if (now - lastRequestTime < REQUEST_COOLDOWN_MS) {
    const retryAfter = Math.ceil((lastRequestTime + REQUEST_COOLDOWN_MS - now) / 1000);
    console.log(`[DEBUG] IP ${ip} rate limited: Cooldown period. Retry after ${retryAfter}s.`);
    return { limited: true, retryAfter };
  }

  // Update tracker
  recentRequests.push(now);
  requestTracker.set(ip, recentRequests);
  lastRequestTime = now;
  console.log(`[DEBUG] IP ${ip} not rate limited. Current requests in window: ${recentRequests.length}`);
  return { limited: false };
}

function getCachedResponse(message: string): string | null {
  const cached = responseCache.get(message.toLowerCase().trim());
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    console.log(`[DEBUG] Cache hit for message: "${message.substring(0, 50)}..."`);
    return cached.response;
  }
  if (cached) {
    responseCache.delete(message.toLowerCase().trim());
    console.log(`[DEBUG] Cache expired for message: "${message.substring(0, 50)}..."`);
  } else {
    console.log(`[DEBUG] Cache miss for message: "${message.substring(0, 50)}..."`);
  }
  return null;
}

function cacheResponse(message: string, response: string) {
  // Limit cache size to 100 entries
  if (responseCache.size >= 100) {
    const firstKey = responseCache.keys().next().value;
    if (firstKey) {
      responseCache.delete(firstKey);
      console.log(`[DEBUG] Cache full, removed oldest entry: "${firstKey.substring(0, 50)}..."`);
    }
  }
  responseCache.set(message.toLowerCase().trim(), {
    response,
    timestamp: Date.now()
  });
  console.log(`[DEBUG] Response cached for message: "${message.substring(0, 50)}..."`);
}

async function delay(ms: number) {
  console.log(`[DEBUG] Delaying for ${ms}ms...`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getPortfolioData() {
  console.log('[DEBUG] Connecting to DB and fetching portfolio data...');
  await dbConnect();
  const [
    profile,
    skills,
    experiences,
    projects,
    education,
    trainings,
    achievements,
    additional
  ] = await Promise.all([
    Profile.findOne({}),
    Skill.find({}),
    Experience.find({}).sort({ order: 1 }),
    Project.find({}).sort({ order: 1 }),
    Education.find({}).sort({ order: 1 }),
    Training.find({}).sort({ order: 1 }),
    Achievement.find({}).sort({ order: 1 }),
    Additional.findOne({}),
  ]);

  const data = {
    profile,
    skills,
    experiences,
    projects,
    education,
    trainings,
    achievements,
    additional,
  };
  console.log('[DEBUG] Portfolio data fetched successfully.');
  return JSON.stringify(data);
}

async function generateContentWithRetry(model: any, prompt: string, retries = MAX_RETRIES) {
  let lastError;
  console.log(`[DEBUG] Attempting to generate content with prompt (first 100 chars): "${prompt.substring(0, 100)}..."`);

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      console.log(`[DEBUG] AI generation attempt ${attempt + 1}/${retries}...`);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(`[DEBUG] AI generation successful on attempt ${attempt + 1}. Response (first 100 chars): "${text.substring(0, 100)}..."`);
      return text;
    } catch (error: any) {
      lastError = error;
      console.error(`[DEBUG] AI generation attempt ${attempt + 1} failed:`, error);

      // Check for quota exceeded error
      if (error.message?.includes('quota') || error.message?.includes('Quota exceeded')) {
        console.error('[DEBUG] QUOTA_EXCEEDED error detected.');
        throw new Error('QUOTA_EXCEEDED');
      }

      // If it's a 503 error and we have retries left
      if (error.status === 503 && attempt < retries - 1) {
        const delayMs = INITIAL_DELAY_MS * Math.pow(2, attempt); // Exponential backoff
        console.log(`[DEBUG] Attempt ${attempt + 1} failed with 503. Retrying in ${delayMs}ms...`);
        await delay(delayMs);
      } else if (attempt < retries - 1) {
        // Retry for other errors too
        console.log(`[DEBUG] Attempt ${attempt + 1} failed. Retrying in ${INITIAL_DELAY_MS}ms for other error...`);
        await delay(INITIAL_DELAY_MS);
      } else {
        console.error(`[DEBUG] All ${retries} AI generation attempts failed. Re-throwing error.`);
        throw error; // Re-throw if not a 503 or no retries left
      }
    }
  }
  throw lastError; // If we've exhausted all retries
}

export async function POST(req: NextRequest) {
  let message = '';

  try {
    const body = await req.json();
    message = body.message;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Get client IP for rate limiting
    const clientIP = getClientIP(req);

    // Check rate limit
    const rateLimitCheck = isRateLimited(clientIP);
    if (rateLimitCheck.limited) {
      return NextResponse.json(
        {
          error: `Please wait ${rateLimitCheck.retryAfter} seconds before sending another message.`,
          retryAfter: rateLimitCheck.retryAfter
        },
        { status: 429 }
      );
    }

    // Check cache first
    const cachedResponse = getCachedResponse(message);
    if (cachedResponse) {
      return NextResponse.json({ reply: cachedResponse, cached: true });
    }

    const portfolioData = await getPortfolioData();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `Answer the user's question using ONLY the information provided in Sunni Kumar's portfolio data.

    If the user asks about something not included in the portfolio data, respond by gently guiding them back to topics about Sunni (e.g., "I might not have info on that, but I can tell you more about Sunni if you'd like!").

    Do NOT fabricate information about Sunni; ensure your response is always aligned with the portfolio data.

    Portfolio data:
    ${portfolioData}

    User question: "${message}"

    Your answer:`;

    const text = await generateContentWithRetry(model, prompt);

    // Cache the response
    cacheResponse(message, text);

    return NextResponse.json({ reply: text });

  } catch (error: any) {
    console.error('Error in chat API:', error);

    // Handle quota exceeded or rate limits by returning a FALLBACK response
    // This ensures the user always gets an answer, even if the API is down
    if (
      error.message === 'QUOTA_EXCEEDED' ||
      error.message?.includes('quota') ||
      error.status === 429 ||
      error.status === 503
    ) {
      console.log('Quota/Rate limit hit - serving fallback response');

      // Import fallback responses dynamically
      const { getFallbackResponse } = await import('@/lib/fallback-responses');
      const fallbackReply = getFallbackResponse(message);

      return NextResponse.json({
        reply: `${fallbackReply}\n\n---\n\n*⚡ Quick Response Mode: AI service is currently busy, serving offline data.*`,
        fallback: true
      });
    }

    return NextResponse.json(
      { error: 'An error occurred while processing your request. Please try again later.' },
      { status: error.status || 500 }
    );
  }
}