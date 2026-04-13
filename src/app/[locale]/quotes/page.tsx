import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { QuoteExplorer } from "@/components/quote/QuoteExplorer"
import { getScenes } from "@/data/localized"
import { getDictionary } from "@/i18n/dictionary"
import { isLocale } from "@/i18n/config"

export const metadata: Metadata = {
  title: "Quotes",
  description: "A quote explorer for Six Feet Under.",
}

export default async function QuotesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const dictionary = getDictionary(rawLocale)
  const scenes = getScenes(rawLocale)

  return (
    <main className="px-6 pb-16 pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-neutral-600">
            {dictionary.pages.quotesEyebrow}
          </p>
          <h1 className="mb-5 font-[family-name:var(--font-playfair)] text-4xl font-light md:text-6xl">
            {dictionary.pages.quotesTitle}
          </h1>
          <p className="text-lg leading-relaxed text-neutral-500">
            {dictionary.pages.quotesDescription}
          </p>
        </div>

        <QuoteExplorer scenes={scenes} locale={rawLocale} />
      </div>
    </main>
  )
}
