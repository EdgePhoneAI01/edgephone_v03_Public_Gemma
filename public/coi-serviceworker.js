/*
 * coi-serviceworker.js  v0.1.7
 * Cross-Origin Isolation service worker.
 *
 * GitHub Pages does not allow setting response headers, but WebGPU / MediaPipe
 * LLM inference requires:
 *   Cross-Origin-Opener-Policy: same-origin
 *   Cross-Origin-Embedder-Policy: require-corp
 *
 * This service worker intercepts all fetches and re-adds those headers so
 * the page runs in a cross-origin-isolated context on static hosts.
 *
 * Minimal self-contained implementation (no external deps).
 */

/* eslint-disable no-restricted-globals */

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

/**
 * Wrap a Response to inject the isolation headers.
 */
function addCOIHeaders(response) {
  // Only wrap responses that succeeded or are opaque
  const newHeaders = new Headers(response.headers);
  newHeaders.set('Cross-Origin-Opener-Policy', 'same-origin');
  newHeaders.set('Cross-Origin-Embedder-Policy', 'require-corp');
  newHeaders.set('Cross-Origin-Resource-Policy', 'cross-origin');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
  });
}

self.addEventListener('fetch', (e) => {
  const { request } = e;

  // Passthrough: non-GET, chrome-extension, etc.
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // For same-origin fetches (our own pages / assets) add isolation headers.
  // For cross-origin requests (CDN, GitHub Releases) use no-cors so we get
  // an opaque response and wrap it — the browser still enforces CORP via
  // 'cross-origin' so large binary fetches work.
  const isSameOrigin = url.origin === self.location.origin;

  e.respondWith(
    fetch(request, {
      // Cross-origin requests: we need credentials omitted & cache respected.
      ...(isSameOrigin ? {} : { mode: 'cors', credentials: 'omit' }),
    })
      .then(addCOIHeaders)
      .catch(() => fetch(request)) // fallback: unmodified if SW fetch fails
  );
});
