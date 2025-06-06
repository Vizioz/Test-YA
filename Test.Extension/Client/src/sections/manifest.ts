export const manifests: Array<UmbExtensionManifest> = [
	{
		name: "Test Section",
		alias: "TestSection.Section",
		type: "section",
		meta: {
			label: "Test Section",
			pathname: "test-section",
		},
	},
	{
		name: "Test Section Dashboard",
		alias: "TestSection.Dashboard",
		type: "dashboard",
		meta: {
			label: "Test Dashboard",
			pathname: "test-dashboard",
		},
		conditions: [
			{
				alias: "Umb.Condition.SectionAlias",
				match: "TestSection.Section",
			},
		],
		element: () => import("./dashboard/test-dashboard.element.js"),
	},
];
