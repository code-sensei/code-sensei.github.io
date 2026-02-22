import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    host: "localhost",
    port: 2500,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    // Pre-bundle these heavy dependencies upfront
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-slot",
      "@radix-ui/react-tabs",
      "@radix-ui/react-scroll-area",
      "@tanstack/react-query",
      "lucide-react",
      "date-fns",
      "clsx",
      "class-variance-authority",
      "tailwind-merge",
      "react-markdown",
      "remark-gfm",
      "rehype-highlight",
      "rehype-raw",
    ],
  },
  build: {
    // Increase chunk size warning limit (optional)
    chunkSizeWarningLimit: 1000,
  },
});
