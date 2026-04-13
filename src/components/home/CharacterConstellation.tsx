"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/FadeIn"
import { ArchiveImage } from "@/components/media/ArchiveImage"
import { Locale, withLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionary"
import { Character } from "@/lib/types"

export function CharacterConstellation({
  locale,
  characters,
}: {
  locale: Locale
  characters: Character[]
}) {
  const dictionary = getDictionary(locale)

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-4">
            {dictionary.home.charactersEyebrow}
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-light mb-4">
            {dictionary.home.charactersTitle}
          </h2>
          <p className="text-neutral-500 mb-16 max-w-2xl">
            {dictionary.home.charactersText}
          </p>
        </FadeIn>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {characters.map((char, i) => (
            <motion.div
              key={char.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                href={withLocale(locale, `/characters/${char.slug}`)}
                className="group block h-full overflow-hidden rounded-lg border border-white/5 bg-white/[0.02] transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04]"
              >
                <ArchiveImage
                  src={char.image}
                  alt={char.imageAlt}
                  label={char.name}
                  className="min-h-56"
                  imageClassName="opacity-75 transition-opacity group-hover:opacity-100"
                />

                <div className="p-6 md:p-8">
                  <p className="text-xs uppercase tracking-[0.3em] text-neutral-600 mb-3">
                    {char.fullName}
                  </p>

                  <h3 className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl text-neutral-200 group-hover:text-white transition-colors mb-4">
                    {char.name}
                  </h3>

                  <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                    {char.coreWound}
                  </p>

                  <blockquote className="font-[family-name:var(--font-playfair)] italic text-sm text-neutral-600 border-l border-neutral-800 pl-3">
                    &ldquo;{char.quote}&rdquo;
                  </blockquote>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
