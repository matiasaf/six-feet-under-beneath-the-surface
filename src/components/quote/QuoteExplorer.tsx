"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Scene } from "@/lib/types"
import { ArchiveImage } from "@/components/media/ArchiveImage"
import { Locale, withLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionary"

export function QuoteExplorer({ scenes, locale = "es" }: { scenes: Scene[]; locale?: Locale }) {
  const dictionary = getDictionary(locale)
  const [query, setQuery] = useState("")
  const [mood, setMood] = useState("all")
  const moods = useMemo(
    () => Array.from(new Set(scenes.map((scene) => scene.mood))).sort(),
    [scenes]
  )
  const normalizedQuery = query.trim().toLowerCase()
  const filteredQuotes = scenes.filter((scene) => {
    const matchesMood = mood === "all" || scene.mood === mood
    const matchesQuery =
      normalizedQuery.length === 0 ||
      [scene.quote, scene.title, scene.summary, scene.episodeTitle]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)

    return matchesMood && matchesQuery
  })

  return (
    <div>
      <div className="mb-10 grid gap-4 md:grid-cols-[1fr_auto]">
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-neutral-600">
            {dictionary.quotes.search}
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={dictionary.quotes.placeholder}
            className="w-full rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-neutral-200 outline-none transition-colors placeholder:text-neutral-700 focus:border-white/25"
          />
        </label>

        <label className="block md:min-w-56">
          <span className="mb-2 block text-xs uppercase tracking-[0.24em] text-neutral-600">
            {dictionary.quotes.mood}
          </span>
          <select
            value={mood}
            onChange={(event) => setMood(event.target.value)}
            className="w-full rounded-md border border-white/10 bg-[#0a0a0a] px-4 py-3 text-neutral-300 outline-none transition-colors focus:border-white/25"
          >
            <option value="all">{dictionary.common.allMasc}</option>
            {moods.map((item) => (
              <option key={item} value={item}>
                {dictionary.mood[item] ?? item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-6 text-sm text-neutral-600">
        {filteredQuotes.length} {filteredQuotes.length === 1 ? dictionary.common.quote : dictionary.common.quotes}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredQuotes.map((scene) => (
          <Link
            key={scene.slug}
            href={withLocale(locale, `/scenes/${scene.slug}`)}
            className="group flex min-h-64 flex-col justify-between overflow-hidden rounded-lg border border-white/5 bg-white/[0.02] transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04]"
          >
            <ArchiveImage
              src={scene.image}
              alt={scene.imageAlt}
              label={scene.title}
              className="aspect-video"
              imageClassName="opacity-75 transition-opacity group-hover:opacity-95"
            />
            <div className="p-6">
              <blockquote className="mb-5 font-[family-name:var(--font-playfair)] text-2xl italic leading-snug text-neutral-300 transition-colors group-hover:text-white">
                &ldquo;{scene.quote}&rdquo;
              </blockquote>
              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600">
                <span>{scene.title}</span>
                <span className="h-1 w-1 rounded-full bg-neutral-700" />
                <span>T{scene.season} E{scene.episode}</span>
                <span className="h-1 w-1 rounded-full bg-neutral-700" />
                <span>{dictionary.mood[scene.mood] ?? scene.mood}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
