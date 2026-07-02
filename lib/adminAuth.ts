import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "delali_admin_session";

export async function deriveSessionToken(password: string) {
  const secret = process.env.ADMIN_SESSION_SECRET || "delali-fallback-secret";
  const data = new TextEncoder().encode(`${password}::${secret}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Verifies the admin cookie inside a Route Handler. Returns true if authenticated. */
export async function isAdminRequest() {
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!expectedPassword) return false;
  const cookieStore = cookies();
  const cookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!cookie) return false;
  const expectedToken = await deriveSessionToken(expectedPassword);
  return cookie === expectedToken;
}
