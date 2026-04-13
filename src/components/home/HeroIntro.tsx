"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Locale, withLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionary"

export function HeroIntro({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale)
  const descentStops = dictionary.home.descent

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-x-0 top-0 h-[64vh] bg-[#b9dce2]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_38%,#0a0a0a_78%)]" />
      <div className="absolute inset-x-0 top-[52vh] h-48 bg-[linear-gradient(to_bottom,rgba(50,78,43,0.78),rgba(16,28,17,0.86)_38%,rgba(10,10,10,0))]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 pb-16 pt-28 md:grid-cols-[0.82fr_1.18fr] md:pb-24 md:pt-24"
      >
        <div className="relative mx-auto w-full max-w-[340px] md:max-w-[430px]">
          <div className="absolute -inset-4 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.28),transparent_45%)] blur-xl" />
          <Image
            src="/Six_Feet_Under_main.webp"
            alt="Arbol solitario sobre el campo con el titulo Six Feet Under."
            width={1500}
            height={2250}
            priority
            sizes="(min-width: 768px) 430px, 340px"
            className="relative w-full shadow-2xl shadow-black/50"
          />
        </div>

        <div className="md:pl-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mb-6 text-[11px] uppercase tracking-[0.4em] text-neutral-700 md:text-neutral-300"
          >
            {dictionary.home.archive}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.45, ease: "easeOut" }}
            className="font-[family-name:var(--font-playfair)] text-4xl font-light leading-tight text-neutral-950 md:text-6xl md:text-neutral-100 lg:text-7xl"
          >
            {dictionary.home.title}
            <span className="mt-2 block italic text-neutral-800 md:text-neutral-400">
              {dictionary.home.subtitle}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-8 max-w-2xl text-base leading-relaxed text-neutral-800 md:text-lg md:text-neutral-500"
          >
            {dictionary.home.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.35 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href="#descenso"
              className="rounded-lg border border-neutral-950/20 bg-neutral-950 px-5 py-3 text-xs uppercase tracking-[0.22em] text-neutral-100 transition-colors hover:bg-neutral-800 md:border-white/10 md:bg-neutral-100 md:text-neutral-950 md:hover:bg-white"
            >
              {dictionary.home.descend}
            </a>
            <Link
              href={withLocale(locale, "/scenes/david-nathaniel-alive")}
              className="rounded-lg border border-neutral-950/20 px-5 py-3 text-xs uppercase tracking-[0.22em] text-neutral-900 transition-colors hover:border-neutral-950/40 md:border-white/10 md:text-neutral-300 md:hover:border-white/20 md:hover:text-white"
            >
              {dictionary.home.latestScene}
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <div
        id="descenso"
        className="relative z-10 border-t border-white/5 bg-[linear-gradient(to_bottom,#17110d,#0f0d0b_42%,#0a0a0a)] px-6 py-20 md:py-28"
      >
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-[220px_1fr]">
            <div className="md:sticky md:top-28 md:self-start">
              <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-600">
                {dictionary.home.navigation}
              </p>
              <p className="mt-4 font-[family-name:var(--font-playfair)] text-2xl leading-snug text-neutral-200">
                {dictionary.home.navigationText}
              </p>
            </div>

            <div className="relative">
              <div className="absolute bottom-8 left-4 top-8 w-px bg-gradient-to-b from-olive/70 via-neutral-700 to-transparent md:left-1/2" />
              <div className="space-y-5">
                {descentStops.map(([label, depth, text, href], index) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                    className={`relative md:flex ${
                      index % 2 === 0 ? "md:justify-start" : "md:justify-end"
                    }`}
                  >
                    <span className="absolute left-4 top-8 h-3 w-3 -translate-x-1/2 rounded-full border border-olive bg-[#17110d] md:left-1/2" />
                    <Link
                      href={withLocale(locale, href)}
                      className="group ml-10 block rounded-lg border border-white/8 bg-white/[0.03] p-5 transition-all duration-500 hover:border-white/15 hover:bg-white/[0.06] md:ml-0 md:w-[calc(50%-2rem)]"
                    >
                      <span className="text-[10px] uppercase tracking-[0.28em] text-neutral-600 transition-colors group-hover:text-neutral-400">
                        {depth}
                      </span>
                      <span className="mt-2 block font-[family-name:var(--font-playfair)] text-2xl text-neutral-200 transition-colors group-hover:text-white">
                        {label}
                      </span>
                      <span className="mt-3 block text-sm leading-relaxed text-neutral-500">
                        {text}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
