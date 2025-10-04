// src/app/challenges/page.tsx
"use client";

import Link from "next/link";

// ✅ Full 12 Challenges (synced with [id]/page.tsx)
const challenges = [
  {
    id: 1,
    title: "Clear Instructions",
    difficulty: "Beginner",
    description: "Create a prompt that gives clear and specific instructions to the AI.",
    xp: 100,
    category: "Prompt Clarity",
    completions: 1243,
    avgScore: 82,
  },
  {
    id: 2,
    title: "Context Setting",
    difficulty: "Beginner",
    description: "Help the AI by providing background and context for better responses.",
    xp: 150,
    category: "Prompt Clarity",
    completions: 876,
    avgScore: 78,
  },
  {
    id: 3,
    title: "Persona Creation",
    difficulty: "Intermediate",
    description: "Instruct the AI to act as a specific character, professional, or expert.",
    xp: 200,
    category: "Role-based Prompts",
    completions: 542,
    avgScore: 71,
  },
  {
    id: 4,
    title: "Creative Writing",
    difficulty: "Intermediate",
    description: "Encourage the AI to produce imaginative and compelling writing.",
    xp: 250,
    category: "Creative Prompts",
    completions: 1087,
    avgScore: 85,
  },
  {
    id: 5,
    title: "Conversational Tone",
    difficulty: "Intermediate",
    description: "Train the AI to maintain a friendly or natural conversation style.",
    xp: 200,
    category: "Style Control",
    completions: 689,
    avgScore: 76,
  },
  {
    id: 6,
    title: "Data Extraction",
    difficulty: "Intermediate",
    description: "Make the AI extract structured data from messy or unstructured text.",
    xp: 250,
    category: "Structured Output",
    completions: 412,
    avgScore: 74,
  },
  {
    id: 7,
    title: "Chain-of-Thought Reasoning",
    difficulty: "Advanced",
    description: "Get the AI to think step-by-step and justify its reasoning.",
    xp: 300,
    category: "Advanced Reasoning",
    completions: 321,
    avgScore: 65,
  },
  {
    id: 8,
    title: "Comparative Analysis",
    difficulty: "Advanced",
    description: "Instruct the AI to compare two or more concepts logically.",
    xp: 300,
    category: "Advanced Reasoning",
    completions: 290,
    avgScore: 69,
  },
  {
    id: 9,
    title: "Error Correction",
    difficulty: "Advanced",
    description: "Make the AI spot and fix issues in text or reasoning.",
    xp: 280,
    category: "Instruction Refinement",
    completions: 410,
    avgScore: 73,
  },
  {
    id: 10,
    title: "Multi-Step Planning",
    difficulty: "Expert",
    description: "Make the AI plan multi-step projects or decisions logically.",
    xp: 350,
    category: "Complex Prompts",
    completions: 210,
    avgScore: 68,
  },
  {
    id: 11,
    title: "Fact Verification",
    difficulty: "Expert",
    description: "Encourage the AI to check or verify facts before answering.",
    xp: 350,
    category: "Critical Thinking",
    completions: 189,
    avgScore: 70,
  },
  {
    id: 12,
    title: "Prompt Optimization",
    difficulty: "Expert",
    description: "Make the AI help you improve your own prompts.",
    xp: 400,
    category: "Meta-Prompting",
    completions: 150,
    avgScore: 75,
  },
];

export default function Challenges() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              PE
            </div>
            <span className="text-xl font-bold text-white">Prompt Hub</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/challenges"
              className="text-pink-400 font-semibold border-b-2 border-pink-500 pb-1"
            >
              Challenges
            </Link>
            <Link
              href="/leaderboard"
              className="text-gray-300 hover:text-white transition"
            >
              Leaderboard
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow hover:shadow-pink-500/40 transition"
            >
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Challenges
            </h1>
            <p className="text-gray-400">
              Sharpen your prompt engineering skills with real practice.
            </p>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-md hover:shadow-pink-500/30 transition transform hover:scale-105"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-white">
                  {challenge.title}
                </h3>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    challenge.difficulty === "Beginner"
                      ? "bg-green-500/20 text-green-400 border border-green-500/40"
                      : challenge.difficulty === "Intermediate"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                      : challenge.difficulty === "Advanced"
                      ? "bg-purple-500/20 text-purple-400 border border-purple-500/40"
                      : "bg-red-500/20 text-red-400 border border-red-500/40"
                  }`}
                >
                  {challenge.difficulty}
                </span>
              </div>
              <p className="text-gray-300 mb-4">{challenge.description}</p>
              <div className="flex items-center text-sm text-gray-400 mb-6">
                <span className="mr-4">📂 {challenge.category}</span>
                <span>⭐ {challenge.xp} XP</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  <div>👥 {challenge.completions.toLocaleString()} players</div>
                  <div>📊 Avg score: {challenge.avgScore}/100</div>
                </div>
                <Link
                  href={{
                    pathname: `/challenges/${challenge.id}`,
                    query: { xp: challenge.xp, title: challenge.title },
                  }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow hover:shadow-pink-500/40 transition"
                >
                  Start
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
