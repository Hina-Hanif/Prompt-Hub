"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);

        // 🔹 Fetch username from profiles table
        const { data: profileData } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", data.user.id)
          .single();

        if (profileData) {
          setProfile(profileData);
        }
      }
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);

        if (session?.user) {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("username")
            .eq("id", session.user.id)
            .single();

          if (profileData) {
            setProfile(profileData);
          }
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

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
            <Link
              href="/challenges"
              className="hover:text-purple-400 transition-colors"
            >
              Challenges
            </Link>
            <Link
              href="/leaderboard"
              className="hover:text-purple-400 transition-colors"
            >
              Leaderboard
            </Link>

            {!user ? (
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform"
              >
                Sign In
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                {/* 🔹 Show username if available, else email */}
                <span className="text-gray-300 text-sm">
                  👤 {profile?.username || user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium shadow hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-24">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6">
                Master the Art of <br />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Prompt Engineering
                </span>
              </h1>
              <p className="text-lg text-gray-400 mb-8 max-w-lg">
                Practice writing prompts, receive live AI feedback, and compete
                with others while improving your AI communication skills.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/challenges"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-transform text-center"
                >
                  Start Practicing
                </Link>
                <Link
                  href="/leaderboard"
                  className="px-6 py-3 rounded-lg border border-purple-500/60 text-purple-400 font-medium hover:bg-purple-950/40 transition-colors text-center"
                >
                  View Leaderboard
                </Link>
              </div>
            </div>
            {/* Hero Card */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/3]">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-pink-900/30 rounded-2xl shadow-xl"></div>
                <div className="absolute inset-4 bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col border border-gray-800">
                  <div className="flex items-center mb-4 space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="bg-gray-800/70 p-4 rounded-md mb-4 flex-grow shadow-inner border border-gray-700">
                    <div className="text-sm font-mono leading-relaxed">
                      <span className="text-purple-400 font-semibold">user &gt;</span>{" "}
                      Write a prompt that explains quantum computing to a 10-year-old
                      <div className="mt-4 pl-4 border-l-2 border-pink-500/70">
                        <span className="text-pink-400 font-semibold">ai &gt;</span>{" "}
                        Imagine you have a magic box that can be in many places at once...
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold py-2 px-4 rounded-md self-end shadow">
                    Score: 92/100
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gray-950">
          <div className="container">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  step: "1",
                  title: "Choose a Challenge",
                  desc: "Pick from hundreds of creative challenges with varying difficulty.",
                },
                {
                  step: "2",
                  title: "Write Your Prompt",
                  desc: "Craft prompts with clarity, precision, and creativity.",
                },
                {
                  step: "3",
                  title: "Get Instant Feedback",
                  desc: "Receive AI-powered scoring and suggestions to improve.",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="group relative bg-gray-900/80 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-800 hover:border-purple-500/40"
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-lg mb-6 shadow-md group-hover:scale-110 transition-transform">
                    {f.step}
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-white">
                    {f.title}
                  </h3>
                  <p className="text-gray-400">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-gradient-to-r from-purple-900/50 to-pink-900/40">
          <div className="container grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { value: "500+", label: "Challenges" },
              { value: "10k+", label: "Users" },
              { value: "50k+", label: "Prompts Written" },
              { value: "95%", label: "Satisfaction" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-5xl font-extrabold text-purple-400 mb-3">
                  {s.value}
                </div>
                <p className="text-gray-300">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center">
          <div className="container">
            <h2 className="text-4xl font-extrabold mb-6">
              Ready to Master Prompt Engineering?
            </h2>
            <p className="text-lg mb-8 max-w-xl mx-auto opacity-90">
              Join thousands of learners worldwide and elevate your AI skills
              today.
            </p>
            <Link
              href="/challenges"
              className="px-8 py-3 rounded-xl bg-white text-purple-600 font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform"
            >
              Get Started Now
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-16 mt-20 border-t border-gray-800">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-white font-semibold mb-4">Prompt Engineering Hub</h3>
            <p className="text-sm leading-relaxed">
              Master prompt engineering through interactive challenges, scoring,
              and real-time feedback.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/challenges" className="hover:text-white transition-colors">Challenges</Link></li>
              <li><Link href="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Docs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-5 text-xl">
              <a href="#" className="hover:text-purple-400">🌐</a>
              <a href="#" className="hover:text-purple-400">🐦</a>
              <a href="#" className="hover:text-purple-400">💻</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Prompt Engineering Hub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
