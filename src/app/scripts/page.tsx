import type { Metadata } from "next"
import Link from "next/link"
import { scripts } from "@/data/scripts"

export const metadata: Metadata = {
  title: "Guiones",
  description:
    "Documentos fuente para leer Six Feet Under desde sus primeras formas escritas.",
}

export default function ScriptsPage() {
  return (
    <main className="px-6 pb-16 pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-neutral-600">
            Capa cero
          </p>
          <h1 className="mb-5 font-[family-name:var(--font-playfair)] text-4xl font-light md:text-6xl">
            Guiones
          </h1>
          <p className="text-lg leading-relaxed text-neutral-500">
            Documentos originales leidos como restos de proceso: borradores,
            estructuras, escenas y decisiones que anticipan la forma final de la serie.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {scripts.map((script) => (
            <Link
              key={script.slug}
              href={`/scripts/${script.slug}`}
              className="group block rounded-lg border border-white/5 bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/12 hover:bg-white/[0.04] md:p-8"
            >
              <div className="mb-5 flex flex-wrap items-center gap-3 text-xs text-neutral-600">
                <span>{script.draftDate}</span>
                <span className="h-1 w-1 rounded-full bg-neutral-700" />
                <span>{script.pageCount} paginas</span>
                <span className="h-1 w-1 rounded-full bg-neutral-700" />
                <span>{script.writer}</span>
              </div>
              <h2 className="mb-3 font-[family-name:var(--font-playfair)] text-2xl font-light text-neutral-200 transition-colors group-hover:text-white">
                {script.title}
              </h2>
              <p className="mb-5 font-[family-name:var(--font-playfair)] text-lg italic text-neutral-400">
                {script.subtitle}
              </p>
              <p className="text-sm leading-relaxed text-neutral-600">
                {script.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
