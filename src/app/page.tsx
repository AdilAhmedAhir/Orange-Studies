import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Spacer for scroll-parallax demonstration */}
      <section className="relative z-10 bg-white px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-brand-purple font-[family-name:var(--font-heading)] sm:text-4xl">
            Why Choose Orange Studies?
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-500">
            We connect students, recruiters, and institutions worldwide — making
            international education accessible, transparent, and effortless.
          </p>
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[
              {
                num: "200+",
                title: "Partner Universities",
                desc: "Across 15+ countries",
              },
              {
                num: "5K+",
                title: "Students Placed",
                desc: "Successfully enrolled worldwide",
              },
              {
                num: "98%",
                title: "Visa Success Rate",
                desc: "Expert guidance every step",
              },
            ].map((stat) => (
              <div
                key={stat.title}
                className="rounded-2xl border border-neutral-100 bg-neutral-50/50 p-6 text-center"
              >
                <p className="text-3xl font-bold text-brand-orange font-[family-name:var(--font-heading)]">
                  {stat.num}
                </p>
                <p className="mt-2 font-semibold text-neutral-800">
                  {stat.title}
                </p>
                <p className="mt-1 text-sm text-neutral-400">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
