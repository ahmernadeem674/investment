// Central site configuration. Change the firm name / contact details here and
// they update everywhere (header, footer, contact page, metadata).
export const site = {
  name: "Usman Holdings",
  shortName: "Usman Holdings",
  tagline: "Private Wealth & Investment Advisory",
  description:
    "Usman Holdings is a private investment advisory firm helping individuals and families preserve, grow, and transfer wealth with discipline and discretion.",
  email: "usmanholdings@investments.com",
  // Where contact-form submissions are emailed.
  notifyEmail: "usmanholdings111@gmail.com",
  // Logged-in users with these emails can view the inquiries admin page.
  adminEmails: ["ahmernadeem674@gmail.com"],
  phone: "+92 335 0357200",
  // tel: link form (no spaces)
  phoneHref: "+923350357200",
  address: "Karachi, Pakistan",
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
