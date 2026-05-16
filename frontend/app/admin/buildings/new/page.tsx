"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BuildingForm } from "@/components/admin/building-form";
import { useAdminApi } from "@/hooks/use-admin-api";
import { createAdminBuilding, emptyBuildingFormValues } from "@/lib/admin-buildings";

export default function AdminNewBuildingPage() {
  const router = useRouter();
  const { token, withToken } = useAdminApi();

  if (!token) {
    return (
      <p className="text-sm text-gray-500">Enter your admin token to create a building.</p>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/buildings" className="text-xs uppercase tracking-wide text-gray-500 hover:text-gray-800">
          ← Back to list
        </Link>
        <h1 className="mt-2 text-2xl font-light text-gray-800">New building</h1>
      </div>

      <BuildingForm
        initialValues={emptyBuildingFormValues()}
        submitLabel="Create building"
        onSubmit={async (values) => {
          const building = await withToken((adminToken) =>
            createAdminBuilding(adminToken, values),
          );
          router.push(`/admin/buildings/${building.id}/edit`);
        }}
      />
    </div>
  );
}
