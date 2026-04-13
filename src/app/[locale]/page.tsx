import { notFound } from "next/navigation"
import { HeroIntro } from "@/components/home/HeroIntro"
import { UniverseSection } from "@/components/home/UniverseSection"
import { ThemeMap } from "@/components/home/ThemeMap"
import { FeaturedScenes } from "@/components/home/FeaturedScenes"
import { EmotionalTimeline } from "@/components/home/EmotionalTimeline"
import { CharacterConstellation } from "@/components/home/CharacterConstellation"
import { ArchiveTeaser } from "@/components/home/ArchiveTeaser"
import { isLocale, locales } from "@/i18n/config"
import { getCharacters, getScenes, getThemes } from "@/data/localized"

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()

  const scenes = getScenes(rawLocale)
  const themes = getThemes(rawLocale)
  const characters = getCharacters(rawLocale)

  return (
    <main>
      <HeroIntro locale={rawLocale} />
      <UniverseSection locale={rawLocale} />
      <ThemeMap locale={rawLocale} themes={themes} />
      <FeaturedScenes locale={rawLocale} scenes={scenes} />
      <EmotionalTimeline locale={rawLocale} scenes={scenes} />
      <CharacterConstellation locale={rawLocale} characters={characters} />
      <ArchiveTeaser locale={rawLocale} />
    </main>
  )
}
