import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

// NOTE: We no longer need @google/generative-ai or the old stream helpers.
// import { supabase from '@/lib/supabaseClient'; // Commented out

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: google('models/gemini-1.5-pro-latest'),
    messages,
  });

  // --- Database Logic (For Future Use) ---
  // In the new AI SDK, side effects like saving to a database are handled
  // by consuming the stream result after returning the response.
  // We are leaving this commented out as requested.
  /*
  result.fullStream.then(async (completion) => {
    console.log(`Mocked Gemini completion. Content: "${completion}"`);
    // --- REAL SUPABASE CODE (COMMENTED OUT) ---
    // const { data: newCourse, error } = await supabase
    //   .from('courses')
    //   .insert([{ topic: completion }])
    //   .single();
    //
    // if (error) {
    //   console.error('Error saving course:', error);
    // }
  });
  */

  // Immediately return the streaming response to the client
  return result.toAIStreamResponse();
}
