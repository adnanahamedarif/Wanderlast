import type { Destination } from "@/lib/destinations";

export type BookingStatus = "Confirmed" | "Pending";

export type Booking = {
  id: string;
  status: BookingStatus;
  destination: Destination;
};

const bookingSeeds: { id: string; status: BookingStatus }[] = [
  { id: "b1", status: "Confirmed" },
  { id: "b2", status: "Confirmed" },
  { id: "b3", status: "Pending" },
];

const preferredDestinations = [
  "Bali Paradise",
  "Santorini Sunset Escape",
  "Cinque Terre Coastal Walk",
];

/**
 * There is no bookings endpoint yet, so the page shows a small set of demo
 * bookings built from real destination records. Keeping this in one place
 * makes it easy to swap for the real API later.
 */
export function buildDemoBookings(destinations: Destination[]): Booking[] {
  const picked: Destination[] = [];

  for (const name of preferredDestinations) {
    const match = destinations.find(
      (destination) => destination.destinationName.trim() === name,
    );

    if (match) picked.push(match);
  }

  for (const destination of destinations) {
    if (picked.length >= bookingSeeds.length) break;
    if (!picked.includes(destination)) picked.push(destination);
  }

  return picked.slice(0, bookingSeeds.length).map((destination, index) => ({
    ...bookingSeeds[index],
    destination,
  }));
}

export function formatBookingDeparture(value?: string) {
  if (!value) return "To be confirmed";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
