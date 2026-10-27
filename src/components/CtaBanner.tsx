import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function CtaBanner() {
  return (
    <section
      id="plan-trip"
      className="relative isolate flex items-center justify-center overflow-hidden bg-neutral-900 py-20 md:py-24 lg:min-h-[24rem] lg:py-28"
    >
      <Image
        src="/assets/CTA.png"
        alt="Airplane flying over a tropical island surrounded by turquoise water"
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div className="-z-10 absolute inset-0 bg-black/45" />

      <div className="mx-auto flex w-full max-w-[84rem] flex-col items-center px-5 text-center sm:px-6">
        <h2 className="font-display text-[2.25rem] leading-tight font-normal tracking-[-0.02em] text-white md:text-5xl lg:text-[3.75rem]">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 md:text-base lg:text-lg">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          href="#destinations"
          className="mt-8 inline-flex h-12 items-center justify-center gap-3 bg-white px-9 text-[11px] font-semibold tracking-[0.14em] text-neutral-900 uppercase transition-colors hover:bg-white/90 lg:mt-10 lg:h-14 lg:px-10 lg:text-xs"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}

export default CtaBanner;
