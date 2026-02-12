import { CTABanner } from "@/components/home/CTABanner";
import { Footer } from "@/components/home/Footer";

export default function PrivacyPolicyPage() {
    return (
        <>
            <section className="bg-brand-purple px-6 pt-32 pb-16">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-4xl font-bold text-white font-[family-name:var(--font-heading)]">
                        Privacy Policy
                    </h1>
                    <p className="mt-4 text-white/60 text-sm">
                        Last updated: February 1, 2025
                    </p>
                </div>
            </section>
            <section className="bg-white px-6 py-20">
                <article className="prose prose-neutral mx-auto max-w-3xl prose-headings:font-[family-name:var(--font-heading)]">
                    <h2>1. Information We Collect</h2>
                    <p>When you use Orange Studies services, we may collect the following information:</p>
                    <ul>
                        <li><strong>Personal Information:</strong> Name, email, phone number, date of birth, passport details, academic records</li>
                        <li><strong>Academic Information:</strong> Transcripts, test scores (IELTS/TOEFL/GRE), certifications</li>
                        <li><strong>Communication Data:</strong> Messages, emails, and consultation notes</li>
                        <li><strong>Usage Data:</strong> Pages visited, time spent, browser type, device information</li>
                    </ul>

                    <h2>2. How We Use Your Information</h2>
                    <p>We use collected information to:</p>
                    <ul>
                        <li>Process university applications on your behalf</li>
                        <li>Provide personalized counseling and recommendations</li>
                        <li>Match you with suitable scholarships and programs</li>
                        <li>Communicate updates about your application status</li>
                        <li>Improve our services and website experience</li>
                        <li>Comply with legal obligations</li>
                    </ul>

                    <h2>3. Information Sharing</h2>
                    <p>We share your information only with:</p>
                    <ul>
                        <li><strong>Partner Universities:</strong> As required for your applications</li>
                        <li><strong>Visa Authorities:</strong> When processing visa applications</li>
                        <li><strong>Service Providers:</strong> Hosting, analytics, and communication tools</li>
                    </ul>
                    <p>We never sell your personal information to third parties.</p>

                    <h2>4. Data Security</h2>
                    <p>We implement industry-standard security measures including SSL encryption, access controls, and regular security audits to protect your data.</p>

                    <h2>5. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Access, correct, or delete your personal information</li>
                        <li>Withdraw consent for data processing</li>
                        <li>Request a copy of your data</li>
                        <li>Lodge a complaint with a supervisory authority</li>
                    </ul>

                    <h2>6. Cookies</h2>
                    <p>We use cookies and similar technologies to enhance your browsing experience, analyze traffic, and personalize content. You can manage cookie preferences through your browser settings.</p>

                    <h2>7. Contact Us</h2>
                    <p>For privacy-related inquiries, contact us at:</p>
                    <p><strong>Email:</strong> privacy@orangestudies.com<br /><strong>Phone:</strong> +880 1700-000000</p>
                </article>
            </section>
            <Footer />
        </>
    );
}
