"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { getDictionary } from "@/i18n/dictionary"
import { getLocaleFromPathname, stripLocale, withLocale } from "@/i18n/config"

const navItems = [
  { key: "scenes", href: "/scenes" },
  { key: "scripts", href: "/scripts" },
  { key: "quotes", href: "/quotes" },
  { key: "journeys", href: "/journeys" },
  { key: "themes", href: "/themes" },
  { key: "characters", href: "/characters" },
] as const

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const dictionary = getDictionary(locale)
  const pathWithoutLocale = stripLocale(pathname)

  const isActive = (href: string) =>
    pathWithoutLocale === href || (href !== "/" && pathWithoutLocale.startsWith(`${href}/`))

  const languageHref = locale === "es"
    ? withLocale("en", pathWithoutLocale)
    : withLocale("es", pathWithoutLocale)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-3 pt-3 md:px-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(10,10,10,0.78),rgba(10,10,10,0.46))] px-5 py-3 shadow-[0_18px_48px_rgba(0,0,0,0.2)] backdrop-blur-xl">
        <Link
          href={withLocale(locale, "/")}
          onClick={() => setOpen(false)}
          className="font-[family-name:var(--font-playfair)] text-lg tracking-[0.08em] text-neutral-200 transition-colors hover:text-white"
        >
          Six Feet Under
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5 lg:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={withLocale(locale, item.href)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`text-sm tracking-widest uppercase transition-colors ${
                isActive(item.href)
                  ? "text-neutral-100"
                  : "text-neutral-500 hover:text-neutral-200"
              }`}
            >
              {dictionary.nav[item.key]}
            </Link>
          ))}
          <Link
            href={languageHref}
            className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-neutral-500 transition-colors hover:border-white/20 hover:text-neutral-200"
          >
            {locale === "es" ? "EN" : "ES"}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-md p-1 text-neutral-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-400"
          aria-label={open ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-navigation"
          className="mx-auto mt-3 max-w-7xl rounded-[1.5rem] border border-white/10 bg-[#0a0a0a]/92 px-6 py-6 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={withLocale(locale, item.href)}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`text-sm tracking-widest uppercase transition-colors ${
                  isActive(item.href)
                    ? "text-neutral-100"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {dictionary.nav[item.key]}
              </Link>
            ))}
            <Link
              href={languageHref}
              onClick={() => setOpen(false)}
              className="text-sm tracking-widest uppercase text-neutral-400 transition-colors hover:text-white"
            >
              {locale === "es" ? "English" : "Español"}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
