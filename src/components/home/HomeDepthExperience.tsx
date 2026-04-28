'use client';

import type { MotionValue } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { HeroIntro } from '@/components/home/HeroIntro';
import { UniverseSection } from '@/components/home/UniverseSection';
import { ThemeMap } from '@/components/home/ThemeMap';
import { FeaturedScenes } from '@/components/home/FeaturedScenes';
import { EmotionalTimeline } from '@/components/home/EmotionalTimeline';
import { CharacterConstellation } from '@/components/home/CharacterConstellation';
import { ArchiveTeaser } from '@/components/home/ArchiveTeaser';
import { SubterraneanScene } from '@/components/home/SubterraneanScene';
import { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';
import { Character, Scene, Theme } from '@/lib/types';

type HomeDepthExperienceProps = {
  locale: Locale;
  scenes: Scene[];
  themes: Theme[];
  characters: Character[];
};

const depthSections = [
  {
    key: 'universe',
    depthFeet: '03 ft',
    depthMeters: '01 m',
    accent: 'from-[#8fa18c]/12 via-transparent to-transparent',
    edge: 'from-[#8fa18c]/18 via-white/8 to-transparent',
  },
  {
    key: 'themes',
    depthFeet: '08 ft',
    depthMeters: '02 m',
    accent: 'from-[#9a7a5d]/12 via-transparent to-transparent',
    edge: 'from-[#9a7a5d]/20 via-white/8 to-transparent',
  },
  {
    key: 'scenes',
    depthFeet: '14 ft',
    depthMeters: '04 m',
    accent: 'from-[#7b4f4f]/14 via-transparent to-transparent',
    edge: 'from-[#7b4f4f]/24 via-white/8 to-transparent',
  },
  {
    key: 'timeline',
    depthFeet: '19 ft',
    depthMeters: '06 m',
    accent: 'from-[#6b6578]/14 via-transparent to-transparent',
    edge: 'from-[#6b6578]/20 via-white/8 to-transparent',
  },
  {
    key: 'characters',
    depthFeet: '25 ft',
    depthMeters: '08 m',
    accent: 'from-[#6d8987]/12 via-transparent to-transparent',
    edge: 'from-[#6d8987]/18 via-white/8 to-transparent',
  },
  {
    key: 'archive',
    depthFeet: '31 ft',
    depthMeters: '09 m',
    accent: 'from-[#9a9286]/12 via-transparent to-transparent',
    edge: 'from-[#9a9286]/18 via-white/8 to-transparent',
  },
] as const;

const depthMeterTargets = {
  '/scenes': 'scenes',
  '/scripts/pilot': 'scripts',
  '/journeys': 'journeys',
  '/themes': 'themes',
  '/characters': 'characters',
} as const;

const depthSectionOrder = [
  'themes',
  'scenes',
  'journeys',
  'characters',
  'scripts',
] as const;

function DepthShell({
  sectionId,
  depth,
  title,
  accent,
  edge,
  align = 'left',
  children,
}: {
  sectionId: string;
  depth: string;
  title: string;
  accent: string;
  edge: string;
  align?: 'left' | 'right';
  children: React.ReactNode;
}) {
  return (
    <section id={sectionId} className='relative scroll-mt-24'>
      <div
        className={`absolute inset-x-[8%] top-0 hidden h-px bg-gradient-to-r ${edge} md:block`}
        aria-hidden='true'
      />
      <div
        className={`absolute top-10 z-20 hidden text-[10px] uppercase tracking-[0.34em] text-[#b9b0a7]/58 md:block ${
          align === 'left' ? 'left-10' : 'right-10 text-right'
        }`}
      >
        <span className='block text-[#e5dbd0]/78'>{depth}</span>
        <span className='mt-2 block'>{title}</span>
      </div>

      <div
        className='relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(10,10,10,0.48),rgba(10,10,10,0.32))] shadow-[0_18px_48px_rgba(0,0,0,0.28)] backdrop-blur-2xl backdrop-saturate-125'
      >
        <div
          className={`absolute inset-0 bg-gradient-to-b ${accent}`}
          aria-hidden='true'
        />
        <div
          className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_42%)]'
          aria-hidden='true'
        />
        <div
          className='absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent'
          aria-hidden='true'
        />
        <div
          className='absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/8 to-transparent'
          aria-hidden='true'
        />
        <div className='relative z-10'>{children}</div>
      </div>
    </section>
  );
}

function DepthMeter({
  labels,
  activeSectionId,
  onSelectSection,
  onWheelScroll,
  progress,
}: {
  labels: ReadonlyArray<readonly [string, string, string, string]>;
  activeSectionId: string | null;
  onSelectSection: (href: string) => void;
  onWheelScroll: (event: React.WheelEvent<HTMLDivElement>) => void;
  progress: MotionValue<number>;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [markerTop, setMarkerTop] = useState('0%');

  useEffect(() => {
    if (!activeSectionId) return;

    const activeItem = itemRefs.current[activeSectionId];
    const track = trackRef.current;

    if (!activeItem || !track) return;

    const trackRect = track.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();
    const nextTop = itemRect.top - trackRect.top + itemRect.height / 2;

    setMarkerTop(`${nextTop}px`);
  }, [activeSectionId, labels]);

  return (
    <div
      className='fixed right-6 top-1/2 z-30 hidden w-28 -translate-y-1/2 xl:block'
      onWheel={onWheelScroll}
    >
      <div className='rounded-[1.75rem] border border-white/10 bg-black/30 px-4 py-5 backdrop-blur-xl'>
        <p className='text-[9px] uppercase tracking-[0.34em] text-[#a8a096]'>
          Depth
        </p>
        <div ref={trackRef} className='relative mt-5 h-72'>
          <div className='absolute bottom-0 left-3 top-0 w-px bg-white/10' />
          <motion.div
            className='absolute left-[9px] top-0 w-[3px] origin-top rounded-full bg-gradient-to-b from-[#c6d2cb] via-[#8c7360] to-[#1b1714]'
            style={{ scaleY: progress }}
          />
          <motion.div
            className='absolute left-3 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-[#ece2d7] shadow-[0_0_20px_rgba(236,226,215,0.25)]'
            animate={{ top: markerTop }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
          />

          <div className='absolute inset-y-0 left-0 flex flex-col justify-between'>
            {depthSectionOrder
              .map((sectionId) => {
                const label = labels.find(
                  ([, , , href]) =>
                    depthMeterTargets[
                      href as keyof typeof depthMeterTargets
                    ] === sectionId,
                );

                return label ? { sectionId, label } : null;
              })
              .filter((entry) => entry !== null)
              .map(({ sectionId, label: [label, depth, , href] }) => {
              const isActive = activeSectionId === sectionId;

              return (
                <button
                  key={href}
                  ref={(element) => {
                    itemRefs.current[sectionId] = element;
                  }}
                  type='button'
                  onClick={() => onSelectSection(href)}
                  className={`group relative block w-full rounded-md pl-8 text-left transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#ece2d7]/60 ${
                    isActive ? 'bg-white/5' : 'bg-transparent'
                  }`}
                  aria-label={label}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span
                    className={`absolute left-3 top-1.5 h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-[#ece2d7] opacity-100 shadow-[0_0_10px_rgba(236,226,215,0.4)]'
                        : 'bg-white/40 opacity-0 group-hover:opacity-60 group-focus-visible:opacity-60'
                    }`}
                    aria-hidden='true'
                  />
                  <p
                    className={`text-[10px] uppercase tracking-[0.24em] transition-colors group-hover:text-white group-focus-visible:text-white ${
                      isActive ? 'text-white' : 'text-[#e2d8ce]/80'
                    }`}
                  >
                    {depth}
                  </p>
                  <p
                    className={`mt-1 text-[11px] transition-colors group-hover:text-[#d8cec4] group-focus-visible:text-[#d8cec4] ${
                      isActive ? 'text-[#e7ddd2]' : 'text-[#9f978d]'
                    }`}
                  >
                    {label}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeDepthExperience({
  locale,
  scenes,
  themes,
  characters,
}: HomeDepthExperienceProps) {
  const dictionary = getDictionary(locale);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const depthSectionsForLocale = depthSections.map((section) => ({
    ...section,
    depth: locale === 'es' ? section.depthMeters : section.depthFeet,
  }));

  const skyOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4],
    [0.18, 0.08, 0.02],
  );
  const caveOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.45, 1],
    [0.06, 0.28, 0.62],
  );
  const strataY = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);
  const ambientScale = useTransform(scrollYProgress, [0, 1], [1, 1.28]);
  const progress = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  const surfaceGlow = useMotionTemplate`radial-gradient(circle at 50% 0%, rgba(193,215,214,${skyOpacity}), transparent 36%)`;
  const abyssGlow = useMotionTemplate`radial-gradient(circle at 50% 100%, rgba(10,8,7,${caveOpacity}), rgba(0,0,0,0.96) 62%)`;

  useEffect(() => {
    if (reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.08,
      easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.92,
    });

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reduceMotion]);

  useEffect(() => {
    const sections = depthSectionOrder
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const pickActiveSection = () => {
      const pivot = 160;
      let nextSectionId = sections[0]?.id ?? null;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const isLastSection = section.id === sections[sections.length - 1]?.id;

        if (rect.top <= pivot && (rect.bottom > pivot || isLastSection)) {
          nextSectionId = section.id;
        }
      }

      setActiveSectionId((currentSectionId) =>
        currentSectionId === nextSectionId ? currentSectionId : nextSectionId,
      );
    };

    const observer = new IntersectionObserver(
      () => {
        pickActiveSection();
      },
      {
        rootMargin: '-18% 0px -45% 0px',
        threshold: [0.15, 0.35, 0.55, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));
    pickActiveSection();
    window.addEventListener('scroll', pickActiveSection, { passive: true });
    window.addEventListener('resize', pickActiveSection);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', pickActiveSection);
      window.removeEventListener('resize', pickActiveSection);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (!section) return;

    const top = section.getBoundingClientRect().top + window.scrollY - 96;

    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleDepthMeterSelect = (href: string) => {
    const sectionId = depthMeterTargets[href as keyof typeof depthMeterTargets];

    if (!sectionId) return;

    setActiveSectionId(sectionId);
    scrollToSection(sectionId);
  };

  const handleDepthMeterWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();

    const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;

    window.scrollBy({ top: delta, behavior: 'auto' });
  };

  return (
    <main className='relative overflow-hidden bg-[#050505]'>
      {!reduceMotion && <SubterraneanScene progress={scrollYProgress} />}

      <div
        className={`pointer-events-none fixed inset-0 z-[2] overflow-hidden ${
          reduceMotion ? '' : 'opacity-20 mix-blend-soft-light'
        }`}
        aria-hidden='true'
      >
        <motion.div
          className='absolute inset-0'
          style={{ backgroundImage: surfaceGlow }}
        />
        <motion.div
          className='absolute inset-0 bg-[linear-gradient(180deg,#95afb1_0%,#5c6f63_14%,#20241f_34%,#0a0a0a_58%,#050505_100%)]'
          style={{ opacity: skyOpacity, scale: ambientScale }}
        />
        <motion.div
          className='absolute inset-0 bg-[repeating-linear-gradient(180deg,rgba(148,125,97,0.12)_0,rgba(148,125,97,0.12)_1px,transparent_1px,transparent_92px),repeating-linear-gradient(180deg,rgba(255,255,255,0.02)_0,rgba(255,255,255,0.02)_1px,transparent_1px,transparent_140px)]'
          style={{ y: strataY, opacity: caveOpacity }}
        />
        <motion.div
          className='absolute inset-0'
          style={{ backgroundImage: abyssGlow }}
        />
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_24%,rgba(0,0,0,0.45)_78%,rgba(0,0,0,0.82)_100%)]' />
      </div>

      <DepthMeter
        labels={dictionary.home.descent}
        activeSectionId={activeSectionId}
        onSelectSection={handleDepthMeterSelect}
        onWheelScroll={handleDepthMeterWheel}
        progress={progress}
      />

      <div className='relative z-10'>
        <HeroIntro locale={locale} />

        <div className='mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-28 md:gap-14 md:px-6 md:pb-36'>
          <DepthShell
            sectionId='universe'
            depth={depthSectionsForLocale[0].depth}
            title={dictionary.home.universeTitle}
            accent={depthSectionsForLocale[0].accent}
            edge={depthSectionsForLocale[0].edge}
          >
            <UniverseSection locale={locale} />
          </DepthShell>

          <DepthShell
            sectionId='themes'
            depth={depthSectionsForLocale[1].depth}
            title={dictionary.home.themeTitle}
            accent={depthSectionsForLocale[1].accent}
            edge={depthSectionsForLocale[1].edge}
            align='right'
          >
            <ThemeMap locale={locale} themes={themes} />
          </DepthShell>

          <DepthShell
            sectionId='scenes'
            depth={depthSectionsForLocale[2].depth}
            title={dictionary.home.featuredTitle}
            accent={depthSectionsForLocale[2].accent}
            edge={depthSectionsForLocale[2].edge}
          >
            <FeaturedScenes locale={locale} scenes={scenes} />
          </DepthShell>

          <DepthShell
            sectionId='journeys'
            depth={depthSectionsForLocale[3].depth}
            title={dictionary.home.timelineTitle}
            accent={depthSectionsForLocale[3].accent}
            edge={depthSectionsForLocale[3].edge}
            align='right'
          >
            <EmotionalTimeline locale={locale} scenes={scenes} />
          </DepthShell>

          <DepthShell
            sectionId='characters'
            depth={depthSectionsForLocale[4].depth}
            title={dictionary.home.charactersTitle}
            accent={depthSectionsForLocale[4].accent}
            edge={depthSectionsForLocale[4].edge}
          >
            <CharacterConstellation locale={locale} characters={characters} />
          </DepthShell>

          <DepthShell
            sectionId='scripts'
            depth={depthSectionsForLocale[5].depth}
            title={dictionary.home.archiveTitle}
            accent={depthSectionsForLocale[5].accent}
            edge={depthSectionsForLocale[5].edge}
            align='right'
          >
            <ArchiveTeaser locale={locale} />
          </DepthShell>
        </div>
      </div>
    </main>
  );
}
