# Six Feet Under — Archivo Emocional

## Que es este proyecto

Una experiencia editorial inmersiva sobre la serie Six Feet Under (HBO, 2001-2005). No es un fan site ni un catalogo de episodios. Es un recorrido emocional y filosofico donde el usuario entra en escenas, silencios, frases, duelos y contradicciones.

El concepto es una mezcla entre archivo emocional, museo interactivo, ensayo audiovisual y experiencia de scroll narrativo.

## Principios de diseno

### Tono
- Intimo, contemplativo, lugubre pero bello
- Calido en lo humano, sofisticado, silencioso
- Las animaciones son lentas, casi teatrales
- El texto aparece por capas, como recuerdos
- **No** es una web tech brillante. Es una experiencia cinematografica

### Interacciones que suman
- Scroll con transiciones cinematograficas
- Texto que aparece por capas (RevealText)
- Film grain sutil como overlay permanente
- Cards que se abren como recuerdos
- Conexiones visuales entre escenas
- Hover que revela subtexto

### Interacciones a evitar
- Exceso de motion llamativo
- Sliders genericos
- Demasiados popups
- UI brillante o "tech"
- Scroll hijacking agresivo

### Paleta de colores
- Negro carbon: `#0a0a0a` (fondo principal)
- Foreground: `#e8e4df`
- Burdeos oscuro: `#5c1a1b`
- Verde oliva muerto: `#4a5a3c`
- Marfil apagado / ivory: `#d4cfc4`
- Gris ceniza / ash: `#6b6963`
- Smoke: `#1a1918`

### Tipografia
- **Serif (titulos, quotes, analisis):** Playfair Display — variable CSS `--font-playfair`, clase `font-[family-name:var(--font-playfair)]`
- **Sans (UI, cuerpo, meta):** Geist — variable CSS `--font-geist-sans`

## Stack tecnico

- **Next.js 16** con App Router
- **TypeScript**
- **Tailwind CSS v4** (usa `@theme inline` en globals.css, no tailwind.config)
- **Framer Motion** para animaciones
- **React 19**
- Dependencias utilitarias: `clsx`, `tailwind-merge`, `lucide-react`

### Comandos
```bash
npm run dev    # servidor de desarrollo
npm run build  # build de produccion
npm run lint   # eslint
```

## Arquitectura de archivos

```
src/
  app/
    layout.tsx              # Root layout con fonts, header, footer, ambient layer
    page.tsx                # Home inmersiva (5 secciones de scroll)
    globals.css             # Estilos globales, custom properties, film grain
    scenes/
      page.tsx              # Listado de todas las escenas
      [slug]/page.tsx       # Pagina individual de escena (SSG)
    themes/
      [slug]/page.tsx       # Pagina de tema (SSG)
    characters/
      [slug]/page.tsx       # Pagina de personaje (SSG)
  components/
    layout/
      SiteHeader.tsx        # Header fijo con navegacion + mobile menu
      SiteFooter.tsx        # Footer con quote y disclaimer legal
      AmbientLayer.tsx      # Film grain overlay (CSS SVG noise)
    home/
      HeroIntro.tsx         # Hero de entrada: frase + fade in secuencial
      UniverseSection.tsx   # Manifiesto del sitio, RevealText
      ThemeMap.tsx           # Grid de 8 temas como tarjetas hover
      FeaturedScenes.tsx     # 4 escenas destacadas como cards grandes
      CharacterConstellation.tsx  # Grid de 6 personajes por herida
      ArchiveTeaser.tsx      # 4 preguntas filosoficas como puertas
    scene/
      ScenesList.tsx         # Lista animada de escenas (client)
      ScenePageClient.tsx    # Secciones de analisis + escenas conectadas (client)
    theme/
      ThemePageClient.tsx    # Escenas del tema + otros temas (client)
    character/
      CharacterPageClient.tsx  # Escenas clave + otros personajes (client)
    motion/
      FadeIn.tsx             # Aparicion con direccion (up/down/left/right/none)
      RevealText.tsx         # Texto palabra por palabra
      ParallaxPanel.tsx      # Efecto parallax en scroll
  data/
    scenes.ts               # 8 escenas con analisis completo + helpers
    themes.ts                # 8 temas + helpers
    characters.ts            # 6 personajes + helpers
  lib/
    types.ts                 # Scene, Theme, Character, Mood types
```

## Modelo de contenido

### Scene (unidad narrativa principal)
Cada escena responde 4 preguntas editoriales:
1. **Que esta pasando** (`whatsHappening`) — accion dramatica
2. **Que no se dice** (`whatsUnsaid`) — subtexto
3. **Que tension humana revela** (`humanTension`) — conflicto universal
4. **Con que experiencia universal conecta** (`universalConnection`) — empatia

Ademas tiene: `quote`, `summary`, `analysis` (lectura filosofica), `mood`, y `relatedScenes` (slugs).

Los moods posibles son: `grief`, `desire`, `fear`, `acceptance`, `rupture`, `guilt`, `tenderness`.

### Theme
Tiene `name`, `tagline` (pregunta o frase corta), `description` (ensayistica), `scenes` (slugs), y `color` (burgundy/olive/ash para hover states).

### Character
No son fichas biograficas. Cada personaje se presenta por su **herida central** (`coreWound`). Tiene `quote`, `description` (ensayistica), `themes` y `scenes` (slugs).

### Relaciones
Todo esta conectado por slugs. Desde una escena se puede ir a personajes, temas, u otras escenas. Desde un tema se ven sus escenas. Desde un personaje se ven sus escenas y temas. La navegacion es hibrida: se puede entrar por escena, personaje, tema o frase.

## Patron de componentes

- Las **paginas** (`app/**/page.tsx`) son Server Components. Resuelven datos, pasan props.
- Los **componentes interactivos** (`*Client.tsx`, `home/*.tsx`, `scene/ScenesList.tsx`) son Client Components (`"use client"`). Manejan animaciones con Framer Motion.
- Los componentes de **motion** (`FadeIn`, `RevealText`, `ParallaxPanel`) son reutilizables y siempre client.

### Convencion de nombres
- `*PageClient.tsx` — parte interactiva de una pagina (recibe datos como props del server component)
- `*Section.tsx` — seccion de la home
- Componentes de motion en `components/motion/`

## Generacion estatica

Todas las rutas dinamicas usan `generateStaticParams()` y se pre-renderizan como SSG. Los datos vienen de archivos TypeScript en `src/data/`, no de un CMS ni API.

## Patrones de estilo en Tailwind

- Bordes sutiles: `border border-white/5` → hover `border-white/10`
- Fondos translucidos: `bg-white/[0.02]` → hover `bg-white/[0.04]`
- Cards: `rounded-2xl` con transition `duration-500`
- Labels/meta: `text-[11px] uppercase tracking-[0.4em] text-neutral-600`
- Separadores: `h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent`
- Serif aplicado con: `font-[family-name:var(--font-playfair)]`

## Contenido actual (MVP v1)

### 8 escenas
1. `nate-under-the-tree` — Nate bajo el arbol (T5E12)
2. `claire-drives-away` — Claire se va (T5E12)
3. `nate-death` — La muerte de Nate (T5E9)
4. `david-kidnapping` — El secuestro de David (T4E10)
5. `david-keith-love` — David y Keith: la quietud (T5E12)
6. `ruth-alone` — Ruth, sola (T5E12)
7. `brenda-nate-first-meeting` — Brenda y Nate: el encuentro (T1E1)
8. `rico-vanessa-grief` — Rico y la distancia (T3E8)

### 8 temas
mortality, family, desire, identity, grief, guilt, fear, spirituality

### 6 personajes
nate, david, claire, ruth, brenda, rico

## Tono editorial del contenido

El analisis debe ser:
- Ensayistico, humano, intimo, claro, no pretencioso
- Evitar lenguaje academico vacio

**Mal:** "Esta escena representa la deconstruccion posmoderna del sujeto."
**Bien:** "Esta escena duele porque muestra algo muy humano: la necesidad de controlar el sentido de la vida cuando en realidad casi nada esta bajo control."

## Roadmap

### v1 (actual)
- Home inmersiva con 5 secciones
- 8 escenas, 8 temas, 6 personajes
- Navegacion conectada (escena <-> tema <-> personaje)
- Animaciones suaves con Framer Motion
- Diseno cinematografico oscuro

### v2 (pendiente)
- Audio ambiente sutil
- Timeline emocional
- Filtros por temporada en /scenes
- Recorridos curatoriales (ej: "Recorrido Duelo", "La familia como herida")
- Quote explorer (/quotes)
- Imagenes reales para escenas y personajes

### v3 (pendiente)
- Modo "guided journey" (recorrido guiado paso a paso)
- Transiciones entre escenas tipo instalacion digital
- Visualizacion relacional entre personajes/temas (grafo)
- Lenis o scroll suave controlado
- GSAP para escenas complejas

## Consideraciones legales

- Usar fragmentos minimos de dialogos
- Priorizar analisis transformativo
- No subir escenas completas ni material excesivo
- Apoyarse en stills, microfragmentos, interpretacion, diseno y contexto editorial
