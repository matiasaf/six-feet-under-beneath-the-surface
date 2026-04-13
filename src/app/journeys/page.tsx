import type { Metadata } from "next"
import Link from "next/link"
import { journeys } from "@/data/journeys"
import { scenes } from "@/data/scenes"
import { ArchiveImage } from "@/components/media/ArchiveImage"

export const metadata: Metadata = {
  title: "Recorridos",
  description:
    "Recorridos curatoriales por escenas de Six Feet Under desde duelo, familia, miedo y otras heridas.",
}

export default function JourneysPage() {
  return (
    <main className="px-6 pb-16 pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-neutral-600">
            Recorridos curatoriales
          </p>
          <h1 className="mb-5 font-[family-name:var(--font-playfair)] text-4xl font-light md:text-6xl">
            Entrar por una herida
          </h1>
          <p className="text-lg leading-relaxed text-neutral-500">
            Caminos de lectura para atravesar el archivo por clima emocional,
            conflicto familiar y escenas que se responden entre si.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {journeys.map((journey) => {
            const firstScene = scenes.find((scene) => scene.slug === journey.scenes[0])

            return (
              <Link
                key={journey.slug}
                href={`/journeys/${journey.slug}`}
                className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-lg border border-white/5 p-6 transition-all duration-500 hover:border-white/15"
              >
                {firstScene && (
                  <ArchiveImage
                    src={firstScene.image}
                    alt={firstScene.imageAlt}
                    label={journey.title}
                    className="absolute inset-0"
                    imageClassName="opacity-75 transition-opacity group-hover:opacity-95"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/10" />
                <div className="relative">
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
                  {journey.scenes.length} escenas
                </p>
                <h2 className="mb-3 font-[family-name:var(--font-playfair)] text-2xl text-neutral-100">
                  {journey.title}
                </h2>
                <p className="mb-5 text-sm leading-relaxed text-neutral-400">
                  {journey.subtitle}
                </p>
                <p className="text-xs uppercase tracking-[0.24em] text-neutral-600 transition-colors group-hover:text-neutral-300">
                  Iniciar recorrido
                </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
