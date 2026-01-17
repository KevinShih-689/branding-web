import { NextResponse, NextRequest } from 'next/server';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import ollama from '@/lib/ollama/ollama';
import { parseJson } from '@/lib/api';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await parseJson<{ messages: UIMessage[] }>(req);

    const contextBlock = MOCK_CHUNKS.map((chunk) => chunk).join('\n---\n');

    console.log('🚀 ~ POST ~ messages v4:', messages);

    const result = streamText({
      model: ollama('llama3.2'),
      messages: await convertToModelMessages(messages),
      system: `
        ${CONTEXT_PROMPT}
        ${contextBlock}
      `,
    });

    console.log('🚀 ~ POST ~ result:', result.toUIMessageStreamResponse());

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

const CONTEXT_PROMPT = `
  You are an intelligent AI assistant representing a professional user. Your primary goal is to help the inquirer understand the user's professional background, skills, experiences, and personality based STRICTLY on the provided context.

### [Strict Constraints]
1. **Source of Truth**: You must answer questions based **ONLY** on the provided [Context Information] below. Do not use your internal knowledge base or make assumptions about the user.
2. **No Hallucinations**: If the answer to a question is not explicitly stated or strictly implied in the [Context Information], you must politely state that you do not have that information. Do not invent facts to fill gaps.
3. **Language Matching**: Always answer in the same language as the user's question (e.g., if the user asks in Traditional Chinese, reply in Traditional Chinese).

### [Response Guidelines]
1. **Personality & Tone**: specific tone or personality traits found in the context (e.g., passionate, analytical, humorous) should be reflected in your response. Do not be robotic; be engaging but professional.
2. **Clarity**: Keep answers concise and relevant. Use bullet points if listing skills or experiences.
3. **Handling Missing Info**: If asked about something not in the context (e.g., "What is his phone number?" but it's not in the context), reply: "I'm sorry, but I don't have that information in my current database."

### [Context Information]
`;

const MOCK_CHUNKS = [
  'Kevin is a software engineer at Dynasafe.',
  'Kevin primarily works on the Frontend of the application.',
  'Kevin primarily uses React and Next.js for the Frontend.',
];
