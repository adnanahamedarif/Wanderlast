
"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Input } from "./ui/input";
import {
  formatDestinationPrice,
  type Destination,
} from "@/lib/destinations";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const bookingPerks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

interface BookingCardProps {
  destination: Destination;
}

const BookingCard = ({ destination }: BookingCardProps) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBooking = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!user) {
      router.push("/login");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const departureDate = formData.get("departureDate");

    if (typeof departureDate !== "string" || !departureDate) {
      setError("Please select a departure date.");
      return;
    }

    const data = {
      username: user.name,
      email: user.email,
      image: user.image,
      ...destination,
      departureDate,
    };

    try {
      setLoading(true);

      const res = await fetch("http://localhost:8000/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Read the response as text first to avoid JSON parsing errors.
      const responseText = await res.text();

      let bookingRes;

      try {
        bookingRes = JSON.parse(responseText);
      } catch {
        throw new Error(
          `Server returned an invalid response (HTTP ${res.status}). Check your backend terminal.`
        );
      }

      if (!res.ok) {
        throw new Error(
          bookingRes.message || `Booking failed (HTTP ${res.status}).`
        );
      }

      router.push("/bookings");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="lg:sticky lg:top-24">
      <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
        <p className="text-[11px] text-neutral-500">
          Starting from
        </p>

        <p className="mt-1.5 text-3xl leading-none font-semibold text-brand md:text-[2rem]">
          {formatDestinationPrice(destination.price)}
        </p>

        <p className="mt-1.5 text-[11px] text-neutral-500">
          per person
        </p>

        <form onSubmit={handleBooking}>
          <Input
            type="date"
            name="departureDate"
            aria-label="Departure date"
            defaultValue={destination.departureDate}
            className="mt-5 h-10 rounded border border-neutral-200 bg-neutral-50 px-3 text-[13px] text-neutral-800"
            required
          />

          {error && (
            <p className="mt-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded bg-brand text-[13px] font-medium text-white transition-colors hover:bg-brand-dark"
          >
            {loading ? "Booking..." : "Book Now"}
          </Button>
        </form>

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
  );
};

export default BookingCard;
