import type { Metadata } from "next"
import { scenes } from "@/data/scenes"
import { ScenesList } from "@/components/scene/ScenesList"

export const metadata: Metadata = {
  title: "Escenas",
  description: "Todas las escenas del archivo emocional de Six Feet Under.",
}

export default function ScenesPage() {
  return (
    <main className="pt-24 pb-16 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16">
          <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-600 mb-4">
            Archivo de escenas
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-light mb-4">
            Escenas
          </h1>
          <p className="text-neutral-500 max-w-2xl">
            Cada escena es una unidad narrativa. Un momento concreto con
            contexto, dialogo, lectura filosófica y conexiones con el
            resto de la serie.
          </p>
        </div>

        <ScenesList scenes={scenes} locale="es" />
      </div>
    </main>
  )
}
