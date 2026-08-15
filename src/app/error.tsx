"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-2xl font-bold mb-4 font-mono text-cyan-400">Something went wrong</h2>
      <p className="text-neutral-400 mb-6 max-w-md text-sm">
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition-all"
      >
        Try again
      </button>
    </div>
  );
}
