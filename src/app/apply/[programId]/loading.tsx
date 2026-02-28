export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6 pt-24">
            <div className="w-full max-w-2xl space-y-8">
                {/* Header skeleton */}
                <div className="text-center space-y-3 pt-28">
                    <div className="mx-auto h-10 w-64 rounded-xl bg-neutral-200/60 animate-pulse" />
                    <div className="mx-auto h-5 w-48 rounded-lg bg-neutral-100 animate-pulse" />
                </div>

                {/* Progress bar skeleton */}
                <div className="flex gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className={`h-2 flex-1 rounded-full animate-pulse ${i === 0 ? "bg-neutral-300" : "bg-neutral-100"}`} />
                    ))}
                </div>

                {/* Wizard form skeleton */}
                <div className="rounded-2xl border border-neutral-100 bg-white p-8 shadow-sm space-y-6">
                    <div className="h-7 w-48 rounded-lg bg-neutral-200/60 animate-pulse" />
                    <div className="space-y-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <div className="h-4 w-28 rounded bg-neutral-100 animate-pulse" />
                                <div className="h-12 w-full rounded-xl bg-neutral-50 border border-neutral-100 animate-pulse" />
                            </div>
                        ))}
                    </div>

                    {/* Upload area skeleton */}
                    <div className="h-32 w-full rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50/50 animate-pulse" />

                    {/* Button skeleton */}
                    <div className="flex justify-between pt-4">
                        <div className="h-12 w-28 rounded-xl bg-neutral-100 animate-pulse" />
                        <div className="h-12 w-36 rounded-xl bg-neutral-200/60 animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
}
