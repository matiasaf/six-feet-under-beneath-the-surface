import { ScriptDocument } from "@/lib/types"

export const scripts: ScriptDocument[] = [
  {
    slug: "pilot",
    title: "Six Feet Under: piloto",
    subtitle: "El cuerpo original",
    draftDate: "05/15/2000",
    writer: "Alan Ball",
    pageCount: 63,
    sourceName: "ScriptSlug",
    sourceUrl: "https://assets.scriptslug.com/live/pdf/scripts/six-feet-under-101-pilot-2001.pdf",
    description:
      "El primer borrador publico del piloto funciona como una capa cero de la serie: antes de las escenas terminadas, antes del montaje, antes de los actores ocupando definitivamente los cuerpos.",
    editorialNote:
      "La app no reproduce el guion completo. Lo usa como documento fuente para navegar estructura, decisiones narrativas y ecos con escenas del archivo.",
    thesis:
      "El piloto ya contiene el ADN entero de Six Feet Under: una muerte absurda, una familia incapaz de hablar claro, una casa que parece refugio pero opera como tumba, y vivos que solo empiezan a verse cuando alguien deja de estar.",
    moments: [
      {
        label: "Apertura",
        pages: "1-4",
        title: "La muerte entra por una publicidad",
        description:
          "El guion abre con una falsa pieza comercial y enseguida la interrumpe. La muerte no aparece como solemnidad, sino como choque entre mercado, rutina domestica y accidente.",
      },
      {
        label: "Casa",
        pages: "2-5",
        title: "Ruth y David antes de la noticia",
        description:
          "La cocina y la funeraria ya muestran una familia organizada alrededor del control. Ruth administra lo invisible; David corrige lo que puede para no mirar lo que siente.",
      },
      {
        label: "Regreso",
        pages: "5-7",
        title: "Nate vuelve sin saber que ya cambio todo",
        description:
          "El aeropuerto instala a Nate como alguien de paso. La tragedia lo obliga a quedarse antes de que pueda decidir si quiere pertenecer.",
        relatedScene: "brenda-nate-first-meeting",
      },
      {
        label: "Deseo",
        pages: "5-6",
        title: "Brenda aparece como fuga",
        description:
          "La primera energia entre Nate y Brenda no es romantica; es una salida de emergencia. El piloto entiende el deseo como una forma de no estar donde duele.",
        relatedScene: "brenda-nate-first-meeting",
      },
      {
        label: "Negocio",
        pages: "6-12",
        title: "La funeraria como teatro de compostura",
        description:
          "David trabaja con muertos mientras intenta mantener una version presentable de si mismo. El oficio promete orden, pero cada llamada abre una grieta.",
        relatedScene: "david-nathaniel-alive",
      },
      {
        label: "Semilla",
        pages: "Todo el draft",
        title: "Los Fisher todavia estan bajo otro nombre",
        description:
          "El documento conserva huellas de una version anterior. Leerlo asi vuelve visible que la serie tambien tuvo que cambiar de identidad antes de encontrar su forma.",
      },
    ],
    themes: ["mortality", "family", "identity", "desire"],
    relatedScenes: ["brenda-nate-first-meeting", "david-nathaniel-alive", "nate-under-the-tree"],
  },
]

export function getScript(slug: string): ScriptDocument | undefined {
  return scripts.find((script) => script.slug === slug)
}
