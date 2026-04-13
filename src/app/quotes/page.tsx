import type { Metadata } from "next"
import { scenes } from "@/data/scenes"
import { QuoteExplorer } from "@/components/quote/QuoteExplorer"

export const metadata: Metadata = {
  title: "Quotes",
  description:
    "Un explorador de citas de Six Feet Under organizado por escena, episodio y estado emocional.",
}

export default function QuotesPage() {
  return (
    <main className="px-6 pb-16 pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-neutral-600">
            Quote explorer
          </p>
          <h1 className="mb-5 font-[family-name:var(--font-playfair)] text-4xl font-light md:text-6xl">
            Frases que quedan
          </h1>
          <p className="text-lg leading-relaxed text-neutral-500">
            Citas como pequenas autopsias emocionales: una frase, una escena,
            una forma precisa de nombrar lo que nadie quiere decir.
          </p>
        </div>

        <QuoteExplorer scenes={scenes} />
      </div>
    </main>
  )
}
