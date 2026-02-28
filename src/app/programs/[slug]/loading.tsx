export default function Loading() {
    return (
        <div className="min-h-screen bg-white pt-24">
            {/* Hero skeleton */}
            <div className="relative h-[45vh] bg-gradient-to-br from-neutral-100 to-neutral-50 overflow-hidden">
                <div className="absolute inset-0 flex items-end pb-12">
                    <div className="mx-auto w-full max-w-6xl px-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-neutral-200/60 animate-pulse" />
                            <div className="h-4 w-40 rounded bg-neutral-200/40 animate-pulse" />
                            <div className="h-4 w-3 rounded bg-neutral-200/30 animate-pulse" />
                            <div className="h-4 w-28 rounded bg-neutral-200/40 animate-pulse" />
                        </div>
                        <div className="h-10 w-80 max-w-full rounded-xl bg-neutral-200/60 animate-pulse" />
                        <div className="h-5 w-full max-w-lg rounded bg-neutral-200/40 animate-pulse" />
                        <div className="flex gap-3 mt-4">
                            <div className="h-6 w-20 rounded-full bg-neutral-200/40 animate-pulse" />
                            <div className="h-6 w-24 rounded-full bg-neutral-200/40 animate-pulse" />
                            <div className="h-6 w-16 rounded-full bg-neutral-200/40 animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content skeleton */}
            <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="h-7 w-36 rounded-lg bg-neutral-200/60 animate-pulse" />
                        <div className="space-y-3">
                            <div className="h-4 w-full rounded bg-neutral-100 animate-pulse" />
                            <div className="h-4 w-5/6 rounded bg-neutral-100 animate-pulse" />
                            <div className="h-4 w-3/4 rounded bg-neutral-100 animate-pulse" />
                            <div className="h-4 w-4/6 rounded bg-neutral-100 animate-pulse" />
                        </div>
                        <div className="h-7 w-44 rounded-lg bg-neutral-200/60 animate-pulse mt-8" />
                        <div className="grid grid-cols-2 gap-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="h-5 w-full rounded bg-neutral-100 animate-pulse" />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6 space-y-4">
                            <div className="h-6 w-32 rounded bg-neutral-200/60 animate-pulse" />
                            <div className="space-y-3">
                                <div className="h-4 w-full rounded bg-neutral-100 animate-pulse" />
                                <div className="h-4 w-3/4 rounded bg-neutral-100 animate-pulse" />
                                <div className="h-4 w-5/6 rounded bg-neutral-100 animate-pulse" />
                            </div>
                            <div className="h-12 w-full rounded-xl bg-neutral-200/50 animate-pulse mt-4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
