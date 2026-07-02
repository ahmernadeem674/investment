import { site } from "@/lib/site";

// Brand mark. Uses /public/logo.svg (a gold crest placeholder). To use the
// real Usman Holdings crest, drop the file in /public and set site.logoSrc
// (e.g. "/logo.png"). Plain <img> so it works in Server Components and renders
// SVG without next/image config.
export function LogoMark({
  className = "h-9 w-9",
}: {
  className?: string;
}) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={site.logoSrc} alt={`${site.name} logo`} className={className} />;
}

export function LogoWordmark({
  markClass = "h-9 w-9",
  textClass = "font-serif text-lg font-bold tracking-wide text-gold-400",
}: {
  markClass?: string;
  textClass?: string;
}) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className={markClass} />
      <span className={textClass}>{site.name}</span>
    </span>
  );
}
