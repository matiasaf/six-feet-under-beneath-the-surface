"use client"

import { FadeIn } from "@/components/motion/FadeIn"
import { RevealText } from "@/components/motion/RevealText"
import { Locale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionary"

export function UniverseSection({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale)

  return (
    <section id="universe" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-8">
            {dictionary.home.universeEyebrow}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl font-light leading-snug mb-8">
            {dictionary.home.universeTitle}
          </h2>
        </FadeIn>

        <RevealText
          text={dictionary.home.universeText}
          className="text-lg md:text-xl leading-relaxed text-neutral-400"
          delay={0.4}
        />

        <FadeIn delay={0.8}>
          <p className="mt-10 text-base leading-relaxed text-neutral-500 max-w-2xl mx-auto">
            {dictionary.home.universeMore}
          </p>
        </FadeIn>

        <FadeIn delay={1}>
          <div className="mt-16 w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
        </FadeIn>
      </div>
    </section>
  )
}
