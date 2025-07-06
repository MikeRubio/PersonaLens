import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { copyFileSync } from "fs";
import { loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      {
        name: "copy-manifest",
        writeBundle() {
          copyFileSync("manifest.json", "dist/manifest.json");
          // Copy icon files to dist
          try {
            const fs = require("fs");
            const path = require("path");

            // Create icons directory in dist
            const iconsDir = path.join("dist", "icons");
            if (!fs.existsSync(iconsDir)) {
              fs.mkdirSync(iconsDir, { recursive: true });
            }

            // Copy icon files
            const iconSizes = ["16", "32", "48", "128"];
            iconSizes.forEach((size) => {
              const srcPath = path.join("public", "icons", `icon-${size}.png`);
              const destPath = path.join("dist", "icons", `icon-${size}.png`);
              if (fs.existsSync(srcPath)) {
                fs.copyFileSync(srcPath, destPath);
              }
            });
          } catch (error) {
            console.warn("Could not copy icon files:", error.message);
          }
        },
      },
    ],
    define: {
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(
        env.VITE_SUPABASE_URL
      ),
      "import.meta.env.VITE_SUPABASE_ANON_KEY": JSON.stringify(
        env.VITE_SUPABASE_ANON_KEY
      ),
    },
    build: {
      copyPublicDir: false,
      rollupOptions: {
        input: {
          popup: resolve(__dirname, "popup.html"),
          content: resolve(__dirname, "src/content/content.ts"),
          background: resolve(__dirname, "src/background/background.ts"),
        },
        output: {
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name === "popup") return "popup.js";
            if (chunkInfo.name === "content") return "content.js";
            if (chunkInfo.name === "background") return "background.js";
            return "[name].js";
          },
          chunkFileNames: "chunks/[name].js",
          assetFileNames: "assets/[name].[ext]",
        },
      },
      outDir: "dist",
    },
    optimizeDeps: {
      exclude: ["lucide-react"],
    },
  };
});
