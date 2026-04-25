import { notFound } from 'next/navigation';
import { HomeDepthExperience } from '@/components/home/HomeDepthExperience';
import { isLocale, locales } from '@/i18n/config';
import { getCharacters, getScenes, getThemes } from '@/data/localized';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const scenes = getScenes(rawLocale);
  const themes = getThemes(rawLocale);
  const characters = getCharacters(rawLocale);

  return (
    <HomeDepthExperience
      locale={rawLocale}
      scenes={scenes}
      themes={themes}
      characters={characters}
    />
  );
}
