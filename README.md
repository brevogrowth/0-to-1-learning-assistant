# 0to1: The Learning Assistant

This is an AI-powered learning platform that generates structured courses from scratch on any topic.

## Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up your environment variables:**
    *   Create a `.env.local` file in the root of the project.
    *   Copy the contents of `.env.local.example` into `.env.local`.
    *   Fill in the required environment variables:
        *   `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
        *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase project anon key.
        *   `GEMINI_API_KEY`: Your Gemini API key.

3.  **Set up your Supabase database:**
    *   Go to the Supabase SQL editor in your project.
    *   Copy the contents of `supabase/schema.sql` and run the query to create the necessary tables and policies.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.