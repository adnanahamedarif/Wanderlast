import Image from "next/image";

const features = [
  {
    icon: "/assets/ShieldCheck.png",
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/assets/MapTrifold.png",
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/assets/Headset.png",
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="bg-[#eaf7fb] py-16 md:py-20 lg:pt-[6.5rem] lg:pb-20"
    >
      <div className="mx-auto w-full max-w-[84rem] px-5 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[2.125rem] leading-tight font-normal tracking-[-0.02em] text-neutral-900 md:text-5xl lg:text-[3.375rem]">
            Why Choose Wanderlust
          </h2>
          <p className="mt-4 text-sm text-neutral-600 md:text-base">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="flex h-full flex-col bg-white p-8 lg:min-h-[18rem] lg:px-12 lg:pt-10 lg:pb-12"
            >
              <Image
                src={feature.icon}
                alt=""
                width={48}
                height={48}
                className="size-10 lg:size-12"
              />
              <h3 className="mt-6 font-display text-2xl leading-snug text-neutral-900 lg:text-[1.875rem]">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 lg:mt-2">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
