export const locales = ["es", "en"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "es"

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale)
}

export function withLocale(locale: Locale, href: string) {
  if (href.startsWith("http")) return href
  if (href === "/") return `/${locale}`
  return `/${locale}${href}`
}

export function getLocaleFromPathname(pathname: string): Locale {
  const segment = pathname.split("/")[1]
  return isLocale(segment) ? segment : defaultLocale
}

export function stripLocale(pathname: string) {
  const parts = pathname.split("/")
  return isLocale(parts[1]) ? `/${parts.slice(2).join("/")}`.replace(/\/$/, "") || "/" : pathname
}
