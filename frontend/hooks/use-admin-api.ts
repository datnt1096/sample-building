"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/components/admin/admin-auth-provider";
import { AdminApiError } from "@/lib/admin-buildings";

export function useAdminApi() {
  const { token, requestAuth, logout } = useAdminAuth();
  const router = useRouter();

  const withToken = useCallback(
    async <T>(action: (token: string) => Promise<T>): Promise<T> => {
      if (!token) {
        requestAuth();
        throw new AdminApiError("No admin token", 401);
      }

      try {
        return await action(token);
      } catch (error) {
        if (error instanceof AdminApiError && error.status === 401) {
          logout();
          router.refresh();
        }

        throw error;
      }
    },
    [token, requestAuth, logout, router],
  );

  return { token, withToken };
}
