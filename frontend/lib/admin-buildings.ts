import { getApiBaseUrl } from "@/lib/api";
import type { BuildingDetail, PolicyItem } from "@/lib/buildings";

export class AdminApiError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
    this.errors = errors;
  }
}

export type AdminApartment = {
  id?: number;
  buildingId?: number;
  unit: string;
  price: number;
  layout: string;
  image: string | null;
};

export type AdminPolicy = PolicyItem & {
  id?: number;
  buildingId?: number;
};

export type AdminBuilding = BuildingDetail & {
  createdAt?: string;
  updatedAt?: string;
  apartments: AdminApartment[];
  generalPolicies: AdminPolicy[];
};

export const BUILDING_TYPES = ["co-op", "rental", "condo", "other"] as const;

export type BuildingType = (typeof BUILDING_TYPES)[number];

export type ApartmentFormRow = {
  key: string;
  id?: number;
  unit: string;
  price: string;
  layout: string;
  imageFile: File | null;
  existingImageUrl: string | null;
  _destroy?: boolean;
};

export type PolicyFormRow = {
  key: string;
  id?: number;
  title: string;
  note: string;
  _destroy?: boolean;
};

export type BuildingFormValues = {
  name: string;
  location: string;
  address: string;
  zip: string;
  buildingType: BuildingType;
  description: string;
  additionalInfo: string[];
  imageFile: File | null;
  existingImageUrl: string | null;
  apartments: ApartmentFormRow[];
  policies: PolicyFormRow[];
};

async function parseAdminResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  const data = await response.json().catch(() => ({}));

  if (response.ok) {
    return data as T;
  }

  if (response.status === 401) {
    throw new AdminApiError("Unauthorized", 401);
  }

  const errors = (data as { errors?: Record<string, string[]> }).errors;
  const errorMessage = (data as { error?: string }).error;

  throw new AdminApiError(
    errorMessage ?? `Request failed (${response.status})`,
    response.status,
    errors,
  );
}

function adminHeaders(token: string, json = false): HeadersInit {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  if (json) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}

export function appendBuildingFormData(
  formData: FormData,
  values: BuildingFormValues,
): void {
  formData.append("building[name]", values.name);
  formData.append("building[location]", values.location);
  formData.append("building[address]", values.address);
  formData.append("building[zip]", values.zip);
  formData.append("building[building_type]", values.buildingType);
  formData.append("building[description]", values.description);

  values.additionalInfo
    .map((entry) => entry.trim())
    .filter(Boolean)
    .forEach((entry) => {
      formData.append("building[additional_info][]", entry);
    });

  if (values.imageFile) {
    formData.append("building[image]", values.imageFile);
  }

  let apartmentIndex = 0;

  values.apartments.forEach((apartment) => {
    if (apartment._destroy) {
      if (apartment.id) {
        formData.append(
          `building[apartments_attributes][${apartmentIndex}][id]`,
          String(apartment.id),
        );
        formData.append(
          `building[apartments_attributes][${apartmentIndex}][_destroy]`,
          "1",
        );
        apartmentIndex += 1;
      }
      return;
    }

    if (!apartment.unit.trim() && !apartment.layout.trim() && !apartment.price.trim()) {
      return;
    }

    if (apartment.id) {
      formData.append(
        `building[apartments_attributes][${apartmentIndex}][id]`,
        String(apartment.id),
      );
    }

    formData.append(
      `building[apartments_attributes][${apartmentIndex}][unit]`,
      apartment.unit,
    );
    formData.append(
      `building[apartments_attributes][${apartmentIndex}][price]`,
      apartment.price,
    );
    formData.append(
      `building[apartments_attributes][${apartmentIndex}][layout]`,
      apartment.layout,
    );

    if (apartment.imageFile) {
      formData.append(
        `building[apartments_attributes][${apartmentIndex}][image]`,
        apartment.imageFile,
      );
    }

    apartmentIndex += 1;
  });

  let policyIndex = 0;

  values.policies.forEach((policy) => {
    if (policy._destroy) {
      if (policy.id) {
        formData.append(
          `building[building_policies_attributes][${policyIndex}][id]`,
          String(policy.id),
        );
        formData.append(
          `building[building_policies_attributes][${policyIndex}][_destroy]`,
          "1",
        );
        policyIndex += 1;
      }
      return;
    }

    if (!policy.title.trim() && !policy.note.trim()) {
      return;
    }

    if (policy.id) {
      formData.append(
        `building[building_policies_attributes][${policyIndex}][id]`,
        String(policy.id),
      );
    }

    formData.append(
      `building[building_policies_attributes][${policyIndex}][title]`,
      policy.title,
    );

    if (policy.note.trim()) {
      formData.append(
        `building[building_policies_attributes][${policyIndex}][note]`,
        policy.note,
      );
    }

    policyIndex += 1;
  });
}

export function adminBuildingToFormValues(building: AdminBuilding): BuildingFormValues {
  return {
    name: building.name,
    location: building.location,
    address: building.address ?? "",
    zip: building.zip ?? "",
    buildingType: (BUILDING_TYPES.includes(building.buildingType as BuildingType)
      ? building.buildingType
      : "rental") as BuildingType,
    description: building.description ?? "",
    additionalInfo: building.additionalInfo.length > 0 ? building.additionalInfo : [""],
    imageFile: null,
    existingImageUrl: building.image,
    apartments: building.apartments.map((apartment: AdminApartment) => ({
      key: `apt-${apartment.id ?? crypto.randomUUID()}`,
      id: apartment.id,
      unit: apartment.unit,
      price: String(apartment.price),
      layout: apartment.layout,
      imageFile: null,
      existingImageUrl: apartment.image,
    })),
    policies: building.generalPolicies.map((policy: AdminPolicy) => ({
      key: `policy-${policy.id ?? crypto.randomUUID()}`,
      id: policy.id,
      title: policy.title,
      note: policy.note ?? "",
    })),
  };
}

export function emptyBuildingFormValues(): BuildingFormValues {
  return {
    name: "",
    location: "",
    address: "",
    zip: "",
    buildingType: "rental",
    description: "",
    additionalInfo: [""],
    imageFile: null,
    existingImageUrl: null,
    apartments: [],
    policies: [],
  };
}

export async function fetchAdminBuildings(token: string): Promise<AdminBuilding[]> {
  const response = await fetch(`${getApiBaseUrl()}/api/v1/admin/buildings`, {
    headers: adminHeaders(token),
  });

  const data = await parseAdminResponse<{ buildings: AdminBuilding[] }>(response);
  return data.buildings;
}

export async function fetchAdminBuilding(
  token: string,
  id: number,
): Promise<AdminBuilding> {
  const response = await fetch(`${getApiBaseUrl()}/api/v1/admin/buildings/${id}`, {
    headers: adminHeaders(token),
  });

  const data = await parseAdminResponse<{ building: AdminBuilding }>(response);
  return data.building;
}

export async function createAdminBuilding(
  token: string,
  values: BuildingFormValues,
): Promise<AdminBuilding> {
  const formData = new FormData();
  appendBuildingFormData(formData, values);

  const response = await fetch(`${getApiBaseUrl()}/api/v1/admin/buildings`, {
    method: "POST",
    headers: adminHeaders(token),
    body: formData,
  });

  const data = await parseAdminResponse<{ building: AdminBuilding }>(response);
  return data.building;
}

export async function updateAdminBuilding(
  token: string,
  id: number,
  values: BuildingFormValues,
): Promise<AdminBuilding> {
  const formData = new FormData();
  appendBuildingFormData(formData, values);

  const response = await fetch(`${getApiBaseUrl()}/api/v1/admin/buildings/${id}`, {
    method: "PATCH",
    headers: adminHeaders(token),
    body: formData,
  });

  const data = await parseAdminResponse<{ building: AdminBuilding }>(response);
  return data.building;
}

export async function deleteAdminBuilding(token: string, id: number): Promise<void> {
  const response = await fetch(`${getApiBaseUrl()}/api/v1/admin/buildings/${id}`, {
    method: "DELETE",
    headers: adminHeaders(token),
  });

  await parseAdminResponse<void>(response);
}

export function formatAdminErrors(errors?: Record<string, string[]>): string {
  if (!errors) {
    return "";
  }

  return Object.entries(errors)
    .flatMap(([field, messages]) => messages.map((message) => `${field}: ${message}`))
    .join("\n");
}
