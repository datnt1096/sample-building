import { getApiBaseUrl } from "@/lib/api";

export type BuildingListItem = {
  id: number;
  name: string;
  location: string;
  image: string | null;
};

export type Apartment = {
  unit: string;
  price: number;
  layout: string;
  image: string | null;
};

export type PolicyItem = {
  title: string;
  note?: string;
};

export type BuildingDetail = BuildingListItem & {
  address: string | null;
  zip: string | null;
  buildingType: string;
  description: string | null;
  additionalInfo: string[];
  apartments: Apartment[];
  generalPolicies: PolicyItem[];
};

type BuildingsIndexResponse = {
  buildings: BuildingListItem[];
};

type BuildingShowResponse = {
  building: BuildingDetail;
};

export async function fetchBuildings(options?: {
  q?: string;
  limit?: number;
}): Promise<BuildingListItem[]> {
  const params = new URLSearchParams();

  if (options?.q) {
    params.set("q", options.q);
  }

  if (options?.limit !== undefined) {
    params.set("limit", String(options.limit));
  }

  const query = params.toString();
  const url = `${getApiBaseUrl()}/api/v1/buildings${query ? `?${query}` : ""}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch buildings (${response.status})`);
  }

  const data: BuildingsIndexResponse = await response.json();
  return data.buildings;
}

export async function fetchBuilding(id: number): Promise<BuildingDetail | null> {
  const response = await fetch(`${getApiBaseUrl()}/api/v1/buildings/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch building (${response.status})`);
  }

  const data: BuildingShowResponse = await response.json();
  return data.building;
}

export function parseBuildingId(param: string): number | undefined {
  const id = Number(param);

  if (!Number.isInteger(id) || id <= 0) {
    return undefined;
  }

  return id;
}
