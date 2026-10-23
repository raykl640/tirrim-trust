const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefixes a site-root path ("/water/") with the deploy base path. */
export const href = (path: string) => (path.startsWith('/') ? `${base}${path}` : path);

/** True when `path` is the current page or one of its children. */
export const isCurrent = (pathname: string, path: string) => {
  const current = pathname.replace(base, '') || '/';
  return path === '/' ? current === '/' : current.startsWith(path);
};
