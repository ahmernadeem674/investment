// Central site configuration. Change firm details / contacts here and they
// update everywhere (header, footer, contact, metadata).
export const site = {
  name: "Usman Holdings",
  shortName: "Usman Holdings",
  tagline: "Private Wealth, Markets & Ventures",
  description:
    "Usman Holdings is a private investment and advisory firm operating across global markets, real-world ventures, and business outsourcing — guided by disciplined, research-driven conviction.",
  founder: "Usman Asif",
  founded: "2022",

  email: "usmanholdings@investments.com",
  // Where contact-form submissions are emailed.
  notifyEmail: "usmanholdings111@gmail.com",
  // Logged-in users with these emails can view the inquiries admin page.
  adminEmails: ["ahmernadeem674@gmail.com"],

  phone: "+92 335 0357200",
  phoneHref: "+923350357200",
  whatsapp: "+92 335 0357200",
  whatsappHref: "923350357200", // wa.me/<this>
  address: "Karachi, Pakistan",

  socials: {
    x: "https://x.com/UsmanHoldings",
    vimeo: "https://vimeo.com/user260371713",
  },

  // Stats shown across the site (from the live brand).
  stats: [
    { value: "2022", label: "Year Founded" },
    { value: "$47M+", label: "Assets Advised" },
    { value: "83%", label: "Call Win Rate" },
    { value: "140+", label: "Verified Calls" },
    { value: "38+", label: "Active Clients" },
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
