/**
 * Builds a URL for files served from Vite's `public/` directory, honoring `import.meta.env.BASE_URL`
 * (needed when the app is deployed under a subpath).
 *
 * @param {string} path - Path relative to `public`, with or without a leading slash (e.g. `"placeholder.svg"` or `"/profile-image.png"`).
 * @returns {string} Absolute site path suitable for `src` / `href`.
 */
export function publicAsset(path: string): string {
    const normalized = path.startsWith("/") ? path.slice(1) : path;
    const rawBase = import.meta.env.BASE_URL || "/";
    const base = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;
    return `${base}${normalized}`;
}
