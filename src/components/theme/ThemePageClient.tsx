"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Scene, Theme } from "@/lib/types"
import { FadeIn } from "@/components/motion/FadeIn"
import { Locale, withLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionary"

interface ThemePageClientProps {
  themeScenes: Scene[]
  otherThemes: Theme[]
  locale?: Locale
}

export function ThemePageClient({ themeScenes, otherThemes, locale = "es" }: ThemePageClientProps) {
  const dictionary = getDictionary(locale)

  return (
    <>
      {/* Related scenes */}
      {themeScenes.length > 0 && (
        <section className="mb-16">
          <FadeIn>
            <h2 className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-6">
              {dictionary.theme.scenes}
            </h2>
          </FadeIn>

          <div className="space-y-4">
            {themeScenes.map((scene, i) => (
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

                  <blockquote className="font-[family-name:var(--font-playfair)] italic text-neutral-500 mb-3">
                    &ldquo;{scene.quote}&rdquo;
                  </blockquote>

                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {scene.summary}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Other themes */}
      <section>
        <FadeIn>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent mb-12" />
          <h2 className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-6">
            {dictionary.theme.other}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {otherThemes.map((t, i) => (
            <motion.div
              key={t.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link
                href={withLocale(locale, `/themes/${t.slug}`)}
                className="group block rounded-lg border border-white/5 bg-white/[0.02] p-4 transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04]"
              >
                <span className="font-[family-name:var(--font-playfair)] text-neutral-300 group-hover:text-white transition-colors">
                  {t.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
