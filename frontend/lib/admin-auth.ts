const ADMIN_TOKEN_KEY = "admin_secret_token";

const tokenListeners = new Set<() => void>();

function notifyTokenListeners() {
  tokenListeners.forEach((listener) => listener());
}

export function subscribeAdminToken(listener: () => void): () => void {
  tokenListeners.add(listener);

  if (typeof window !== "undefined") {
    window.addEventListener("storage", listener);
  }

  return () => {
    tokenListeners.delete(listener);

    if (typeof window !== "undefined") {
      window.removeEventListener("storage", listener);
    }
  };
}

export function getAdminToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string): void {
  localStorage.setItem(ADMIN_TOKEN_KEY, token.trim());
  notifyTokenListeners();
}

export function clearAdminToken(): void {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  notifyTokenListeners();
}
