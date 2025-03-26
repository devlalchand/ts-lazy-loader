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

let observer: IntersectionObserver | null = null;
let optionsConfig: LazyLoaderOptions;

export function initLazyLoader(options?: LazyLoaderOptions): void {
  optionsConfig = {
    selector: ".ts-lazy-loader",
    rootMargin: "0px 0px 50px 0px",
    retryCount: 3,
    retryInterval: 5000,
    retryDelay: 2000,
    ...options,
  };

  setupObserver();
  observeImages();
  startPeriodicCheck();
}

function setupObserver(): void {
  observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          lazyLoad(img);
          obs.unobserve(img);
        }
      });
    },
    { rootMargin: optionsConfig.rootMargin }
  );
}

function observeImages(): void {
  const lazyImages = document.querySelectorAll<HTMLImageElement>(
    optionsConfig.selector!
  );
  lazyImages.forEach((image) => observer?.observe(image));
}

function lazyLoad(
  image: HTMLImageElement,
  retries = optionsConfig.retryCount!
) {
  const src = image.getAttribute("data-src");
  const placeholder = image.getAttribute("data-placeholder");

  if (!src) return;

  if (placeholder) image.src = placeholder;

  image.onload = () => {
    image.classList.add("ts-lazy-loader-loaded");
    image.classList.remove("ts-lazy-loader");
    document.dispatchEvent(
      new CustomEvent("ts-lazy-loader:loaded", { detail: image })
    );
  };

  image.onerror = () => {
    if (retries > 0) {
      setTimeout(() => lazyLoad(image, retries - 1), optionsConfig.retryDelay);
    } else {
      image.classList.add("ts-lazy-loader-failed");
      document.dispatchEvent(
        new CustomEvent("ts-lazy-loader:failed", { detail: image })
      );
    }
  };

  image.src = src;
}

export function refreshLazyLoader(): void {
  observeImages();
}

function startPeriodicCheck(): void {
  setInterval(() => {
    const loadedImages = document.querySelectorAll<HTMLImageElement>(
      "img.ts-lazy-loader-loaded"
    );
    loadedImages.forEach((image) => {
      if (!image.complete || image.naturalWidth === 0) {
        lazyLoad(image, optionsConfig.retryCount);
      }
    });
  }, optionsConfig.retryInterval);
}

// Expose globally for UMD / CDN usage
if (typeof window !== "undefined") {
  (window as any).TsLazyLoader = { initLazyLoader, refreshLazyLoader };
}

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
