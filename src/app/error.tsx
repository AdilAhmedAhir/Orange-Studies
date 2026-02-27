"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Caught by Error Boundary:", error);
    }, [error]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6">
            <div className="max-w-md text-center">
                {/* Icon */}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-orange/20 to-brand-purple/20">
                    <AlertTriangle className="h-10 w-10 text-brand-orange" />
                </div>

                {/* Heading */}
                <h1 className="mt-6 text-2xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">
                    We encountered a temporary issue
                </h1>
                <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
                    Something didn&apos;t load correctly. This is usually temporary — please try again.
                </p>

                {/* Error digest for debugging */}
                {error.digest && (
                    <p className="mt-2 text-[10px] text-neutral-400 font-mono">
                        Error ID: {error.digest}
                    </p>
                )}

                {/* Retry button */}
                <button
                    onClick={reset}
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-orange px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-orange/20 transition-all hover:shadow-xl hover:shadow-brand-orange/30 hover:scale-105 active:scale-95"
                >
                    <RotateCcw className="h-4 w-4" />
                    Try Again
                </button>

                <p className="mt-6 text-xs text-gray-400 font-mono max-w-lg text-center break-words">
                    {error.message || "Unknown client error"}
                </p>
            </div>
        </div>
    );
}
