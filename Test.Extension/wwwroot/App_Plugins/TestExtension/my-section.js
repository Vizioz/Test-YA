const t = [
  {
    name: "My Section Entrypoint",
    alias: "MySection.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint-BSlTz4-p.js")
  }
], e = [
  {
    name: "Test Section",
    alias: "TestSection.Section",
    type: "section",
    meta: {
      label: "Test Section",
      pathname: "test-section"
    }
  },
  {
    name: "Test Section Dashboard",
    alias: "TestSection.Dashboard",
    type: "dashboard",
    meta: {
      label: "Test Dashboard",
      pathname: "test-dashboard"
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "TestSection.Section"
      }
    ],
    element: () => import("./test-dashboard.element-CJq87HnO.js")
  }
], a = [
  ...t,
  ...e
];
export {
  a as manifests
};
//# sourceMappingURL=my-section.js.map
