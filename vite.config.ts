import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

// Shared COOP/COEP headers required for WebGPU / MediaPipe LLM (SharedArrayBuffer).
// The COI service worker handles these on GitHub Pages; vite dev/preview set them directly.
const crossOriginIsolationHeaders = {
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
};

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');

  // VITE_BASE_URL lets GitHub Actions set the correct sub-path, e.g. /edgephone_v02/
  // Defaults to '/' for local dev and custom domains.
  const base = env.VITE_BASE_URL ?? '/';

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      headers: crossOriginIsolationHeaders,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    // Also apply headers when running 'vite preview' on the production build locally.
    preview: {
      headers: crossOriginIsolationHeaders,
    },
  };
});
