import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

// We no longer need the @google/generative-ai package directly

// import { supabase } from '@/lib/supabaseClient'; // Commented out

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    // Use the model from the new @ai-sdk/google package
    model: google('models/gemini-1.5-pro-latest'),
    messages,
    // The onCompletion callback still works here for your database logic
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

  // The result object has a helper to convert it to a Response
  return result.toAIStreamResponse();
}
