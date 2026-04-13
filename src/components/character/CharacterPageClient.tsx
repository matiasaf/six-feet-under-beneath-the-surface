"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Scene, Character } from "@/lib/types"
import { FadeIn } from "@/components/motion/FadeIn"
import { Locale, withLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionary"

interface CharacterPageClientProps {
  charScenes: Scene[]
  otherCharacters: Character[]
  locale?: Locale
}

export function CharacterPageClient({ charScenes, otherCharacters, locale = "es" }: CharacterPageClientProps) {
  const dictionary = getDictionary(locale)

  return (
    <>
      {/* Scenes */}
      {charScenes.length > 0 && (
        <section className="mb-16">
          <FadeIn>
            <h2 className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-6">
              {dictionary.character.keyScenes}
            </h2>
          </FadeIn>

          <div className="space-y-4">
            {charScenes.map((scene, i) => (
              <motion.div
                key={scene.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={withLocale(locale, `/scenes/${scene.slug}`)}
                  className="group block rounded-lg border border-white/5 bg-white/[0.02] p-6 transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04]"
                >
                  <div className="flex items-center gap-3 mb-2 text-xs text-neutral-600">
                    <span>T{scene.season} E{scene.episode}</span>
                    <span className="w-1 h-1 rounded-full bg-neutral-700" />
                    <span>{scene.episodeTitle}</span>
                  </div>

                  <h3 className="font-[family-name:var(--font-playfair)] text-xl text-neutral-200 group-hover:text-white transition-colors mb-2">
                    {scene.title}
                  </h3>

                  <blockquote className="font-[family-name:var(--font-playfair)] italic text-neutral-500">
                    &ldquo;{scene.quote}&rdquo;
                  </blockquote>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Other characters */}
      <section>
        <FadeIn>
          <h2 className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-6">
            {dictionary.character.otherCharacters}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {otherCharacters.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={withLocale(locale, `/characters/${c.slug}`)}
                className="group block rounded-lg border border-white/5 bg-white/[0.02] p-4 transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04]"
              >
                <span className="font-[family-name:var(--font-playfair)] text-neutral-300 group-hover:text-white transition-colors">
                  {c.name}
                </span>
                <p className="text-xs text-neutral-600 mt-1 line-clamp-2">
                  {c.coreWound.split(".")[0]}.
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
