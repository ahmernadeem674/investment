import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react";
import { site } from "@/lib/site";
import { signIn } from "./actions";

export const metadata = { title: "Client Login" };

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const error = searchParams?.error;

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-navy-950 p-12 lg:flex">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(50% 50% at 80% 10%, rgba(205,160,73,0.25) 0%, rgba(11,31,58,0) 60%), radial-gradient(50% 50% at 10% 90%, rgba(53,102,153,0.35) 0%, rgba(11,31,58,0) 60%)",
          }}
        />
        <Link
          href="/"
          className="relative flex items-center gap-3"
          aria-label={site.name}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-white/10 font-serif text-lg font-bold text-gold-300">
            U
          </span>
          <span className="font-serif text-xl font-bold text-white">
            {site.name}
          </span>
        </Link>

        <div className="relative">
          <h2 className="max-w-md text-3xl font-bold leading-snug text-white">
            Your portfolio, with clarity and confidence.
          </h2>
          <p className="mt-4 max-w-md text-navy-200">
            Securely access your holdings, performance, and reporting — anytime.
          </p>
          <div className="mt-8 flex gap-6 text-sm text-navy-300">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-gold-400" /> Fiduciary
            </span>
            <span className="inline-flex items-center gap-2">
              <Lock className="h-4 w-4 text-gold-400" /> Encrypted access
            </span>
          </div>
        </div>

        <p className="relative text-xs text-navy-400">
          © {new Date().getFullYear()} {site.name}
        </p>
      </div>

      {/* Form panel */}
      <div className="flex flex-col items-center justify-center bg-cream p-6">
        <div className="w-full max-w-sm">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-navy-500 transition-colors hover:text-navy-900 lg:hidden"
          >
            <ArrowLeft className="h-4 w-4" /> Back to site
          </Link>

          <h1 className="text-2xl font-bold text-navy-900">Client Login</h1>
          <p className="mt-1.5 text-sm text-navy-500">
            Sign in to access your investor portal.
          </p>

          {error && (
            <div className="mt-6 rounded-md bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form action={signIn} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-navy-800"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md border border-navy-200 px-3.5 py-2.5 text-sm text-navy-900 focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-navy-800"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border border-navy-200 px-3.5 py-2.5 text-sm text-navy-900 focus:border-navy-400 focus:outline-none focus:ring-1 focus:ring-navy-400"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Sign in
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-navy-400">
            Need access? Contact your advisor at{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-gold-700 hover:underline"
            >
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
