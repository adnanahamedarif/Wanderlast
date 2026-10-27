export type Destination = {
  _id?: string;
  destinationName: string;
  country: string;
  category: string;
  price: number | string;
  duration: string;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
  rating?: number | string;
  reviewCount?: number;
  highlights?: string[];
};

const destinationsApiUrl = "http://localhost:8000/destinations";

/**
 * Curated trips used to keep the page looking complete while the API is
 * unreachable or the collection is still empty. Images live in /public.
 */
export const sampleDestinations: Destination[] = [
  {
    destinationName: "Exuma Islands",
    country: "Bahamas",
    category: "Beach",
    price: 2700,
    duration: "7 Days/6 Nights",
    imageUrl: "/assets/destinations/image6.png",
    rating: 4.5,
  },
  {
    destinationName: "Maldives Escape",
    country: "Maldives",
    category: "Beach",
    price: 3250,
    duration: "6 Days/5 Nights",
    imageUrl: "/assets/destinations/image5.png",
    rating: 4.8,
  },
  {
    destinationName: "Annapurna Ridge",
    country: "Nepal",
    category: "Mountain",
    price: 1850,
    duration: "8 Days/7 Nights",
    imageUrl: "/assets/destinations/image4.png",
    rating: 4.7,
  },
  {
    destinationName: "Sacred Valley",
    country: "Peru",
    category: "Cultural",
    price: 2150,
    duration: "7 Days/6 Nights",
    imageUrl: "/assets/destinations/image3.png",
    rating: 4.9,
  },
  {
    destinationName: "Riviera Maya",
    country: "Mexico",
    category: "Beach",
    price: 1690,
    duration: "5 Days/4 Nights",
    imageUrl: "/assets/destinations/image2.png",
    rating: 4.6,
  },
  {
    destinationName: "Sonoran Desert",
    country: "United States",
    category: "Desert",
    price: 1290,
    duration: "4 Days/3 Nights",
    imageUrl: "/assets/destinations/image1.png",
    rating: 4.5,
  },
];

export function getDestinationPrice(price: number | string): number {
  const value =
    typeof price === "number"
      ? price
      : Number(String(price).replace(/[^0-9.-]/g, ""));

  return Number.isFinite(value) ? value : 0;
}

export function formatDestinationPrice(price: number | string): string {
  return `$${Math.round(getDestinationPrice(price))}`;
}

export function formatDestinationRating(rating?: number | string): string {
  const value = Number(rating);
  return Number.isFinite(value) && value > 0 ? value.toFixed(1) : "4.5";
}

export function getDestinationImage(destination: Destination): string {
  const imageUrl = destination.imageUrl?.trim();

  if (
    imageUrl &&
    (imageUrl.startsWith("https://") ||
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("/"))
  ) {
    return imageUrl;
  }

  return "/assets/destinations/image1.png";
}

export async function getDestinations(): Promise<Destination[]> {
  try {
    const response = await fetch(destinationsApiUrl, { cache: "no-store" });

    if (!response.ok) {
      return sampleDestinations;
    }

    const data = (await response.json()) as Destination[];

    return Array.isArray(data) && data.length > 0 ? data : sampleDestinations;
  } catch {
    return sampleDestinations;
  }
}
