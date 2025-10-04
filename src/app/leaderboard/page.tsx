"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase";

interface LeaderboardEntry {
  username: string;
  xp: number;
  challenges_completed: number;
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);

      // 1️⃣ Get all profiles with xp
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("id, username, xp")
        .order("xp", { ascending: false });

      if (profileError) {
        console.error("❌ Error fetching profiles:", profileError);
        setLoading(false);
        return;
      }

      // 2️⃣ Get all scores (only user_id needed)
      const { data: scores, error: scoreError } = await supabase
        .from("scores")
        .select("user_id");

      if (scoreError) {
        console.error("❌ Error fetching scores:", scoreError);
        setLoading(false);
        return;
      }

      // 3️⃣ Count challenges per user
      const challengeCount: Record<string, number> = {};
      (scores ?? []).forEach((s: { user_id: string }) => {
        if (!s.user_id) return;
        challengeCount[s.user_id] = (challengeCount[s.user_id] || 0) + 1;
      });

      // 4️⃣ Merge into leaderboard
      const leaderboardData =
        (profiles ?? []).map((p) => ({
          username: p.username || "Anonymous",
          xp: p.xp ?? 0,
          challenges_completed: challengeCount[p.id] || 0,
        })) || [];

      setLeaderboard(leaderboardData);
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-gray-100 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/70 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
              PE
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              Prompt Engineering Hub
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-medium">
            <Link href="/challenges" className="hover:text-purple-400 transition-colors">
              Challenges
            </Link>
            <Link href="/leaderboard" className="text-purple-400 font-semibold">
              Leaderboard
            </Link>
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform"
            >
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="container py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          🌍 Global Leaderboard
        </h2>

        {loading ? (
          <div className="text-center text-gray-400 text-lg">
            Loading leaderboard...
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center text-gray-400 text-lg">
            No scores yet — complete a challenge to appear here!
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl shadow-xl border border-gray-800 bg-gray-900/70 backdrop-blur-md">
            <table className="min-w-full text-left">
              <thead className="bg-gray-950/80 border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase">
                    Username
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase">
                    XP
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-400 uppercase">
                    Challenges Completed
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user, index) => (
                  <tr
                    key={user.username + index}
                    className={`transition-colors ${
                      index < 3
                        ? "bg-gradient-to-r from-purple-950/60 to-pink-900/40"
                        : "hover:bg-gray-800/40"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-lg font-bold">
                      {index === 0
                        ? "🥇"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-white">
                        {user.username}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-purple-300 font-semibold">
                        {user.xp.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-300">
                        {user.challenges_completed}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12 mt-20 border-t border-gray-800">
        <div className="container text-center text-sm">
          © {new Date().getFullYear()} Prompt Engineering Hub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
