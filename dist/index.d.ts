/**
 * ts-lazy-loader - A TypeScript image lazy loading library with retry and event support
 * Supports NPM and UMD (CDN) usage.
 */
export interface LazyLoaderOptions {
    selector?: string;
    rootMargin?: string;
    retryCount?: number;
    retryInterval?: number;
    retryDelay?: number;
}
export declare function initLazyLoader(options?: LazyLoaderOptions): void;
export declare function refreshLazyLoader(): void;
/**
 * Example usage:
 * NPM:
 * import { initLazyLoader } from 'ts-lazy-loader';
 * document.addEventListener('DOMContentLoaded', () => initLazyLoader());
 *
 * CDN:
 * <script src="https://cdn.jsdelivr.net/npm/ts-lazy-loader/dist/ts-lazy-loader.min.js"></script>
 * <script>
 *   TsLazyLoader.initLazyLoader();
 * </script>
 */
