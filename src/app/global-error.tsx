"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-[#0d0d0d] text-white flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <h2 className="text-2xl font-bold mb-4 font-mono text-cyan-400">Application Error</h2>
        <p className="text-neutral-400 mb-6 max-w-md text-sm">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition-all"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
