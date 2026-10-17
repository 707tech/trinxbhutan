// YouTube vlogs (G Man Bhutan). Fetched from the channel RSS feed at build time.
// The last good fetch is saved to src/data/videos.json and used if YouTube can't be reached, so the build never fails.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

export const CHANNEL_ID = 'UCbeouXGgx19JAa098h2pRkQ';
export const CHANNEL_URL = 'https://www.youtube.com/@GManBhutan';
export const CHANNEL_NAME = 'G Man Bhutan';
const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const CACHE = new URL('./videos.json', import.meta.url);

export type Video = { id: string; title: string; published: string; thumbnail: string; description: string; url: string };

const decode = (s: string) =>
  s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&amp;/g, '&').trim();
const tag = (xml: string, name: string) => xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))?.[1] ?? '';

function parse(xml: string): Video[] {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .map(([, e]) => {
      const id = tag(e, 'yt:videoId').trim();
      return { id, title: decode(tag(e, 'title')), published: tag(e, 'published').trim(), thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, description: decode(tag(e, 'media:description')), url: `https://www.youtube.com/watch?v=${id}` };
    })
    .filter((v) => v.id && v.title)
    .sort((a, b) => b.published.localeCompare(a.published));
}

async function load(): Promise<Video[]> {
  try {
    const res = await fetch(FEED, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const list = parse(await res.text());
    if (!list.length) throw new Error('feed had no videos');
    // Only write when the videos changed: rewriting the same file makes the dev server see a change and reload in a loop.
    try {
      const json = JSON.stringify(list, null, 2) + '\n';
      if (!existsSync(CACHE) || readFileSync(CACHE, 'utf8') !== json) writeFileSync(CACHE, json);
    } catch { /* read-only file system: ignore */ }
    return list;
  } catch (err) {
    console.warn(`[videos] YouTube feed failed (${(err as Error).message}); using saved videos.json`);
    try { return existsSync(CACHE) ? (JSON.parse(readFileSync(CACHE, 'utf8')) as Video[]) : []; } catch { return []; }
  }
}

export const videos: Video[] = await load();
export const formatVideoDate = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
