import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  MapPin,
  Star,
} from "lucide-react";
import {
  formatDestinationPrice,
  formatDestinationRating,
  getDestinationImage,
  type Destination,
} from "@/lib/destinations";
import EditDestination from "@/components/EditDestination";
import DeleteDestination from "@/components/DeleteDestination";

const defaultHighlights = [
  "Handpicked stays in prime locations",
  "Curated local experiences",
  "Flexible daily itinerary",
  "Free time to explore at your own pace",
  "24/7 travel support",
];

const bookingPerks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

const getDestination = cache(async (id: string): Promise<Destination | null> => {
  try {
    const response = await fetch(
      `http://localhost:8000/destination/${encodeURIComponent(id)}`,
      { cache: "no-store" },
    );

    if (!response.ok) return null;

    const data = (await response.json()) as Destination;

    return data?.destinationName ? data : null;
  } catch {
    return null;
  }
});

function formatDepartureDate(value?: string) {
  if (!value) return "Flexible dates";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export async function generateMetadata({
  params,
}: PageProps<"/destinations/[id]">): Promise<Metadata> {
  const { id } = await params;
  const destination = await getDestination(id);

  if (!destination) return { title: "Destination not found | Wanderlast" };

  return {
    title: `${destination.destinationName} | Wanderlast`,
    description: destination.description,
  };
}

async function DestinationDetailsPage({
  params,
}: PageProps<"/destinations/[id]">) {
  const { id } = await params;
  const destination = await getDestination(id);

  if (!destination) notFound();

  const highlights = destination.highlights?.length
    ? destination.highlights
    : defaultHighlights;
  const overview =
    destination.description?.trim() ||
    `Discover ${destination.destinationName} with a curated travel experience designed around the best of ${destination.country}.`;

  return (
    <main className="flex-1 bg-[#f7f7f8]">
      <div className="mx-auto w-full max-w-[84rem] px-5 py-8 sm:px-6 md:py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-brand"
          >
            <ArrowLeft className="size-4" strokeWidth={1.8} />
            Back to Destinations
          </Link>

          <div className="flex items-center gap-3">
            <EditDestination destination ={destination}/>
            <DeleteDestination id={id}/>
          </div>
        </div>

        <div className="relative mt-5 aspect-[4/3] w-full overflow-hidden rounded-sm bg-neutral-200 sm:aspect-[16/6] lg:aspect-[16/5]">
          <Image
            src={getDestinationImage(destination)}
            alt={`${destination.destinationName}, ${destination.country}`}
            fill
            preload
            sizes="(min-width: 84rem) 1284px, 100vw"
            className="object-cover"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-8">
          <div>
            <p className="flex items-center gap-1.5 text-xs text-neutral-500">
              <MapPin className="size-3.5 shrink-0" strokeWidth={1.8} />
              {destination.country}
            </p>

            <h1 className="mt-3 font-display text-[2rem] leading-tight font-normal tracking-[-0.02em] text-neutral-900 md:text-[2.5rem]">
              {destination.destinationName}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-emerald-600">
                <Star
                  className="size-4 fill-emerald-600 text-emerald-600"
                  strokeWidth={1.5}
                />
                {formatDestinationRating(destination.rating)}
              </span>
              {destination.reviewCount !== undefined && (
                <span className="text-neutral-500">
                  ({destination.reviewCount} reviews)
                </span>
              )}
              <span className="flex items-center gap-1.5 text-neutral-500">
                <CalendarDays
                  className="size-4 shrink-0"
                  strokeWidth={1.8}
                />
                {destination.duration}
              </span>
            </div>

            <section className="mt-9">
              <h2 className="text-lg font-medium text-neutral-900 md:text-xl">
                Overview
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600">
                {overview}
              </p>
            </section>

            <section className="mt-8">
              <h2 className="text-lg font-medium text-neutral-900 md:text-xl">
                Highlights
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-neutral-600">
                A few of the moments that make this trip unforgettable.
              </p>

              <ul className="mt-4 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
                {highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-2 text-xs text-neutral-700 md:text-sm"
                  >
                    <Check
                      className="size-4 shrink-0 text-emerald-600"
                      strokeWidth={2.4}
                    />
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
              <p className="text-[11px] text-neutral-500">Starting from</p>
              <p className="mt-1.5 text-3xl leading-none font-semibold text-brand md:text-[2rem]">
                {formatDestinationPrice(destination.price)}
              </p>
              <p className="mt-1.5 text-[11px] text-neutral-500">per person</p>

              <div className="mt-5 flex h-10 items-center rounded border border-neutral-200 bg-neutral-50 px-3 text-[13px] text-neutral-800">
                {formatDepartureDate(destination.departureDate)}
              </div>

              <Link
                href="/bookings"
                className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded bg-brand text-[13px] font-medium text-white transition-colors hover:bg-brand-dark"
              >
                Book Now
                <ArrowRight className="size-4" strokeWidth={1.8} />
              </Link>

              <ul className="mt-4 space-y-2.5">
                {bookingPerks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-center gap-2 text-[11px] text-neutral-600"
                  >
                    <Check
                      className="size-3.5 shrink-0 text-emerald-600"
                      strokeWidth={2.4}
                    />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default DestinationDetailsPage;
