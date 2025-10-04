"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/utils/supabase";

// 🧠 Expanded Challenge List
const challenges = [
  {
    id: 1,
    title: "Clear Instructions",
    category: "Prompt Clarity",
    difficulty: "Beginner",
    description: "Create a prompt that gives clear and specific instructions to the AI.",
    objective:
      "Write a prompt that instructs an AI to generate a step-by-step guide for making a peanut butter and jelly sandwich. The prompt should be clear, specific, and leave no room for misinterpretation.",
    tips: [
      "Be specific about what the AI should do",
      "Include clear action verbs (e.g., 'list', 'describe', 'explain')",
      "Avoid ambiguity in instructions",
      "Define structure or format if needed",
    ],
    xp: 100,
  },
  {
    id: 2,
    title: "Context Setting",
    category: "Prompt Clarity",
    difficulty: "Beginner",
    description: "Help the AI by providing background and context for better responses.",
    objective:
      "Write a prompt that helps an AI provide customer support for a mobile banking app. Include enough context so it understands the tone, audience, and purpose.",
    tips: [
      "Describe the company, user, and problem briefly",
      "Specify tone (friendly, professional, etc.)",
      "Mention intended outcome",
      "Avoid irrelevant context",
    ],
    xp: 150,
  },
  {
    id: 3,
    title: "Persona Creation",
    category: "Role-based Prompts",
    difficulty: "Intermediate",
    description: "Instruct the AI to act as a specific character, professional, or expert.",
    objective:
      "Create a prompt that tells the AI to act as a professional fitness coach helping someone build a 4-week beginner workout plan.",
    tips: [
      "Clearly define persona (role, tone, expertise)",
      "Add context for the task or audience",
      "Set boundaries or tone expectations",
      "Ensure role stays consistent throughout",
    ],
    xp: 200,
  },
  {
    id: 4,
    title: "Creative Writing",
    category: "Creative Prompts",
    difficulty: "Intermediate",
    description: "Encourage the AI to produce imaginative and compelling writing.",
    objective:
      "Write a prompt that asks the AI to craft a short story about a future where dreams can be recorded and shared.",
    tips: [
      "Set a vivid scenario",
      "Encourage emotion or moral theme",
      "Define structure (intro, climax, ending)",
      "Limit word count or genre if needed",
    ],
    xp: 250,
  },
  {
    id: 5,
    title: "Data Extraction",
    category: "Structured Output",
    difficulty: "Intermediate",
    description: "Make the AI extract structured data from unstructured text.",
    objective:
      "Write a prompt that extracts names, dates, and locations from a historical text and outputs JSON.",
    tips: [
      "Define the data fields clearly",
      "Specify output format (JSON, CSV, etc.)",
      "Provide example input",
      "Ensure consistent formatting",
    ],
    xp: 250,
  },
  {
    id: 6,
    title: "Chain-of-Thought Reasoning",
    category: "Advanced Reasoning",
    difficulty: "Advanced",
    description: "Get the AI to reason step-by-step and justify its logic.",
    objective:
      "Write a prompt that helps the AI solve a logic puzzle with detailed reasoning steps.",
    tips: [
      "Ask for reasoning before the final answer",
      "Encourage structured explanation",
      "Test logical flow",
    ],
    xp: 300,
  },
  {
    id: 7,
    title: "Prompt Optimization",
    category: "Meta-Prompting",
    difficulty: "Expert",
    description: "Make the AI improve your prompt quality.",
    objective:
      "Write a prompt that asks the AI to review and optimize your prompt for clarity, context, and tone.",
    tips: [
      "Request structured critique",
      "Include scoring or evaluation system",
      "Ask for examples of improvements",
    ],
    xp: 400,
  },
  { 
    id: 8, 
    title: "Comparative Analysis", 
    category: "Advanced Reasoning",
  difficulty: "Advanced",
  description: "Instruct the AI to compare two or more concepts logically.", 
  objective: "Write a prompt that makes the AI compare the pros and cons of nuclear vs. renewable energy for a national policy decision.", 
  tips: [ "Define comparison criteria (cost, safety, environment)", "Ask for structured output (table, bullet points, etc.)", "Request balanced arguments", ], 
  xp: 300, 
}, 
  { id: 9,
  title: "Error Correction", category: "Instruction Refinement", difficulty: "Advanced", description: "Make the AI spot and fix issues in text or reasoning.", objective: "Create a prompt that instructs the AI to review a paragraph for grammar and clarity errors, then rewrite it professionally.", tips: [ "Specify what kind of errors to fix", "Ask for explanation of each change", "Set desired tone or audience level", ], xp: 280, }, 
    { id: 10, title: "Multi-Step Planning", category: "Complex Prompts", difficulty: "Expert", description: "Make the AI plan multi-step projects or decisions logically.", objective: "Write a prompt that asks the AI to plan a 5-day marketing campaign for a startup launching a new product.", tips: [ "Define clear stages or milestones", "Ask for timelines and responsibilities", "Request summaries or deliverables per step", ], xp: 350, }, { id: 11, title: "Fact Verification",
    category: "Critical Thinking", difficulty: "Expert", description: "Encourage the AI to check or verify facts before answering.", objective: "Write a prompt that instructs the AI to verify historical claims before summarizing them for a report.", tips: [ "Ask AI to cite or cross-check information", "Encourage self-evaluation ('Is this accurate?')", "Request confidence scores or disclaimers", ], xp: 350, }, { id: 12, title: "Prompt Optimization", category: "Meta-Prompting", difficulty: "Expert", description: "Make the AI help you improve your own prompts.", objective: "Write a prompt that asks the AI to evaluate your prompt and suggest improvements in clarity, context, and tone.", tips: [ "Ask for structured critique (strengths, issues, fixes)", "Include scoring system or criteria", "Use for iterative prompt improvement", ], xp: 400, },// 🧮 EXPERT { id: 10, title: "Multi-Step Planning",
];
interface Challenge {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  description: string;
  objective: string;
  tips: string[];
  xp: number;
}
interface Feedback {
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
}


export default function ChallengeDetail() {
  const { id } = useParams();
  const [challengeData, setChallengeData] = useState<Challenge | null>(null);
  const [prompt, setPrompt] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const found = challenges.find((c) => c.id === Number(id));
    setChallengeData(found || null);
  }, [id]);

  if (!challengeData) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading challenge...
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Step 1️⃣: Evaluate the prompt with your API
      const res = await fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          challenge: challengeData.title,
        }),
      });

      const data: Feedback = await res.json();
      setFeedback(data);

      // Step 2️⃣: Save completion + XP to Supabase
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        alert("⚠️ Please log in first to earn XP!");
        return;
      }

      const user = userData.user;

      // Insert into scores table
      const { error: insertError } = await supabase.from("scores").insert([
        {
          user_id: user.id,
          challenge: challengeData.title,
          score: data.score || challengeData.xp,
          xp: challengeData.xp,
        },
      ]);
      if (insertError) {
        console.error("❌ Error saving challenge:", insertError.message);
      }

      // Update XP in profiles using the function
      const { error: xpError } = await supabase.rpc("increment_xp", {
        userid: user.id,
        points: challengeData.xp,
      });
      // if (xpError) {
      //   console.error("❌ Error updating XP:", xpError.message);
      // }

      alert(`✅ You earned ${challengeData.xp} XP for completing "${challengeData.title}"!`);
    } catch (err) {
      console.error(err);
      setFeedback({
        score: 0,
        feedback: "❌ Error: Could not evaluate prompt. Please try again.",
        strengths: [],
        improvements: [],
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <header className="bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent"
          >
            Prompt Hub
          </Link>
          <nav className="flex space-x-6">
            <Link href="/challenges" className="hover:text-pink-400 transition">
              Challenges
            </Link>
            <Link href="/leaderboard" className="hover:text-purple-400 transition">
              Leaderboard
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow hover:shadow-pink-500/40 transition"
            >
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <Link
          href="/challenges"
          className="text-sm text-gray-400 hover:text-pink-400 flex items-center mb-6"
        >
          ← Back to Challenges
        </Link>

        {/* Challenge Details */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-10">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold">{challengeData.title}</h2>
            <span className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-black font-semibold">
              {challengeData.difficulty}
            </span>
          </div>

          <p className="text-gray-300 mb-2 text-sm uppercase tracking-wide">
            Category:{" "}
            <span className="text-pink-400 font-semibold">{challengeData.category}</span>
          </p>

          <p className="text-gray-300 mb-4">{challengeData.description}</p>

          <div className="bg-black/30 rounded-xl border border-white/10 p-5 mb-6">
            <h3 className="text-lg font-semibold text-pink-400 mb-2">Objective</h3>
            <p className="text-gray-300">{challengeData.objective}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Tips</h3>
            <ul className="list-disc pl-6 text-gray-300 space-y-1">
              {challengeData.tips.map((tip: string, i: number) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="text-sm text-gray-400">
            Earn <span className="font-semibold text-pink-400">{challengeData.xp} XP</span> for completion
          </div>
        </div>

        {/* Prompt Input */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">Write Your Prompt</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full h-40 p-3 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Write your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            ></textarea>

            <button
              type="submit"
              className="mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 font-semibold shadow hover:shadow-pink-500/40 transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting || prompt.trim().length < 10}
            >
              {isSubmitting ? "Evaluating..." : "Submit for Evaluation"}
            </button>
          </form>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="mt-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-pink-400">Feedback</h3>
              <span className="px-4 py-1 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-black font-semibold shadow">
                {feedback.score}/100
              </span>
            </div>

            <p className="text-gray-300 mb-6">{feedback.feedback}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium text-purple-400 mb-3">Strengths</h4>
                <ul className="list-disc pl-6 text-gray-300 space-y-1">
                  {feedback.strengths.map((s: string, i: number) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium text-pink-400 mb-3">Areas for Improvement</h4>
                <ul className="list-disc pl-6 text-gray-300 space-y-1">
                  {feedback.improvements.map((imp: string, i: number) => (
                    <li key={i}>{imp}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Link
                href="/challenges"
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 font-semibold shadow hover:shadow-pink-500/40 transition"
              >
                Try Another Challenge
              </Link>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-white/10 bg-black/30 backdrop-blur-xl mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-400 text-sm">
          © 2025 Prompt Engineering Hub
        </div>
      </footer>
    </div>
  );
}
