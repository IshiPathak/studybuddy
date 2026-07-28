import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "StudyBuddy",
  version: "1.0.0",
  icons: {
    "16": "src/assets/icon16.png",
    "32": "src/assets/icon32.png",
    "48": "src/assets/icon48.png",
    "128": "src/assets/icon128.png",
  },

  action: {
    default_icon: {
      "16": "src/assets/icon16.png",
      "32": "src/assets/icon32.png",
      "48": "src/assets/icon48.png",
      "128": "src/assets/icon128.png",
    },
  },
  
  side_panel: {
    default_path: "src/extension/sidepanel.html",
    },

  permissions: [
    "storage",
    "activeTab",
    "tabs",
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