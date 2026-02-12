import type { Metadata } from "next";
import { Outfit, Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { WhatsAppFAB } from "@/components/layout/WhatsAppFAB";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Orange Studies — Education Choice Transparent, Globally",
  description:
    "Orange Studies is a premium study abroad consultancy helping students, recruiters, and institutions connect globally. Find universities, courses, and expert guidance for your international education journey.",
  keywords: [
    "study abroad",
    "international education",
    "university search",
    "Orange Studies",
    "study consultancy",
    "overseas education",
  ],
  openGraph: {
    title: "Orange Studies — Education Choice Transparent, Globally",
    description:
      "Premium study abroad consultancy connecting students, recruiters, and institutions worldwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${montserrat.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <WhatsAppFAB />
      </body>
    </html>
  );
}
