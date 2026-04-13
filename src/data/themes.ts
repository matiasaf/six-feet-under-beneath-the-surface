import { Theme } from "@/lib/types"

export const themes: Theme[] = [
  {
    slug: "mortality",
    name: "Muerte",
    tagline: "Cómo vivir sabiendo que vamos a morir",
    description:
      "La muerte no es el tema de Six Feet Under. Es el lente. Todo lo que los personajes hacen, dicen, callan o destruyen esta filtrado por la conciencia de la finitud. La serie no pregunta que hay despues de la muerte. Pregunta algo peor: que hacemos antes.",
    scenes: ["nate-under-the-tree", "nate-death", "claire-drives-away"],
    color: "burgundy",
  },
  {
    slug: "acceptance",
    name: "Aceptación",
    tagline: "Soltar sin convertirlo en derrota",
    description:
      "La aceptación en Six Feet Under no es serenidad perfecta. Es una forma de cansancio lúcido: dejar de pelear contra lo que ya ocurrió, contra lo que no se puede reparar, contra la fantasía de una vida intacta. Aceptar no borra el dolor. Lo vuelve habitable.",
    scenes: ["nate-under-the-tree", "david-nathaniel-alive", "david-keith-love"],
    color: "ash",
  },
  {
    slug: "family",
    name: "Familia",
    tagline: "La familia como herida y como refugio",
    description:
      "Los Fisher no son una familia feliz que enfrenta problemas. Son una familia rota que intenta funcionar. La serie muestra que la familia es el lugar donde aprendemos a amar y tambien donde aprendemos a hacernos dano. No hay contradiccion: es lo mismo.",
    scenes: ["ruth-alone", "nate-death", "rico-vanessa-grief"],
    color: "olive",
  },
  {
    slug: "desire",
    name: "Deseo",
    tagline: "Lo que buscamos cuando no sabemos que nos falta",
    description:
      "El deseo en Six Feet Under nunca es simple atraccion. Es siempre un sintoma. Nate desea a Brenda porque necesita sentirse vivo. David desea a Keith porque necesita sentirse libre. Claire desea el arte porque necesita sentirse real. El deseo revela la carencia.",
    scenes: ["brenda-nate-first-meeting", "david-keith-love"],
    color: "burgundy",
  },
  {
    slug: "identity",
    name: "Identidad",
    tagline: "Quienes somos cuando dejamos de actuar",
    description:
      "Cada personaje de la serie vive con una mascara. Nate es el hijo libre que en realidad esta atrapado. David es el hijo responsable que en realidad esta furioso. Claire es la rebelde que en realidad tiene miedo. Ruth es la madre abnegada que en realidad esta vacia. La serie los va desnudando, escena a escena.",
    scenes: ["david-kidnapping", "claire-drives-away", "brenda-nate-first-meeting"],
    color: "ash",
  },
  {
    slug: "grief",
    name: "Duelo",
    tagline: "Lo que queda cuando alguien se va",
    description:
      "El duelo en Six Feet Under no sigue etapas. No es limpio ni progresivo. Es desordenado, contradictorio, a veces ridiculo. La serie muestra que el duelo no es algo que se supera: es algo que se integra. Y que a veces, anos despues, un olor o una cancion lo trae de vuelta intacto.",
    scenes: ["nate-death", "ruth-alone", "claire-drives-away"],
    color: "ash",
  },
  {
    slug: "guilt",
    name: "Culpa",
    tagline: "El peso de lo que no hicimos",
    description:
      "La culpa atraviesa a todos los Fisher. Ruth se culpa por su infidelidad. David se culpa por no ser el hijo que su padre queria. Nate se culpa por no poder amar bien. Claire se culpa por querer irse. La culpa en la serie no es un castigo: es la consecuencia de estar vivo y tener conciencia.",
    scenes: ["rico-vanessa-grief", "ruth-alone", "nate-death"],
    color: "olive",
  },
  {
    slug: "fear",
    name: "Miedo",
    tagline: "Lo que nos paraliza y lo que nos define",
    description:
      "El miedo en Six Feet Under no es al peligro fisico (salvo en That's My Dog). Es miedo a vivir de verdad. Miedo a la intimidad, a la vulnerabilidad, a la verdad. Cada personaje tiene un miedo central que lo define y que la serie va exponiendo sin piedad pero con compasion.",
    scenes: ["david-kidnapping", "david-nathaniel-alive", "brenda-nate-first-meeting"],
    color: "burgundy",
  },
  {
    slug: "spirituality",
    name: "Espiritualidad",
    tagline: "Lo que buscamos mas alla de lo visible",
    description:
      "La serie trata la espiritualidad sin condescendencia. Los muertos hablan con los vivos. David reza y no obtiene respuestas. Nate tiene visiones. Ruth busca en mil lugares. No importa si es real o no. Lo que importa es la necesidad humana de encontrar sentido en lo que no lo tiene.",
    scenes: ["nate-under-the-tree", "david-nathaniel-alive", "david-keith-love"],
    color: "olive",
  },
]

export function getTheme(slug: string): Theme | undefined {
  return themes.find((t) => t.slug === slug)
}
