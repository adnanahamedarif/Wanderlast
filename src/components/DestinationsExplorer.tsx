"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Star,
} from "lucide-react";
import { cn } from "cn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  formatDestinationPrice,
  formatDestinationRating,
  getDestinationImage,
  getDestinationPrice,
  type Destination,
} from "@/lib/destinations";

const priceRanges = [
  { value: "all", label: "All Prices" },
  { value: "under-1000", label: "Under $1,000" },
  { value: "1000-2000", label: "$1,000 - $2,000" },
  { value: "over-2000", label: "$2,000+" },
];

const sortOptions = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

type FilterOption = { value: string; label: string };

type FilterSelectProps = {
  label: string;
  value: string | null;
  options: FilterOption[];
  onValueChange: (value: string | null) => void;
};

function FilterSelect({
  label,
  value,
  options,
  onValueChange,
}: FilterSelectProps) {
  return (
    <Select
      items={options}
      value={value}
      onValueChange={(nextValue) => {
        const selected = nextValue ? String(nextValue) : null;
        onValueChange(selected === "all" ? null : selected);
      }}
    >
      <SelectTrigger
        aria-label={label}
        className={cn(
          "h-11 w-full justify-between rounded-none border-0 bg-[#fafafa] px-4 text-[10px] font-semibold tracking-[0.14em] text-neutral-600 uppercase shadow-none hover:bg-neutral-50 focus-visible:border-0 focus-visible:ring-0 data-[size=default]:h-11 md:text-[11px]",
          "[&_svg]:size-3.5 [&_svg]:text-neutral-400",
        )}
      >
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent align="start" alignItemWithTrigger={false}>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="text-[13px]"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function DestinationCard({
  destination,
  index,
}: {
  destination: Destination;
  index: number;
}) {
  const detailsHref = destination._id
    ? `/destinations/${encodeURIComponent(destination._id)}`
    : "/destinations";

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
        <Image
          src={getDestinationImage(destination)}
          alt={`${destination.destinationName}, ${destination.country}`}
          fill
          loading={index < 3 ? "eager" : "lazy"}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-[3px] bg-white/95 px-1.5 py-1 text-[10px] leading-none font-semibold text-neutral-900 shadow-sm">
          {formatDestinationRating(destination.rating)}
          <Star className="size-2.5 fill-amber-400 text-amber-400" />
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-3.5">
        <p className="flex items-center gap-1 text-[11px] text-neutral-500">
          <MapPin className="size-3 shrink-0" strokeWidth={1.8} />
          {destination.country}
        </p>

        <h2 className="mt-1.5 text-[15px] leading-snug font-medium text-neutral-900 md:text-base">
          {destination.destinationName}
        </h2>

        <p className="mt-1.5 text-[13px] leading-none font-semibold text-neutral-900">
          {formatDestinationPrice(destination.price)}
          <span className="ml-px text-[10px] font-normal text-neutral-500">
            /Person
          </span>
        </p>

        <p className="mt-2 flex items-center gap-1.5 text-[11px] text-neutral-500">
          <CalendarDays className="size-3.5 shrink-0" strokeWidth={1.8} />
          {destination.duration}
        </p>

        <Link
          href={detailsHref}
          className="mt-auto inline-flex items-center gap-1 pt-3 text-[10px] font-semibold tracking-[0.16em] text-brand uppercase transition-colors hover:text-brand-dark"
        >
          Book Now
          <ArrowUpRight className="size-3" strokeWidth={2.4} />
        </Link>
      </div>
    </article>
  );
}

type DestinationsExplorerProps = {
  destinations: Destination[];
};

function DestinationsExplorer({ destinations }: DestinationsExplorerProps) {
  const [category, setCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);

  const categoryOptions = useMemo<FilterOption[]>(() => {
    const categories = Array.from(
      new Set(
        destinations
          .map((destination) => destination.category?.trim())
          .filter((value): value is string => Boolean(value)),
      ),
    ).sort((a, b) => a.localeCompare(b));

    return [
      { value: "all", label: "All Categories" },
      ...categories.map((value) => ({ value, label: value })),
    ];
  }, [destinations]);

  const visibleDestinations = useMemo(() => {
    const filtered = destinations.filter((destination) => {
      if (category !== null && destination.category !== category) {
        return false;
      }

      const price = getDestinationPrice(destination.price);

      if (priceRange === "under-1000") return price < 1000;
      if (priceRange === "1000-2000") return price >= 1000 && price <= 2000;
      if (priceRange === "over-2000") return price > 2000;

      return true;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "price-asc") {
        return getDestinationPrice(a.price) - getDestinationPrice(b.price);
      }

      if (sortBy === "price-desc") {
        return getDestinationPrice(b.price) - getDestinationPrice(a.price);
      }

      if (sortBy === "name-asc") {
        return a.destinationName.localeCompare(b.destinationName);
      }

      return 0;
    });
  }, [category, destinations, priceRange, sortBy]);

  function clearFilters() {
    setCategory(null);
    setPriceRange(null);
    setSortBy(null);
  }

  return (
    <section aria-labelledby="destinations-heading">
      <h1
        id="destinations-heading"
        className="font-display text-[2.125rem] leading-tight font-normal tracking-[-0.02em] text-neutral-900 md:text-5xl"
      >
        Explore All Destinations
      </h1>
      <p className="mt-3 text-sm text-neutral-500 md:text-[15px]">
        Find your perfect travel experience from our curated collection
      </p>

      <div className="mt-7 grid grid-cols-1 gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-3">
        <FilterSelect
          label="Category"
          value={category}
          options={categoryOptions}
          onValueChange={setCategory}
        />
        <FilterSelect
          label="Price Range"
          value={priceRange}
          options={priceRanges}
          onValueChange={setPriceRange}
        />
        <FilterSelect
          label="Sort By"
          value={sortBy}
          options={sortOptions}
          onValueChange={setSortBy}
        />
      </div>

      <p className="mt-4 text-[11px] text-neutral-500 md:text-xs" aria-live="polite">
        Showing {visibleDestinations.length}{" "}
        {visibleDestinations.length === 1 ? "destination" : "destinations"}
      </p>

      {visibleDestinations.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-10">
          {visibleDestinations.map((destination, index) => (
            <DestinationCard
              key={
                destination._id ??
                `${destination.destinationName}-${destination.country}-${index}`
              }
              destination={destination}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="mt-4 border border-dashed border-neutral-200 px-6 py-16 text-center">
          <p className="text-sm text-neutral-600">
            No destinations match your filters.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 text-[10px] font-semibold tracking-[0.16em] text-brand uppercase transition-colors hover:text-brand-dark"
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
}

export default DestinationsExplorer;
