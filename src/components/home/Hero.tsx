"use client";

import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";
import { GlobalSearch } from "./GlobalSearch";

export function Hero() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
            {/* z-0: Sticky parallax video layer */}
            <HeroBackground />

            {/* z-10: Floating content + search */}
            <div className="relative z-10 flex w-full flex-col items-center justify-center pt-20 pb-24 sm:pt-24">
                <HeroContent />
                <GlobalSearch />
            </div>

            {/* Bottom gradient fade into content below */}
            <div className="absolute bottom-0 left-0 right-0 z-20 h-32 bg-gradient-to-t from-white to-transparent" />
        </section>
    );
}
