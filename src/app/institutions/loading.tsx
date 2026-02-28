export default function Loading() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero skeleton */}
            <div className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-50">
                <div className="text-center space-y-4 px-6">
                    <div className="mx-auto h-6 w-32 rounded bg-neutral-200/40 animate-pulse" />
                    <div className="mx-auto h-14 w-96 rounded-xl bg-neutral-200/60 animate-pulse" />
                    <div className="mx-auto h-5 w-72 rounded-lg bg-neutral-200/40 animate-pulse" />
                    <div className="mx-auto h-12 w-44 rounded-full bg-neutral-200/50 animate-pulse mt-4" />
                </div>
            </div>

            {/* Services skeleton */}
            <div className="mx-auto max-w-6xl px-6 py-24">
                <div className="mb-14 text-center">
                    <div className="mx-auto h-8 w-36 rounded-full bg-neutral-100 animate-pulse" />
                    <div className="mx-auto mt-4 h-9 w-64 rounded-xl bg-neutral-200/60 animate-pulse" />
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm space-y-4">
                            <div className="h-12 w-12 rounded-xl bg-neutral-100 animate-pulse" />
                            <div className="h-5 w-40 rounded-lg bg-neutral-200/60 animate-pulse" />
                            <div className="h-12 w-full rounded-lg bg-neutral-50 animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Universities grid skeleton */}
            <div className="bg-neutral-50/80 px-6 py-24">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12 text-center">
                        <div className="mx-auto h-8 w-40 rounded-full bg-neutral-200/40 animate-pulse" />
                        <div className="mx-auto mt-4 h-9 w-56 rounded-xl bg-neutral-200/50 animate-pulse" />
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="h-14 w-14 shrink-0 rounded-xl bg-neutral-100 animate-pulse" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-5 w-3/4 rounded-lg bg-neutral-200/60 animate-pulse" />
                                        <div className="h-3 w-1/2 rounded bg-neutral-100 animate-pulse" />
                                    </div>
                                </div>
                                <div className="h-10 w-full rounded-lg bg-neutral-50 animate-pulse" />
                                <div className="flex gap-2">
                                    <div className="h-6 w-20 rounded-full bg-neutral-100 animate-pulse" />
                                    <div className="h-6 w-24 rounded-full bg-neutral-100 animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
