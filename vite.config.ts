import react from '@vitejs/plugin-react-swc';
import million from 'million/compiler';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type PluginOption } from 'vite';
import { VitePWA, type VitePWAOptions } from 'vite-plugin-pwa';
import tsConfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

const isProduction = process.env.NODE_ENV === 'production';

const pwaOptions: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  manifest: {
    short_name: 'skattjakt',
    name: 'Skattjakt',
    lang: 'en',
    start_url: isProduction ? '/skattjakt/' : '',
    background_color: '#0c0a09',
    theme_color: '#0c0a09',
    dir: 'ltr',
    display: 'standalone',
    prefer_related_applications: false,
    icons: [
      {
        src: '/assets/favicon.svg',
        purpose: 'any',
        sizes: '48x48 72x72 96x96 128x128 256x256',
      },
    ],
  },
};

export default defineConfig({
  plugins: [
    svgr(),
    million.vite({ auto: true }),
    react(),
    tsConfigPaths(),
    VitePWA(pwaOptions),
  ],
  server: {
    open: true,
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  base: isProduction ? '/skattjakt/' : '',
});
