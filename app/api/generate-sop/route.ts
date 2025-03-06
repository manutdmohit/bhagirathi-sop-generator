// app/api/generate-sop/route.js
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com', // Replace with the actual DeepSeek API endpoint
  apiKey: process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY,
});

export async function POST(request) {
  const { name, program, background, goals } = await request.json();

  try {
    const prompt = `Generate a Statement of Purpose for a student named ${name} applying for ${program}.
    Their background is: ${background}. Their goals are: ${goals}.`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      model: 'deepseek-chat',
      max_tokens: 500,
    });

    const sop = completion.choices[0].message.content;
    return NextResponse.json({ sop });
  } catch (error) {
    console.error('Error generating SOP:', error);
    return NextResponse.json(
      { error: 'Failed to generate SOP' },
      { status: 500 }
    );
  }
}
