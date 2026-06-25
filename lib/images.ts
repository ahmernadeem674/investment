// Centralised imagery. To swap any picture, replace the URL here — it updates
// everywhere it's used. These are Unsplash photos (free to use). To use your
// own, drop files in /public and point these at e.g. "/hero.jpg".

const U = "https://images.unsplash.com/";

export const images = {
  heroTowers: U + "photo-1486406146926-c627a92ad1ab", // glass office towers
  cityDusk: U + "photo-1444723121867-7a241cacace9", // city skyline at dusk
  analyticsDesk: U + "photo-1454165804606-c3d57bc86b40", // finance charts on desk
  handshake: U + "photo-1521791136064-7986c2920216", // handshake
  teamMeeting: U + "photo-1600880292203-757bb62b4baf", // business meeting
  laptopAnalytics: U + "photo-1460925895917-afdab827c52f", // laptop analytics
  advisor: U + "photo-1556761175-5973dc0f32e7", // advisor / office team
};

// Build a sized, optimised Unsplash URL. (next/image re-optimises too, but
// passing sensible params keeps source payloads reasonable.)
export function img(url: string, w = 1600, q = 75): string {
  if (!url.startsWith("http")) return url; // local /public asset
  return `${url}?auto=format&fit=crop&w=${w}&q=${q}`;
}
