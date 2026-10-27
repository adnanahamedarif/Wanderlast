import type { Metadata } from "next";
import BookingsList from "@/components/BookingsList";
import { buildDemoBookings } from "@/lib/bookings";
import { getDestinations } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "My Bookings | Wanderlast",
  description: "Manage and view your upcoming travel plans.",
};

async function MyBookingsPage() {
  const destinations = await getDestinations();
  const bookings = buildDemoBookings(destinations);

  return (
    <main className="flex-1 bg-white">
      <div className="mx-auto w-full max-w-[84rem] px-5 py-12 sm:px-6 md:py-16">
        <h1 className="font-display text-[2.125rem] leading-tight font-normal tracking-[-0.02em] text-neutral-900 md:text-5xl">
          My Bookings
        </h1>
        <p className="mt-3 text-sm text-neutral-500 md:text-[15px]">
          Manage and view your upcoming travel plans
        </p>

        <BookingsList bookings={bookings} />
      </div>
    </main>
  );
}

export default MyBookingsPage;
