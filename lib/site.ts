// Central site configuration. Change firm details / contacts here and they
// update everywhere (header, footer, contact, metadata).
export const site = {
  name: "Usman Holdings",
  shortName: "Usman Holdings",
  tagline: "Private Wealth, Markets & Ventures",
  description:
    "Usman Holdings is a private investment and advisory firm operating across global markets, real-world ventures, and business outsourcing — guided by disciplined, research-driven conviction.",
  founder: "Usman Asif",
  founded: "2017",

  // Brand mark shown in header/footer/login/dashboard. Replace with your real
  // crest by dropping a file in /public and pointing this at it (e.g. "/logo.png").
  logoSrc: "/logo.svg",

  email: "usmanholdings@investments.com",
  // Where contact-form submissions are emailed.
  notifyEmail: "usmanholdings111@gmail.com",
  // Logged-in users with these emails can view the inquiries admin page.
  adminEmails: ["ahmernadeem674@gmail.com"],

  phone: "+92 371 1689111",
  phoneHref: "+923711689111",
  whatsapp: "+92 371 1689111",
  whatsappHref: "923711689111", // wa.me/<this>

  // Offices
  office:
    "Faisal Towers, opposite Metro Stargate, Main Shahrah-e-Faisal, near Jinnah International, Karachi, Pakistan.",
  registeredOffice: "Estonia, Europe",
  mapsUrl:
    "https://www.google.com/maps/place/24%C2%B053'12.5%22N+67%C2%B008'59.5%22E/@24.8868166,67.147279,17z/data=!3m1!4b1!4m4!3m3!8m2!3d24.8868166!4d67.1498539",

  socials: {
    x: "https://x.com/UsmanHoldings",
    vimeo: "https://vimeo.com/user260371713",
  },

  // Stats shown across the site.
  stats: [
    { value: "2017", label: "Year Founded" },
    { value: "$47M+", label: "Assets Advised" },
    { value: "80+", label: "Active Clients" },
    { value: "200+", label: "Verified Calls" },
  ],

  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "BPO", href: "/bpo" },
    { label: "Track Record", href: "/track-record" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const whatsappLink = (text = "Hello, I'd like to learn more about Usman Holdings.") =>
  `https://wa.me/${site.whatsappHref}?text=${encodeURIComponent(text)}`;
