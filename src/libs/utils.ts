import { type ClassValue, clsx } from "clsx";
import type { Context } from "hono";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isForwardUserAgent = (c: Context) => {
  const userAgent = c.req.header("User-Agent");
  return !!userAgent && /forward/i.test(userAgent);
};

export const isNumeric = (str: string) => typeof str === "string" && str.trim() !== "" && Number.isFinite(+str);

/** forward 对于 ID 识别有问题，暂时用 tmdb ID 作为 ID */
export const generateId = (options: { doubanId: number; imdbId?: string | null; tmdbId?: number | null }) => {
  const { doubanId, imdbId, tmdbId } = options;
  if (tmdbId) {
    return `tmdb:${tmdbId}`;
  }
  if (imdbId) {
    return imdbId;
  }
  return `douban:${doubanId}`;
};
