"use client";

import { useState, type FormEvent } from "react";

type AdminTokenModalProps = {
  onSubmit: (token: string) => void;
};

export function AdminTokenModal({ onSubmit }: AdminTokenModalProps) {
  const [token, setToken] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!token.trim()) {
      return;
    }

    onSubmit(token.trim());
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-token-title"
        className="w-full max-w-md rounded border border-gray-300 bg-white p-6 shadow-lg"
      >
        <h2 id="admin-token-title" className="text-lg font-medium text-gray-800">
          Admin access
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Enter the admin secret token to manage buildings.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="admin-token" className="block text-xs font-medium uppercase tracking-wider text-gray-500">
              Bearer token
            </label>
            <input
              id="admin-token"
              type="password"
              autoComplete="off"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              className="mt-1 w-full border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-gray-500"
              placeholder="ADMIN_SECRET_TOKEN"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-gray-700 px-4 py-2 text-sm font-medium uppercase tracking-wide text-white transition-colors hover:bg-gray-900"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
