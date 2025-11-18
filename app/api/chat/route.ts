
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
const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 1000; // 1 second initial delay

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getPortfolioData() {
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

  return JSON.stringify({
    profile,
    skills,
    experiences,
    projects,
    education,
    trainings,
    achievements,
    additional,
  });
}

async function generateContentWithRetry(model: any, prompt: string, retries = MAX_RETRIES) {
  let lastError;
  
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      lastError = error;
      
      // If it's a 503 error and we have retries left
      if (error.status === 503 && attempt < retries - 1) {
        const delayMs = INITIAL_DELAY_MS * Math.pow(2, attempt); // Exponential backoff
        console.log(`Attempt ${attempt + 1} failed with 503. Retrying in ${delayMs}ms...`);
        await delay(delayMs);
      } else {
        throw error; // Re-throw if not a 503 or no retries left
      }
    }
  }
  
  throw lastError; // If we've exhausted all retries
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    const portfolioData = await getPortfolioData();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `You are a helpful AI assistant for Sunni Kumar's portfolio website. Your name is "Sunni's AI".
    You can only answer questions about Sunni Kumar based on the provided data. If a question is not about Sunni Kumar, or if the answer cannot be found in the provided data, you must respond with "Sorry, I can only answer questions about Sunni Kumar."

    Here is Sunni Kumar's portfolio data:
    ${portfolioData}

    User's question: "${message}"

    Your answer:`;

    const text = await generateContentWithRetry(model, prompt);
    return NextResponse.json({ reply: text });
    
  } catch (error: any) {
    console.error('Error in chat API:', error);
    
    if (error.status === 503) {
      return NextResponse.json(
        { error: 'The AI service is currently overloaded. Please try again in a moment.' },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: 'An error occurred while processing your request. Please try again later.' },
      { status: error.status || 500 }
    );
  }
}
