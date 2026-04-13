import type { Metadata } from 'next';
import { Geist, Playfair_Display } from 'next/font/google';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { AmbientLayer } from '@/components/layout/AmbientLayer';
import { AmbientAudio } from '@/components/layout/AmbientAudio';
import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://six-feet-under-experience.local'),
  title: {
    default: 'Six Feet Under - Archivo Emocional',
    template: '%s | Six Feet Under Archive',
  },
  description:
    'Un recorrido inmersivo por escenas, duelo, identidad y memoria. Una experiencia editorial sobre lo que la muerte obliga a mirar.',
  applicationName: 'Six Feet Under Archive',
  openGraph: {
    title: 'Six Feet Under - Archivo Emocional',
    description:
      'Escenas, personajes y temas para leer Six Feet Under desde la memoria, el duelo y la identidad.',
    type: 'website',
    locale: 'es_AR',
  },
  twitter: {
    card: 'summary',
    title: 'Six Feet Under - Archivo Emocional',
    description:
      'Un archivo editorial sobre escenas, duelo, identidad y memoria.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='es'
      className={`${geistSans.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col bg-[#0a0a0a] text-[#e8e4df]'>
        <AmbientLayer />
        <SiteHeader />
        {children}
        <SiteFooter />
        <AmbientAudio />
      </body>
    </html>
  );
}
