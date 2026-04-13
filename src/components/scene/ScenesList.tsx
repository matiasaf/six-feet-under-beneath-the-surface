"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useMemo, useState } from "react"
import { Scene } from "@/lib/types"
import { ArchiveImage } from "@/components/media/ArchiveImage"
import { Locale, withLocale } from "@/i18n/config"
import { getDictionary } from "@/i18n/dictionary"

export function ScenesList({ scenes, locale }: { scenes: Scene[]; locale: Locale }) {
  const dictionary = getDictionary(locale)
  const seasons = useMemo(
    () => Array.from(new Set(scenes.map((scene) => scene.season))).sort((a, b) => a - b),
    [scenes]
  )
  const [activeSeason, setActiveSeason] = useState<number | "all">("all")
  const filteredScenes = activeSeason === "all"
    ? scenes
    : scenes.filter((scene) => scene.season === activeSeason)

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveSeason("all")}
          className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors ${
            activeSeason === "all"
              ? "border-neutral-300 bg-neutral-200 text-neutral-950"
              : "border-white/10 text-neutral-500 hover:border-white/20 hover:text-neutral-300"
          }`}
        >
          {dictionary.common.all}
        </button>
        {seasons.map((season) => (
          <button
            key={season}
            type="button"
            onClick={() => setActiveSeason(season)}
            className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors ${
              activeSeason === season
                ? "border-neutral-300 bg-neutral-200 text-neutral-950"
                : "border-white/10 text-neutral-500 hover:border-white/20 hover:text-neutral-300"
            }`}
          >
            {dictionary.common.season} {season}
          </button>
        ))}
      </div>

      <div className="mb-6 text-sm text-neutral-600">
        {filteredScenes.length} {filteredScenes.length === 1 ? dictionary.common.scene : dictionary.common.scenes}
      </div>

      <div className="space-y-4">
      {filteredScenes.map((scene, i) => (
        <motion.div
          key={scene.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
        >
          <Link
            href={withLocale(locale, `/scenes/${scene.slug}`)}
            className="group block overflow-hidden rounded-lg border border-white/5 bg-white/[0.02] transition-all duration-500 hover:border-white/10 hover:bg-white/[0.04]"
          >
            <ArchiveImage
              src={scene.image}
              alt={scene.imageAlt}
              label={scene.title}
              className="aspect-video"
            />
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-neutral-600">
                <span>T{scene.season} E{scene.episode}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-700" />
                <span>{scene.episodeTitle}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-700" />
                <span>{dictionary.mood[scene.mood] ?? scene.mood}</span>
              </div>

              <h2 className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl text-neutral-200 group-hover:text-white transition-colors mb-2">
                {scene.title}
              </h2>

              <blockquote className="font-[family-name:var(--font-playfair)] italic text-neutral-500 mb-3">
                &ldquo;{scene.quote}&rdquo;
              </blockquote>

              <p className="text-sm text-neutral-600 leading-relaxed">
                {scene.summary}
              </p>
              <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-neutral-700">
                {dictionary.common.image}: {scene.imageSource}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
      </div>
    </div>
  )
}
