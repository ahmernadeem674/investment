"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { LogoWordmark } from "@/components/brand/logo";

export function SiteHeader({ isAuthed }: { isAuthed: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur-md">
      <nav className="container-page flex h-[72px] items-center justify-between">
        <Link href="/" aria-label={site.name}>
          <LogoWordmark markClass="h-10 w-10" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-mono text-[12px] uppercase tracking-[0.08em] transition-colors ${
                isActive(item.href)
                  ? "text-gold-400"
                  : "text-gray-500 hover:text-gold-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={isAuthed ? "/dashboard" : "/login"}
            className="rounded-sm border border-gold-500/70 px-5 py-2 font-mono text-[12px] uppercase tracking-[0.08em] text-gold-300 transition-colors hover:bg-gold-400 hover:text-ink"
          >
            {isAuthed ? "Dashboard" : "Client Login"}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gold-400 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-line bg-ink lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 font-mono text-[12px] uppercase tracking-[0.08em] text-gray-400 hover:bg-card hover:text-gold-400"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={isAuthed ? "/dashboard" : "/login"}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-sm border border-gold-500/70 px-3 py-2.5 text-center font-mono text-[12px] uppercase tracking-[0.08em] text-gold-300 hover:bg-gold-400 hover:text-ink"
            >
              {isAuthed ? "Dashboard" : "Client Login"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
