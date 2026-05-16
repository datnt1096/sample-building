"use client";

import { useCallback, useEffect, useState } from "react";
import { useAdminApi } from "@/hooks/use-admin-api";

type FetchState<T> = {
  data: T | null;
  error: string | null;
  isLoading: boolean;
};

export function useAdminFetch<T>(
  enabled: boolean,
  loader: (token: string) => Promise<T>,
  deps: readonly unknown[] = [],
) {
  const { token, withToken } = useAdminApi();
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => {
    setReloadKey((current) => current + 1);
  }, []);

  useEffect(() => {
    if (!enabled || !token) {
      return;
    }

    let cancelled = false;

    void Promise.resolve().then(() => {
      if (cancelled) {
        return;
      }

      setState({ data: null, error: null, isLoading: true });
    });

    void withToken(loader)
      .then((data) => {
        if (cancelled) {
          return;
        }

        setState({ data, error: null, isLoading: false });
      })
      .catch((caught: unknown) => {
        if (cancelled) {
          return;
        }

        if (caught instanceof Error && caught.message === "No admin token") {
          return;
        }

        const message = caught instanceof Error ? caught.message : "Request failed";
        setState({ data: null, error: message, isLoading: false });
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- loader identity is controlled by caller deps
  }, [enabled, token, withToken, reloadKey, ...deps]);

  return { ...state, reload };
}
