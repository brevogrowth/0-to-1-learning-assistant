import { GoogleGenerativeAI } from '@google/generative-ai';
import { StreamingTextResponse } from 'ai';
import { GoogleAIStream } from '@ai-sdk/google'; // Correct import for the stream helper

// import { supabase } from '@/lib/supabaseClient'; // Commented out

export const runtime = 'edge';

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

  // Use the GoogleAIStream helper which supports the onCompletion callback
  const stream = GoogleAIStream(streamingResponse, {
    async onCompletion(completion) {
      console.log(`Mocked Gemini completion. Content: "${completion}"`);
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