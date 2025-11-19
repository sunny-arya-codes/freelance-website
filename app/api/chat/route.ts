import { NextRequest } from 'next/server';
import OpenAI from 'openai';

import dbConnect from '@/lib/db';
import Profile from '@/models/profile';
import Skill from '@/models/skill';
import Experience from '@/models/experience';
import Project from '@/models/project';
import Education from '@/models/education';
import Training from '@/models/training';
import Achievement from '@/models/achievement';
import Additional from '@/models/additional';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const client = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1', 
});

async function getPortfolioDataSafe() {
  // Helper: remove heavy fields like base64 images, banners, etc.
  function stripHeavyFields(obj: any, depth = 0): any {
    if (obj == null) return obj;
    if (depth > 4) return obj; // too deep, skip further recursion

    if (Array.isArray(obj)) {
      return obj.map((item) => stripHeavyFields(item, depth + 1));
    }

    if (typeof obj !== 'object') return obj;

    const cleaned: any = {};
    for (const [key, value] of Object.entries(obj)) {
      const lowerKey = key.toLowerCase();

      if (
        /image|photo|avatar|banner|logo|icon|picture|thumbnail|base64|dataurl|file|buffer|screenshot/.test(
          lowerKey
        )
      ) {
        continue;
      }

      if (typeof value === 'string') {  
        if (value.length > 3000) continue;
        cleaned[key] = value;
      } else if (typeof value === 'object') {
        const nested = stripHeavyFields(value, depth + 1);
        if (
          nested != null &&
          (typeof nested !== 'object' || Object.keys(nested).length > 0)
        ) {
          cleaned[key] = nested;
        }
      } else {
        cleaned[key] = value;
      }
    }

    return cleaned;
  }

  try {
    await dbConnect();

    const [
      profile,
      skills,
      experiences,
      projects,
      education,
      trainings,
      achievements,
      additional,
    ] = await Promise.all([
      Profile.findOne({}).lean().exec(),
      Skill.find({}).lean().exec(),
      Experience.find({}).sort({ order: 1 }).lean().exec(),
      Project.find({}).sort({ order: 1 }).lean().exec(),
      Education.find({}).sort({ order: 1 }).lean().exec(),
      Training.find({}).sort({ order: 1 }).lean().exec(),
      Achievement.find({}).sort({ order: 1 }).lean().exec(),
      Additional.findOne({}).lean().exec(),
    ]);

    // Raw combined data
    const rawData = {
      profile,
      skills,
      experiences,
      projects,
      education,
      trainings,
      achievements,
      additional,
    };

    // ⚡ Slim it down (remove images / huge fields)
    const slimData = stripHeavyFields(rawData);

    return JSON.stringify(slimData);
  } catch (err) {
    console.error('RAG portfolio load error:', err);
    return null; // fallback: RAG off, but chat works
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const userMessage = (body?.message || '').trim();

    if (!userMessage) {
      return new Response('`message` is required', { status: 400 });
    }

    if (!process.env.NVIDIA_API_KEY) {
      console.error('NVIDIA_API_KEY missing');
      return new Response('Server config error', { status: 500 });
    }

    const encoder = new TextEncoder();

    // ⬇️ RAG context fetch (but SAFE)
    const portfolioJson = await getPortfolioDataSafe();

    const systemPrompt = portfolioJson
      ? `You are an AI assistant for Sunny (Sunni Kumar) on his portfolio website.

You have access to the following portfolio data in JSON format. 
Use ONLY this data when answering questions specifically about Sunny: his skills, projects, experience, education, achievements, etc.

If the user asks something about Sunny and the information is NOT present in this JSON, clearly say you don't know instead of guessing.

You can also answer general tech / programming / AI questions normally.

PORTFOLIO_DATA_JSON:
${portfolioJson}`
      : `You are an AI assistant for Sunny (Sunni Kumar) on his portfolio website.

Right now, portfolio data could not be loaded, so:
- For questions about Sunny's profile / projects / experience, answer politely that the data is temporarily unavailable.
- For general tech / programming / AI questions, answer normally, clearly and helpfully.`;
console.log(systemPrompt);
console.log(userMessage);
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const completion = await client.chat.completions.create({
            model: 'openai/gpt-oss-120b', // same as script.js
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userMessage },
            ],
            temperature: 0.6,
            top_p: 1,
            max_tokens: 2048,
            stream: true,
          });

          for await (const chunk of completion) {
            const delta = chunk.choices[0]?.delta;
            const content = delta?.content ?? '';

            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
        } catch (err) {
          console.error('Chat stream error:', err);
          controller.enqueue(
            encoder.encode(
              '\n\n**Error:** Kuch issue aa gaya AI se baat karte waqt. Thodi der baad phir try karna. 🙏'
            )
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
      },
    });
  } catch (err) {
    console.error('Chat API top-level error:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
