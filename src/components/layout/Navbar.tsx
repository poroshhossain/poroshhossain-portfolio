"use client";

import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { profile } from "@/data/profile";
import { cn, initialsOf } from "@/lib/utils";

type NavItem = { label: string; href: string; id: string };
const TOGGLE_ID = "mobile-nav-toggle";

/**
 * Navbar links point at home-page anchors (/#<id>) so they work from any
 * route, including project detail pages.
 */
const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/#home", id: "home" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export default function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Section ids only exist on the homepage; highlight there, never on /projects/*.
  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), []);

  // Scroll-driven active section. Location is read inside the effect (client
  // side only) so the navbar stays free of dynamic hooks during prerendering.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!window.location.pathname.startsWith("/")) {
          setActive(null);
          return;
        }
        const offset = 128; // navbar height + breathing room
        let current: string | null = null;
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= offset) {
            current = id;
          }
        }
        const atBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 2;
        if (atBottom) {
          current = sectionIds[sectionIds.length - 1];
        }
        if (
          !current &&
          window.scrollY <
            (document.getElementById(sectionIds[1])?.offsetTop ?? 0) - offset
        ) {
          current = sectionIds[0];
        }
        setActive(current);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionIds]);

  // Escape closes the mobile menu anywhere on the page and returns focus to
  // the toggle (looked up by id — keeps the effect dependency list stable).
  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById(TOGGLE_ID)?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <nav
        aria-label="Main"
        className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-md font-semibold tracking-tight text-foreground"
          >
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-md bg-accent font-mono text-xs font-bold text-accent-foreground"
            >
              {initialsOf(profile.name)}
            </span>
            {profile.name}
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "font-medium text-foreground underline decoration-accent decoration-2 underline-offset-4"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href="/resume.pdf"
              download
              className="ml-3 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
            >
              <Download className="size-4" aria-hidden="true" />
              Resume
            </a>
          </div>

          <button
            id={TOGGLE_ID}
            type="button"
            className="grid size-10 place-items-center rounded-md text-foreground md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <>
          {/* Click-outside catcher under the header (z-30 < z-40). */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-30 cursor-default md:hidden"
          />
          <div
            id="mobile-menu"
            className="border-t border-border bg-background md:hidden"
          >
            <ul className="mx-auto w-full max-w-6xl space-y-1 px-4 py-4 sm:px-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active === item.id ? "true" : undefined}
                    className={cn(
                      "block rounded-lg px-3 py-3 text-base transition-colors",
                      active === item.id
                        ? "font-medium text-foreground"
                        : "text-muted hover:bg-foreground/5 hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/resume.pdf"
                  download
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-medium text-accent-foreground"
                >
                  <Download className="size-4" aria-hidden="true" />
                  Download Resume
                </a>
              </li>
            </ul>
          </div>
        </>
      ) : null}
    </header>
  );
}
