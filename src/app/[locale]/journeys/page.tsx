import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { getJourneys, getScenes } from "@/data/localized"
import { ArchiveImage } from "@/components/media/ArchiveImage"
import { getDictionary } from "@/i18n/dictionary"
import { isLocale, withLocale } from "@/i18n/config"

export const metadata: Metadata = {
  title: "Journeys",
  description: "Curated journeys through Six Feet Under scenes.",
}

export default async function JourneysPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()

  const dictionary = getDictionary(rawLocale)
  const journeys = getJourneys(rawLocale)
  const scenes = getScenes(rawLocale)

  return (
    <main className="px-6 pb-16 pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-neutral-600">
            {dictionary.pages.journeysEyebrow}
          </p>
          <h1 className="mb-5 font-[family-name:var(--font-playfair)] text-4xl font-light md:text-6xl">
            {dictionary.pages.journeysTitle}
          </h1>
          <p className="text-lg leading-relaxed text-neutral-500">
            {dictionary.pages.journeysDescription}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {journeys.map((journey) => {
            const firstScene = scenes.find((scene) => scene.slug === journey.scenes[0])

            return (
              <Link
                key={journey.slug}
                href={withLocale(rawLocale, `/journeys/${journey.slug}`)}
                className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-lg border border-white/5 p-6 transition-all duration-500 hover:border-white/15"
              >
                {firstScene && (
                  <ArchiveImage
                    src={firstScene.image}
                    alt={firstScene.imageAlt}
                    label={journey.title}
                    className="absolute inset-0"
                    imageClassName="opacity-75 transition-opacity group-hover:opacity-95"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/10" />
                <div className="relative">
                  <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
                    {journey.scenes.length} {dictionary.common.scenes}
                  </p>
                  <h2 className="mb-3 font-[family-name:var(--font-playfair)] text-2xl text-neutral-100">
                    {journey.title}
                  </h2>
                  <p className="mb-5 text-sm leading-relaxed text-neutral-400">
                    {journey.subtitle}
                  </p>
                  <p className="text-xs uppercase tracking-[0.24em] text-neutral-600 transition-colors group-hover:text-neutral-300">
                    {dictionary.common.start}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
