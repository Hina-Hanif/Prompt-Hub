import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ✅ must be set in .env.local
});

// Define the expected request body type
interface ScoreRequestBody {
  prompt: string;
  challenge?: string;
}

export async function POST(req: Request) {
  try {
    const body: ScoreRequestBody = await req.json();

    const { prompt, challenge } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is missing." },
        { status: 400 }
      );
    }

    // ✅ Call GPT to evaluate the prompt
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional AI prompt evaluator. Score the given prompt from 0–100, and give feedback, strengths, and improvements.",
        },
        {
          role: "user",
          content: `Challenge: ${challenge}\n\nPrompt: ${prompt}`,
        },
      ],
    });

    const aiResponse = completion.choices[0]?.message?.content || "";

    // Example mock result
    const result = {
      score: Math.floor(Math.random() * 21) + 80, // random 80–100
      feedback: aiResponse || "Looks good! Nicely structured prompt.",
      strengths: [
        "Good clarity and structure",
        "Effective use of context",
        "Detailed instructions",
      ],
      improvements: [
        "Consider adding output format",
        "Add role/persona clarity",
      ],
    };

    return NextResponse.json(result);
  } catch (error: unknown) {
    // Properly type the error
    const message =
      error instanceof Error ? error.message : String(error);
    console.error("Error in /api/score:", message);
    return NextResponse.json(
      { error: "Evaluation failed. " + message },
      { status: 500 }
    );
  }
}
