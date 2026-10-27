import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/assets/person2.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/assets/person1.png",
  },
  {
    quote:
      "The Santorini Getaway Was Pure Perfection. Sunset Views, Charming Villages, And Effortless Planning Made It A Trip To Remember.",
    name: "James Carter",
    location: "London, UK",
    image: "/assets/person2.png",
  },
  {
    quote:
      "Kyoto In Autumn Was Breathtaking. The Temples, Gardens, And Local Food Tour Exceeded Every Expectation. We'll Definitely Be Back!",
    name: "Elena Rodriguez",
    location: "Barcelona, Spain",
    image: "/assets/person1.png",
  },
];

function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-white py-16 md:py-20 lg:pt-24 lg:pb-28"
    >
      <div className="mx-auto w-full max-w-[84rem] px-5 sm:px-6">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-4xl leading-tight font-normal tracking-[-0.02em] text-neutral-900 md:text-5xl lg:text-[3.5rem]">
                What Travelers Say
              </h2>
              <p className="mt-5 text-sm text-neutral-600 md:text-base lg:text-lg">
                Real experiences from our happy travelers
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <CarouselPrevious className="static size-11 border-neutral-300 text-neutral-500 shadow-none hover:bg-neutral-50 hover:text-neutral-900 sm:size-12 lg:size-16" />
              <CarouselNext className="static size-11 border-neutral-300 text-neutral-500 shadow-none hover:bg-neutral-50 hover:text-neutral-900 sm:size-12 lg:size-16" />
            </div>
          </div>

          <CarouselContent className="-ml-8 mt-10 lg:-ml-12">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.name}
                className="basis-full pl-8 md:basis-1/2 lg:pl-12"
              >
                <article className="flex h-full min-h-[17rem] gap-4 border border-neutral-200 bg-white p-5 lg:min-h-[19.5rem] lg:gap-5 lg:p-7">
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <blockquote className="text-sm leading-relaxed font-semibold text-neutral-900 lg:text-xl">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>

                    <div className="mt-6 lg:mt-8">
                      <div className="flex items-center gap-3">
                        <span className="h-px w-5 shrink-0 bg-brand" />
                        <p className="text-sm font-medium text-brand lg:text-lg">
                          {testimonial.name}
                        </p>
                      </div>
                      <p className="mt-1 pl-8 text-xs text-neutral-500 lg:text-base">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>

                  <div className="relative w-[34%] shrink-0 overflow-hidden bg-neutral-100 lg:w-[36%]">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="(max-width: 768px) 35vw, 18vw"
                      className="object-cover object-center"
                    />
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

export default Testimonials;
