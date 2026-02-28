export default function AdminDashboardLoading() {
    return (
        <div className="space-y-6 animate-pulse p-4 md:p-6">
            {/* Header skeleton */}
            <div className="flex items-center justify-between">
                <div className="h-8 w-1/4 rounded-lg bg-gray-200" />
                <div className="h-10 w-32 rounded-xl bg-gray-200" />
            </div>

            {/* Table skeleton */}
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
                {/* Header row */}
                <div className="flex items-center gap-6 border-b border-gray-100 bg-gray-50 px-6 py-3">
                    <div className="h-3 w-24 rounded bg-gray-200" />
                    <div className="hidden md:block h-3 w-16 rounded bg-gray-200" />
                    <div className="hidden md:block h-3 w-20 rounded bg-gray-200" />
                    <div className="hidden md:block h-3 w-16 rounded bg-gray-200" />
                    <div className="ml-auto h-3 w-14 rounded bg-gray-200" />
                </div>
                {/* Data rows */}
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="h-16 w-full border-b border-gray-100 bg-gray-50/50 animate-pulse"
                    />
                ))}
            </div>
        </div>
    );
}
