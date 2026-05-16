"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { BuildingForm } from "@/components/admin/building-form";
import { useAdminApi } from "@/hooks/use-admin-api";
import { useAdminFetch } from "@/hooks/use-admin-fetch";
import {
  adminBuildingToFormValues,
  fetchAdminBuilding,
  updateAdminBuilding,
} from "@/lib/admin-buildings";
import { parseBuildingId } from "@/lib/buildings";

export default function AdminEditBuildingPage() {
  const params = useParams();
  const router = useRouter();
  const { token, withToken } = useAdminApi();
  const buildingId = parseBuildingId(String(params.id));
  const {
    data: building,
    isLoading,
    error,
    reload,
  } = useAdminFetch(
    Boolean(token && buildingId),
    (adminToken) => fetchAdminBuilding(adminToken, buildingId!),
    [buildingId],
  );
  if (!buildingId) {
    return <p className="text-sm text-red-600">Invalid building id.</p>;
  }

  if (!token) {
    return <p className="text-sm text-gray-500">Enter your admin token to edit this building.</p>;
  }

  if (isLoading) {
    return <p className="text-sm text-gray-500">Loading building...</p>;
  }

  if (error) {
    return (
      <div>
        <p className="text-sm text-red-600">{error}</p>
        <Link href="/admin/buildings" className="mt-4 inline-block text-sm text-gray-600 underline">
          Back to list
        </Link>
      </div>
    );
  }

  if (!building) {
    return <p className="text-sm text-gray-500">Building not found.</p>;
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/buildings"
            className="text-xs uppercase tracking-wide text-gray-500 hover:text-gray-800"
          >
            ← Back to list
          </Link>
          <h1 className="mt-2 text-2xl font-light text-gray-800">Edit: {building.name}</h1>
        </div>
        <Link
          href={`/buildings/${building.id}`}
          className="text-xs uppercase tracking-wide text-gray-600 hover:text-gray-900"
          target="_blank"
        >
          View public page
        </Link>
      </div>

      <BuildingForm
        key={building.id}
        initialValues={adminBuildingToFormValues(building)}
        submitLabel="Save changes"
        onSubmit={async (values) => {
          await withToken((adminToken) => updateAdminBuilding(adminToken, building.id, values));
          reload();
          router.refresh();
        }}
      />
    </div>
  );
}
