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
  formatDestinationRating,
  getDestinationImage,
  type Destination,
} from "@/lib/destinations";
import EditDestination from "@/components/EditDestination";
import DeleteDestination from "@/components/DeleteDestination";
import BookingCard from "@/components/BookingCard";

const defaultHighlights = [
  "Handpicked stays in prime locations",
  "Curated local experiences",
  "Flexible daily itinerary",
  "Free time to explore at your own pace",
  "24/7 travel support",
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

           <BookingCard destination={destination}/>
        </div>
      </div>
    </main>
  );
}

export default DestinationDetailsPage;
