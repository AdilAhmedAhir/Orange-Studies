"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html lang="en">
            <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
                <div style={{
                    display: "flex",
                    minHeight: "100vh",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#FAFAFA",
                    padding: "1.5rem",
                }}>
                    <div style={{ maxWidth: "28rem", textAlign: "center" }}>
                        <div style={{
                            margin: "0 auto",
                            width: "5rem",
                            height: "5rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, rgba(255,148,0,0.2), rgba(102,45,145,0.2))",
                        }}>
                            <AlertTriangle style={{ width: "2.5rem", height: "2.5rem", color: "#FF9400" }} />
                        </div>

                        <h1 style={{
                            marginTop: "1.5rem",
                            fontSize: "1.5rem",
                            fontWeight: 700,
                            color: "#171717",
                        }}>
                            Something went wrong
                        </h1>
                        <p style={{
                            marginTop: "0.75rem",
                            fontSize: "0.875rem",
                            color: "#737373",
                            lineHeight: 1.6,
                        }}>
                            We&apos;re experiencing a temporary issue. Please try refreshing the page.
                        </p>

                        {error.digest && (
                            <p style={{
                                marginTop: "0.5rem",
                                fontSize: "0.625rem",
                                color: "#A3A3A3",
                                fontFamily: "monospace",
                            }}>
                                Error ID: {error.digest}
                            </p>
                        )}

                        <button
                            onClick={reset}
                            style={{
                                marginTop: "2rem",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                borderRadius: "0.75rem",
                                background: "#FF9400",
                                padding: "0.75rem 1.5rem",
                                fontSize: "0.875rem",
                                fontWeight: 700,
                                color: "white",
                                border: "none",
                                cursor: "pointer",
                                boxShadow: "0 4px 12px rgba(255,148,0,0.3)",
                            }}
                        >
                            <RotateCcw style={{ width: "1rem", height: "1rem" }} />
                            Try Again
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}
