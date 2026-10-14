import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/book.ico";

const links = [
  { label: "Books", href: "/Books" },
  { label: "About us", href: "/about" },
  { label: "Listed Books", href: "/ListedBooks" },
  { label: "Pages To Read", href: "/PagesToRead" },
];

const contactLinks = [
  { label: "E-mail", href: "mailto:hello@bookvibe.com" },
  { label: "Phone", href: "tel:+8801000000000" },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/80 backdrop-blur">
      <nav className="navbar mx-auto max-w-7xl px-4">
        {/* Left: logo + mobile menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              aria-label="Open menu"
              className="btn btn-ghost btn-circle lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content z-10 mt-3 w-56 rounded-2xl border border-stone-200 bg-white p-2 shadow-lg"
            >
              {links.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              <li>
                <span className="font-medium">Contact us</span>
                <ul className="p-2">
                  {contactLinks.map((item) => (
                    <li key={item.label}>
                      <a href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-stone-100"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-900">
              <Image src={logo} alt="Book Vibe logo" className="h-5 w-5" />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-stone-900">
              Book Vibe
            </span>
          </Link>
        </div>

        {/* Center: desktop links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1 text-sm font-medium text-stone-700">
            {links.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="rounded-full hover:bg-amber-100 hover:text-stone-900"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <details>
                <summary className="rounded-full hover:bg-amber-100 hover:text-stone-900">
                  Contact us
                </summary>
                <ul className="z-10 w-40 rounded-2xl border border-stone-200 bg-white p-2 shadow-lg">
                  {contactLinks.map((item) => (
                    <li key={item.label}>
                      <a href={item.href}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          </ul>
        </div>

        {/* Right: auth buttons */}
        <div className="navbar-end gap-2">
          <Link
            href="/signin"
            className="rounded-full px-5 py-2 text-sm font-semibold text-stone-800 transition hover:bg-stone-100"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-amber-400 px-5 py-2 text-sm font-bold text-stone-900 transition hover:bg-amber-300"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;