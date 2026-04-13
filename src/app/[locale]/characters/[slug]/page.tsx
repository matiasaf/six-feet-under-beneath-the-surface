import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { characters as baseCharacters } from "@/data/characters"
import { getCharacter, getCharacters, getScenes, getThemes } from "@/data/localized"
import { CharacterPageClient } from "@/components/character/CharacterPageClient"
import { ArchiveImage } from "@/components/media/ArchiveImage"
import { isLocale, locales, withLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionary"

export function generateStaticParams() {
  return locales.flatMap((locale) => baseCharacters.map((character) => ({ locale, slug: character.slug })))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  if (!isLocale(rawLocale)) return { title: "Character" }
  const character = getCharacter(slug, rawLocale)
  if (!character) return { title: "Character" }
  return { title: character.name, description: character.coreWound }
}

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: rawLocale, slug } = await params
  if (!isLocale(rawLocale)) notFound()
  const character = getCharacter(slug, rawLocale)
  if (!character) notFound()

  const dictionary = getDictionary(rawLocale)
  const scenes = getScenes(rawLocale)
  const themes = getThemes(rawLocale)
  const characters = getCharacters(rawLocale)

  const charScenes = character.scenes
    .map((sceneSlug) => scenes.find((scene) => scene.slug === sceneSlug))
    .filter(Boolean) as typeof scenes
  const charThemes = character.themes
    .map((themeSlug) => themes.find((theme) => theme.slug === themeSlug))
    .filter(Boolean) as typeof themes
  const otherCharacters = characters.filter((item) => item.slug !== slug)

  return (
    <main className="pt-24 pb-16 px-6">
      <div className="mx-auto max-w-4xl">
        <Link
          href={withLocale(rawLocale, "/characters")}
          className="inline-block text-xs uppercase tracking-[0.3em] text-neutral-600 hover:text-neutral-400 transition-colors mb-8"
        >
          &larr; {dictionary.character.back}
        </Link>
        <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-600 mb-2">
          {character.fullName}
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl font-light mb-6">
          {character.name}
        </h1>
        <blockquote className="font-[family-name:var(--font-playfair)] italic text-2xl md:text-3xl text-neutral-400 border-l-2 border-neutral-800 pl-6 mb-10">
          &ldquo;{character.quote}&rdquo;
        </blockquote>
        <ArchiveImage
          src={character.image}
          alt={character.imageAlt}
          label={character.name}
          className="mb-12 min-h-[360px] rounded-lg border border-white/5 md:min-h-[520px]"
        />

        <div className="mb-12">
          <h2 className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-4">
            {dictionary.character.coreWound}
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            {character.coreWound}
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-4">
            {dictionary.character.character}
          </h2>
          <div className="space-y-5">
            {character.description.split("\n\n").map((paragraph, index) => (
              <p key={index} className="font-[family-name:var(--font-playfair)] text-xl leading-relaxed text-neutral-200 font-light">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-4">
            {dictionary.character.themes}
          </h2>
          <div className="flex flex-wrap gap-2">
            {charThemes.map((theme) => (
              <Link
                key={theme.slug}
                href={withLocale(rawLocale, `/themes/${theme.slug}`)}
                className="rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-sm text-neutral-400 hover:text-white hover:border-white/20 transition-colors"
              >
                {theme.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent mb-12" />

        <CharacterPageClient
          charScenes={charScenes}
          otherCharacters={otherCharacters}
          locale={rawLocale}
        />
      </div>
    </main>
  )
}
