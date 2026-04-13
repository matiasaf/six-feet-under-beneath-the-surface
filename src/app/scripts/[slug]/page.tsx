import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { getScript, scripts } from "@/data/scripts"
import { scenes } from "@/data/scenes"
import { themes } from "@/data/themes"

export function generateStaticParams() {
  return scripts.map((script) => ({ slug: script.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const script = getScript(slug)

  if (!script) {
    return {
      title: "Guion",
    }
  }

  return {
    title: script.title,
    description: script.description,
    openGraph: {
      title: script.title,
      description: script.description,
      type: "article",
    },
  }
}

export default async function ScriptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const script = getScript(slug)

  if (!script) notFound()

  const relatedScenes = script.relatedScenes
    .map((sceneSlug) => scenes.find((scene) => scene.slug === sceneSlug))
    .filter(Boolean) as typeof scenes

  const scriptThemes = script.themes
    .map((themeSlug) => themes.find((theme) => theme.slug === themeSlug))
    .filter(Boolean) as typeof themes

  return (
    <main className="px-6 pb-16 pt-24">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/scripts"
          className="mb-8 inline-block text-xs uppercase tracking-[0.3em] text-neutral-600 transition-colors hover:text-neutral-400"
        >
          &larr; Guiones
        </Link>

        <section className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="max-w-3xl">
            <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-neutral-600">
              Documento fuente
            </p>
            <h1 className="mb-4 font-[family-name:var(--font-playfair)] text-4xl font-light md:text-6xl">
              {script.title}
            </h1>
            <p className="mb-8 font-[family-name:var(--font-playfair)] text-2xl italic text-neutral-400">
              {script.subtitle}
            </p>
            <p className="text-lg leading-relaxed text-neutral-500">
              {script.description}
            </p>
          </div>

          <aside className="self-start rounded-lg border border-white/5 bg-white/[0.02] p-6">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.28em] text-neutral-600">
                  Autor
                </dt>
                <dd className="mt-1 text-neutral-300">{script.writer}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.28em] text-neutral-600">
                  Draft
                </dt>
                <dd className="mt-1 text-neutral-300">{script.draftDate}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.28em] text-neutral-600">
                  Extension
                </dt>
                <dd className="mt-1 text-neutral-300">{script.pageCount} paginas</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.28em] text-neutral-600">
                  Fuente
                </dt>
                <dd className="mt-1">
                  <a
                    href={script.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-300 underline decoration-neutral-700 underline-offset-4 transition-colors hover:text-white"
                  >
                    {script.sourceName}
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-neutral-600">
              Lectura
            </p>
            <p className="font-[family-name:var(--font-playfair)] text-2xl leading-relaxed text-neutral-200 md:text-3xl">
              {script.thesis}
            </p>
            <p className="mt-8 text-sm leading-relaxed text-neutral-600">
              {script.editorialNote}
            </p>
          </div>

          <div className="rounded-lg border border-white/5 bg-[#11100f] p-3">
            <div className="aspect-[4/5] overflow-hidden rounded-lg bg-black">
              <iframe
                src={script.sourceUrl}
                title={`${script.title} PDF`}
                className="h-full w-full"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 px-2 py-4">
              <p className="text-xs leading-relaxed text-neutral-600">
                Si el visor no carga, abri el documento desde la fuente original.
              </p>
              <a
                href={script.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-white/10 px-4 py-3 text-xs uppercase tracking-[0.22em] text-neutral-300 transition-colors hover:border-white/20 hover:text-white"
              >
                Abrir PDF
              </a>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-neutral-600">
            Mapa del piloto
          </p>
          <div className="relative">
            <div className="absolute bottom-6 left-4 top-6 w-px bg-gradient-to-b from-olive/70 via-neutral-700 to-transparent md:left-1/2" />
            <div className="space-y-5">
              {script.moments.map((moment, index) => {
                const relatedScene = moment.relatedScene
                  ? scenes.find((scene) => scene.slug === moment.relatedScene)
                  : undefined

                return (
                  <div
                    key={`${moment.label}-${moment.pages}`}
                    className={`relative md:flex ${
                      index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    <span className="absolute left-4 top-7 h-3 w-3 -translate-x-1/2 rounded-full border border-olive bg-[#0a0a0a] md:left-1/2" />
                    <article className="ml-10 rounded-lg border border-white/5 bg-white/[0.02] p-5 md:ml-0 md:w-[calc(50%-2rem)] md:p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.24em] text-neutral-600">
                        <span>{moment.label}</span>
                        <span className="h-1 w-1 rounded-full bg-neutral-700" />
                        <span>Paginas {moment.pages}</span>
                      </div>
                      <h2 className="mb-3 font-[family-name:var(--font-playfair)] text-2xl text-neutral-200">
                        {moment.title}
                      </h2>
                      <p className="text-sm leading-relaxed text-neutral-600">
                        {moment.description}
                      </p>
                      {relatedScene && (
                        <Link
                          href={`/scenes/${relatedScene.slug}`}
                          className="mt-5 inline-block text-xs uppercase tracking-[0.22em] text-neutral-500 transition-colors hover:text-neutral-300"
                        >
                          Ver escena conectada
                        </Link>
                      )}
                    </article>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="mt-20 grid gap-8 lg:grid-cols-2">
          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.4em] text-neutral-600">
              Temas conectados
            </p>
            <div className="flex flex-wrap gap-2">
              {scriptThemes.map((theme) => (
                <Link
                  key={theme.slug}
                  href={`/themes/${theme.slug}`}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-400 transition-colors hover:border-white/20 hover:text-white"
                >
                  {theme.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-5 text-[11px] uppercase tracking-[0.4em] text-neutral-600">
              Escenas conectadas
            </p>
            <div className="space-y-3">
              {relatedScenes.map((scene) => (
                <Link
                  key={scene.slug}
                  href={`/scenes/${scene.slug}`}
                  className="group flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]"
                >
                  <div>
                    <p className="font-[family-name:var(--font-playfair)] text-neutral-200 transition-colors group-hover:text-white">
                      {scene.title}
                    </p>
                    <p className="mt-1 text-xs text-neutral-600">
                      T{scene.season} E{scene.episode} - {scene.episodeTitle}
                    </p>
                  </div>
                  <span className="ml-4 text-neutral-700 transition-colors group-hover:text-neutral-400">
                    &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
