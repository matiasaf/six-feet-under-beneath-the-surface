import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { themes, getTheme } from "@/data/themes"
import { scenes } from "@/data/scenes"
import { ThemePageClient } from "@/components/theme/ThemePageClient"

export function generateStaticParams() {
  return themes.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const theme = getTheme(slug)

  if (!theme) {
    return {
      title: "Tema",
    }
  }

  return {
    title: theme.name,
    description: theme.description,
    openGraph: {
      title: theme.name,
      description: theme.description,
      type: "article",
    },
  }
}

export default async function ThemePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const theme = getTheme(slug)

  if (!theme) notFound()

  const themeScenes = theme.scenes
    .map((s) => scenes.find((sc) => sc.slug === s))
    .filter(Boolean) as typeof scenes

  const otherThemes = themes.filter((t) => t.slug !== slug)

  return (
    <main className="pt-24 pb-16 px-6">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/themes"
          className="inline-block text-xs uppercase tracking-[0.3em] text-neutral-600 hover:text-neutral-400 transition-colors mb-8"
        >
          &larr; Temas
        </Link>

        <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-4">
          Tema
        </p>

        <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl font-light mb-4">
          {theme.name}
        </h1>

        <p className="font-[family-name:var(--font-playfair)] italic text-xl md:text-2xl text-neutral-400 mb-10">
          {theme.tagline}
        </p>

        <p className="text-lg leading-relaxed text-neutral-300 mb-16 max-w-3xl">
          {theme.description}
        </p>

        <ThemePageClient themeScenes={themeScenes} otherThemes={otherThemes} />
      </div>
    </main>
  )
}
