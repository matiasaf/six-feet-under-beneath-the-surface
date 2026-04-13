"use client"

import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/i18n/config"

export function SiteFooter() {
  const locale = getLocaleFromPathname(usePathname())

  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="font-[family-name:var(--font-playfair)] text-lg italic text-neutral-400">
            &ldquo;You can&apos;t take a picture of this. It&apos;s already gone.&rdquo;
          </p>
          <p className="text-xs text-neutral-600 max-w-md">
            {locale === "es"
              ? "Este sitio es un proyecto editorial independiente. No tiene afiliacion con HBO. Todo el contenido es analisis critico y transformativo."
              : "This site is an independent editorial project. It is not affiliated with HBO. All content is critical and transformative analysis."}
          </p>
          <p className="text-xs text-neutral-700 mt-4">
            Six Feet Under Archive &mdash; {locale === "es" ? "una experiencia inmersiva" : "an immersive experience"}
          </p>
        </div>
      </div>
    </footer>
  )
}
