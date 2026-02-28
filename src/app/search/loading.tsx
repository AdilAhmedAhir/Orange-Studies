export default function Loading() {
    return (
        <div className="min-h-screen bg-white pt-24">
            {/* Hero skeleton */}
            <div className="bg-gradient-to-r from-neutral-100 to-neutral-50 pt-8 pb-12 px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="h-10 w-72 rounded-xl bg-neutral-200/60 animate-pulse" />
                    <div className="mt-3 h-5 w-48 rounded-lg bg-neutral-200/40 animate-pulse" />
                    <div className="mt-6 h-12 w-full max-w-2xl rounded-xl bg-neutral-200/50 animate-pulse" />
                </div>
            </div>

            {/* Grid skeleton */}
            <div className="mx-auto max-w-6xl px-6 py-8">
                <div className="flex flex-col gap-8 md:flex-row">
                    {/* Sidebar */}
                    <aside className="hidden md:block w-1/4 shrink-0">
                        <div className="sticky top-24 h-96 rounded-2xl bg-neutral-50 border border-neutral-100 animate-pulse" />
                    </aside>
                    {/* Cards */}
                    <main className="flex-1 grid gap-4 sm:grid-cols-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="rounded-2xl border border-neutral-100 bg-white shadow-sm overflow-hidden">
                                <div className="h-1.5 bg-gradient-to-r from-neutral-200 to-neutral-100" />
                                <div className="p-5 space-y-3">
                                    <div className="flex gap-2">
                                        <div className="h-6 w-16 rounded-full bg-neutral-100 animate-pulse" />
                                        <div className="h-6 w-14 rounded-full bg-neutral-100 animate-pulse" />
                                    </div>
                                    <div className="h-5 w-3/4 rounded-lg bg-neutral-200/60 animate-pulse" />
                                    <div className="h-4 w-1/2 rounded-lg bg-neutral-100 animate-pulse" />
                                    <div className="flex gap-4 mt-4">
                                        <div className="h-3 w-16 rounded bg-neutral-100 animate-pulse" />
                                        <div className="h-3 w-16 rounded bg-neutral-100 animate-pulse" />
                                    </div>
                                    <div className="flex items-center justify-between border-t border-neutral-50 pt-4 mt-3">
                                        <div className="h-6 w-24 rounded bg-neutral-200/60 animate-pulse" />
                                        <div className="h-9 w-28 rounded-xl bg-neutral-100 animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </main>
                </div>
            </div>
        </div>
    );
}
