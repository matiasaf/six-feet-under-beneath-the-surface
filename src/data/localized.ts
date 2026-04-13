import { Locale } from "@/i18n/config"
import { scenes } from "@/data/scenes"
import { characters } from "@/data/characters"
import { themes } from "@/data/themes"
import { journeys } from "@/data/journeys"
import { scripts } from "@/data/scripts"
import { Character, CuratedJourney, Scene, ScriptDocument, Theme } from "@/lib/types"

type SceneCopy = Partial<Pick<Scene,
  | "title"
  | "episodeTitle"
  | "quote"
  | "summary"
  | "whatsHappening"
  | "whatsUnsaid"
  | "humanTension"
  | "universalConnection"
  | "analysis"
  | "imageAlt"
  | "imageSource"
  | "immersion"
>>

type CharacterCopy = Partial<Pick<Character,
  | "name"
  | "fullName"
  | "coreWound"
  | "description"
  | "quote"
  | "imageAlt"
  | "imageSource"
>>

type ThemeCopy = Partial<Pick<Theme, "name" | "tagline" | "description">>
type JourneyCopy = Partial<Pick<CuratedJourney, "title" | "subtitle" | "description">>
type ScriptCopy = Partial<Pick<ScriptDocument,
  | "title"
  | "subtitle"
  | "description"
  | "editorialNote"
  | "thesis"
  | "moments"
>>

const sceneEn: Record<string, SceneCopy> = {
  "nate-under-the-tree": {
    title: "Nate under the tree",
    summary:
      "In the final scene of the series, Nate appears under a tree as a vision, already dead, saying one of the show's most iconic lines.",
    whatsHappening:
      "Claire is about to leave Los Angeles. In her mind, Nate appears like a luminous ghost, almost smiling, saying goodbye without drama.",
    whatsUnsaid:
      "That life cannot be held. That trying to capture a moment is already losing it. That Nate finally understood something he could never accept while alive.",
    humanTension: "The desire to hold on to what we love versus the need to let it go.",
    universalConnection: "We have all tried to stop an instant. We have all failed.",
    analysis:
      "This scene closes the series with a brutal truth disguised as tenderness. Nate, who spent five seasons running from death while living surrounded by it, can only say something wise once he is no longer alive. The line is not comfort; it is surrender. You cannot photograph this because it has already passed. Like everything. Like always.",
    imageAlt: "Claire drives as Nate appears in the final montage of Six Feet Under.",
  },
  "claire-drives-away": {
    title: "Claire drives away",
    summary:
      "The final montage of the series. Claire drives toward New York while we see how every character will die in the future.",
    whatsHappening:
      "Claire leaves the Fisher house, leaves Los Angeles, leaves her family. As Sia plays, the show shows us each character's future death, one by one.",
    whatsUnsaid:
      "That leaving is necessary but not enough. That moving on does not mean getting over it. That everyone, without exception, is going to die.",
    humanTension: "The need to grow versus the terror of abandoning what is known.",
    universalConnection: "We have all left a house, a city, a version of ourselves. And we know we do not come back the same.",
    analysis:
      "The final montage of Six Feet Under may be the greatest closing scene in television history. It does not end with a monologue or a revelation. It ends with time. It forces us to see what the series always wanted us to see: death is not the dramatic ending, but the inevitable consequence of having lived.",
    imageAlt: "Image from the final episode, Everyone's Waiting.",
  },
  "nate-death": {
    title: "Nate's death",
    summary: "Nate dies in the hospital after a stroke. David is by his side.",
    whatsHappening:
      "After an apparently successful surgery, Nate has a second stroke. David arrives and finds him connected to machines. Nate dies.",
    whatsUnsaid:
      "That David never got to say what he really felt. That Nate left without resolving anything. That death does not wait until you are ready.",
    humanTension: "The gap between what we feel and what we manage to say before it is too late.",
    universalConnection: "The fear of losing someone without having said enough.",
    analysis:
      "Nate's death is devastating not because of what happens, but because of what does not happen. There is no final speech, no reconciliation, no closure. Only the sound of machines and David repeating 'It's okay' as if saying it could make it true. The series reminds us that death rarely arrives when we are prepared.",
    imageAlt: "Image from Ecotone, centered on Nate's death.",
  },
  "david-kidnapping": {
    title: "David's kidnapping",
    summary:
      "David is kidnapped by a stranger for an entire day in one of television's most disturbing episodes.",
    whatsHappening:
      "David picks up a hitchhiker who turns out to be violent and unpredictable. For hours, David is humiliated, threatened, and psychologically tortured.",
    whatsUnsaid:
      "That David has always lived in fear: fear of his sexuality, fear of disappointing others, fear of not being enough. This episode externalizes that inner terror.",
    humanTension: "The absolute vulnerability of a person who always tried to control everything.",
    universalConnection: "We all carry a fear that can paralyze us. Sometimes someone else finds it before we do.",
    analysis:
      "That's My Dog is the show's most divisive episode, and also one of its bravest. It is not a thriller; it is an X-ray of fear. David, who always tried to be the perfect son, the man of faith, the family's pillar, is reduced to his rawest form. The episode offers no easy catharsis. Only the weight of surviving without knowing how to continue.",
    imageAlt: "Image from the episode That's My Dog.",
  },
  "david-nathaniel-alive": {
    title: "David and Nathaniel: you're alive",
    summary:
      "After facing his attacker, David imagines a conversation with Nathaniel Sr. and receives an impossible truth: pain is not worth more than the life he still has.",
    whatsHappening:
      "David has just looked the man who kidnapped him in the face. He thinks that gesture should free him, but he returns with the same wound. In the garden, Nathaniel appears as a dry, familiar, brutally lucid presence.",
    whatsUnsaid:
      "That David wants trauma to have a moral reward. That he needs surviving to mean something clear. That Nathaniel is not there to comfort him, but to tear away the idea that pain should organize his life.",
    humanTension: "The temptation to turn suffering into identity versus the simple, almost offensive possibility of being alive.",
    universalConnection: "We have all expected a confrontation to close a wound. Sometimes it only confirms that closure does not come from outside.",
    analysis:
      "The scene works because it refuses easy catharsis. David did what seemed necessary: he faced his attacker. But the series does not grant him instant liberation. Nathaniel, whether ghost or inner voice, gives him a brutal truth: pain is not proof of depth, nor a currency that buys meaning. Being alive does not repair what happened, but it opens possibilities trauma tries to shut down. The final question does not simplify suffering; it challenges it. What if living, for once, were less complicated than the story David tells himself about his pain?",
    imageAlt: "David rests his head on Nathaniel Sr. in a vision from the end of season four.",
    imageSource: "Still from episode S04E12",
    immersion: {
      title: "After looking at the monster",
      intro:
        "The scene does not need to shout. A garden, a plant being watered, the dead father speaking as if he still lived in the house. The calm makes what David hears even harder.",
      sensoryCue: "Wet bougainvillea, low light, a familiar voice that offers no shelter.",
      beats: [
        {
          speaker: "David",
          line: "I thought facing him would set me free.",
          subtext: "He is still waiting for the right act to produce a visible cure.",
        },
        {
          speaker: "Nathaniel",
          line: "The point is right in front of your face.",
          subtext: "He is not arguing with the trauma; he is arguing with David's devotion to it.",
        },
        {
          speaker: "David",
          line: "I can't be grateful for the worst thing that ever happened to me.",
          subtext: "He confuses gratitude for living with forgiveness for what he suffered.",
        },
        {
          speaker: "Nathaniel",
          line: "You can do anything. You're alive.",
          subtext: "The line does not heal. It pushes. It returns a future to a body trapped in the past.",
        },
      ],
      closing:
        "The immersion lives in that contradiction: nothing changed, but David can no longer pretend there is nothing left to choose.",
    },
  },
  "david-keith-love": {
    title: "David and Keith: the quiet",
    summary: "In the final montage, we see David and Keith grow old together. A simple image that says everything.",
    whatsHappening:
      "The flash-forward shows David and Keith as old men, in their home, living a quiet domestic life. Keith dies first.",
    whatsUnsaid:
      "That love is not the passion of the beginning but the decision to stay. That David found what he always wanted, and that it still hurts.",
    humanTension: "The beauty and pain of loving someone while knowing one of you will leave first.",
    universalConnection: "The universal desire to grow old beside someone. And the fear that it will not be enough.",
    analysis:
      "This is one of the show's simplest and most devastating scenes. No conflict, no drama. Just two men who chose to stay. And the show reminds us that even that, even the most beautiful thing, ends. David achieved what he always wanted. And still, the ending is an empty bed.",
    imageAlt: "Image from the end of Six Feet Under with the characters' futures.",
  },
  "ruth-alone": {
    title: "Ruth, alone",
    summary:
      "In the final montage, Ruth grows old alone in a residence. The woman who lived for her family ends without anyone around her.",
    whatsHappening:
      "The flash-forward shows Ruth as an elderly woman, in a hospital or residence bed, dying alone while images of her children accompany her in her mind.",
    whatsUnsaid:
      "That dedicating your life to others does not guarantee someone will be there at the end. That Ruth gave everything and received very little.",
    humanTension: "The silent sacrifice of mothers and the structural ingratitude of children.",
    universalConnection: "We all have unfinished business with our mothers. This scene makes that unbearable.",
    analysis:
      "Ruth Fisher may be the show's most tragic character. Not because terrible things happen to her, but because her tragedy is invisible: an entire life spent giving without receiving. The image of Ruth dying alone is the hardest blow in the final montage. Not because it is unfair. Because it is realistic.",
    imageAlt: "Image from the final episode, Everyone's Waiting.",
  },
  "brenda-nate-first-meeting": {
    title: "Brenda and Nate: the encounter",
    summary:
      "Nate and Brenda meet at the airport and end up having sex in a closet. The attraction is immediate and irresponsible.",
    whatsHappening:
      "Nate returns to Los Angeles for Christmas. At the airport he meets Brenda. The connection is electric. They end up in an airport closet.",
    whatsUnsaid:
      "That both of them are running from something. That this attraction is not love but desperation disguised as destiny. That they are already lying to each other.",
    humanTension: "The confusion between intensity and real connection. Desire as a way to escape.",
    universalConnection: "We have all confused passion with fate. We have all lied to ourselves at the beginning.",
    analysis:
      "The meeting between Nate and Brenda establishes the emotional tone of the series from the pilot: nothing is what it seems, everything is broken beneath the surface, and the intensity of desire can be the perfect mask for emptiness. Nate's line says it all: I barely know you and I'm already lying to you. It is not a romantic confession. It is a warning.",
    imageAlt: "Image from the pilot episode of Six Feet Under.",
  },
  "rico-vanessa-grief": {
    title: "Rico and the distance",
    summary:
      "Rico faces the growing distance from Vanessa, unable to express what he feels, taking refuge in his work with the dead.",
    whatsHappening:
      "Rico works obsessively at the funeral home while his marriage quietly falls apart. Vanessa asks him to talk, but Rico does not know how.",
    whatsUnsaid:
      "That Rico learned how to care for the dead but never learned how to care for the living. That work is an excuse not to face his own life.",
    humanTension: "The difference between being physically present and being emotionally present.",
    universalConnection: "Many of us flee into productivity to avoid facing what we feel.",
    analysis:
      "Rico is the character who most resembles most of us: no spectacular trauma, no grand existential crisis. His pain is domestic, silent, ordinary. That is why it lands. The series uses Rico to show that you do not need a tragedy to break. Sometimes it is enough not to know how to say what you feel.",
    imageAlt: "Image from Tears, Bones and Desire.",
  },
}

const themeEn: Record<string, ThemeCopy> = {
  mortality: {
    name: "Death",
    tagline: "How to live knowing we are going to die",
    description:
      "Death is not the subject of Six Feet Under. It is the lens. Everything the characters do, say, hide, or destroy is filtered through the awareness of finitude. The series does not ask what comes after death. It asks something worse: what we do before it.",
  },
  acceptance: {
    name: "Acceptance",
    tagline: "Letting go without turning it into defeat",
    description:
      "Acceptance in Six Feet Under is not perfect serenity. It is a lucid kind of exhaustion: to stop fighting what already happened, what cannot be repaired, and the fantasy of an intact life. Acceptance does not erase pain. It makes pain inhabitable.",
  },
  family: {
    name: "Family",
    tagline: "Family as wound and refuge",
    description:
      "The Fishers are not a happy family facing problems. They are a broken family trying to function. The series shows that family is where we learn to love and also where we learn to hurt each other. There is no contradiction: it is the same place.",
  },
  desire: {
    name: "Desire",
    tagline: "What we seek when we do not know what is missing",
    description:
      "Desire in Six Feet Under is never simple attraction. It is always a symptom. Nate desires Brenda because he needs to feel alive. David desires Keith because he needs to feel free. Claire desires art because she needs to feel real. Desire reveals the lack.",
  },
  identity: {
    name: "Identity",
    tagline: "Who we are when we stop performing",
    description:
      "Every character in the series lives with a mask. Nate is the free son who is actually trapped. David is the responsible son who is actually furious. Claire is the rebel who is actually afraid. Ruth is the selfless mother who is actually empty. The series strips them bare, scene by scene.",
  },
  grief: {
    name: "Grief",
    tagline: "What remains when someone leaves",
    description:
      "Grief in Six Feet Under does not follow stages. It is not clean or progressive. It is messy, contradictory, sometimes ridiculous. The series shows that grief is not something you overcome; it is something you integrate. And sometimes, years later, a smell or a song brings it back intact.",
  },
  guilt: {
    name: "Guilt",
    tagline: "The weight of what we did not do",
    description:
      "Guilt runs through all the Fishers. Ruth blames herself for her affair. David blames himself for not being the son his father wanted. Nate blames himself for not being able to love well. Claire blames herself for wanting to leave. Guilt is not punishment; it is the consequence of being alive and aware.",
  },
  fear: {
    name: "Fear",
    tagline: "What paralyzes us and what defines us",
    description:
      "Fear in Six Feet Under is not usually fear of physical danger, except in That's My Dog. It is fear of truly living: fear of intimacy, vulnerability, truth. Each character has a central fear that defines them and that the series exposes without mercy but with compassion.",
  },
  spirituality: {
    name: "Spirituality",
    tagline: "What we seek beyond the visible",
    description:
      "The series treats spirituality without condescension. The dead speak with the living. David prays and gets no answers. Nate has visions. Ruth searches in a thousand places. Whether it is real does not matter. What matters is the human need to find meaning in what has none.",
  },
}

const journeyEn: Record<string, JourneyCopy> = {
  "recorrido-duelo": {
    title: "Grief Journey",
    subtitle: "What remains when someone leaves",
    description:
      "A reading of the series through scenes where loss stops being an event and starts becoming a way of life.",
  },
  "familia-como-herida": {
    title: "Family as wound",
    subtitle: "Loving from the place where we also learned how to break",
    description:
      "A journey through the Fishers as an emotional system: care, debt, guilt, and the impossible desire to be seen by one's own family.",
  },
  "miedo-a-vivir": {
    title: "Fear of living",
    subtitle: "Terror does not always come from outside",
    description:
      "Scenes where fear appears as external threat, family mandate, or a truth each character avoids looking at.",
  },
}

const scriptEn: Record<string, ScriptCopy> = {
  pilot: {
    title: "Six Feet Under: pilot",
    subtitle: "The original body",
    description:
      "The public pilot draft works as layer zero of the series: before the finished scenes, before the edit, before the actors fully occupied the bodies.",
    editorialNote:
      "The app does not reproduce the full script. It uses it as a source document for navigating structure, narrative choices, and echoes with the archive's scenes.",
    thesis:
      "The pilot already contains the entire DNA of Six Feet Under: an absurd death, a family unable to speak clearly, a house that looks like shelter but operates like a tomb, and living people who only begin to see one another when someone is gone.",
    moments: [
      {
        label: "Opening",
        pages: "1-4",
        title: "Death enters through an advertisement",
        description:
          "The script opens with a fake commercial and immediately interrupts it. Death does not arrive as solemnity, but as a collision between commerce, domestic routine, and accident.",
      },
      {
        label: "House",
        pages: "2-5",
        title: "Ruth and David before the news",
        description:
          "The kitchen and the funeral home already reveal a family organized around control. Ruth manages the invisible; David corrects what he can so he does not have to look at what he feels.",
      },
      {
        label: "Return",
        pages: "5-7",
        title: "Nate returns without knowing everything has changed",
        description:
          "The airport establishes Nate as someone passing through. Tragedy forces him to stay before he can decide whether he wants to belong.",
        relatedScene: "brenda-nate-first-meeting",
      },
      {
        label: "Desire",
        pages: "5-6",
        title: "Brenda appears as escape",
        description:
          "The first energy between Nate and Brenda is not romantic; it is an emergency exit. The pilot understands desire as a way not to be where it hurts.",
        relatedScene: "brenda-nate-first-meeting",
      },
      {
        label: "Business",
        pages: "6-12",
        title: "The funeral home as a theater of composure",
        description:
          "David works with the dead while trying to maintain a presentable version of himself. The profession promises order, but every call opens a crack.",
        relatedScene: "david-nathaniel-alive",
      },
      {
        label: "Seed",
        pages: "The whole draft",
        title: "The Fishers are still under another name",
        description:
          "The document preserves traces of an earlier version. Reading it this way makes visible that the series also had to change identity before finding its form.",
      },
    ],
  },
}

const characterEn: Record<string, CharacterCopy> = {
  nate: {
    coreWound:
      "The fear of staying. His need to feel free hides the terror of committing to anything: a person, a place, an identity.",
    description:
      "Nate Fisher returns to Los Angeles for Christmas and stays forever. That is the brutal summary of his story. The son who left so he would not become his father ends up inheriting the funeral home, the family weight, and a version of himself he never wanted to be. Nate is not a rebel. He is a man who confuses escape with freedom.\n\nFor five seasons, Nate makes decisions that look brave but are really ways of avoiding real commitment. He marries Lisa not out of love but out of moral obligation. He goes back to Brenda not because he has resolved what broke them, but because she represents the intensity he mistakes for being alive. Every time life asks him to stay still and hold something, Nate looks for the nearest exit.\n\nThe cruelest thing about Nate is that he sees himself as the good guy. He genuinely believes he is more authentic than David, freer than Ruth, deeper than everyone else. That self-indulgence is his real trap. He is not a bad man. He is something worse: a man who believes his good intentions exempt him from the consequences of his actions.\n\nHis death is not a narrative accident. It is the logical conclusion of a man who spent his life running. The scene under the tree, with Nate appearing to Claire in the finale, is not a ghost. It is the memory of someone who finally found the stillness he had always wanted, but only because he no longer has a body tying him to the anxiety of choosing.",
    imageAlt: "Portrait of Nate Fisher.",
  },
  david: {
    coreWound:
      "The need for approval. David built his entire identity around being the good son, the responsible one, the one who stays. Beneath it is a quiet rage at never having allowed himself to be free.",
    description:
      "David Fisher is the son who stayed. While Nate escaped to Seattle, David took on the funeral home, the relationship with his father, family expectations, and the invisible weight of being the one who never asks for anything. That decision, which looks noble, is also a form of control: if David becomes indispensable, no one can abandon him.\n\nHis relationship to sexuality drives the early seasons, but it would be a mistake to reduce him to that. David is not only afraid of being gay. He is afraid of being seen. Afraid someone will really look at him and decide he is not enough. Coming out is not a triumphant act but a slow, painful surrender to the evidence that hiding was killing him.\n\nThe kidnapping in season four breaks something in David that never fully repairs. It is not only the trauma of the event. It confirms his worst fear: the world is dangerous and he does not have the control he thought he had. The following seasons show a man rebuilding himself piece by piece, through panic attacks, therapy, and Keith holding him when he cannot hold himself.\n\nDavid ends the series as the most complete character. Not because he solved his problems, but because he learned to live with them. The final image of his life, growing old with Keith, raising their children, keeping the funeral home, is deeply moving because it is not glamorous. It is an ordinary life. And David learned that ordinary can be enough.",
    imageAlt: "Portrait of David Fisher.",
  },
  nathaniel: {
    coreWound:
      "The impossibility of being fully known. Nathaniel dies at the beginning, but keeps returning as a mixture of memory, guilt, desire, and uncomfortable truth.",
    description:
      "Nathaniel Fisher Sr. is the dead man who never quite leaves. His death begins the series, but his presence runs through everything the Fishers do afterward. He does not appear as an idealized father. He appears smoking, judging, contradicting, irritating, saying things no living person dares to say.\n\nWhat matters about Nathaniel is not whether his appearances are real. Six Feet Under never needs to resolve that. Every time he returns, he returns as an emotional function: to embody guilt, fantasy, anger, or a truth the character cannot formulate alone.\n\nWith David, Nathaniel is often especially hard because David was the son who stayed, trying to be worthy of him. That is why his presence can sound cruel and liberating at once. He does not come to protect David's fragility. He comes to remind him that life does not wait until you find a perfect explanation to continue.",
    quote: "You're alive.",
    imageAlt: "Nathaniel Fisher Sr. as imagined presence for his family.",
  },
  claire: {
    coreWound:
      "The fear of being ordinary. Claire needs to be special, different, an artist. Beneath that need is a girl afraid she might not matter.",
    description:
      "Claire Fisher is seventeen when her father dies and the world rearranges itself forever. She is the youngest, the one who grows up surrounded by death, the one who absorbs family dysfunction like a sponge and turns it into rage, art, and self-destruction.\n\nHer path through the series is a brutally honest portrait of being young and searching for yourself. Claire tries drugs, enters relationships that hurt her, fights with her mother, falls for the wrong people, sabotages her own opportunities. She does not do it out of teenage whim. She does it because she is terrified of discovering she may not be as special as she needs to believe.\n\nArt is her refuge and battlefield. Claire has real talent, but for a long time she uses it as a shield: if she is an artist, she is different. If she is different, she does not have to face the same mediocrities as everyone else. Art school confronts her with an uncomfortable truth: talent without discipline and emotional honesty produces nothing worth keeping.\n\nHer relationship with Billy Chenowith is one of the most toxic in the series, not because of violence, but because Billy's emotional dependency disguises itself as artistic connection. Claire confuses intensity with depth, and it takes her years to understand the difference.\n\nClaire's final scene, driving alone toward New York, is the most hopeful moment in the series. She is the only Fisher who leaves. She does not flee like Nate, who left to avoid facing things. Claire leaves because she has faced what she needed to face and now needs room to grow. That car moving down the highway, with Sia playing, is the image of someone finally choosing herself.",
    imageAlt: "Portrait of Claire Fisher.",
  },
  ruth: {
    coreWound:
      "Invisibility. Ruth spent her life being the mother, the wife, the one who holds everything together. Nobody saw her. Nobody asked what she wanted. And when she tried to look for it, it was already late.",
    description:
      "Ruth Fisher is the kind of character you do not notice until you really look. And that is exactly her tragedy. She spent her life being functional: the wife who keeps the house, the mother who prepares the food, the woman who does not complain. Beneath that domestic normality is someone who has gone decades without anyone asking how she is.\n\nNathaniel Sr.'s death does not free her. It exposes her. Suddenly Ruth has to face that her marriage was an arrangement of emotional convenience, that her children see her as furniture, and that she herself does not know who she is outside the role of mother. Her affair with Hiram, which precedes her husband's death, is not rebellion. It is the desperate cry of a woman who needed someone to touch her.\n\nWhat makes Ruth so heartbreaking is the clumsiness with which she seeks connection. She joins a self-help group with cultish overtones. She falls for Arthur, a rigid and inadequate man. She tries to reinvent herself again and again with tools she does not have, because no one taught her how to ask for what she needs.\n\nHer relationship with her children is the broken heart of the series. Nate judges her. David tolerates her. Claire avoids her. None of them stops to think that Ruth is also a person with desires and fears of her own. The image of Ruth alone in the empty house, after everyone has left, is one of television's saddest: a woman who finally has the silence that always surrounded her, but now there is no one left to blame.\n\nRuth does not get a glamorous redemption arc. She does not find true love or reinvent herself. Slowly and painfully, she learns to be with herself. In a series about death, that may be the bravest way to remain alive.",
    imageAlt: "Portrait of Ruth Fisher.",
  },
  brenda: {
    coreWound:
      "Intelligence as armor. Brenda is brilliant, and she uses that brilliance to keep everyone at a distance. She analyzes everything so she does not have to feel anything. When she finally lets herself feel, she does not know what to do with the pain.",
    description:
      "Brenda Chenowith is what happens when two psychologists decide to raise a daughter like an experiment. Since childhood, Brenda was the object of study for her own parents. They measured her IQ, analyzed her, turned her into a clinical case published in a book. She learned early that emotions are not for feeling but for categorizing. The brilliance that defines her is also the cage that traps her.\n\nHer relationship with Nate is the gravitational center of the series. They meet in an airport and end up having sex in a supply closet. That beginning says everything: Brenda and Nate seek each other from urgency, from the need to feel alive, not from real intimacy. What follows is five seasons of two people who love each other deeply but do not have the tools to sustain that love without destroying it.\n\nBrenda is addicted to sex, but that is a symptom, not the problem. The problem is that she learned physical intensity is the only safe form of connection. If she feels something with her body, she does not have to feel it with her soul. Her promiscuity in season one is not sexual freedom. It is anesthesia.\n\nBilly, her brother, is the other axis of her life. Their relationship has a codependency that borders on disturbing. Billy needs Brenda to exist, and Brenda needs to be needed by Billy to feel important. Separating from him is one of the hardest acts she faces, and she never fully manages it.\n\nWhat is most fascinating about Brenda is her evolution in the later seasons. After Nate's death, Brenda has to face motherhood alone, and something changes. She can no longer analyze life from the outside. She has a daughter who needs her in ways that cannot be rationalized. For the first time, Brenda has to be present without intellectual armor, irony, or escape. And she discovers she can.",
    imageAlt: "Portrait of Brenda Chenowith.",
  },
  rico: {
    coreWound:
      "The need to belong. Rico wants to be part of the Fisher family but never fully will. He wants to be a good husband but does not know how. He lives in the limbo between what he is and what he thinks he should be.",
    description:
      "Federico Diaz is the character who most resembles real life. He does not have Nate's tragic charisma, Brenda's intellectual complexity, or David's dramatic arc. Rico is a guy who goes to work, comes home, tries to make his marriage work, and often fails. That is exactly what makes him indispensable.\n\nRico arrives at Fisher & Sons as an apprentice and becomes the best embalmer the funeral home has had. His work with the dead is meticulous, almost artistic. There is a quiet irony in the fact that the character who cares best for the dead is the one who handles relationships with the living the worst. Rico treats corpses with a tenderness he does not know how to give Vanessa.\n\nHis marriage is the show's most realistic portrait. No grand betrayals, no dramatic revelations. There is wear. Silences at dinner. Arguments about money that are really about something deeper. Rico wants to be a good husband and father, but he confuses providing with loving. He works overtime, seeks promotion, obsesses over becoming a partner, while Vanessa grows lonely in a house full of children.\n\nHis need to belong to the Fisher family is another axis of his character. Rico wants to be a Fisher. He wants to sit at the table, be included in decisions, be treated as an equal. But no matter how hard he tries, there is always an invisible line separating him. He is not a Fisher. He is an employee. That distinction, never fully stated by the Fishers but felt by Rico in every interaction, feeds a resentment that grows season by season.\n\nRico shows something television rarely shows: ordinary lives hurt too. You do not need a kidnapping or sudden death to feel lost. Sometimes it is enough to realize the marriage you built looks nothing like what you imagined, and you do not know how to fix it.",
    imageAlt: "Portrait of Federico Diaz.",
  },
}

function localizeBySlug<T extends { slug: string }>(
  items: T[],
  locale: Locale,
  copies: Record<string, Partial<T>>
): T[] {
  if (locale === "es") return items
  return items.map((item) => ({ ...item, ...(copies[item.slug] ?? {}) }))
}

export function getScenes(locale: Locale): Scene[] {
  return localizeBySlug<Scene>(scenes, locale, sceneEn)
}

export function getScene(slug: string, locale: Locale): Scene | undefined {
  return getScenes(locale).find((scene) => scene.slug === slug)
}

export function getThemes(locale: Locale): Theme[] {
  return localizeBySlug<Theme>(themes, locale, themeEn)
}

export function getTheme(slug: string, locale: Locale): Theme | undefined {
  return getThemes(locale).find((theme) => theme.slug === slug)
}

export function getCharacters(locale: Locale): Character[] {
  return localizeBySlug<Character>(characters, locale, characterEn)
}

export function getCharacter(slug: string, locale: Locale): Character | undefined {
  return getCharacters(locale).find((character) => character.slug === slug)
}

export function getJourneys(locale: Locale): CuratedJourney[] {
  return localizeBySlug<CuratedJourney>(journeys, locale, journeyEn)
}

export function getJourney(slug: string, locale: Locale): CuratedJourney | undefined {
  return getJourneys(locale).find((journey) => journey.slug === slug)
}

export function getScripts(locale: Locale): ScriptDocument[] {
  return localizeBySlug<ScriptDocument>(scripts, locale, scriptEn)
}

export function getScript(slug: string, locale: Locale): ScriptDocument | undefined {
  return getScripts(locale).find((script) => script.slug === slug)
}
