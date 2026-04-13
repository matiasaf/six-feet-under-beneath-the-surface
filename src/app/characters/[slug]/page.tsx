import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { characters, getCharacter } from "@/data/characters"
import { scenes } from "@/data/scenes"
import { themes } from "@/data/themes"
import { CharacterPageClient } from "@/components/character/CharacterPageClient"
import { ArchiveImage } from "@/components/media/ArchiveImage"

export function generateStaticParams() {
  return characters.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const character = getCharacter(slug)

  if (!character) {
    return {
      title: "Personaje",
    }
  }

  return {
    title: character.name,
    description: character.coreWound,
    openGraph: {
      title: character.name,
      description: character.coreWound,
      type: "article",
    },
  }
}

export default async function CharacterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const character = getCharacter(slug)

  if (!character) notFound()

  const charScenes = character.scenes
    .map((s) => scenes.find((sc) => sc.slug === s))
    .filter(Boolean) as typeof scenes

  const charThemes = character.themes
    .map((t) => themes.find((th) => th.slug === t))
    .filter(Boolean) as typeof themes

  const otherCharacters = characters.filter((c) => c.slug !== slug)

  return (
    <main className="pt-24 pb-16 px-6">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/characters"
          className="inline-block text-xs uppercase tracking-[0.3em] text-neutral-600 hover:text-neutral-400 transition-colors mb-8"
        >
          &larr; Personajes
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

        {/* Core wound */}
        <div className="mb-12">
          <h2 className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-4">
            Herida central
          </h2>
          <p className="text-lg leading-relaxed text-neutral-300">
            {character.coreWound}
          </p>
        </div>

        {/* Description */}
        <div className="mb-12">
          <h2 className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-4">
            El personaje
          </h2>
          <div className="space-y-5">
            {character.description.split("\n\n").map((paragraph, i) => (
              <p key={i} className="font-[family-name:var(--font-playfair)] text-xl leading-relaxed text-neutral-200 font-light">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Themes */}
        <div className="mb-12">
          <h2 className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-4">
            Temas
          </h2>
          <div className="flex flex-wrap gap-2">
            {charThemes.map((t) => (
              <Link
                key={t.slug}
                href={`/themes/${t.slug}`}
                className="rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-sm text-neutral-400 hover:text-white hover:border-white/20 transition-colors"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent mb-12" />

        <CharacterPageClient
          charScenes={charScenes}
          otherCharacters={otherCharacters}
        />
      </div>
    </main>
  )
}
