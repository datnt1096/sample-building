"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  clearAdminToken,
  getAdminToken,
  setAdminToken,
  subscribeAdminToken,
} from "@/lib/admin-auth";
import { AdminTokenModal } from "@/components/admin/admin-token-modal";

type AdminAuthContextValue = {
  token: string | null;
  isReady: boolean;
  setToken: (token: string) => void;
  logout: () => void;
  requestAuth: () => void;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

function subscribeToClient() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const isClient = useSyncExternalStore(
    subscribeToClient,
    getClientSnapshot,
    getServerSnapshot,
  );
  const token = useSyncExternalStore(subscribeAdminToken, getAdminToken, () => null);
  const [forceModal, setForceModal] = useState(false);

  const setToken = useCallback((value: string) => {
    setAdminToken(value);
    setForceModal(false);
  }, []);

  const logout = useCallback(() => {
    clearAdminToken();
    setForceModal(true);
  }, []);

  const requestAuth = useCallback(() => {
    setForceModal(true);
  }, []);

  const showModal = isClient && (forceModal || !token);

  const value = useMemo(
    () => ({
      token,
      isReady: isClient,
      setToken,
      logout,
      requestAuth,
    }),
    [token, isClient, setToken, logout, requestAuth],
  );

  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-sm text-gray-500">
        Loading admin...
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
      {showModal ? <AdminTokenModal onSubmit={setToken} /> : null}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }

  return context;
}
