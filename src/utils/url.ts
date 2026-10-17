const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix an internal path with the site's base path (e.g. /trinxbhutan). Query strings and hashes are kept. */
export const url = (path = '/') => `${base}/${path.replace(/^\//, '')}`;
