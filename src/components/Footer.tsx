import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "#destinations" },
  { label: "My Bookings", href: "#bookings" },
  { label: "My Profile", href: "#profile" },
];

const supportLinks = [
  { label: "Help Center", href: "#help" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
];

const socialLinks = [
  { label: "X", href: "#x" },
  { label: "LinkedIn", href: "#linkedin" },
  { label: "Instagram", href: "#instagram" },
];

function Footer() {
  return (
    <footer className="bg-[#0d0d0d] text-white">
      <div className="mx-auto w-full max-w-[70rem] px-5 pt-16 pb-6 sm:px-6 md:pt-20 lg:pt-[5rem]">
        <div>
          <Image
            src="/assets/Wanderlast-1.png"
            alt="Wanderlast"
            width={542}
            height={80}
            className="h-auto w-full max-w-[34rem]"
          />
          <p className="mt-5 max-w-3xl text-sm text-white/70 md:text-base lg:text-xl">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-14 lg:grid-cols-[1.7fr_1fr_1fr_1fr]">
          <div className="max-w-[21rem]">
            <h3 className="text-sm font-semibold tracking-[0.08em] text-white/80 uppercase lg:text-base">
              Newsletter
            </h3>
            <p className="mt-3 text-sm text-white/50 lg:text-base">
              Subscribe for exclusive travel deals and inspiration.
            </p>

            <form className="mt-5 flex h-14 w-full items-center bg-[#2d2d2d] pl-4 lg:h-16">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="Enter email"
                autoComplete="email"
                className="h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/60 lg:text-base"
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="flex size-12 shrink-0 items-center justify-center text-white transition-colors hover:text-brand lg:size-14"
              >
                <ArrowUpRight className="size-5" />
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-[0.08em] text-white/80 uppercase lg:text-base">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3 lg:mt-12 lg:space-y-6">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-white lg:text-xl"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-[0.08em] text-white/80 uppercase lg:text-base">
              Support
            </h3>
            <ul className="mt-5 space-y-3 lg:mt-12 lg:space-y-6">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/75 transition-colors hover:text-white lg:text-xl"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-[0.08em] text-white/80 uppercase lg:text-base">
              Contact Us
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/75 lg:mt-12 lg:space-y-6 lg:text-xl">
              <li>
                <a
                  href="tel:7869011622"
                  className="transition-colors hover:text-white"
                >
                  786 901 1622
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@wanderland.com"
                  className="transition-colors hover:text-white"
                >
                  info@wanderland.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-16 lg:pt-6">
          <p className="text-xs text-white/50 lg:text-base">
            &copy; 2026 Wanderlust. All rights reserved.
          </p>

          <ul className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  className="flex text-white transition-colors hover:text-brand"
                >
                  {social.label === "X" && (
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      fill="currentColor"
                      className="size-5 lg:size-6"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                  {social.label === "LinkedIn" && (
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      fill="currentColor"
                      className="size-5 lg:size-6"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  )}
                  {social.label === "Instagram" && (
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      fill="currentColor"
                      className="size-5 lg:size-6"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
