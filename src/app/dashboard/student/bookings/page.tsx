import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function BookingsPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) redirect("/login");
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) redirect("/login");

    return (
        <div className="flex flex-1 items-center justify-center p-6 min-h-[60vh]">
            <div className="mx-auto w-full max-w-md text-center">
                {/* Decorative Icon */}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-purple/10 to-brand-orange/10 ring-4 ring-brand-purple/5">
                    <CalendarDays className="h-10 w-10 text-brand-purple" />
                </div>

                {/* Heading */}
                <h1 className="mt-6 text-2xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">
                    Consultation Bookings
                </h1>
                <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
                    Book one-on-one sessions with our expert counselors. This feature is
                    <span className="font-semibold text-brand-purple"> coming soon</span>.
                    In the meantime, reach out through our contact page.
                </p>

                {/* Status Chip */}
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-700 ring-1 ring-amber-200/60">
                    <Clock className="h-3.5 w-3.5" />
                    Coming Soon — Q2 2026
                </div>

                {/* CTA */}
                <div className="mt-8">
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-xl bg-brand-purple px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-purple/20 transition-all hover:shadow-xl hover:scale-105"
                    >
                        Contact Us Instead
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
