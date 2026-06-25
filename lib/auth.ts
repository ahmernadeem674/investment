import { site } from "@/lib/site";

// True if the given email is configured as an admin (case-insensitive).
export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return site.adminEmails.some(
    (a) => a.toLowerCase() === email.toLowerCase(),
  );
}
