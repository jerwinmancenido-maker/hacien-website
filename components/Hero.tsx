import Image from "next/image";
import Link from "next/link";
import { enterpriseImages } from "@/components/EnterpriseImagery";
import { FadeIn, SlideUp } from "@/components/motion";

export function Hero() {
  const signals = [
    ["RFQ review", "Specs, BOQs, photos, and plain requests are organized before quoting."],
    ["Supplier context", "Availability, warranty, lead time, and assumptions stay visible when reviewed."],
    ["Trackable follow-up", "Every request gets a reference so the conversation can continue."],
  ];

  return (
    <section className="relative overflow-hidden bg-[#071426] text-white">
      <div
        className="cinematic-photo absolute inset-0 opacity-80"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(7, 20, 38, 0.96), rgba(7, 20, 38, 0.7), rgba(7, 20, 38, 0.18)), url(${enterpriseImages.commandCenter})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(42,120,255,0.28),transparent_32%)]" />
      <div className="cinematic-lines pointer-events-none absolute inset-0 opacity-30" />
      <div className="cinematic-sweep pointer-events-none absolute inset-y-0 left-0 w-[74%] opacity-0" />
      <div className="pointer-events-none absolute -right-[18vw] top-12 hidden h-[720px] w-[720px] opacity-[0.16] mix-blend-screen lg:block xl:-right-[10vw] xl:h-[820px] xl:w-[820px]">
        <Image
          src="/brand/hacien-mark-4k.png"
          alt=""
          fill
          priority
          sizes="820px"
          className="object-contain drop-shadow-[0_0_70px_rgba(45,212,255,0.28)]"
          aria-hidden="true"
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#071426] to-transparent" />
      <div className="relative mx-auto grid min-h-[520px] max-w-7xl items-center gap-5 px-4 py-7 sm:min-h-[590px] sm:gap-8 sm:px-6 sm:py-10 lg:min-h-[630px] lg:grid-cols-[1fr_0.86fr] lg:gap-10 lg:px-8 lg:py-14">
        <div className="flex flex-col justify-center">
          <FadeIn>
            <div className="mb-3 inline-flex w-fit rounded border border-blue-300/30 bg-white/8 px-3 py-1.5 text-xs font-semibold text-blue-100 backdrop-blur sm:mb-5">
              HACIEN IT Solutions
            </div>
          </FadeIn>
          <SlideUp delay={80}>
            <h1 className="max-w-4xl text-3xl font-bold tracking-tight sm:text-5xl">
              Technology sourcing that stays clear from request to handover.
            </h1>
          </SlideUp>
          <SlideUp delay={170}>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 sm:mt-5 sm:text-base sm:leading-7">
              Send a requirement list, BOQ, photo, supplier quote, or rough idea. HACIEN helps turn it into a review-ready RFQ without pretending the website can confirm price, stock, or commercial terms on its own.
            </p>
          </SlideUp>
          <SlideUp delay={260}>
            <div className="mt-5 flex flex-col gap-2 sm:mt-7 sm:flex-row sm:gap-3">
              <Link href="/quote" className="button-glow rounded-full bg-white px-5 py-2.5 text-center text-sm font-bold text-[#071426] shadow-xl shadow-blue-950/30 sm:px-6 sm:py-3">
                Start an RFQ
              </Link>
              <Link href="/technology" className="interactive-link glass-control-dark rounded-full px-5 py-2.5 text-center text-sm font-bold text-white hover:border-blue-200 sm:px-6 sm:py-3">
                Explore Technology
              </Link>
            </div>
          </SlideUp>
        </div>

        <SlideUp delay={220} className="h-full">
          <div className="relative overflow-hidden rounded-lg border border-white/15 bg-white/[0.08] p-3 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-blue-500/10" />
            <div className="relative space-y-3">
              <div className="rounded-lg border border-white/12 bg-white/10 p-4">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">First response focus</div>
                <p className="mt-3 text-sm leading-6 text-slate-200">
                  The website captures context. HACIEN reviews the request before any formal quote, delivery, payment, or document commitment exists.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {signals.map(([title, text], index) => (
                <div key={title} className="rounded-lg border border-white/12 bg-white/10 p-3 backdrop-blur transition-transform duration-200 hover:-translate-y-1">
                  <div className="text-xs font-bold text-blue-200">{String(index + 1).padStart(2, "0")}</div>
                  <div className="mt-2 text-sm font-bold text-white">{title}</div>
                  <p className="mt-2 text-xs leading-5 text-slate-300">{text}</p>
                </div>
              ))}
              </div>
            </div>
          </div>
        </SlideUp>
      </div>
    </section>
  );
}
