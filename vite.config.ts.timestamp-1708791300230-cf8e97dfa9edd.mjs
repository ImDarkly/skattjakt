// vite.config.ts
import react from "file:///D:/Documents/React/Vite/skattjakt/node_modules/.pnpm/@vitejs+plugin-react-swc@3.6.0_vite@5.1.1/node_modules/@vitejs/plugin-react-swc/index.mjs";
import million from "file:///D:/Documents/React/Vite/skattjakt/node_modules/.pnpm/million@2.6.4/node_modules/million/dist/packages/compiler.mjs";
import { visualizer } from "file:///D:/Documents/React/Vite/skattjakt/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0_rollup@2.79.1/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { defineConfig } from "file:///D:/Documents/React/Vite/skattjakt/node_modules/.pnpm/vite@5.1.1_@types+node@20.11.17/node_modules/vite/dist/node/index.js";
import checker from "file:///D:/Documents/React/Vite/skattjakt/node_modules/.pnpm/vite-plugin-checker@0.6.4_eslint@8.57.0_typescript@5.3.3_vite@5.1.1/node_modules/vite-plugin-checker/dist/esm/main.js";
import { VitePWA } from "file:///D:/Documents/React/Vite/skattjakt/node_modules/.pnpm/vite-plugin-pwa@0.17.5_vite@5.1.1_workbox-build@7.0.0_workbox-window@7.0.0/node_modules/vite-plugin-pwa/dist/index.js";
import tsConfigPaths from "file:///D:/Documents/React/Vite/skattjakt/node_modules/.pnpm/vite-tsconfig-paths@4.3.1_typescript@5.3.3_vite@5.1.1/node_modules/vite-tsconfig-paths/dist/index.mjs";
import svgr from "file:///D:/Documents/React/Vite/skattjakt/node_modules/.pnpm/vite-plugin-svgr@4.2.0_rollup@2.79.1_typescript@5.3.3_vite@5.1.1/node_modules/vite-plugin-svgr/dist/index.js";
var isProduction = process.env.NODE_ENV === "production";
var pwaOptions = {
  registerType: "autoUpdate",
  manifest: {
    short_name: "skattjakt",
    name: "Skattjakt",
    lang: "en",
    start_url: isProduction ? "/skattjakt/" : "",
    background_color: "#0c0a09",
    theme_color: "#0c0a09",
    dir: "ltr",
    display: "standalone",
    prefer_related_applications: false,
    icons: [
      {
        src: "/assets/favicon.svg",
        purpose: "any",
        sizes: "48x48 72x72 96x96 128x128 256x256"
      }
    ]
  }
};
var vite_config_default = defineConfig({
  plugins: [
    svgr(),
    million.vite({ auto: true }),
    react(),
    checker({
      typescript: true,
      eslint: { lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"' }
    }),
    tsConfigPaths(),
    visualizer({ template: "sunburst" }),
    VitePWA(pwaOptions)
  ],
  server: {
    open: true
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version)
  },
  base: isProduction ? "/skattjakt/" : ""
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxEb2N1bWVudHNcXFxcUmVhY3RcXFxcVml0ZVxcXFxza2F0dGpha3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXERvY3VtZW50c1xcXFxSZWFjdFxcXFxWaXRlXFxcXHNrYXR0amFrdFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovRG9jdW1lbnRzL1JlYWN0L1ZpdGUvc2thdHRqYWt0L3ZpdGUuY29uZmlnLnRzXCI7LyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzICovXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcbmltcG9ydCBtaWxsaW9uIGZyb20gJ21pbGxpb24vY29tcGlsZXInO1xuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcic7XG5pbXBvcnQgdHlwZSB7IFBsdWdpbk9wdGlvbiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgY2hlY2tlciBmcm9tICd2aXRlLXBsdWdpbi1jaGVja2VyJztcbmltcG9ydCB0eXBlIHsgVml0ZVBXQU9wdGlvbnMgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSc7XG5pbXBvcnQgdHNDb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJztcbmltcG9ydCBzdmdyIGZyb20gJ3ZpdGUtcGx1Z2luLXN2Z3InO1xuY29uc3QgaXNQcm9kdWN0aW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiO1xuXG5jb25zdCBwd2FPcHRpb25zOiBQYXJ0aWFsPFZpdGVQV0FPcHRpb25zPiA9IHtcbiAgcmVnaXN0ZXJUeXBlOiAnYXV0b1VwZGF0ZScsXG4gIG1hbmlmZXN0OiB7XG4gICAgc2hvcnRfbmFtZTogJ3NrYXR0amFrdCcsXG4gICAgbmFtZTogJ1NrYXR0amFrdCcsXG4gICAgbGFuZzogJ2VuJyxcbiAgICBzdGFydF91cmw6IGlzUHJvZHVjdGlvbiA/IFwiL3NrYXR0amFrdC9cIiA6IFwiXCIsXG4gICAgYmFja2dyb3VuZF9jb2xvcjogJyMwYzBhMDknLFxuICAgIHRoZW1lX2NvbG9yOiAnIzBjMGEwOScsXG4gICAgZGlyOiAnbHRyJyxcbiAgICBkaXNwbGF5OiAnc3RhbmRhbG9uZScsXG4gICAgcHJlZmVyX3JlbGF0ZWRfYXBwbGljYXRpb25zOiBmYWxzZSxcbiAgICBpY29uczogW1xuICAgICAge1xuICAgICAgICBzcmM6ICcvYXNzZXRzL2Zhdmljb24uc3ZnJyxcbiAgICAgICAgcHVycG9zZTogJ2FueScsXG4gICAgICAgIHNpemVzOiAnNDh4NDggNzJ4NzIgOTZ4OTYgMTI4eDEyOCAyNTZ4MjU2JyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbn07XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgc3ZncigpLFxuICAgIG1pbGxpb24udml0ZSh7IGF1dG86IHRydWUgfSksXG4gICAgcmVhY3QoKSxcbiAgICBjaGVja2VyKHtcbiAgICAgIHR5cGVzY3JpcHQ6IHRydWUsXG4gICAgICBlc2xpbnQ6IHsgbGludENvbW1hbmQ6ICdlc2xpbnQgXCIuL3NyYy8qKi8qLntqcyxqc3gsdHMsdHN4fVwiJyB9LFxuICAgIH0pLFxuICAgIHRzQ29uZmlnUGF0aHMoKSxcbiAgICB2aXN1YWxpemVyKHsgdGVtcGxhdGU6ICdzdW5idXJzdCcgfSkgYXMgdW5rbm93biBhcyBQbHVnaW5PcHRpb24sXG4gICAgVml0ZVBXQShwd2FPcHRpb25zKSxcbiAgXSxcbiAgc2VydmVyOiB7XG4gICAgb3BlbjogdHJ1ZSxcbiAgfSxcbiAgZGVmaW5lOiB7XG4gICAgQVBQX1ZFUlNJT046IEpTT04uc3RyaW5naWZ5KHByb2Nlc3MuZW52Lm5wbV9wYWNrYWdlX3ZlcnNpb24pLFxuICB9LFxuICBiYXNlOiBpc1Byb2R1Y3Rpb24gPyBcIi9za2F0dGpha3QvXCIgOiBcIlwiLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sYUFBYTtBQUNwQixTQUFTLGtCQUFrQjtBQUUzQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLGFBQWE7QUFFcEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sVUFBVTtBQUNqQixJQUFNLGVBQWUsUUFBUSxJQUFJLGFBQWE7QUFFOUMsSUFBTSxhQUFzQztBQUFBLEVBQzFDLGNBQWM7QUFBQSxFQUNkLFVBQVU7QUFBQSxJQUNSLFlBQVk7QUFBQSxJQUNaLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFdBQVcsZUFBZSxnQkFBZ0I7QUFBQSxJQUMxQyxrQkFBa0I7QUFBQSxJQUNsQixhQUFhO0FBQUEsSUFDYixLQUFLO0FBQUEsSUFDTCxTQUFTO0FBQUEsSUFDVCw2QkFBNkI7QUFBQSxJQUM3QixPQUFPO0FBQUEsTUFDTDtBQUFBLFFBQ0UsS0FBSztBQUFBLFFBQ0wsU0FBUztBQUFBLFFBQ1QsT0FBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBR0EsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsS0FBSztBQUFBLElBQ0wsUUFBUSxLQUFLLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFBQSxJQUMzQixNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsTUFDTixZQUFZO0FBQUEsTUFDWixRQUFRLEVBQUUsYUFBYSxzQ0FBc0M7QUFBQSxJQUMvRCxDQUFDO0FBQUEsSUFDRCxjQUFjO0FBQUEsSUFDZCxXQUFXLEVBQUUsVUFBVSxXQUFXLENBQUM7QUFBQSxJQUNuQyxRQUFRLFVBQVU7QUFBQSxFQUNwQjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLGFBQWEsS0FBSyxVQUFVLFFBQVEsSUFBSSxtQkFBbUI7QUFBQSxFQUM3RDtBQUFBLEVBQ0EsTUFBTSxlQUFlLGdCQUFnQjtBQUN2QyxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
