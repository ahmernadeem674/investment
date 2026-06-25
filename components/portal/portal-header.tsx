import Link from "next/link";
import { LogOut, LayoutDashboard, Inbox } from "lucide-react";
import { site } from "@/lib/site";

// Shared top bar for the protected portal. `active` highlights the current nav
// item; the Inquiries link only renders for admins.
export function PortalHeader({
  email,
  isAdmin,
  active,
}: {
  email: string;
  isAdmin: boolean;
  active: "dashboard" | "inquiries";
}) {
  const linkCls = (isActive: boolean) =>
    `inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
      isActive
        ? "bg-navy-50 text-navy-900"
        : "text-navy-600 hover:bg-navy-50 hover:text-navy-900"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-navy-900 font-serif text-base font-bold text-gold-300">
              U
            </span>
            <span className="font-serif text-lg font-bold text-navy-900">
              {site.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 sm:flex">
            <Link href="/dashboard" className={linkCls(active === "dashboard")}>
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Link>
            {isAdmin && (
              <Link
                href="/dashboard/inquiries"
                className={linkCls(active === "inquiries")}
              >
                <Inbox className="h-4 w-4" /> Inquiries
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-navy-500 sm:inline">{email}</span>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-md border border-navy-200 bg-white px-3 py-1.5 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-50"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
