import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { scenes, getScene } from "@/data/scenes"
import { themes } from "@/data/themes"
import { characters } from "@/data/characters"
import { ScenePageClient } from "@/components/scene/ScenePageClient"
import { ArchiveImage } from "@/components/media/ArchiveImage"

export function generateStaticParams() {
  return scenes.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const scene = getScene(slug)

  if (!scene) {
    return {
      title: "Escena",
    }
  }

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

export default async function ScenePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const scene = getScene(slug)

  if (!scene) notFound()

  const relatedScenes = scene.relatedScenes
    .map((s) => scenes.find((sc) => sc.slug === s))
    .filter(Boolean)

  const sceneThemes = scene.themes
    .map((t) => themes.find((th) => th.slug === t))
    .filter(Boolean)

  const sceneCharacters = scene.characters
    .map((c) => characters.find((ch) => ch.slug === c))
    .filter(Boolean)

  return (
    <main className="pt-24 pb-16">
      {/* Hero */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/scenes"
            className="inline-block text-xs uppercase tracking-[0.3em] text-neutral-600 hover:text-neutral-400 transition-colors mb-8"
          >
            &larr; Escenas
          </Link>

          <div className="flex items-center gap-3 mb-6 text-xs text-neutral-600">
            <span>Temporada {scene.season}</span>
            <span className="w-1 h-1 rounded-full bg-neutral-700" />
            <span>Episodio {scene.episode}</span>
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
            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-neutral-400 capitalize">
              {scene.mood}
            </span>
            {sceneCharacters.map((c) => (
              <Link
                key={c!.slug}
                href={`/characters/${c!.slug}`}
                className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-neutral-400 hover:text-white hover:border-white/20 transition-colors"
              >
                {c!.name}
              </Link>
            ))}
            {sceneThemes.map((t) => (
              <Link
                key={t!.slug}
                href={`/themes/${t!.slug}`}
                className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-neutral-400 hover:text-white hover:border-white/20 transition-colors"
              >
                {t!.name}
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
            Imagen: {scene.imageSource}
          </p>
        </div>
      </section>

      <ScenePageClient scene={scene} relatedScenes={relatedScenes as typeof scenes} />
    </main>
  )
}
