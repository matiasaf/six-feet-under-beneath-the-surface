import type { Metadata } from "next"
import Link from "next/link"
import { themes } from "@/data/themes"
import { scenes } from "@/data/scenes"

export const metadata: Metadata = {
  title: "Temas",
  description:
    "Mapa de temas emocionales y filosoficos para recorrer Six Feet Under por muerte, familia, deseo, identidad y duelo.",
}

export default function ThemesPage() {
  return (
    <main className="px-6 pb-16 pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-neutral-600">
            Mapa emocional
          </p>
          <h1 className="mb-5 font-[family-name:var(--font-playfair)] text-4xl font-light md:text-6xl">
            Temas
          </h1>
          <p className="text-lg leading-relaxed text-neutral-500">
            Entradas para leer la serie desde sus tensiones centrales: lo que
            cada personaje desea, evita, hereda o no puede nombrar.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {themes.map((theme) => {
            const count = theme.scenes.filter((slug) =>
              scenes.some((scene) => scene.slug === slug)
            ).length

            return (
              <Link
                key={theme.slug}
                href={`/themes/${theme.slug}`}
                className="group block rounded-lg border border-white/5 bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/12 hover:bg-white/[0.04] md:p-8"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-light text-neutral-200 transition-colors group-hover:text-white">
                    {theme.name}
                  </h2>
                  <span className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-500">
                    {count} escenas
                  </span>
                </div>
                <p className="mb-4 font-[family-name:var(--font-playfair)] text-lg italic text-neutral-400">
                  {theme.tagline}
                </p>
                <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600">
                  {theme.description}
                </p>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
