"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Inter } from "next/font/google";
import { BuildingCardGrid } from "@/components/building-card-grid";
import { BuildingSearch } from "@/components/building-search";
import { fetchBuildings, type BuildingListItem } from "@/lib/buildings";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const galleryImages = [
  { alt: "Building Exterior", src: "/home/1.jpg" },
  { alt: "Building Entrance", src: "/home/2.jpg" },
  { alt: "Lobby Interior", src: "/home/3.jpg" },
  { alt: "Location Map", src: "/home/4.jpg" },
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

function HomeContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q")?.trim() ?? "";

  const [buildings, setBuildings] = useState<BuildingListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = searchQuery
      ? `Search: ${searchQuery} - Rental Buildings`
      : "Property Management Company - Rental Buildings";
  }, [searchQuery]);

  useEffect(() => {
    let cancelled = false;

    void Promise.resolve().then(() => {
      if (!cancelled) {
        setLoading(true);
        setError(null);
      }
    });

    void (async () => {
      try {
        const data = await fetchBuildings(
          searchQuery ? { q: searchQuery } : undefined,
        );

        if (!cancelled) {
          setBuildings(data);
          setError(null);
        }
      } catch (loadError) {
        if (!cancelled) {
          setBuildings([]);
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load buildings",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [searchQuery]);

  return (
    <>
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-12 border-t border-gray-300 pt-6">
          <h1 className="text-2xl font-medium tracking-wide text-gray-700">
            {searchQuery ? `Search results for “${searchQuery}”` : "Rental Buildings"}
          </h1>
          <BuildingSearch
            className="mt-6"
            inputId="home-building-search"
            defaultQuery={searchQuery}
            key={searchQuery}
          />
        </div>

        <BuildingCardGrid
          buildings={buildings}
          loading={loading}
          error={error}
          emptyMessage={
            searchQuery
              ? `No buildings found matching “${searchQuery}”.`
              : "No rental buildings available."
          }
        />
      </main>
    </>
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

      <Suspense
        fallback={
          <main className="mx-auto max-w-7xl px-6 py-12">
            <p className="text-sm text-gray-500">Loading buildings...</p>
          </main>
        }
      >
        <HomeContent />
      </Suspense>

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
