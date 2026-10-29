import MyBookingCard from "@/components/MyBookingCard";
import BookingsList from "@/components/MyBookingCard";
import { auth } from "@/lib/auth";
import type { IBooking } from "@/types";
import { headers } from "next/headers";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;


  const res = await fetch(
    `http://localhost:8000/bookings/${user?.email}`
  );

  const bookings:IBooking[] = await res.json();


  console.log(bookings);

  return (
    <main className="flex-1 bg-white">
      <div className="mx-auto w-full max-w-[84rem] px-5 py-12 sm:px-6 md:py-16">
        <h1 className="font-display text-[2.125rem] md:text-5xl">
          My Bookings
        </h1>

        <p className="mt-3 text-sm text-neutral-500">
          Manage and view your upcoming travel plans
        </p>

       <div>
        {
          bookings.map((booking)=>{
            return(
               <MyBookingCard booking={booking} key={booking._id} />
            );
          })
        }
       </div>
      </div>
    </main>
  );
};

export default MyBookingsPage;