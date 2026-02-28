export default function Loading() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero skeleton */}
            <div className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-50">
                <div className="text-center space-y-4 px-6">
                    <div className="mx-auto h-8 w-40 rounded-full bg-neutral-200/50 animate-pulse" />
                    <div className="mx-auto h-12 w-80 rounded-xl bg-neutral-200/60 animate-pulse" />
                    <div className="mx-auto h-5 w-64 rounded-lg bg-neutral-200/40 animate-pulse" />
                </div>
            </div>

            {/* Filters + grid skeleton */}
            <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="flex gap-3 mb-8">
                    <div className="h-12 flex-1 rounded-xl bg-neutral-50 border border-neutral-100 animate-pulse" />
                    <div className="h-12 w-28 rounded-xl bg-neutral-50 border border-neutral-100 animate-pulse" />
                </div>

                <div className="h-5 w-36 rounded bg-neutral-200/40 animate-pulse mb-6" />

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="h-6 w-24 rounded-full bg-neutral-100 animate-pulse" />
                                <div className="h-5 w-16 rounded-full bg-neutral-50 animate-pulse" />
                            </div>
                            <div className="h-6 w-3/4 rounded-lg bg-neutral-200/60 animate-pulse" />
                            <div className="h-4 w-1/2 rounded bg-neutral-100 animate-pulse" />
                            <div className="h-12 w-full rounded-lg bg-neutral-50 animate-pulse" />
                            <div className="grid grid-cols-2 gap-2">
                                <div className="h-4 w-full rounded bg-neutral-100 animate-pulse" />
                                <div className="h-4 w-full rounded bg-neutral-100 animate-pulse" />
                            </div>
                            <div className="flex items-center justify-between border-t border-neutral-50 pt-4">
                                <div className="h-4 w-20 rounded bg-neutral-100 animate-pulse" />
                                <div className="h-4 w-20 rounded bg-neutral-100 animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
