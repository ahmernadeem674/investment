"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { site } from "@/lib/site";

export function SiteHeader({ isAuthed }: { isAuthed: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100/80 bg-cream/85 backdrop-blur-md">
      <nav className="container-page flex h-20 items-center justify-between">
        {/* Wordmark */}
        <Link href="/" className="flex items-center gap-3" aria-label={site.name}>
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-navy-900 font-serif text-lg font-bold text-gold-300">
            U
          </span>
          <span className="font-serif text-xl font-bold tracking-tight text-navy-900">
            {site.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? "text-navy-900"
                    : "text-navy-600 hover:text-navy-900"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={isAuthed ? "/dashboard" : "/login"}
            className="btn-primary py-2.5"
          >
            {isAuthed ? "Dashboard" : "Investor Login"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-navy-900 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-navy-100 bg-cream md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-navy-700 hover:bg-navy-50"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={isAuthed ? "/dashboard" : "/login"}
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              {isAuthed ? "Dashboard" : "Investor Login"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
