'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Locale, withLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';

export function HeroIntro({ locale }: { locale: Locale }) {
  const dictionary = getDictionary(locale);
  const descentStops = dictionary.home.descent;
  const firstStop = descentStops[0];

  return (
    <section className='relative isolate overflow-hidden bg-[#080907]'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(198,229,234,0.34),transparent_28%),radial-gradient(circle_at_72%_14%,rgba(233,224,212,0.12),transparent_18%),linear-gradient(180deg,#a9ccd2_0%,#86a6a7_17%,#617c67_32%,#243026_50%,#0d110d_72%,#080907_100%)]' />
      <div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(8,9,7,0.14)_0%,rgba(8,9,7,0.05)_26%,rgba(8,9,7,0.44)_58%,#080907_100%)]' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_34%,rgba(8,9,7,0.58)_100%)]' />
      <div className='absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(to_bottom,rgba(8,9,7,0),#080907_88%)]' />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className='relative z-10 mx-auto grid min-h-screen max-w-7xl gap-12 px-6 pb-18 pt-28 md:grid-cols-[minmax(300px,0.72fr)_minmax(0,1fr)] md:items-end md:pb-24 md:pt-36'
      >
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: 'easeOut' }}
          className='relative mx-auto w-full max-w-[380px] md:max-w-[430px] md:self-center'
        >
          <div className='absolute -inset-6 rounded-[2rem] border border-white/8 bg-black/15 shadow-[0_32px_80px_rgba(0,0,0,0.45)] backdrop-blur-[2px]' />
          <div className='absolute -left-2 top-10 h-28 w-28 rounded-full bg-white/12 blur-3xl' />

          <div className='relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(20,21,18,0.88),rgba(10,10,10,0.96))] p-4 shadow-[0_36px_100px_rgba(0,0,0,0.55)]'>
            <div className='mb-4 flex items-center justify-between rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[10px] uppercase tracking-[0.32em] text-[#d8d0c4]/72'>
              <span>{dictionary.home.archive}</span>
              <span>HBO 2001-2005</span>
            </div>

            <div className='relative overflow-hidden rounded-[1.35rem] border border-white/8 bg-[#0d100d]'>
              <Image
                src='/Six_Feet_Under_main.webp'
                alt='Arbol solitario sobre el campo con el titulo Six Feet Under.'
                width={1500}
                height={2250}
                priority
                sizes='(min-width: 768px) 430px, 340px'
                className='relative w-full scale-[1.01] contrast-[1.03] saturate-[0.82]'
              />
              <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(6,6,6,0.34),transparent_38%)]' />
            </div>
          </div>
        </motion.div>

        <div className='relative md:pb-10 md:pl-2'>
          <div className='relative max-w-2xl rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(15,17,14,0.42),rgba(8,9,7,0.78))] p-8 shadow-[0_28px_90px_rgba(0,0,0,0.36)] backdrop-blur-md md:p-10 lg:p-12'>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className='mb-6 text-[11px] uppercase tracking-[0.42em] text-[#d8d0c4]/60'
            >
              {dictionary.home.archive}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.45, ease: 'easeOut' }}
              className='max-w-[11ch] font-[family-name:var(--font-playfair)] text-5xl font-light leading-[0.92] text-[#f3ede6] md:text-7xl lg:text-[5.5rem]'
            >
              <span className='block'>{dictionary.home.title}</span>
              <span className='mt-4 block max-w-[12ch] text-[0.82em] font-normal italic leading-[0.95] text-[#aca097]'>
                {dictionary.home.subtitle}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className='mt-8 max-w-xl text-base leading-8 text-[#d1cabf]/78 md:text-lg'
            >
              {dictionary.home.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.35 }}
              className='mt-10 flex flex-wrap gap-3'
            >
              <a
                href='#descenso'
                className='rounded-full border border-[#efe8df]/80 bg-[#efe8df] px-6 py-3 text-xs uppercase tracking-[0.28em] text-[#11100d] transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]'
              >
                {dictionary.home.descend}
              </a>
              <Link
                href={withLocale(locale, '/scenes/david-nathaniel-alive')}
                className='rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-xs uppercase tracking-[0.28em] text-[#e3dcd3]/84 transition-all duration-300 hover:border-white/22 hover:bg-white/[0.06] hover:text-white'
              >
                {dictionary.home.latestScene}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.55, ease: 'easeOut' }}
              className='mt-10 grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]'
            >
              <div className='rounded-[1.5rem] border border-white/10 bg-black/18 p-5'>
                <p className='text-[10px] uppercase tracking-[0.32em] text-[#9f958d]'>
                  {dictionary.home.navigation}
                </p>
                <p className='mt-3 font-[family-name:var(--font-playfair)] text-2xl leading-snug text-[#ece5dc]'>
                  {dictionary.home.navigationText}
                </p>
              </div>

              <div className='rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5'>
                <p className='text-[10px] uppercase tracking-[0.32em] text-[#9f958d]'>
                  {firstStop[1]}
                </p>
                <p className='mt-3 text-sm leading-7 text-[#d1cabf]/72'>
                  {firstStop[2]}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div
        id='descenso'
        className='relative z-10 border-t border-white/8 bg-[linear-gradient(to_bottom,#11130f,#0b0c0a_36%,#080807)] px-6 py-20 md:py-28'
      >
        <div className='mx-auto max-w-5xl'>
          <div className='grid gap-8 md:grid-cols-[220px_1fr]'>
            <div className='md:sticky md:top-28 md:self-start'>
              <p className='text-[11px] uppercase tracking-[0.4em] text-[#8d847c]'>
                {dictionary.home.navigation}
              </p>
              <p className='mt-4 font-[family-name:var(--font-playfair)] text-2xl leading-snug text-[#ece5dc]'>
                {dictionary.home.navigationText}
              </p>
            </div>

            <div className='relative'>
              <div className='absolute bottom-8 left-4 top-8 w-px bg-gradient-to-b from-[#8f9a76] via-[#5d5d57] to-transparent md:left-1/2' />
              <div className='space-y-5'>
                {descentStops.map(([label, depth, text, href], index) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.55, delay: index * 0.08 }}
                    className={`relative md:flex ${
                      index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'
                    }`}
                  >
                    <span className='absolute left-4 top-8 h-3 w-3 -translate-x-1/2 rounded-full border border-[#8b9771] bg-[#10110f] md:left-1/2' />
                    <Link
                      href={withLocale(locale, href)}
                      className='group ml-10 block rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.18)] transition-all duration-500 hover:border-white/15 hover:bg-white/[0.06] md:ml-0 md:w-[calc(50%-2rem)]'
                    >
                      <span className='text-[10px] uppercase tracking-[0.28em] text-[#8d847c] transition-colors group-hover:text-[#bdb4ab]'>
                        {depth}
                      </span>
                      <span className='mt-2 block font-[family-name:var(--font-playfair)] text-2xl text-[#ece5dc] transition-colors group-hover:text-white'>
                        {label}
                      </span>
                      <span className='mt-3 block text-sm leading-7 text-[#c9c1b7]/72'>
                        {text}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
