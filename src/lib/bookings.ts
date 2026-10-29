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

const bookingsApiUrl = "http://localhost:8000/booking";

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

type RawRecord = Record<string, unknown>;

function isRecord(value: unknown): value is RawRecord {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function asNumber(value: unknown): number | undefined {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) ? number : undefined;
}

function asPrice(value: unknown): number | string {
  const number = asNumber(value);
  return number === undefined ? 0 : number;
}

/**
 * Bookings are stored by the API as a flat destination document with the
 * traveller details mixed in, so the destination fields sit on the booking
 * itself. A nested `destination` object is supported as well, which keeps the
 * UI working if the API response shape changes.
 */
function toBooking(raw: RawRecord, index: number): Booking {
  const nested = isRecord(raw.destination) ? raw.destination : raw;

  const destination: Destination = {
    _id: asString(nested._id) ?? asString(raw._id),
    destinationName:
      asString(nested.destinationName) ?? asString(nested.name) ?? "Untitled trip",
    country: asString(nested.country) ?? "To be confirmed",
    category: asString(nested.category) ?? "",
    price: asPrice(nested.price),
    duration: asString(nested.duration) ?? "",
    departureDate:
      asString(raw.departureDate) ?? asString(nested.departureDate),
    imageUrl: asString(nested.imageUrl),
    description: asString(nested.description),
    rating: asNumber(nested.rating),
    reviewCount: asNumber(nested.reviewCount),
    highlights: Array.isArray(nested.highlights)
      ? nested.highlights.filter(
          (highlight): highlight is string => typeof highlight === "string",
        )
      : undefined,
  };

  const status: BookingStatus =
    asString(raw.status)?.toLowerCase() === "pending" ? "Pending" : "Confirmed";

  return {
    id: asString(raw._id) ?? asString(raw.id) ?? `booking-${index + 1}`,
    status,
    destination,
  };
}

export function normalizeBookings(data: unknown): Booking[] {
  const list = Array.isArray(data)
    ? data
    : isRecord(data) && Array.isArray(data.bookings)
      ? data.bookings
      : [];

  return list.filter(isRecord).map(toBooking);
}

/**
 * Returns `null` when the API cannot be reached so the page can fall back to
 * demo bookings, and an empty array when the user simply has no bookings.
 */
export async function getUserBookings(
  email?: string,
): Promise<Booking[] | null> {
  if (!email) return [];

  try {
    const response = await fetch(
      `${bookingsApiUrl}/${encodeURIComponent(email)}`,
      { cache: "no-store" },
    );

    if (!response.ok) return null;

    return normalizeBookings(await response.json());
  } catch {
    return null;
  }
}
