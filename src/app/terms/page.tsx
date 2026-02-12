import { Footer } from "@/components/home/Footer";

export default function TermsOfServicePage() {
    return (
        <>
            <section className="bg-brand-purple px-6 pt-32 pb-16">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-4xl font-bold text-white font-[family-name:var(--font-heading)]">
                        Terms of Service
                    </h1>
                    <p className="mt-4 text-white/60 text-sm">
                        Last updated: February 1, 2025
                    </p>
                </div>
            </section>
            <section className="bg-white px-6 py-20">
                <article className="prose prose-neutral mx-auto max-w-3xl prose-headings:font-[family-name:var(--font-heading)]">
                    <h2>1. Acceptance of Terms</h2>
                    <p>By using Orange Studies' website and services, you agree to be bound by these Terms of Service. If you do not agree, please discontinue use of our services.</p>

                    <h2>2. Services Provided</h2>
                    <p>Orange Studies provides educational consultancy services including:</p>
                    <ul>
                        <li>University and program shortlisting</li>
                        <li>Application guidance and document review</li>
                        <li>Statement of Purpose (SOP) advisory</li>
                        <li>Visa application assistance</li>
                        <li>Scholarship identification and application support</li>
                        <li>Pre-departure orientation</li>
                    </ul>
                    <p>We act as advisors and facilitators. Final admission and visa decisions are made solely by universities and immigration authorities.</p>

                    <h2>3. User Responsibilities</h2>
                    <ul>
                        <li>Provide accurate and truthful information in all documents</li>
                        <li>Meet deadlines communicated by our counselors</li>
                        <li>Pay applicable fees as agreed</li>
                        <li>Respond promptly to queries from universities or visa offices</li>
                    </ul>

                    <h2>4. Fees & Payments</h2>
                    <p>Some services are free (initial consultation, university shortlisting). Premium services (SOP writing, priority processing) may incur fees, which will be communicated transparently before any commitment.</p>

                    <h2>5. Limitation of Liability</h2>
                    <p>Orange Studies is not liable for:</p>
                    <ul>
                        <li>University admission decisions</li>
                        <li>Visa rejections by immigration authorities</li>
                        <li>Changes in university policies, fees, or programs</li>
                        <li>Delays caused by third parties or force majeure events</li>
                    </ul>

                    <h2>6. Intellectual Property</h2>
                    <p>All content on this website — text, images, logos, and design — is the property of Orange Studies and protected by copyright law. Unauthorized reproduction is prohibited.</p>

                    <h2>7. Governing Law</h2>
                    <p>These terms are governed by the laws of Bangladesh. Any disputes shall be resolved in the courts of Dhaka.</p>

                    <h2>8. Contact</h2>
                    <p>Questions about these terms? Contact us at <strong>legal@orangestudies.com</strong>.</p>
                </article>
            </section>
            <Footer />
        </>
    );
}
