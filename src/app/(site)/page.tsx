import Banner from "@/components/Banner";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CtaBanner from "@/components/CtaBanner";
import { getDestinations } from "@/lib/destinations";

export default async function Home() {
  const destinations = await getDestinations();

  return (
    <>
      <Banner />
      <FeaturedDestinations destinations={destinations} />
      <WhyChooseUs />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
