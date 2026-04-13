import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { getCharacters, getThemes } from "@/data/localized"
import { ArchiveImage } from "@/components/media/ArchiveImage"
import { getDictionary } from "@/i18n/dictionary"
import { isLocale, withLocale } from "@/i18n/config"

export const metadata: Metadata = {
  title: "Characters",
  description: "Character guide for Six Feet Under.",
}

export default async function CharactersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()

  const dictionary = getDictionary(rawLocale)
  const characters = getCharacters(rawLocale)
  const themes = getThemes(rawLocale)

  return (
    <main className="px-6 pb-16 pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-neutral-600">
            {dictionary.home.charactersEyebrow}
          </p>
          <h1 className="mb-5 font-[family-name:var(--font-playfair)] text-4xl font-light md:text-6xl">
            {dictionary.pages.charactersTitle}
          </h1>
          <p className="text-lg leading-relaxed text-neutral-500">
            {dictionary.pages.charactersDescription}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {characters.map((character) => {
            const characterThemes = character.themes
              .map((slug) => themes.find((theme) => theme.slug === slug)?.name)
              .filter(Boolean)

            return (
              <Link
                key={character.slug}
                href={withLocale(rawLocale, `/characters/${character.slug}`)}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/5 bg-white/[0.02] transition-all duration-300 hover:border-white/12 hover:bg-white/[0.04]"
              >
                <ArchiveImage
                  src={character.image}
                  alt={character.imageAlt}
                  label={character.name}
                  className="min-h-64"
                  imageClassName="opacity-80 transition-opacity group-hover:opacity-100"
                />
                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neutral-600">
                    {character.fullName}
                  </p>
                  <h2 className="mb-4 font-[family-name:var(--font-playfair)] text-2xl text-neutral-200 transition-colors group-hover:text-white">
                    {character.name}
                  </h2>
                  <p className="mb-5 text-sm leading-relaxed text-neutral-500">
                    {character.coreWound}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {characterThemes.map((theme) => (
                      <span
                        key={theme}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-500"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
