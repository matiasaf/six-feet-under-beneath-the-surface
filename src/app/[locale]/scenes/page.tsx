import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ScenesList } from "@/components/scene/ScenesList"
import { getScenes } from "@/data/localized"
import { getDictionary } from "@/i18n/dictionary"
import { isLocale } from "@/i18n/config"

export const metadata: Metadata = {
  title: "Scenes",
  description: "Scene archive for Six Feet Under.",
}

export default async function ScenesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()

  const dictionary = getDictionary(rawLocale)
  const scenes = getScenes(rawLocale)

  return (
    <main className="pt-24 pb-16 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-4">
            {dictionary.pages.scenesEyebrow}
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-light mb-4">
            {dictionary.pages.scenesTitle}
          </h1>
          <p className="text-neutral-500 max-w-2xl">
            {dictionary.pages.scenesDescription}
          </p>
        </div>

        <ScenesList scenes={scenes} locale={rawLocale} />
      </div>
    </main>
  )
}
