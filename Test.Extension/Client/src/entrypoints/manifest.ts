export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "My Section Entrypoint",
    alias: "MySection.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint.js"),
  },
];
