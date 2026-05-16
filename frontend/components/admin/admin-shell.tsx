"use client";

import Link from "next/link";
import { useAdminAuth } from "@/components/admin/admin-auth-provider";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { token, logout, requestAuth } = useAdminAuth();

  return (
    <div className="min-h-screen bg-white text-[#333]">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-6">
            <Link href="/admin/buildings" className="text-sm font-medium uppercase tracking-widest text-gray-800">
              Admin
            </Link>
            <nav className="flex gap-4 text-sm text-gray-600">
              <Link href="/admin/buildings" className="hover:text-gray-900">
                Buildings
              </Link>
              <Link href="/" className="hover:text-gray-900">
                Public site
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3 text-sm">
            {token ? (
              <span className="text-xs uppercase tracking-wider text-gray-500">Token saved</span>
            ) : null}
            <button
              type="button"
              onClick={requestAuth}
              className="cursor-pointer border border-gray-300 px-3 py-1.5 text-xs uppercase tracking-wide text-gray-700 hover:bg-gray-50"
            >
              Change token
            </button>
            <button
              type="button"
              onClick={logout}
              className="cursor-pointer bg-gray-700 px-3 py-1.5 text-xs uppercase tracking-wide text-white hover:bg-gray-900"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
