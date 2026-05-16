import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { buildings } from "@/lib/buildings";

export const metadata: Metadata = {
  title: "Property Management Company - Rental Buildings",
  description:
    "Browse rental buildings and apartments across New York City, from Sutton Place and Murray Hill to Brooklyn Heights and Chelsea.",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const galleryImages = [
  {
    alt: "Building Exterior",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmgAjhsVxxhCuJMMeWswSUZGS4jdyXV8_Q2GBYiRpjq4jid05GFLV3DukgErBhS9cCNJDRDxxmO0-ef923tj-ar5-P8-aNJvV24tWFwdGH8fw_m6yT59l9mrEIUL1XxPcZ1goityNwM7LK6iw-t65xpucNKDqOpEpnHaXrVTNVoDJdvOe8xVAt4F728UDfwF2VBxgpd1Yp3MeP23k2K7ZI1-Ok7XQApw9utHbFFZJq4M-ajGoIMUm8fIWOnc0Xv9mZ9Eh_d2ya4D1n",
  },
  {
    alt: "Building Entrance",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA747tdACXwW6sn_Anwi_UdhaKYpxgQ1Bm0in317-s3BfYxCvHRdIGOeQCTsjgw8fgsE4UkcHZ75bxXhUAGzya_m__N0JnqQndN0sIsNK1p4K1XWs6ESvZkihZvVyE0kulCCEs_vZZgFpNvmh-AZdQZAPJ3_YM4mJM_6ye4KMqCFU4WEIPFcMT_ruNe9mjl6WjKr8i92z80lW-_KnbKI06LEhtNV8jaMu6hmFrYUzuwV8tyv1YM6j2NJedbXOvZmPtNh9DbZlJyaeo9",
  },
  {
    alt: "Lobby Interior",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCME43iYNnMGj8yVkOHKcTX3bC965morYnDPPBUiK0dJhblkaqmJGA-bBPbkfJa1845KPjVYYLJ9NS93RxqywrcWrN1JAKmNcJ1dJTXRhUk3dhoDNkC1Gbm_Nqyg2nN8gA5OhvgQZD0uqWOc0t8yR399_t9kibn4dcSrm9A8rzXmoN87FtKACmPISZ7s8WR0rSWAA7RqT0OHi7hQaM8XCm6y7tbqGJFJLQIdeAVDuU-i8q0H-Sa5ANhVjLZm3nShYv3PZBAQVkudtSn",
  },
  {
    alt: "Location Map",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBid7ZUnfLrRec-UlZ6vgmiS4GjNINl5JJAjDSSNkGzOB6MCcsfJncC2KooXjL1cOvHd3WrnbuW28NYGCjyprDYQYkJxfR_9RnmDGCyI9M1glTaPiRR9Qzp6gF3IQYlAchUZu6Q74m_lldmikvtjGaUwdZaktzyoni4ZVli8QanVljMFGVLYYZ3qZGRsXzayLFRyuJA4-Ze4r0tfD2nvbuA8h059MCb4H90q4rHqDM1O0e0QmF441APG2ZcDhsqF8feMAo7hzK5-Int",
  },
] as const;

function ChevronLeftIcon() {
  return (
    <svg
      className="h-10 w-10"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        d="M15 19l-7-7 7-7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
      />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      className="h-10 w-10"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        d="M9 5l7 7-7 7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
      />
    </svg>
  );
}

function BrandLogo() {
  return (
    <div className="flex h-16 w-12 flex-col items-center justify-center border-2 border-gray-400 p-1">
      <div className="grid grid-cols-3 gap-0.5">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className={`h-1.5 w-1.5 ${index === 4 ? "bg-orange-400" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className={`${inter.className} bg-white text-[#333]`}>
      <header className="relative border-b border-gray-100 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <button
            type="button"
            aria-label="Menu"
            className="flex flex-col gap-1.5 p-2"
          >
            <span className="h-0.5 w-8 bg-gray-400" />
            <span className="h-0.5 w-8 bg-gray-400" />
            <span className="h-0.5 w-8 bg-gray-400" />
          </button>

          <div className="absolute left-1/2 -translate-x-1/2">
            <BrandLogo />
          </div>

          <div className="w-12" aria-hidden />
        </div>
      </header>

      <section className="relative py-8">
        <button
          type="button"
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 text-gray-300 transition-colors hover:text-gray-600 md:block"
        >
          <ChevronLeftIcon />
        </button>

        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 md:px-8 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
          {galleryImages.map((image) => (
            <div
              key={image.alt}
              className="w-80 shrink-0 snap-start md:w-1/4"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={640}
                height={450}
                className="h-[450px] w-full object-cover"
                sizes="(max-width: 768px) 320px, 25vw"
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 text-gray-300 transition-colors hover:text-gray-600 md:block"
        >
          <ChevronRightIcon />
        </button>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-12 border-t border-gray-300 pt-6">
          <h1 className="text-2xl font-medium tracking-wide text-gray-700">
            Rental Buildings
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
          {buildings.map((property) => (
            <article
              key={property.id}
              className="flex flex-col border border-gray-300 sm:flex-row"
            >
              <div className="relative aspect-4/3 sm:aspect-auto sm:w-1/2 sm:min-h-[240px]">
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="flex w-full flex-col justify-between p-6 sm:w-1/2">
                <div>
                  <h2 className="text-3xl font-medium leading-tight text-gray-800">
                    {property.name}
                  </h2>
                  <p className="mt-2 text-sm uppercase tracking-widest text-gray-500">
                    {property.location}
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href={`/buildings/${property.id}`}
                    className="inline-block cursor-pointer bg-[#4a4a4a] px-4 py-2 text-xs font-medium uppercase tracking-tighter text-white transition-colors hover:bg-black"
                  >
                    See Apartments
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="mb-12 mt-24 border-t border-gray-300 pt-12 text-center">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-[10px] font-medium uppercase tracking-widest text-gray-500">
            <span>Property Management Company</span>
            <span className="hidden sm:inline">•</span>
            <span>123 Main Street</span>
            <span className="hidden sm:inline">•</span>
            <span>New York, New York 10000</span>
            <span className="hidden sm:inline">•</span>
            <span>212.555.2121</span>
            <span className="hidden sm:inline">•</span>
            <a className="hover:text-gray-800" href="#">
              www.propertymanagementco.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
