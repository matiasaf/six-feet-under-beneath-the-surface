import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { getCharacters, getScene, getScenes, getThemes } from "@/data/localized"
import { scenes as baseScenes } from "@/data/scenes"
import { ScenePageClient } from "@/components/scene/ScenePageClient"
import { ArchiveImage } from "@/components/media/ArchiveImage"
import { isLocale, locales, withLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionary"

export function generateStaticParams() {
  return locales.flatMap((locale) => baseScenes.map((scene) => ({ locale, slug: scene.slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  if (!isLocale(rawLocale)) return { title: "Scene" }
  const scene = getScene(slug, rawLocale)

  if (!scene) return { title: "Scene" }

  return {
    title: scene.title,
    description: scene.summary,
    openGraph: {
      title: scene.title,
      description: scene.summary,
      type: "article",
    },
  }
}

export default async function ScenePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: rawLocale, slug } = await params
  if (!isLocale(rawLocale)) notFound()

  const scene = getScene(slug, rawLocale)
  if (!scene) notFound()

  const dictionary = getDictionary(rawLocale)
  const scenes = getScenes(rawLocale)
  const themes = getThemes(rawLocale)
  const characters = getCharacters(rawLocale)

  const relatedScenes = scene.relatedScenes
    .map((sceneSlug) => scenes.find((item) => item.slug === sceneSlug))
    .filter(Boolean) as typeof scenes

  const sceneThemes = scene.themes
    .map((themeSlug) => themes.find((theme) => theme.slug === themeSlug))
    .filter(Boolean) as typeof themes

  const sceneCharacters = scene.characters
    .map((characterSlug) => characters.find((character) => character.slug === characterSlug))
    .filter(Boolean) as typeof characters

  return (
    <main className="pt-24 pb-16">
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <Link
            href={withLocale(rawLocale, "/scenes")}
            className="inline-block text-xs uppercase tracking-[0.3em] text-neutral-600 hover:text-neutral-400 transition-colors mb-8"
          >
            &larr; {dictionary.pages.scenesTitle}
          </Link>

          <div className="flex items-center gap-3 mb-6 text-xs text-neutral-600">
            <span>{dictionary.common.season} {scene.season}</span>
            <span className="w-1 h-1 rounded-full bg-neutral-700" />
            <span>{dictionary.common.episode} {scene.episode}</span>
            <span className="w-1 h-1 rounded-full bg-neutral-700" />
            <span>{scene.episodeTitle}</span>
          </div>

          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl font-light mb-8">
            {scene.title}
          </h1>

          <blockquote className="font-[family-name:var(--font-playfair)] italic text-2xl md:text-3xl text-neutral-400 border-l-2 border-neutral-800 pl-6 mb-8">
            &ldquo;{scene.quote}&rdquo;
          </blockquote>

          <div className="flex flex-wrap gap-2 mb-8">
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-neutral-400">
              {dictionary.mood[scene.mood] ?? scene.mood}
            </span>
            {sceneCharacters.map((character) => (
              <Link
                key={character.slug}
                href={withLocale(rawLocale, `/characters/${character.slug}`)}
                className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-neutral-400 hover:text-white hover:border-white/20 transition-colors"
              >
                {character.name}
              </Link>
            ))}
            {sceneThemes.map((theme) => (
              <Link
                key={theme.slug}
                href={withLocale(rawLocale, `/themes/${theme.slug}`)}
                className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-neutral-400 hover:text-white hover:border-white/20 transition-colors"
              >
                {theme.name}
              </Link>
            ))}
          </div>

          <ArchiveImage
            src={scene.image}
            alt={scene.imageAlt}
            label={scene.title}
            className="aspect-video rounded-lg border border-white/5"
          />
          <p className="mt-3 text-[10px] uppercase tracking-[0.24em] text-neutral-700">
            {dictionary.common.image}: {scene.imageSource}
          </p>
        </div>
      </section>

      <ScenePageClient scene={scene} relatedScenes={relatedScenes} locale={rawLocale} />
    </main>
  )
}
