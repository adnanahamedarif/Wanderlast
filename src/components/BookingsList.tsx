"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  CalendarDays,
  CircleCheck,
  Clock,
  Eye,
  Ticket,
  Trash2,
} from "lucide-react";
import { cn } from "cn";
import {
  formatBookingDeparture,
  type Booking,
  type BookingStatus,
} from "@/lib/bookings";
import {
  formatDestinationPrice,
  getDestinationImage,
} from "@/lib/destinations";

const statusStyles: Record<BookingStatus, string> = {
  Confirmed: "bg-emerald-50 text-emerald-600",
  Pending: "bg-amber-50 text-amber-600",
};

function StatusPill({ status }: { status: BookingStatus }) {
  const Icon = status === "Confirmed" ? CircleCheck : Clock;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] leading-none font-medium",
        statusStyles[status],
      )}
    >
      <Icon className="size-3" strokeWidth={2.2} />
      {status}
    </span>
  );
}

function BookingCard({
  booking,
  onCancel,
}: {
  booking: Booking;
  onCancel: (id: string) => void;
}) {
  const { destination } = booking;
  const detailsHref = destination._id
    ? `/destinations/${encodeURIComponent(destination._id)}`
    : "/destinations";

  function handleCancel() {
    if (
      window.confirm(
        `Cancel your booking to ${destination.destinationName}?`,
      )
    ) {
      onCancel(booking.id);
    }
  }

  return (
    <article className="flex flex-col gap-4 rounded border border-neutral-200 bg-white p-3 sm:flex-row sm:items-center">
      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-[3px] bg-neutral-100 sm:aspect-[3/2] sm:w-[32%] sm:max-w-[22rem]">
        <Image
          src={getDestinationImage(destination)}
          alt={`${destination.destinationName}, ${destination.country}`}
          fill
          sizes="(min-width: 640px) 352px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-end sm:pl-1">
        <div className="min-w-0">
          <StatusPill status={booking.status} />

          <h2 className="mt-2 font-display text-xl leading-tight font-normal text-neutral-900 md:text-2xl">
            {destination.destinationName}
          </h2>

          <div className="mt-2.5 space-y-1 text-xs text-neutral-500">
            <p className="flex items-center gap-1.5">
              <CalendarDays
                className="size-3.5 shrink-0 text-neutral-400"
                strokeWidth={1.8}
              />
              Departure: {formatBookingDeparture(destination.departureDate)}
            </p>
            <p className="flex items-center gap-1.5">
              <Ticket
                className="size-3.5 shrink-0 text-neutral-400"
                strokeWidth={1.8}
              />
              Booking ID: {booking.id}
            </p>
          </div>

          <p className="mt-2.5 text-[1.35rem] leading-none font-semibold text-brand md:text-2xl">
            {formatDestinationPrice(destination.price)}
          </p>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-2 sm:ml-auto">
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex h-8 items-center gap-1.5 rounded border border-red-200 bg-white px-3 text-[11px] font-medium text-red-500 transition-colors hover:bg-red-50"
          >
            <Trash2 className="size-3.5" strokeWidth={1.8} />
            Cancel
          </button>
          <Link
            href={detailsHref}
            className="inline-flex h-8 items-center gap-1.5 rounded bg-brand px-3.5 text-[11px] font-medium text-white transition-colors hover:bg-brand-dark"
          >
            <Eye className="size-3.5" strokeWidth={1.8} />
            View
          </Link>
        </div>
      </div>
    </article>
  );
}

type BookingsListProps = {
  bookings: Booking[];
};

function BookingsList({ bookings: initialBookings }: BookingsListProps) {
  const [bookings, setBookings] = useState(initialBookings);

  function cancelBooking(id: string) {
    setBookings((current) =>
      current.filter((booking) => booking.id !== id),
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="mt-8 rounded border border-dashed border-neutral-200 px-6 py-16 text-center">
        <p className="text-sm text-neutral-600">
          You don&apos;t have any upcoming bookings yet.
        </p>
        <Link
          href="/destinations"
          className="mt-4 inline-flex text-[10px] font-semibold tracking-[0.16em] text-brand uppercase transition-colors hover:text-brand-dark"
        >
          Explore Destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4 md:mt-10">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onCancel={cancelBooking}
        />
      ))}
    </div>
  );
}

export default BookingsList;
