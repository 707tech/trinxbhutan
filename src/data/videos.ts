// YouTube vlogs (G Man Bhutan). Fetched with the YouTube Data API v3 at build time (needs YOUTUBE_API_KEY).
// The last good fetch is saved to src/data/videos.json and used if the key is missing or YouTube can't be reached, so the build never fails.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import saved from './videos.json';

export const CHANNEL_ID = 'UCbeouXGgx19JAa098h2pRkQ';
export const CHANNEL_URL = 'https://www.youtube.com/@GManBhutan';
export const CHANNEL_NAME = 'G Man Bhutan';
const API = 'https://www.googleapis.com/youtube/v3';
const MAX_VIDEOS = 15;
// import.meta.url points into the bundled output at build time, so write the cache relative to the project root instead.
const CACHE = resolve(process.cwd(), 'src/data/videos.json');

export type Video = { id: string; title: string; published: string; thumbnail: string; description: string; url: string };

async function api(endpoint: string, params: Record<string, string>) {
  const res = await fetch(`${API}/${endpoint}?${new URLSearchParams(params)}`, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`${endpoint} HTTP ${res.status}`);
  return res.json();
}

async function fetchVideos(key: string): Promise<Video[]> {
  const channel = await api('channels', { part: 'contentDetails', id: CHANNEL_ID, key });
  const uploads = channel.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploads) throw new Error('channel has no uploads playlist');
  const data = await api('playlistItems', { part: 'snippet,contentDetails', playlistId: uploads, maxResults: String(MAX_VIDEOS), key });
  return (data.items ?? [])
    .map((it: any) => {
      const id: string = it.contentDetails?.videoId ?? it.snippet?.resourceId?.videoId ?? '';
      return { id, title: String(it.snippet?.title ?? '').trim(), published: it.contentDetails?.videoPublishedAt ?? it.snippet?.publishedAt ?? '', thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, description: String(it.snippet?.description ?? '').trim(), url: `https://www.youtube.com/watch?v=${id}` };
    })
    // Deleted and private uploads still show up in the playlist
    .filter((v: Video) => v.id && v.title && v.title !== 'Private video' && v.title !== 'Deleted video')
    .sort((a: Video, b: Video) => b.published.localeCompare(a.published));
}

async function load(): Promise<Video[]> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    console.warn('[videos] YOUTUBE_API_KEY is not set; using saved videos.json');
    return saved as Video[];
  }
  try {
    const list = await fetchVideos(key);
    if (!list.length) throw new Error('no videos returned');
    // Only write when the videos changed: rewriting the same file makes the dev server see a change and reload in a loop.
    try {
      const json = JSON.stringify(list, null, 2) + '\n';
      if (!existsSync(CACHE) || readFileSync(CACHE, 'utf8') !== json) writeFileSync(CACHE, json);
    } catch { /* read-only file system: ignore */ }
    return list;
  } catch (err) {
    console.warn(`[videos] YouTube API failed (${(err as Error).message}); using saved videos.json`);
    return saved as Video[];
  }
}

export const videos: Video[] = await load();
export const formatVideoDate = (iso: string) => new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
