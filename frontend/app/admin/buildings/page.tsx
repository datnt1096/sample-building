"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAdminApi } from "@/hooks/use-admin-api";
import { useAdminFetch } from "@/hooks/use-admin-fetch";
import { deleteAdminBuilding, fetchAdminBuildings } from "@/lib/admin-buildings";

export default function AdminBuildingsPage() {
  const { token, withToken } = useAdminApi();
  const {
    data: buildings,
    isLoading,
    error,
    reload,
  } = useAdminFetch(Boolean(token), fetchAdminBuildings);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  async function handleDelete(id: number, name: string) {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      return;
    }

    setDeletingId(id);
    setActionError(null);

    try {
      await withToken((adminToken) => deleteAdminBuilding(adminToken, id));
      reload();
    } catch (caught) {
      if (caught instanceof Error) {
        setActionError(caught.message);
      }
    } finally {
      setDeletingId(null);
    }
  }

  const displayError = actionError ?? error;
  const buildingList = buildings ?? [];

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-light text-gray-800">Buildings</h1>
          <p className="mt-1 text-sm text-gray-600">Create, edit, or remove buildings and nested data.</p>
        </div>
        <Link
          href="/admin/buildings/new"
          className="cursor-pointer bg-gray-700 px-4 py-2 text-sm font-medium uppercase tracking-wide text-white hover:bg-gray-900"
        >
          New building
        </Link>
      </div>

      {displayError ? (
        <p className="mb-4 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {displayError}
        </p>
      ) : null}

      {!token ? (
        <p className="text-sm text-gray-500">Enter your admin token to continue.</p>
      ) : isLoading ? (
        <p className="text-sm text-gray-500">Loading buildings...</p>
      ) : buildingList.length === 0 ? (
        <p className="text-sm text-gray-500">No buildings yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200 border border-gray-200">
          {buildingList.map((building) => (
            <li
              key={building.id}
              className="flex flex-wrap items-center gap-4 px-4 py-4 sm:flex-nowrap"
            >
              <div className="relative h-16 w-24 shrink-0 overflow-hidden bg-gray-100">
                {building.image ? (
                  <Image
                    src={building.image}
                    alt={building.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-gray-400">
                    No image
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-800">{building.name}</p>
                <p className="text-sm text-gray-600">{building.location}</p>
                <p className="text-xs text-gray-500">
                  {building.apartments.length} apartments · {building.generalPolicies.length}{" "}
                  policies
                </p>
              </div>

              <div className="flex w-full gap-2 sm:w-auto">
                <Link
                  href={`/admin/buildings/${building.id}/edit`}
                  className="cursor-pointer border border-gray-300 px-3 py-1.5 text-xs uppercase tracking-wide text-gray-700 hover:bg-gray-50"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  disabled={deletingId === building.id}
                  onClick={() => void handleDelete(building.id, building.name)}
                  className="cursor-pointer border border-red-200 px-3 py-1.5 text-xs uppercase tracking-wide text-red-700 hover:bg-red-50 disabled:opacity-50"
                >
                  {deletingId === building.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
