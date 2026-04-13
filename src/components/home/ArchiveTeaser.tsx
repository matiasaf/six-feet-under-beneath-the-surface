"use client"

import Link from "next/link"
import { FadeIn } from "@/components/motion/FadeIn"
import { RevealText } from "@/components/motion/RevealText"
import { Locale, withLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionary"

export function ArchiveTeaser({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale)

  return (
    <section className="px-6 py-24 md:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-4">
            {dictionary.home.archiveEyebrow}
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl font-light mb-6">
            {dictionary.home.archiveTitle}
          </h2>
        </FadeIn>

        <RevealText
          text={dictionary.home.archiveText}
          className="text-lg text-neutral-500 mb-16 max-w-2xl mx-auto"
          delay={0.3}
        />

        <div className="space-y-3 max-w-2xl mx-auto">
          {dictionary.home.doors.map(([label, href], i) => (
            <FadeIn key={href} delay={0.5 + i * 0.12}>
              <Link
                href={withLocale(locale, href)}
                className="group flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-6 py-5 transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04]"
              >
                <span className="font-[family-name:var(--font-playfair)] text-base md:text-lg text-neutral-300 group-hover:text-white transition-colors">
                  {label}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-neutral-700 group-hover:text-neutral-400 transition-colors ml-4 flex-shrink-0"
                >
                  <path d="M7 5l5 5-5 5" />
                </svg>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
