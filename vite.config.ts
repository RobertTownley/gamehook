import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts()],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "gamehook",
      fileName: "gamehook",
    },
    rollupOptions: {
      external: ["three", "react", "react-dom"],
      output: {
        globals: {
          three: "three",
          react: "react",
          "react-dom": "react-dom",
        },
      },
    },
  },
  resolve: {
    alias: {
      gamehook: path.resolve(__dirname, "./src"),
    },
  },
  base: "/gamehook/",
});
