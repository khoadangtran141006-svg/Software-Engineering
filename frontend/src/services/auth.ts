const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
const TOKEN_KEY = "brewlite-token";

export type AuthUser = { id: number; name: string; email: string; role?: "CUSTOMER" | "STAFF"; loyaltyPoints?: number };

async function postAuth<T>(path: string, body: unknown): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error(
      "Không thể kết nối đến máy chủ. Vui lòng kiểm tra backend đang chạy tại cổng 3001 rồi thử lại.",
    );
  }

  let result: Record<string, unknown> = {};
  try {
    result = await response.json() as Record<string, unknown>;
  } catch {
    if (response.ok) throw new Error("Máy chủ trả về dữ liệu không hợp lệ.");
  }

  if (!response.ok) {
    const message = result.message;
    throw new Error(Array.isArray(message) ? message.join(". ") : typeof message === "string" ? message : "Yêu cầu không thành công.");
  }
  return result as T;
}

export function getToken() {
  return typeof window === "undefined" ? null : window.localStorage.getItem(TOKEN_KEY);
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem("brewlite-user");
    return stored ? JSON.parse(stored) as AuthUser : null;
  } catch {
    return null;
  }
}

export async function signIn(email: string, password: string) {
  const result = await postAuth<{ accessToken: string; user: AuthUser }>("/auth/login", { email, password });
  window.localStorage.setItem(TOKEN_KEY, result.accessToken);
  window.localStorage.setItem("brewlite-user", JSON.stringify(result.user));
  window.dispatchEvent(new Event("brewlite-auth-change"));
  return result.user as AuthUser;
}

export async function signUp(name: string, email: string, password: string) {
  return postAuth<AuthUser>("/auth/register", { name, email, password });
}

export async function requestPasswordReset(email: string) {
  return postAuth<{ message: string; resetToken?: string }>("/auth/forgot-password", { email });
}

export async function resetPassword(token: string, password: string) {
  return postAuth<{ message: string }>("/auth/reset-password", { token, password });
}

export async function fetchMe(): Promise<AuthUser | null> {
  const token = getToken();
  if (!token) return null;
  try {
    const response = await fetch(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
    if (!response.ok) return null;
    return (await response.json()) as AuthUser;
  } catch {
    return null;
  }
}

export function signOut() {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem("brewlite-user");
  window.dispatchEvent(new Event("brewlite-auth-change"));
}
