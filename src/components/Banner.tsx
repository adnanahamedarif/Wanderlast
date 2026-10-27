import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const searchFields = [
  {
    id: "location",
    label: "Location",
    placeholder: "Address, City Or Zip",
    type: "text",
  },
  {
    id: "date",
    label: "Date/Duration",
    placeholder: "Anytime 3 Days",
    type: "text",
  },
  {
    id: "budget",
    label: "Budget",
    placeholder: "$0-$3000",
    type: "text",
  },
  {
    id: "people",
    label: "People",
    placeholder: "5-10",
    type: "text",
  },
];

function Banner() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] flex-1 flex-col overflow-hidden bg-neutral-900 md:min-h-[calc(100svh-5rem)]">
      <Image
        src="/assets/Banner.png"
        alt="Aerial view of a turquoise bay surrounded by green hills"
        fill
        preload
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div className="-z-10 absolute inset-0 bg-black/35" />

      <div className="flex flex-1 flex-col items-center justify-center px-5 pt-20 pb-10 text-center md:px-8 lg:pt-28 lg:pb-6">
        <h1 className="font-display text-[clamp(2.75rem,6.4vw,6.25rem)] leading-[1.08] font-normal tracking-[-0.02em] text-white">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base lg:text-xl">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="#destinations"
            className="inline-flex h-12 items-center justify-center gap-3 bg-brand px-9 text-[11px] font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:bg-brand-dark lg:h-16 lg:px-16 lg:text-sm"
          >
            Explore Now
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="#destinations"
            className="inline-flex h-12 items-center justify-center bg-white/25 px-9 text-[11px] font-semibold tracking-[0.14em] text-white uppercase backdrop-blur-[2px] transition-colors hover:bg-white/35 lg:h-16 lg:px-16 lg:text-sm"
          >
            View Destination
          </Link>
        </div>
      </div>

      <form
        role="search"
        className="grid w-full grid-cols-1 gap-px bg-white/80 sm:grid-cols-2 lg:grid-cols-[1.65fr_1fr_0.85fr_0.9fr_14rem]"
      >
        {searchFields.map((field) => (
          <label
            key={field.id}
            htmlFor={field.id}
            className="flex cursor-text flex-col justify-center gap-1 bg-[#e9e7e4] px-6 py-4 transition-colors focus-within:bg-[#efedeb] sm:px-7 lg:min-h-[7.75rem] lg:px-8"
          >
            <span className="text-sm font-semibold text-neutral-900">
              {field.label}
            </span>
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete="off"
              className="w-full bg-transparent text-[13px] text-neutral-700 outline-none placeholder:text-neutral-500"
            />
          </label>
        ))}

        <button
          type="submit"
          className="flex min-h-14 items-center justify-center bg-brand px-8 text-base font-semibold text-white transition-colors hover:bg-brand-dark sm:col-span-2 lg:col-span-1 lg:min-h-[7.75rem]"
        >
          Search
        </button>
      </form>
    </section>
  );
}

export default Banner;
