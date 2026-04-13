"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FadeIn } from "@/components/motion/FadeIn"
import { Locale, withLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionary"
import { Theme } from "@/lib/types"

const colorMap: Record<string, string> = {
  burgundy: "hover:border-[#5c1a1b]/60 hover:bg-[#5c1a1b]/10",
  olive: "hover:border-[#4a5a3c]/60 hover:bg-[#4a5a3c]/10",
  ash: "hover:border-[#6b6963]/60 hover:bg-[#6b6963]/10",
}

export function ThemeMap({ locale, themes }: { locale: Locale; themes: Theme[] }) {
  const dictionary = getDictionary(locale)

  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-4">
            {dictionary.home.themeEyebrow}
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-light mb-4">
            {dictionary.home.themeTitle}
          </h2>
          <p className="text-neutral-500 mb-12 max-w-2xl">
            {dictionary.home.themeText}
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {themes.map((theme, i) => (
            <motion.div
              key={theme.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={withLocale(locale, `/themes/${theme.slug}`)}
                className={`group block rounded-lg border border-white/8 bg-white/[0.02] p-5 md:p-6 transition-all duration-500 ${colorMap[theme.color] || ""}`}
              >
                <span className="block font-[family-name:var(--font-playfair)] text-lg md:text-xl text-neutral-200 group-hover:text-white transition-colors">
                  {theme.name}
                </span>
                <span className="mt-2 block text-sm text-neutral-600 group-hover:text-neutral-400 transition-colors leading-relaxed">
                  {theme.tagline}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
