"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useSyncExternalStore } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Star,
} from "lucide-react";
import {
  formatDestinationPrice,
  formatDestinationRating,
  getDestinationImage,
  type Destination,
} from "@/lib/destinations";

function FeaturedDestinationCard({
  destination,
  index,
}: {
  destination: Destination;
  index: number;
}) {
  const detailsHref = destination._id
    ? `/destinations/${encodeURIComponent(destination._id)}`
    : "/destinations";

  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
        <Image
          src={getDestinationImage(destination)}
          alt={`${destination.destinationName}, ${destination.country}`}
          fill
          loading={index < 2 ? "eager" : "lazy"}
          sizes="(min-width: 1024px) 44vw, (min-width: 640px) 48vw, 82vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-[3px] bg-white/95 px-2 py-1 text-[11px] leading-none font-semibold text-neutral-900 shadow-sm">
          {formatDestinationRating(destination.rating)}
          <Star className="size-3 fill-amber-400 text-amber-400" />
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <p className="flex items-center gap-1.5 text-xs text-neutral-500">
          <MapPin className="size-3.5 shrink-0" strokeWidth={1.8} />
          {destination.country}
        </p>

        <div className="mt-2 flex items-baseline justify-between gap-4">
          <h3 className="min-w-0 truncate text-[17px] leading-snug font-medium text-neutral-900 md:text-lg">
            {destination.destinationName}
          </h3>
          <p className="shrink-0 text-[15px] leading-none font-semibold text-neutral-900 md:text-base">
            {formatDestinationPrice(destination.price)}
            <span className="text-[10px] font-normal text-neutral-500">
              /Person
            </span>
          </p>
        </div>

        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-neutral-500">
          <CalendarDays className="size-3.5 shrink-0" strokeWidth={1.8} />
          {destination.duration}
        </p>

        <Link
          href={detailsHref}
          className="mt-auto inline-flex items-center gap-1 pt-4 text-[10px] font-semibold tracking-[0.16em] text-brand uppercase transition-colors hover:text-brand-dark"
        >
          Book Now
          <ArrowUpRight className="size-3" strokeWidth={2.4} />
        </Link>
      </div>
    </article>
  );
}

type FeaturedDestinationsProps = {
  destinations: Destination[];
};

function FeaturedDestinations({ destinations }: FeaturedDestinationsProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!emblaApi) return () => {};

      emblaApi.on("select", onStoreChange);
      emblaApi.on("reInit", onStoreChange);

      return () => {
        emblaApi.off("select", onStoreChange);
        emblaApi.off("reInit", onStoreChange);
      };
    },
    [emblaApi],
  );

  const selectedIndex = useSyncExternalStore(
    subscribe,
    () => emblaApi?.selectedScrollSnap() ?? 0,
    () => 0,
  );
  const snapCount = useSyncExternalStore(
    subscribe,
    () => emblaApi?.scrollSnapList().length || 1,
    () => 1,
  );
  const canScrollPrev = useSyncExternalStore(
    subscribe,
    () => emblaApi?.canScrollPrev() ?? false,
    () => false,
  );
  const canScrollNext = useSyncExternalStore(
    subscribe,
    () => emblaApi?.canScrollNext() ?? false,
    () => false,
  );

  return (
    <section
      id="featured-destinations"
      aria-labelledby="featured-destinations-heading"
      className="bg-white py-16 md:py-20 lg:pt-24 lg:pb-20"
    >
      <div className="mx-auto w-full max-w-[84rem] px-5 sm:px-6">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              id="featured-destinations-heading"
              className="text-4xl leading-tight font-semibold tracking-[-0.02em] text-neutral-900 md:text-5xl lg:text-[3.25rem]"
            >
              Featured Destinations
            </h2>
            <p className="mt-3 text-sm text-neutral-600 md:text-base">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/destinations"
            className="inline-flex h-10 shrink-0 items-center gap-5 border border-brand/50 px-5 text-[10px] font-semibold tracking-[0.16em] text-brand uppercase transition-colors hover:border-brand hover:bg-brand hover:text-white md:text-[11px]"
          >
            All Destinations
            <ArrowRight className="size-3.5" strokeWidth={1.8} />
          </Link>
        </div>

        <div className="mt-9 overflow-hidden lg:mt-10" ref={emblaRef}>
          <div className="-ml-4 flex touch-pan-y sm:-ml-5">
            {destinations.map((destination, index) => (
              <div
                key={
                  destination._id ??
                  `${destination.destinationName}-${destination.country}-${index}`
                }
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${destinations.length}`}
                className="min-w-0 shrink-0 grow-0 basis-[82%] pl-4 sm:basis-[48%] sm:pl-5 lg:basis-[44%]"
              >
                <FeaturedDestinationCard
                  destination={destination}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-9 flex items-center gap-4 md:gap-6">
          <span className="shrink-0 text-sm text-neutral-500 tabular-nums">
            {selectedIndex + 1}/{snapCount}
          </span>
          <span className="h-px flex-1 bg-neutral-200" />

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Previous destinations"
              className="flex size-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-40 sm:size-11"
            >
              <ArrowLeft className="size-4" strokeWidth={1.7} />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Next destinations"
              className="flex size-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition-colors hover:border-neutral-400 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-40 sm:size-11"
            >
              <ArrowRight className="size-4" strokeWidth={1.7} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedDestinations;
