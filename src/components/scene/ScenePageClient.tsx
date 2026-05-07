"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Scene } from "@/lib/types"
import { FadeIn } from "@/components/motion/FadeIn"
import { scenes } from "@/data/scenes"
import { Locale, withLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionary"

interface ScenePageClientProps {
  scene: Scene
  relatedScenes: Scene[]
  locale?: Locale
}

export function ScenePageClient({ scene, relatedScenes, locale = "es" }: ScenePageClientProps) {
  const router = useRouter()
  const dictionary = getDictionary(locale)
  const youtubeId = scene.clipUrl?.includes("v=")
    ? scene.clipUrl.split("v=")[1]?.split("&")[0]
    : undefined
  const sceneIndex = scenes.findIndex((item) => item.slug === scene.slug)
  const previousScene = sceneIndex > 0 ? scenes[sceneIndex - 1] : undefined
  const nextScene = sceneIndex >= 0 ? scenes[sceneIndex + 1] : undefined

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target

      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement
      ) {
        return
      }

      if (event.key === "ArrowLeft" && previousScene) {
        router.push(withLocale(locale, `/scenes/${previousScene.slug}`))
      }

      if (event.key === "ArrowRight" && nextScene) {
        router.push(withLocale(locale, `/scenes/${nextScene.slug}`))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [locale, nextScene, previousScene, router])

  return (
    <>
      {/* Content sections */}
      <section className="px-6">
        <div className="mx-auto max-w-4xl space-y-16">
          {/* What's happening */}
          <FadeIn>
            <div>
              <h2 className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-4">
                {dictionary.scene.whatsHappening}
              </h2>
              <p className="text-lg leading-relaxed text-neutral-300">
                {scene.whatsHappening}
              </p>
            </div>
          </FadeIn>

          {/* What's unsaid */}
          <FadeIn>
            <div>
              <h2 className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-4">
                {dictionary.scene.whatsUnsaid}
              </h2>
              <p className="text-lg leading-relaxed text-neutral-300">
                {scene.whatsUnsaid}
              </p>
            </div>
          </FadeIn>

          {/* Human tension */}
          <FadeIn>
            <div>
              <h2 className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-4">
                {dictionary.scene.humanTension}
              </h2>
              <p className="text-lg leading-relaxed text-neutral-300">
                {scene.humanTension}
              </p>
            </div>
          </FadeIn>

          {/* Universal connection */}
          <FadeIn>
            <div>
              <h2 className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-4">
                {dictionary.scene.universalConnection}
              </h2>
              <p className="text-lg leading-relaxed text-neutral-300">
                {scene.universalConnection}
              </p>
            </div>
          </FadeIn>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

          {/* Immersive layer */}
          {scene.immersion && (
            <FadeIn>
              <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[#11100f]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(92,26,27,0.28),transparent_32%),linear-gradient(135deg,rgba(74,90,60,0.2),transparent_46%)]" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-500/40 to-transparent" />

                <div className="relative grid gap-8 p-6 md:grid-cols-[1.05fr_0.95fr] md:p-8">
                  <div className="space-y-6">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-4">
                        {dictionary.scene.immersion}
                      </p>
                      <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-light text-neutral-100">
                        {scene.immersion.title}
                      </h2>
                    </div>

                    <p className="text-lg leading-relaxed text-neutral-300">
                      {scene.immersion.intro}
                    </p>

                    <div className="border-l border-olive/50 pl-4">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-600">
                        {dictionary.scene.sensoryCue}
                      </p>
                      <p className="mt-2 font-[family-name:var(--font-playfair)] text-xl italic text-neutral-300">
                        {scene.immersion.sensoryCue}
                      </p>
                    </div>

                    {scene.clipUrl && (
                      <a
                        href={scene.clipUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex rounded-lg border border-white/10 px-4 py-3 text-xs uppercase tracking-[0.22em] text-neutral-300 transition-colors hover:border-white/20 hover:text-white"
                      >
                        {dictionary.common.viewClip}
                      </a>
                    )}
                  </div>

                  <div className="space-y-3">
                    {scene.immersion.beats.map((beat) => (
                      <div
                        key={`${beat.speaker}-${beat.line}`}
                        className="rounded-lg border border-white/5 bg-black/[0.18] p-4"
                      >
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <p className="text-[10px] uppercase tracking-[0.24em] text-neutral-600">
                            {beat.speaker}
                          </p>
                          <span className="h-px flex-1 bg-white/5" />
                        </div>
                        <p className="font-[family-name:var(--font-playfair)] text-xl text-neutral-200">
                          &ldquo;{beat.line}&rdquo;
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                          {beat.subtext}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {youtubeId && (
                  <div className="relative border-t border-white/5 bg-black/20 p-3">
                    <div className="aspect-video overflow-hidden rounded-lg bg-black">
                      <iframe
                        className="h-full w-full"
                        src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
                        title={`Clip de ${scene.title}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                <div className="relative border-t border-white/5 p-6 md:p-8">
                  <p className="font-[family-name:var(--font-playfair)] text-xl leading-relaxed text-neutral-300">
                    {scene.immersion.closing}
                  </p>
                </div>
              </div>
            </FadeIn>
          )}

          {/* Divider */}
          {scene.immersion && (
            <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
          )}

          {/* Analysis */}
          <FadeIn>
            <div>
              <h2 className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-4">
                {dictionary.scene.analysis}
              </h2>
              <p className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl leading-relaxed text-neutral-200 font-light">
                {scene.analysis}
              </p>
            </div>
          </FadeIn>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

          {/* Related scenes */}
          {relatedScenes.length > 0 && (
            <FadeIn>
              <div>
                <h2 className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-6">
                  {dictionary.scene.related}
                </h2>
                <div className="space-y-3">
                  {relatedScenes.map((related) => (
                    <Link
                      key={related.slug}
                      href={withLocale(locale, `/scenes/${related.slug}`)}
                      className="group flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-6 py-4 transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04]"
                    >
                      <div>
                        <p className="font-[family-name:var(--font-playfair)] text-neutral-200 group-hover:text-white transition-colors">
                          {related.title}
                        </p>
                        <p className="text-xs text-neutral-600 mt-1">
                          T{related.season} E{related.episode} &mdash; {related.episodeTitle}
                        </p>
                      </div>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="text-neutral-700 group-hover:text-neutral-400 transition-colors flex-shrink-0 ml-4"
                      >
                        <path d="M6 4l4 4-4 4" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </section>
    </>
  )
}
