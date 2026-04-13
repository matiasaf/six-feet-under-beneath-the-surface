import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { journeys as baseJourneys } from "@/data/journeys"
import { getJourney, getScenes } from "@/data/localized"
import { ArchiveImage } from "@/components/media/ArchiveImage"
import { isLocale, locales, withLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionary"

export function generateStaticParams() {
  return locales.flatMap((locale) => baseJourneys.map((journey) => ({ locale, slug: journey.slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  if (!isLocale(rawLocale)) return { title: "Journey" }
  const journey = getJourney(slug, rawLocale)
  if (!journey) return { title: "Journey" }
  return { title: journey.title, description: journey.description }
}

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: rawLocale, slug } = await params
  if (!isLocale(rawLocale)) notFound()
  const journey = getJourney(slug, rawLocale)
  if (!journey) notFound()

  const dictionary = getDictionary(rawLocale)
  const scenes = getScenes(rawLocale)
  const journeyScenes = journey.scenes
    .map((sceneSlug) => scenes.find((scene) => scene.slug === sceneSlug))
    .filter(Boolean) as typeof scenes

  return (
    <main className="px-6 pb-16 pt-24">
      <div className="mx-auto max-w-5xl">
        <Link
          href={withLocale(rawLocale, "/journeys")}
          className="mb-8 inline-block text-xs uppercase tracking-[0.3em] text-neutral-600 transition-colors hover:text-neutral-400"
        >
          &larr; {dictionary.nav.journeys}
        </Link>

        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-neutral-600">
            {dictionary.pages.journeysEyebrow}
          </p>
          <h1 className="mb-4 font-[family-name:var(--font-playfair)] text-4xl font-light md:text-6xl">
            {journey.title}
          </h1>
          <p className="mb-5 font-[family-name:var(--font-playfair)] text-2xl italic text-neutral-400">
            {journey.subtitle}
          </p>
          <p className="text-lg leading-relaxed text-neutral-500">
            {journey.description}
          </p>
        </div>

        <div className="space-y-5">
          {journeyScenes.map((scene, index) => (
            <Link
              key={scene.slug}
              href={withLocale(rawLocale, `/scenes/${scene.slug}`)}
              className="group block overflow-hidden rounded-lg border border-white/5 bg-white/[0.02] transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04]"
            >
              <ArchiveImage
                src={scene.image}
                alt={scene.imageAlt}
                label={scene.title}
                className="aspect-video"
              />
              <div className="p-6 md:p-8">
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neutral-600">
                  {rawLocale === "es" ? "Paso" : "Step"} {index + 1} / T{scene.season} E{scene.episode}
                </p>
                <h2 className="mb-3 font-[family-name:var(--font-playfair)] text-2xl text-neutral-200 transition-colors group-hover:text-white">
                  {scene.title}
                </h2>
                <blockquote className="mb-4 font-[family-name:var(--font-playfair)] italic text-neutral-500">
                  &ldquo;{scene.quote}&rdquo;
                </blockquote>
                <p className="text-sm leading-relaxed text-neutral-600">
                  {scene.humanTension}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
