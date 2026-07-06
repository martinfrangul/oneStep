"use client";

import React from "react";

export default function KofiButton() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-end justify-end md:bottom-6 md:right-6">
      <a
        href="https://ko-fi.com/borisfindell"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 rounded-full bg-[var(--theme-accent)] px-5 py-3 text-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl focus:outline-none"
      >
        <img
          src="https://storage.ko-fi.com/cdn/cup-border.png"
          alt="Ko-fi Cup"
          className="h-6 w-6"
        />
        <span className="hidden font-bold sm:inline">Support Me on Ko-fi</span>
      </a>
    </div>
  );
}
