"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Inter } from "next/font/google";
import {
  fetchBuilding,
  parseBuildingId,
  type Apartment,
  type BuildingDetail,
  type PolicyItem,
} from "@/lib/buildings";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

function BuildingLogo() {
  return (
    <div className="flex h-14 w-12 flex-col items-center justify-center border-2 border-gray-400 p-1">
      <div className="grid grid-cols-3 gap-0.5">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className={`h-1.5 w-1.5 ${index === 7 ? "bg-orange-300" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="mb-8 border-b border-gray-300">
      <h2 className="pb-2 text-2xl font-medium text-gray-800">{children}</h2>
    </div>
  );
}

function PolicyBlock({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-6 inline-block w-full bg-gray-600 px-3 py-1.5 text-sm font-medium text-white">
        {title}
      </div>
      {children}
    </div>
  );
}

function ApartmentImage({ apartment }: { apartment: Apartment }) {
  if (!apartment.image) {
    return <div className="h-full w-full bg-gray-200" aria-hidden />;
  }

  return (
    <Image
      src={apartment.image}
      alt={`Unit ${apartment.unit} Interior`}
      fill
      className="object-cover"
      sizes="40vw"
      unoptimized
    />
  );
}

function ApartmentCard({ apartment }: { apartment: Apartment }) {
  return (
    <article className="flex overflow-hidden border border-gray-200">
      <div className="relative min-h-[140px] w-2/5 shrink-0">
        <ApartmentImage apartment={apartment} />
      </div>
      <div className="flex w-3/5 flex-col justify-between p-4">
        <div>
          <h3 className="text-4xl font-light text-gray-700">{apartment.unit}</h3>
          <div className="mt-2">
            <p className="text-lg font-medium text-gray-800">
              ${apartment.price.toLocaleString("en-US")}{" "}
              <span className="text-[10px] font-normal uppercase tracking-wider text-gray-400">
                Monthly
              </span>
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-gray-500">
              {apartment.layout}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="mt-4 w-fit cursor-pointer bg-gray-600 px-4 py-2 text-[10px] uppercase text-white transition-colors hover:bg-gray-800"
        >
          Schedule a Visit
        </button>
      </div>
    </article>
  );
}

function PolicyGrid({ policies }: { policies: PolicyItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-4">
      {policies.map((policy) => (
        <div key={policy.title}>
          <p className="text-sm font-medium">{policy.title}</p>
          {policy.note ? (
            <p className="text-[10px] italic text-gray-500">{policy.note}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function BuildingNotFoundView() {
  return (
    <div
      className={`${inter.className} flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-white px-4 text-[#333]`}
    >
      <h1 className="text-2xl font-medium text-gray-800">Building not found</h1>
      <Link href="/" className="text-sm text-gray-600 underline hover:text-gray-800">
        Back to rental buildings
      </Link>
    </div>
  );
}

function BuildingDetailView({ building }: { building: BuildingDetail }) {
  const heroImage = building.image;
  const hasApartments = building.apartments.length > 0;
  const hasPolicies =
    building.generalPolicies.length > 0 || building.additionalInfo.length > 0;

  return (
    <div className={`${inter.className} bg-white text-[#333]`}>
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="w-1/3">
            <button
              type="button"
              aria-label="Menu"
              className="flex flex-col gap-1.5 p-2"
            >
              <span className="h-0.5 w-8 bg-gray-500" />
              <span className="h-0.5 w-8 bg-gray-500" />
              <span className="h-0.5 w-8 bg-gray-500" />
            </button>
          </div>

          <div className="flex w-1/3 justify-center">
            <BuildingLogo />
          </div>

          <div className="w-1/3 text-right">
            <h1 className="text-xl font-medium text-gray-800">{building.name}</h1>
            <p className="text-sm text-gray-500">{building.address} {building.zip}</p>
            <p className="text-sm text-gray-500">{building.buildingType}</p>
          </div>
        </div>
      </header>

      <main>
        <section className="relative w-full">
          {heroImage ? (
            <Image
              src={heroImage}
              alt={`${building.name} Exterior`}
              width={1920}
              height={600}
              className="h-auto max-h-[600px] w-full object-cover"
              priority
              sizes="100vw"
              unoptimized
            />
          ) : (
            <div className="h-[400px] w-full bg-gray-200" aria-hidden />
          )}
        </section>

        <div className="mx-auto max-w-7xl px-4 py-8">
          {building.description ? (
            <section className="mb-12">
              <p className="text-sm leading-relaxed text-gray-600">
                {building.description}
              </p>
            </section>
          ) : null}

          {hasApartments ? (
            <section className="mb-16">
              <SectionHeading>Apartments for Rent</SectionHeading>
              <p className="mb-6 text-xs italic text-gray-500">
                Please note that apartment availability is always changing. Some
                of these apartments may no longer be available, while others may
                have been vacated recently.
              </p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {building.apartments.map((apartment) => (
                  <ApartmentCard key={apartment.unit} apartment={apartment} />
                ))}
              </div>
            </section>
          ) : null}

          {hasPolicies ? (
            <section className="mb-16">
              <SectionHeading>Building Policies</SectionHeading>
              <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                {building.generalPolicies.length > 0 ? (
                  <PolicyBlock title="General Policies">
                    <PolicyGrid policies={building.generalPolicies} />
                  </PolicyBlock>
                ) : null}
                {building.additionalInfo.length > 0 ? (
                  <PolicyBlock title="Additional Building Info">
                    <ul className="space-y-4">
                      {building.additionalInfo.map((item) => (
                        <li key={item} className="flex items-start text-sm">
                          <span className="mr-2">::</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </PolicyBlock>
                ) : null}
              </div>
            </section>
          ) : null}

          <p className="text-sm text-gray-500">
            <Link href="/" className="underline hover:text-gray-800">
              ← Back to all rental buildings
            </Link>
          </p>
        </div>
      </main>

      <footer className="w-full border-t border-gray-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-[10px] font-medium uppercase tracking-widest text-gray-500">
            Property Management Company • 123 Main Street • New York, NY 10000 •
            212.555.2121 •{" "}
            <a className="hover:text-gray-800" href="#">
              www.propertymanagementco.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function BuildingPage() {
  const params = useParams();
  const idParam = typeof params.id === "string" ? params.id : "";
  const buildingId = parseBuildingId(idParam);

  if (buildingId === undefined) {
    return <BuildingNotFoundView />;
  }

  return <BuildingPageContent key={buildingId} buildingId={buildingId} />;
}

function BuildingPageContent({ buildingId }: { buildingId: number }) {
  const [building, setBuilding] = useState<BuildingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const data = await fetchBuilding(buildingId);

        if (cancelled) {
          return;
        }

        if (!data) {
          setBuilding(null);
          setError(null);
          return;
        }

        setBuilding(data);
        document.title = `${data.name} - Building Details`;
      } catch (loadError) {
        if (!cancelled) {
          setBuilding(null);
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Failed to load building",
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
  }, [buildingId]);

  if (loading) {
    return (
      <div className={`${inter.className} bg-white px-4 py-12 text-[#333]`}>
        <p className="text-sm text-gray-500">Loading building...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${inter.className} bg-white px-4 py-12 text-[#333]`}>
        <p className="text-sm text-red-600">{error}</p>
        <p className="mt-4 text-sm">
          <Link href="/" className="underline hover:text-gray-800">
            ← Back to all rental buildings
          </Link>
        </p>
      </div>
    );
  }

  if (!building) {
    return <BuildingNotFoundView />;
  }

  return <BuildingDetailView building={building} />;
}
