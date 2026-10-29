import type { Metadata } from "next";
import DestinationsExplorer from "@/components/DestinationsExplorer";
import { getDestinations } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "Destinations | Wanderlast",
  description:
    "Browse our curated collection of unforgettable destinations and find your next adventure.",
};

async function AllDestinationsPage() {
  const destinations = await getDestinations();

  return (
    <main className="flex-1 bg-white">
      <div className="mx-auto w-full max-w-[84rem] px-5 py-12 sm:px-6 md:py-16">
        <DestinationsExplorer destinations={destinations} />
      </div>
    </main>
  );
}

export default AllDestinationsPage;
