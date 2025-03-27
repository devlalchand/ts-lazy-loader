'use strict';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * ts-lazy-loader - A TypeScript image lazy loading library with retry and event support
 * Supports NPM and UMD (CDN) usage.
 */
var observer = null;
var optionsConfig;
function initLazyLoader(options) {
    optionsConfig = __assign({ selector: ".ts-lazy-loader", rootMargin: "0px 0px 50px 0px", retryCount: 3, retryInterval: 5000, retryDelay: 2000 }, options);
    setupObserver();
    observeImages();
    startPeriodicCheck();
}
function setupObserver() {
    observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var img = entry.target;
                lazyLoad(img);
                obs.unobserve(img);
            }
        });
    }, { rootMargin: optionsConfig.rootMargin });
}
function observeImages() {
    var lazyImages = document.querySelectorAll(optionsConfig.selector);
    lazyImages.forEach(function (image) { return observer === null || observer === void 0 ? void 0 : observer.observe(image); });
}
function lazyLoad(image, retries) {
    if (retries === void 0) { retries = optionsConfig.retryCount; }
    var src = image.getAttribute("data-src");
    var placeholder = image.getAttribute("data-placeholder");
    if (!src)
        return;
    if (placeholder)
        image.src = placeholder;
    image.onload = function () {
        image.classList.add("ts-lazy-loader-loaded");
        image.classList.remove("ts-lazy-loader");
        document.dispatchEvent(new CustomEvent("ts-lazy-loader:loaded", { detail: image }));
    };
    image.onerror = function () {
        if (retries > 0) {
            setTimeout(function () { return lazyLoad(image, retries - 1); }, optionsConfig.retryDelay);
        }
        else {
            image.classList.add("ts-lazy-loader-failed");
            document.dispatchEvent(new CustomEvent("ts-lazy-loader:failed", { detail: image }));
        }
    };
    image.src = src;
}
function refreshLazyLoader() {
    observeImages();
}
function startPeriodicCheck() {
    setInterval(function () {
        var loadedImages = document.querySelectorAll("img.ts-lazy-loader-loaded");
        loadedImages.forEach(function (image) {
            if (!image.complete || image.naturalWidth === 0) {
                lazyLoad(image, optionsConfig.retryCount);
            }
        });
    }, optionsConfig.retryInterval);
}
// Expose globally for UMD / CDN usage
if (typeof window !== "undefined") {
    window.TsLazyLoader = { initLazyLoader: initLazyLoader, refreshLazyLoader: refreshLazyLoader };
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

exports.initLazyLoader = initLazyLoader;
exports.refreshLazyLoader = refreshLazyLoader;
