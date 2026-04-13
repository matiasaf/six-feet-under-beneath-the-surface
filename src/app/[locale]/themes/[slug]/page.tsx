import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { themes as baseThemes } from "@/data/themes"
import { getScenes, getTheme, getThemes } from "@/data/localized"
import { ThemePageClient } from "@/components/theme/ThemePageClient"
import { isLocale, locales, withLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionary"

export function generateStaticParams() {
  return locales.flatMap((locale) => baseThemes.map((theme) => ({ locale, slug: theme.slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  if (!isLocale(rawLocale)) return { title: "Theme" }
  const theme = getTheme(slug, rawLocale)
  if (!theme) return { title: "Theme" }
  return { title: theme.name, description: theme.description }
}

export default async function ThemePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: rawLocale, slug } = await params
  if (!isLocale(rawLocale)) notFound()
  const theme = getTheme(slug, rawLocale)
  if (!theme) notFound()

  const dictionary = getDictionary(rawLocale)
  const scenes = getScenes(rawLocale)
  const themes = getThemes(rawLocale)
  const themeScenes = theme.scenes
    .map((sceneSlug) => scenes.find((scene) => scene.slug === sceneSlug))
    .filter(Boolean) as typeof scenes
  const otherThemes = themes.filter((item) => item.slug !== slug)

  return (
    <main className="pt-24 pb-16 px-6">
      <div className="mx-auto max-w-4xl">
        <Link
          href={withLocale(rawLocale, "/themes")}
          className="inline-block text-xs uppercase tracking-[0.3em] text-neutral-600 hover:text-neutral-400 transition-colors mb-8"
        >
          &larr; {dictionary.theme.back}
        </Link>
        <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-4">
          {dictionary.theme.eyebrow}
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl font-light mb-4">
          {theme.name}
        </h1>
        <p className="font-[family-name:var(--font-playfair)] italic text-xl md:text-2xl text-neutral-400 mb-10">
          {theme.tagline}
        </p>
        <p className="text-lg leading-relaxed text-neutral-300 mb-16 max-w-3xl">
          {theme.description}
        </p>
        <ThemePageClient themeScenes={themeScenes} otherThemes={otherThemes} locale={rawLocale} />
      </div>
    </main>
  )
}
