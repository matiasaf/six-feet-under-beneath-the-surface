import { CuratedJourney } from "@/lib/types"

export const journeys: CuratedJourney[] = [
  {
    slug: "recorrido-duelo",
    title: "Recorrido Duelo",
    subtitle: "Lo que queda cuando alguien se va",
    description:
      "Una lectura de la serie desde las escenas donde la perdida deja de ser evento y empieza a convertirse en forma de vida.",
    mood: "grief",
    scenes: ["nate-death", "ruth-alone", "claire-drives-away", "nate-under-the-tree"],
  },
  {
    slug: "familia-como-herida",
    title: "La familia como herida",
    subtitle: "Amar desde el lugar donde tambien aprendimos a rompernos",
    description:
      "Un recorrido por los Fisher como sistema emocional: cuidado, deuda, culpa y el deseo imposible de ser vistos por los propios.",
    mood: "rupture",
    scenes: ["ruth-alone", "nate-death", "rico-vanessa-grief", "david-keith-love"],
  },
  {
    slug: "miedo-a-vivir",
    title: "Miedo a vivir",
    subtitle: "El terror no siempre viene de afuera",
    description:
      "Escenas donde el miedo aparece como amenaza externa, como mandato familiar o como una verdad que cada personaje evita mirar.",
    mood: "fear",
    scenes: ["david-kidnapping", "david-nathaniel-alive", "brenda-nate-first-meeting", "nate-death"],
  },
]

export function getJourney(slug: string): CuratedJourney | undefined {
  return journeys.find((journey) => journey.slug === slug)
}
