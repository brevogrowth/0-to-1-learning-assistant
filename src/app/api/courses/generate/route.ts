import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, StreamingTextResponse } from 'ai';

// 1. Comment out the Supabase client import
// import { supabase } from '@/lib/supabaseClient';

export const runtime = 'edge';

// Initialize the Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { messages } = await req.json();

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });

  const streamingResponse = await model.generateContentStream({
    contents: messages.map((m: { role: string; content: string }) => ({
      role: m.role,
      parts: [{ text: m.content }],
    })),
  });

  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(streamingResponse, {
    // 2. Comment out the database logic within the onCompletion callback
    async onCompletion(completion) {
      console.log(`Mocked Gemini completion for course generation. Content: "${completion}"`);
      /*
      // --- REAL SUPABASE CODE (COMMENTED OUT) ---
      const { data: newCourse, error } = await supabase
        .from('courses')
        .insert([{ topic: completion }])
        .single();

      if (error) {
        console.error('Error saving course:', error);
      }
      */
    },
  });

  return new StreamingTextResponse(stream);
}