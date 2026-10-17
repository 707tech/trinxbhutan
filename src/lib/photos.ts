import type { ImageMetadata } from 'astro';

// Photos live in src/assets/photos/<unsplash-id>.jpg — look one up by id.
const all = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.{jpg,jpeg}', { eager: true });

export function photo(id: string): ImageMetadata {
  const key = Object.keys(all).find((k) => /.jpe?g$/.test(k) && k.slice(k.lastIndexOf('/') + 1).replace(/.jpe?g$/, '') === id);
  if (!key) throw new Error(`Photo not found: ${id}`);
  return all[key].default;
}
