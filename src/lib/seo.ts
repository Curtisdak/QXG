export const SITE_NAME = "QXG";
export const SITE_URL_FALLBACK = "https://qxg.app";
export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";

export const SITE_DESCRIPTION =
  "QXG est un jeu adulte 18+ de type action ou verite, ideal pour couple et soiree privee, avec trois modes: Chill, Heat et Wild.";

export const DEFAULT_KEYWORDS = [
  "jeu adulte",
  "action ou verite",
  "jeu couple",
  "soiree privee",
  "jeu 18+",
  "jeu de soiree adultes",
  "jeu web",
  "QXG",
];

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) {
    return SITE_URL_FALLBACK;
  }

  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return raw;
  }

  return `https://${raw}`;
}

export function getMetadataBase(): URL {
  return new URL(getSiteUrl());
}
