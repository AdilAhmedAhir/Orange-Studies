export default function Loading() {
    return (
        <div className="min-h-screen bg-white pt-24">
            {/* Hero skeleton */}
            <div className="relative h-[50vh] bg-gradient-to-br from-neutral-100 to-neutral-50 overflow-hidden">
                <div className="absolute inset-0 flex items-end pb-12">
                    <div className="mx-auto w-full max-w-6xl px-6 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-neutral-200/60 animate-pulse" />
                            <div className="h-4 w-32 rounded bg-neutral-200/40 animate-pulse" />
                        </div>
                        <div className="h-10 w-96 max-w-full rounded-xl bg-neutral-200/60 animate-pulse" />
                        <div className="flex gap-4">
                            <div className="h-5 w-28 rounded bg-neutral-200/40 animate-pulse" />
                            <div className="h-5 w-24 rounded bg-neutral-200/40 animate-pulse" />
                            <div className="h-5 w-20 rounded bg-neutral-200/40 animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab nav skeleton */}
            <div className="sticky top-[80px] z-40 bg-white border-b border-gray-200 py-1">
                <div className="mx-auto max-w-6xl px-6 flex gap-6">
                    {["Overview", "Programs", "Campus Life", "Admissions"].map((tab) => (
                        <div key={tab} className="h-10 w-24 rounded bg-neutral-100 animate-pulse" />
                    ))}
                </div>
            </div>

            {/* Content skeleton */}
            <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="h-7 w-48 rounded-lg bg-neutral-200/60 animate-pulse" />
                        <div className="space-y-3">
                            <div className="h-4 w-full rounded bg-neutral-100 animate-pulse" />
                            <div className="h-4 w-5/6 rounded bg-neutral-100 animate-pulse" />
                            <div className="h-4 w-4/6 rounded bg-neutral-100 animate-pulse" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="h-24 rounded-xl bg-neutral-50 border border-neutral-100 animate-pulse" />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="h-64 rounded-2xl bg-neutral-50 border border-neutral-100 animate-pulse" />
                        <div className="h-48 rounded-2xl bg-neutral-50 border border-neutral-100 animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
}
