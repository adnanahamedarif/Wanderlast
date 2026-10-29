"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, Trash2, CheckCircle2, Clock } from "lucide-react";

/**
 * Interface definition for Booking data type
 */
// export interface IBooking {
//   _id: string;
//   destinationName: string;
//   departureDate: string;
//   price: number;
//   imageUrl: string;
//   status?: 'Confirmed' | 'Pending' | 'Cancelled';
//   currency?: string;
// }

export default function MyBookingCard({ booking }) {
  const handleCancel = async () => {
    // Note: window.confirm is used here for simplicity as per legacy code, 
    // but in production consider a custom modal since alert/confirm can be restricted.
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/bookings/${booking._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Using window.alert as in legacy snippet, replaced with graceful UI in real apps
        alert("Booking cancelled successfully!");
        window.location.reload();
      } else {
        alert("Failed to cancel booking.");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    }
  };

  // Determine status badge styling and icon
  const isConfirmed = booking.status === "Confirmed" || !booking.status;
  const currencySymbol = booking.currency || "$";

  return (
    <Card
      key={booking._id}
      className="overflow-hidden bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div className="flex flex-col md:flex-row items-stretch">
        {/* Image Section */}
        <div className="relative w-full md:w-[300px] h-[200px] md:h-auto shrink-0 bg-slate-100">
          <Image
            height={400}
            width={400}
            src={booking.imageUrl}
            alt={booking.destinationName || "Destination"}
            className="w-full h-full object-cover"
            priority={false}
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
          <div>
            {/* Header with Title and Status Badge */}
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-slate-900">
                {booking.destinationName}
              </h2>
              
              {/* Status Badge */}
              {isConfirmed ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Confirmed
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  Pending
                </span>
              )}
            </div>

            {/* Booking Meta Details */}
            <div className="space-y-1.5 text-sm text-slate-500 mt-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Departure: {booking.departureDate}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-4 h-4 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">📍</span>
                <span>Booking ID: {booking._id}</span>
              </div>
            </div>

            {/* Price Display */}
            <div className="mt-4 text-2xl font-bold text-cyan-600">
              {currencySymbol}{booking.price}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100 md:border-0 md:pt-0">
            {/* Cancel Button */}
            <Button
              variant="outline"
              onClick={handleCancel}
              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 gap-1.5 h-10 px-4 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Cancel
            </Button>

            {/* View Details Link wrapped in Shadcn Button asChild pattern */}
            <Button
              
              className="bg-cyan-500 hover:bg-cyan-600 text-white gap-1.5 h-10 px-5 rounded-lg shadow-sm transition-colors"
            >
              <Link href={`/my-bookings/${booking._id}`}>
                <Eye className="w-4 h-4" />
                View
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}