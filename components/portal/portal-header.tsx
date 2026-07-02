import Link from "next/link";
import { LogOut, LayoutDashboard, Inbox } from "lucide-react";
import { site } from "@/lib/site";
import { LogoMark } from "@/components/brand/logo";

// Shared top bar for the protected portal (navy + gold). `active` highlights
// the current nav item; the Inquiries link only renders for admins.
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
    `inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.06em] transition-colors ${
      isActive
        ? "border border-gold-500/50 bg-gold-400/10 text-gold-300"
        : "text-gray-400 hover:text-gold-300"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-gold-700/40 bg-ink/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" aria-label={site.name} className="flex items-center gap-2.5">
            <LogoMark className="h-9 w-9" />
            <span className="font-serif text-lg font-bold text-gold-400">
              {site.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 sm:flex">
            <Link href="/dashboard" className={linkCls(active === "dashboard")}>
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Link>
            {isAdmin && (
              <Link href="/dashboard/inquiries" className={linkCls(active === "inquiries")}>
                <Inbox className="h-4 w-4" /> Inquiries
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-[11px] text-gray-500 sm:inline">{email}</span>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-sm border border-gold-500/50 px-3 py-1.5 font-mono text-[12px] uppercase tracking-[0.06em] text-gold-300 transition-colors hover:bg-gold-400 hover:text-ink"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
