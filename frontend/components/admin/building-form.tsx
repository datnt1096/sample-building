"use client";

import Image from "next/image";
import { useState } from "react";
import {
  AdminApiError,
  BUILDING_TYPES,
  formatAdminErrors,
  type ApartmentFormRow,
  type BuildingFormValues,
  type BuildingType,
  type PolicyFormRow,
} from "@/lib/admin-buildings";

type BuildingFormProps = {
  initialValues: BuildingFormValues;
  submitLabel: string;
  onSubmit: (values: BuildingFormValues) => Promise<void>;
};

function newApartmentRow(): ApartmentFormRow {
  return {
    key: `apt-new-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    unit: "",
    price: "",
    layout: "",
    imageFile: null,
    existingImageUrl: null,
  };
}

function newPolicyRow(): PolicyFormRow {
  return {
    key: `policy-new-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: "",
    note: "",
  };
}

export function BuildingForm({ initialValues, submitLabel, onSubmit }: BuildingFormProps) {
  const [values, setValues] = useState<BuildingFormValues>(initialValues);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof BuildingFormValues>(key: K, value: BuildingFormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  function updateAdditionalInfo(index: number, value: string) {
    setValues((current) => {
      const next = [...current.additionalInfo];
      next[index] = value;
      return { ...current, additionalInfo: next };
    });
  }

  function addAdditionalInfo() {
    setValues((current) => ({
      ...current,
      additionalInfo: [...current.additionalInfo, ""],
    }));
  }

  function removeAdditionalInfo(index: number) {
    setValues((current) => ({
      ...current,
      additionalInfo: current.additionalInfo.filter((_, i) => i !== index),
    }));
  }

  function updateApartment(key: string, patch: Partial<ApartmentFormRow>) {
    setValues((current) => ({
      ...current,
      apartments: current.apartments.map((row) =>
        row.key === key ? { ...row, ...patch } : row,
      ),
    }));
  }

  function markApartmentDestroyed(key: string) {
    setValues((current) => ({
      ...current,
      apartments: current.apartments.map((row) =>
        row.key === key ? { ...row, _destroy: true } : row,
      ),
    }));
  }

  function updatePolicy(key: string, patch: Partial<PolicyFormRow>) {
    setValues((current) => ({
      ...current,
      policies: current.policies.map((row) =>
        row.key === key ? { ...row, ...patch } : row,
      ),
    }));
  }

  function markPolicyDestroyed(key: string) {
    setValues((current) => ({
      ...current,
      policies: current.policies.map((row) =>
        row.key === key ? { ...row, _destroy: true } : row,
      ),
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await onSubmit(values);
    } catch (caught) {
      if (caught instanceof AdminApiError) {
        const formatted = formatAdminErrors(caught.errors);
        setError(formatted || caught.message);
      } else if (caught instanceof Error) {
        setError(caught.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const visibleApartments = values.apartments.filter((row) => !row._destroy);
  const visiblePolicies = values.policies.filter((row) => !row._destroy);

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {error ? (
        <pre className="whitespace-pre-wrap rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </pre>
      ) : null}

      <section className="space-y-4">
        <h2 className="text-sm font-medium uppercase tracking-widest text-gray-700">Building</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="text-xs uppercase tracking-wider text-gray-500">Name</span>
            <input
              required
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="mt-1 w-full border border-gray-300 px-3 py-2"
            />
          </label>

          <label className="block text-sm">
            <span className="text-xs uppercase tracking-wider text-gray-500">Location</span>
            <input
              required
              value={values.location}
              onChange={(event) => updateField("location", event.target.value)}
              className="mt-1 w-full border border-gray-300 px-3 py-2"
            />
          </label>

          <label className="block text-sm">
            <span className="text-xs uppercase tracking-wider text-gray-500">Address</span>
            <input
              value={values.address}
              onChange={(event) => updateField("address", event.target.value)}
              className="mt-1 w-full border border-gray-300 px-3 py-2"
            />
          </label>

          <label className="block text-sm">
            <span className="text-xs uppercase tracking-wider text-gray-500">ZIP</span>
            <input
              value={values.zip}
              onChange={(event) => updateField("zip", event.target.value)}
              className="mt-1 w-full border border-gray-300 px-3 py-2"
            />
          </label>

          <label className="block text-sm">
            <span className="text-xs uppercase tracking-wider text-gray-500">Type</span>
            <select
              value={values.buildingType}
              onChange={(event) =>
                updateField("buildingType", event.target.value as BuildingType)
              }
              className="mt-1 w-full border border-gray-300 px-3 py-2"
            >
              {BUILDING_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm sm:col-span-2">
            <span className="text-xs uppercase tracking-wider text-gray-500">Description</span>
            <textarea
              rows={4}
              value={values.description}
              onChange={(event) => updateField("description", event.target.value)}
              className="mt-1 w-full border border-gray-300 px-3 py-2"
            />
          </label>

          <label className="block text-sm sm:col-span-2">
            <span className="text-xs uppercase tracking-wider text-gray-500">Cover image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(event) =>
                updateField("imageFile", event.target.files?.[0] ?? null)
              }
              className="mt-1 w-full text-sm"
            />
            {values.existingImageUrl ? (
              <div className="relative mt-2 h-32 w-48 overflow-hidden border border-gray-200">
                <Image
                  src={values.existingImageUrl}
                  alt="Current cover"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            ) : null}
          </label>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-gray-500">Additional info</span>
            <button
              type="button"
              onClick={addAdditionalInfo}
              className="cursor-pointer text-xs uppercase tracking-wide text-gray-600 hover:text-gray-900"
            >
              + Add line
            </button>
          </div>
          <div className="space-y-2">
            {values.additionalInfo.map((entry, index) => (
              <div key={`info-${index}`} className="flex gap-2">
                <input
                  value={entry}
                  onChange={(event) => updateAdditionalInfo(index, event.target.value)}
                  className="flex-1 border border-gray-300 px-3 py-2 text-sm"
                />
                {values.additionalInfo.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => removeAdditionalInfo(index)}
                    className="cursor-pointer border border-gray-300 px-3 text-xs uppercase text-gray-600 hover:bg-gray-50"
                  >
                    Remove
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-widest text-gray-700">
            Apartments
          </h2>
          <button
            type="button"
            onClick={() =>
              setValues((current) => ({
                ...current,
                apartments: [...current.apartments, newApartmentRow()],
              }))
            }
            className="cursor-pointer text-xs uppercase tracking-wide text-gray-600 hover:text-gray-900"
          >
            + Add apartment
          </button>
        </div>

        {visibleApartments.length === 0 ? (
          <p className="text-sm text-gray-500">No apartments yet.</p>
        ) : null}

        {visibleApartments.map((apartment) => (
          <div
            key={apartment.key}
            className="space-y-3 border border-gray-200 p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-gray-500">
                {apartment.id ? `Apartment #${apartment.id}` : "New apartment"}
              </span>
              <button
                type="button"
                onClick={() => markApartmentDestroyed(apartment.key)}
                className="cursor-pointer text-xs uppercase text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <label className="block text-sm">
                <span className="text-xs text-gray-500">Unit</span>
                <input
                  value={apartment.unit}
                  onChange={(event) =>
                    updateApartment(apartment.key, { unit: event.target.value })
                  }
                  className="mt-1 w-full border border-gray-300 px-3 py-2"
                />
              </label>
              <label className="block text-sm">
                <span className="text-xs text-gray-500">Price</span>
                <input
                  type="number"
                  min={0}
                  value={apartment.price}
                  onChange={(event) =>
                    updateApartment(apartment.key, { price: event.target.value })
                  }
                  className="mt-1 w-full border border-gray-300 px-3 py-2"
                />
              </label>
              <label className="block text-sm">
                <span className="text-xs text-gray-500">Layout</span>
                <input
                  value={apartment.layout}
                  onChange={(event) =>
                    updateApartment(apartment.key, { layout: event.target.value })
                  }
                  className="mt-1 w-full border border-gray-300 px-3 py-2"
                />
              </label>
            </div>

            <label className="block text-sm">
              <span className="text-xs text-gray-500">Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  updateApartment(apartment.key, {
                    imageFile: event.target.files?.[0] ?? null,
                  })
                }
                className="mt-1 w-full text-sm"
              />
              {apartment.existingImageUrl ? (
                <div className="relative mt-2 h-24 w-32 overflow-hidden border border-gray-200">
                  <Image
                    src={apartment.existingImageUrl}
                    alt="Apartment"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : null}
            </label>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-widest text-gray-700">
            Policies
          </h2>
          <button
            type="button"
            onClick={() =>
              setValues((current) => ({
                ...current,
                policies: [...current.policies, newPolicyRow()],
              }))
            }
            className="cursor-pointer text-xs uppercase tracking-wide text-gray-600 hover:text-gray-900"
          >
            + Add policy
          </button>
        </div>

        {visiblePolicies.length === 0 ? (
          <p className="text-sm text-gray-500">No policies yet.</p>
        ) : null}

        {visiblePolicies.map((policy) => (
          <div key={policy.key} className="space-y-3 border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-gray-500">
                {policy.id ? `Policy #${policy.id}` : "New policy"}
              </span>
              <button
                type="button"
                onClick={() => markPolicyDestroyed(policy.key)}
                className="cursor-pointer text-xs uppercase text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>

            <label className="block text-sm">
              <span className="text-xs text-gray-500">Title</span>
              <input
                value={policy.title}
                onChange={(event) =>
                  updatePolicy(policy.key, { title: event.target.value })
                }
                className="mt-1 w-full border border-gray-300 px-3 py-2"
              />
            </label>
            <label className="block text-sm">
              <span className="text-xs text-gray-500">Note</span>
              <textarea
                rows={2}
                value={policy.note}
                onChange={(event) =>
                  updatePolicy(policy.key, { note: event.target.value })
                }
                className="mt-1 w-full border border-gray-300 px-3 py-2"
              />
            </label>
          </div>
        ))}
      </section>

      <button
        type="submit"
        disabled={isSubmitting}
        className="cursor-pointer bg-gray-700 px-6 py-2.5 text-sm font-medium uppercase tracking-wide text-white hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
