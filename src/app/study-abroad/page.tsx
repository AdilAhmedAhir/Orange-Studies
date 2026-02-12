import { StudyAbroadHero } from "@/components/study-abroad/StudyAbroadHero";
import { StudyAbroadProcess } from "@/components/study-abroad/StudyAbroadProcess";
import { StudyAbroadResources } from "@/components/study-abroad/StudyAbroadResources";
import { SelfEvaluation } from "@/components/study-abroad/SelfEvaluation";
import { ConsultationBooking } from "@/components/study-abroad/ConsultationBooking";
import { CTABanner } from "@/components/home/CTABanner";
import { Footer } from "@/components/home/Footer";

export default function StudyAbroadPage() {
    return (
        <>
            <StudyAbroadHero />
            <StudyAbroadProcess />
            <StudyAbroadResources />
            <SelfEvaluation />
            <ConsultationBooking />
            <CTABanner />
            <Footer />
        </>
    );
}
