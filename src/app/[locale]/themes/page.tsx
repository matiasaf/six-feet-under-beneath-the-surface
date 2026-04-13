import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { getScenes, getThemes } from "@/data/localized"
import { getDictionary } from "@/i18n/dictionary"
import { isLocale, withLocale } from "@/i18n/config"

export const metadata: Metadata = {
  title: "Themes",
  description: "Emotional and philosophical themes in Six Feet Under.",
}

export default async function ThemesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()

  const dictionary = getDictionary(rawLocale)
  const themes = getThemes(rawLocale)
  const scenes = getScenes(rawLocale)

  return (
    <main className="px-6 pb-16 pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-neutral-600">
            {dictionary.home.themeEyebrow}
          </p>
          <h1 className="mb-5 font-[family-name:var(--font-playfair)] text-4xl font-light md:text-6xl">
            {dictionary.pages.themesTitle}
          </h1>
          <p className="text-lg leading-relaxed text-neutral-500">
            {dictionary.pages.themesDescription}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {themes.map((theme) => {
            const count = theme.scenes.filter((slug) =>
              scenes.some((scene) => scene.slug === slug)
            ).length

            return (
              <Link
                key={theme.slug}
                href={withLocale(rawLocale, `/themes/${theme.slug}`)}
                className="group block rounded-lg border border-white/5 bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/12 hover:bg-white/[0.04] md:p-8"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-light text-neutral-200 transition-colors group-hover:text-white">
                    {theme.name}
                  </h2>
                  <span className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-500">
                    {count} {count === 1 ? dictionary.common.scene : dictionary.common.scenes}
                  </span>
                </div>
                <p className="mb-4 font-[family-name:var(--font-playfair)] text-lg italic text-neutral-400">
                  {theme.tagline}
                </p>
                <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600">
                  {theme.description}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
