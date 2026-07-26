import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "StudyBuddy",
  version: "1.0.0",

  action: {},
  
  side_panel: {
    default_path: "src/extension/sidepanel.html",
    },

  permissions: [
    "storage",
    "activeTab",
    "scripting",
    "sidePanel"
  ],

  host_permissions: [
    "<all_urls>"
  ],

  background: {
    service_worker: "src/extension/background.js",
    type: "module"
  },

  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/extension/content.js"]
    }
  ]
});