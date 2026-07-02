import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle, Building2 } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { LogoWordmark } from "@/components/brand/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <LogoWordmark markClass="h-10 w-10" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-400">
              {site.description}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={site.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.08em] text-gray-500 transition-colors hover:text-gold-400"
              >
                X / Twitter ↗
              </a>
              <a
                href={site.socials.vimeo}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.08em] text-gray-500 transition-colors hover:text-gold-400"
              >
                Vimeo ↗
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-gray-300">
              Navigate
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-500 transition-colors hover:text-gold-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/login"
                  className="text-gray-500 transition-colors hover:text-gold-400"
                >
                  Client Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-gray-300">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-start gap-3 text-gray-500 transition-colors hover:text-gold-400"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                  <span className="break-all">{site.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-gray-500 transition-colors hover:text-gold-400"
                >
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                  <span>WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="flex items-start gap-3 text-gray-500 transition-colors hover:text-gold-400"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                  <span>{site.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-gray-400 transition-colors hover:text-gold-400"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                  <span>{site.office}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                <span>Registered Office: {site.registeredOffice}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="max-w-2xl sm:text-right">
            Past performance is not indicative of future results. Usman Holdings
            provides consultancy and advisory services only. This is not
            financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
