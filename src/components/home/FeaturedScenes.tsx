"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/FadeIn"
import { ArchiveImage } from "@/components/media/ArchiveImage"
import { Locale, withLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionary"
import { Scene } from "@/lib/types"

export function FeaturedScenes({ locale, scenes }: { locale: Locale; scenes: Scene[] }) {
  const dictionary = getDictionary(locale)
  const featured = scenes.slice(0, 4)

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-4">
            {dictionary.home.featuredEyebrow}
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-light mb-4">
            {dictionary.home.featuredTitle}
          </h2>
          <p className="text-neutral-500 mb-16 max-w-2xl">
            {dictionary.home.featuredText}
          </p>
        </FadeIn>

        <div className="space-y-6 md:space-y-8">
          {featured.map((scene, i) => (
            <motion.div
              key={scene.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <Link
                href={withLocale(locale, `/scenes/${scene.slug}`)}
                className="group block overflow-hidden rounded-lg border border-white/5 bg-white/[0.02] transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04]"
              >
                <ArchiveImage
                  src={scene.image}
                  alt={scene.imageAlt}
                  label={scene.title}
                  className="aspect-video"
                  imageClassName="opacity-80 transition-opacity group-hover:opacity-100"
                />
                <div className="p-6 md:p-10">
                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-4 text-xs text-neutral-600">
                    <span>T{scene.season} E{scene.episode}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-700" />
                    <span>{scene.episodeTitle}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-700" />
                    <span className="capitalize">{scene.mood}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-light text-neutral-200 group-hover:text-white transition-colors mb-4">
                    {scene.title}
                  </h3>

                  {/* Quote */}
                  <blockquote className="font-[family-name:var(--font-playfair)] italic text-lg text-neutral-400 border-l-2 border-neutral-800 pl-4 mb-6">
                    &ldquo;{scene.quote}&rdquo;
                  </blockquote>

                  {/* Summary */}
                  <p className="text-neutral-500 leading-relaxed max-w-3xl">
                    {scene.summary}
                  </p>

                  {/* Enter */}
                  <div className="mt-6 flex items-center gap-2 text-sm text-neutral-600 group-hover:text-neutral-400 transition-colors">
                    <span>{dictionary.home.enterScene}</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M6 4l4 4-4 4" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              href={withLocale(locale, "/scenes")}
              className="inline-block text-sm tracking-[0.2em] uppercase text-neutral-500 border-b border-neutral-700 pb-1 hover:text-neutral-300 hover:border-neutral-500 transition-colors"
            >
              {dictionary.home.allScenes}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
