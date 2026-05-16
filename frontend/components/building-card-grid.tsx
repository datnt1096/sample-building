import Image from "next/image";
import Link from "next/link";
import type { BuildingListItem } from "@/lib/buildings";

function BuildingCardImage({
  src,
  alt,
}: {
  src: string | null;
  alt: string;
}) {
  if (!src) {
    return <div className="h-full w-full bg-gray-200" aria-hidden />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width: 640px) 100vw, 50vw"
      unoptimized
    />
  );
}

type BuildingCardGridProps = {
  buildings: BuildingListItem[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
};

export function BuildingCardGrid({
  buildings,
  loading = false,
  error = null,
  emptyMessage = "No rental buildings available.",
}: BuildingCardGridProps) {
  if (loading) {
    return <p className="text-sm text-gray-500">Loading buildings...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  if (buildings.length === 0) {
    return <p className="text-sm text-gray-500">{emptyMessage}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-2">
      {buildings.map((property) => (
        <article
          key={property.id}
          className="flex flex-col border border-gray-300 sm:flex-row"
        >
          <div className="relative aspect-4/3 sm:aspect-auto sm:w-1/2 sm:min-h-[240px]">
            <BuildingCardImage src={property.image} alt={property.name} />
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
  );
}
