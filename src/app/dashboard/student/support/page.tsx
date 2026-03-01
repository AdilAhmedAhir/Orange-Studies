import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LifeBuoy, Mail, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function SupportPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) redirect("/login");
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) redirect("/login");

    return (
        <div className="flex flex-1 items-center justify-center p-6 min-h-[60vh]">
            <div className="mx-auto w-full max-w-lg text-center">
                {/* Decorative Icon */}
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-blue-50 ring-4 ring-emerald-100/50">
                    <LifeBuoy className="h-10 w-10 text-emerald-600" />
                </div>

                {/* Heading */}
                <h1 className="mt-6 text-2xl font-bold text-neutral-900 font-[family-name:var(--font-heading)]">
                    Student Support
                </h1>
                <p className="mt-3 text-sm text-neutral-500 leading-relaxed">
                    Need help with your application, documents, or visa process?
                    Our dedicated support team is here to assist you.
                </p>

                {/* Contact Options */}
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <a
                        href="mailto:support@orangestudies.com"
                        className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 text-left shadow-sm transition-all hover:shadow-md hover:border-brand-purple/30"
                    >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-purple/10">
                            <Mail className="h-5 w-5 text-brand-purple" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-neutral-800">Email Support</p>
                            <p className="text-xs text-neutral-400">support@orangestudies.com</p>
                        </div>
                    </a>
                    <Link
                        href="/contact"
                        className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 text-left shadow-sm transition-all hover:shadow-md hover:border-brand-orange/30"
                    >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-orange/10">
                            <MessageCircle className="h-5 w-5 text-brand-orange" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-neutral-800">Contact Form</p>
                            <p className="text-xs text-neutral-400">Get a response within 24hrs</p>
                        </div>
                    </Link>
                </div>

                {/* FAQ Link */}
                <div className="mt-6">
                    <Link
                        href="/study-abroad/faqs"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-purple hover:text-brand-deep transition-colors"
                    >
                        Browse Frequently Asked Questions
                        <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
