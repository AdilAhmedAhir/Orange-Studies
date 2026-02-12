"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, MapPin, Video, Phone, Clock, CheckCircle } from "lucide-react";

const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
];

const branches = [
    { name: "Dhaka, Bangladesh (Head Office)", address: "Gulshan-2, Road 45" },
    { name: "Chittagong, Bangladesh", address: "GEC Circle, Agrabad" },
];

export function ConsultationBooking() {
    const [mode, setMode] = useState<"online" | "offline">("online");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [method, setMethod] = useState<"video" | "whatsapp">("video");
    const [branch, setBranch] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section className="relative z-10 bg-neutral-50/80 px-6 py-24 lg:py-32 overflow-hidden">
            <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-purple/5 blur-3xl" />

            {/* heading */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="mx-auto mb-12 max-w-2xl text-center"
            >
                <span className="mb-4 inline-block rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-brand-purple">
                    Book a Consultation
                </span>
                <h2 className="mt-4 text-3xl font-bold text-neutral-800 sm:text-4xl lg:text-5xl font-[family-name:var(--font-heading)]">
                    Talk to Our Experts
                </h2>
                <p className="mt-4 text-lg text-neutral-500">
                    Get personalized guidance from certified counselors — online or at our offices.
                </p>
            </motion.div>

            <div className="mx-auto max-w-xl">
                {submitted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"
                    >
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500">
                            <CheckCircle className="h-7 w-7 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-emerald-700 font-[family-name:var(--font-heading)]">
                            Booking Confirmed!
                        </h3>
                        <p className="mt-2 text-sm text-neutral-600">
                            We&apos;ve received your consultation request. You&apos;ll get a
                            confirmation email with a meeting link or office details within 24 hours.
                        </p>
                        <button
                            onClick={() => {
                                setSubmitted(false);
                                setName("");
                                setEmail("");
                                setPhone("");
                                setDate("");
                                setTime("");
                            }}
                            className="mt-6 rounded-xl border border-neutral-300 px-6 py-2.5 text-sm font-semibold text-neutral-600 transition-colors hover:bg-white"
                        >
                            Book Another
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        onSubmit={handleSubmit}
                        className="rounded-2xl border border-neutral-200/60 bg-white p-6 shadow-lg shadow-brand-purple/5 sm:p-8"
                    >
                        {/* Mode toggle */}
                        <div className="mb-6 flex rounded-xl bg-neutral-100 p-1">
                            <button
                                type="button"
                                onClick={() => setMode("online")}
                                className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all duration-300 ${mode === "online"
                                        ? "bg-white text-brand-purple shadow-sm"
                                        : "text-neutral-500 hover:text-neutral-700"
                                    }`}
                            >
                                <Video className="h-4 w-4" />
                                Online
                            </button>
                            <button
                                type="button"
                                onClick={() => setMode("offline")}
                                className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all duration-300 ${mode === "offline"
                                        ? "bg-white text-brand-purple shadow-sm"
                                        : "text-neutral-500 hover:text-neutral-700"
                                    }`}
                            >
                                <MapPin className="h-4 w-4" />
                                In-Person
                            </button>
                        </div>

                        {/* Name + Email + Phone */}
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                                required
                                className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                            />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    required
                                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                                />
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Phone"
                                    required
                                    className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                                />
                            </div>

                            {/* Online: method selection */}
                            {mode === "online" && (
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                                        Preferred Method
                                    </label>
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setMethod("video")}
                                            className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-all ${method === "video"
                                                    ? "border-brand-purple bg-brand-purple/10 text-brand-purple"
                                                    : "border-neutral-200 text-neutral-500"
                                                }`}
                                        >
                                            <Video className="h-4 w-4" /> Video Call
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setMethod("whatsapp")}
                                            className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-all ${method === "whatsapp"
                                                    ? "border-brand-purple bg-brand-purple/10 text-brand-purple"
                                                    : "border-neutral-200 text-neutral-500"
                                                }`}
                                        >
                                            <Phone className="h-4 w-4" /> WhatsApp
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Offline: branch selection */}
                            {mode === "offline" && (
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                                        Select Branch
                                    </label>
                                    <div className="space-y-2">
                                        {branches.map((b) => (
                                            <button
                                                key={b.name}
                                                type="button"
                                                onClick={() => setBranch(b.name)}
                                                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all ${branch === b.name
                                                        ? "border-brand-purple bg-brand-purple/10"
                                                        : "border-neutral-200 hover:border-neutral-300"
                                                    }`}
                                            >
                                                <MapPin
                                                    className={`h-4 w-4 shrink-0 ${branch === b.name
                                                            ? "text-brand-purple"
                                                            : "text-neutral-400"
                                                        }`}
                                                />
                                                <div>
                                                    <span className="font-semibold text-neutral-700">
                                                        {b.name}
                                                    </span>
                                                    <span className="block text-xs text-neutral-400">
                                                        {b.address}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Date & Time */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                                        <Calendar className="mr-1.5 inline h-3.5 w-3.5 text-neutral-400" />
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                        className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                                        <Clock className="mr-1.5 inline h-3.5 w-3.5 text-neutral-400" />
                                        Time
                                    </label>
                                    <select
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        required
                                        className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none transition-colors focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                                    >
                                        <option value="">Select time</option>
                                        {timeSlots.map((t) => (
                                            <option key={t} value={t}>
                                                {t}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-6 w-full rounded-xl bg-brand-purple px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-brand-purple/20 transition-all duration-300 hover:bg-brand-deep hover:shadow-lg"
                        >
                            Book Consultation
                        </button>

                        <p className="mt-3 text-center text-xs text-neutral-400">
                            Free initial consultation • No obligation
                        </p>
                    </motion.form>
                )}
            </div>
        </section>
    );
}
