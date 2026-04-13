export type Mood = "grief" | "desire" | "fear" | "acceptance" | "rupture" | "guilt" | "tenderness"

export type Scene = {
  slug: string
  title: string
  season: number
  episode: number
  episodeTitle: string
  characters: string[]
  themes: string[]
  quote: string
  summary: string
  whatsHappening: string
  whatsUnsaid: string
  humanTension: string
  universalConnection: string
  analysis: string
  mood: Mood
  image: string
  imageAlt: string
  imageSource: string
  clipUrl?: string
  immersion?: {
    title: string
    intro: string
    sensoryCue: string
    beats: {
      speaker: string
      line: string
      subtext: string
    }[]
    closing: string
  }
  relatedScenes: string[]
}

export type Theme = {
  slug: string
  name: string
  tagline: string
  description: string
  scenes: string[]
  color: string
}

export type Character = {
  slug: string
  name: string
  fullName: string
  coreWound: string
  description: string
  quote: string
  themes: string[]
  scenes: string[]
  image: string
  imageAlt: string
  imageSource: string
}

export type CuratedJourney = {
  slug: string
  title: string
  subtitle: string
  description: string
  mood: Mood
  scenes: string[]
}

export type ScriptMoment = {
  label: string
  pages: string
  title: string
  description: string
  relatedScene?: string
}

export type ScriptDocument = {
  slug: string
  title: string
  subtitle: string
  draftDate: string
  writer: string
  pageCount: number
  sourceName: string
  sourceUrl: string
  description: string
  editorialNote: string
  thesis: string
  moments: ScriptMoment[]
  themes: string[]
  relatedScenes: string[]
}
