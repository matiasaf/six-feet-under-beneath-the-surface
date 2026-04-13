"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/FadeIn"
import { Locale, withLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionary"
import { Scene } from "@/lib/types"

export function EmotionalTimeline({ locale, scenes }: { locale: Locale; scenes: Scene[] }) {
  const dictionary = getDictionary(locale)
  const timeline = [...scenes].sort((a, b) => {
    if (a.season !== b.season) return a.season - b.season
    return a.episode - b.episode
  })

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-neutral-600">
            {dictionary.home.timelineEyebrow}
          </p>
          <h2 className="mb-4 font-[family-name:var(--font-playfair)] text-3xl font-light md:text-4xl">
            {dictionary.home.timelineTitle}
          </h2>
          <p className="mb-14 max-w-2xl text-neutral-500">
            {dictionary.home.timelineText}
          </p>
        </FadeIn>

        <div className="relative">
          <div className="absolute bottom-4 left-0 right-0 top-4 hidden border-l border-white/10 md:left-1/2 md:block" />
          <div className="space-y-4 md:space-y-0">
            {timeline.map((scene, index) => (
              <motion.div
                key={scene.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: index * 0.04 }}
                className={`relative md:flex ${
                  index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                }`}
              >
                <Link
                  href={withLocale(locale, `/scenes/${scene.slug}`)}
                  className="group block rounded-lg border border-white/5 bg-white/[0.02] p-5 transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04] md:w-[46%]"
                >
                  <div className="mb-3 flex items-center justify-between gap-4 text-xs text-neutral-600">
                    <span>T{scene.season} E{scene.episode}</span>
                    <span>{dictionary.mood[scene.mood] ?? scene.mood}</span>
                  </div>
                  <h3 className="mb-2 font-[family-name:var(--font-playfair)] text-xl text-neutral-200 transition-colors group-hover:text-white">
                    {scene.title}
                  </h3>
                  <p className="line-clamp-2 text-sm leading-relaxed text-neutral-600">
                    {scene.humanTension}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
