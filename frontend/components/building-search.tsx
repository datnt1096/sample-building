"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { fetchBuildings, type BuildingListItem } from "@/lib/buildings";

function SearchIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
}

function SuggestionThumbnail({
  src,
  alt,
}: {
  src: string | null;
  alt: string;
}) {
  return (
    <div className="relative h-12 w-16 shrink-0 overflow-hidden bg-gray-200">
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="64px"
          unoptimized
        />
      ) : null}
    </div>
  );
}

type BuildingSearchProps = {
  className?: string;
  inputId?: string;
  defaultQuery?: string;
};

export function BuildingSearch({
  className = "",
  inputId,
  defaultQuery = "",
}: BuildingSearchProps) {
  const router = useRouter();
  const generatedId = useId();
  const searchInputId = inputId ?? generatedId;
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState(defaultQuery);
  const [suggestions, setSuggestions] = useState<BuildingListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const submitSearch = useCallback(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      return;
    }

    setIsOpen(false);
    router.push(`/?q=${encodeURIComponent(trimmed)}`);
  }, [query, router]);

  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      let cancelled = false;

      void Promise.resolve().then(() => {
        if (!cancelled) {
          setSuggestions([]);
          setIsLoading(false);
          setIsOpen(false);
        }
      });

      return () => {
        cancelled = true;
      };
    }

    let cancelled = false;
    const timer = window.setTimeout(() => {
      void (async () => {
        setIsLoading(true);

        try {
          const data = await fetchBuildings({ q: trimmed, limit: 10 });

          if (!cancelled) {
            setSuggestions(data);
            setIsOpen(true);
          }
        } catch {
          if (!cancelled) {
            setSuggestions([]);
            setIsOpen(false);
          }
        } finally {
          if (!cancelled) {
            setIsLoading(false);
          }
        }
      })();
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query]);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitSearch();
  }

  const showDropdown = isOpen && query.trim().length > 0;

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit}>
        <label htmlFor={searchInputId} className="sr-only">
          Search buildings by name
        </label>
        <div className="flex w-full border border-gray-300 bg-white">
          <input
            id={searchInputId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => {
              if (query.trim() && suggestions.length > 0) {
                setIsOpen(true);
              }
            }}
            placeholder="Search by building name"
            autoComplete="off"
            className="min-w-0 flex-1 px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none"
          />
          <button
            type="submit"
            aria-label="Search buildings"
            className="flex shrink-0 cursor-pointer items-center justify-center border-l border-gray-300 bg-[#4a4a4a] px-4 text-white transition-colors hover:bg-black"
          >
            <SearchIcon />
          </button>
        </div>
      </form>

      {showDropdown ? (
        <ul className="absolute z-20 mt-1 max-h-80 w-full overflow-y-auto border border-gray-300 bg-white shadow-sm">
          {isLoading ? (
            <li className="px-4 py-3 text-sm text-gray-500">Searching...</li>
          ) : suggestions.length === 0 ? (
            <li className="px-4 py-3 text-sm text-gray-500">No buildings found.</li>
          ) : (
            suggestions.map((building) => (
              <li key={building.id}>
                <Link
                  href={`/buildings/${building.id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50"
                >
                  <SuggestionThumbnail src={building.image} alt={building.name} />
                  <div className="min-w-0">
                    <span className="block text-sm font-medium text-gray-800">
                      {building.name}
                    </span>
                    <span className="mt-0.5 block text-xs uppercase tracking-widest text-gray-500">
                      {building.location}
                    </span>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
