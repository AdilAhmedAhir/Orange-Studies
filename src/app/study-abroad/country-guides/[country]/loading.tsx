export default function Loading() {
    return (
        <div className="min-h-screen bg-white pt-24">
            {/* Hero skeleton */}
            <div className="relative h-[45vh] bg-gradient-to-br from-neutral-100 to-neutral-50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4 px-6">
                        <div className="mx-auto h-8 w-32 rounded-full bg-neutral-200/50 animate-pulse" />
                        <div className="mx-auto h-12 w-72 rounded-xl bg-neutral-200/60 animate-pulse" />
                        <div className="mx-auto h-5 w-56 rounded-lg bg-neutral-200/40 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Quick stats skeleton */}
            <div className="bg-neutral-50/80 px-6 py-8">
                <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="rounded-xl bg-white p-4 text-center border border-neutral-100 space-y-2">
                            <div className="mx-auto h-8 w-8 rounded-full bg-neutral-100 animate-pulse" />
                            <div className="mx-auto h-5 w-16 rounded bg-neutral-200/60 animate-pulse" />
                            <div className="mx-auto h-3 w-20 rounded bg-neutral-100 animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>

            {/* University grid skeleton */}
            <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="h-7 w-52 rounded-lg bg-neutral-200/60 animate-pulse mb-8" />
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="h-14 w-14 shrink-0 rounded-xl bg-neutral-100 animate-pulse" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-5 w-3/4 rounded bg-neutral-200/60 animate-pulse" />
                                    <div className="h-3 w-1/2 rounded bg-neutral-100 animate-pulse" />
                                </div>
                            </div>
                            <div className="h-10 w-full rounded-lg bg-neutral-50 animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
