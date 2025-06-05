import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: {
        // You can register multiple manifests in the same bundle
        "my-section": "src/bundle.manifests.ts",
      },
      formats: ["es"],
    },
    // Output directory
    outDir: "../wwwroot/App_Plugins/TestExtension",
    emptyOutDir: true,
    sourcemap: true,
    copyPublicDir: true,
    rollupOptions: {
      external: [/^@umbraco/],
    },
  },
});
