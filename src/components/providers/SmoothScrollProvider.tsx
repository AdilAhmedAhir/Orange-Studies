"use client";

import { ReactLenis } from "lenis/react";
import { type ReactNode } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.08,
                duration: 1.4,
                smoothWheel: true,
                wheelMultiplier: 0.8,
            }}
        >
            {children}
        </ReactLenis>
    );
}
