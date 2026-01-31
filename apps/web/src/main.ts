import { createApp } from "vue";
import { createPinia } from "pinia";

/**
 * SINGLE ENTRY POINT:
 * We import the CSS from the shared library. This file ALREADY contains
 * @import "tailwindcss" and the custom @theme block.
 * DO NOT re-import tailwindcss in a local app-level CSS file.
 */
import "@repo/ui/src/assets/index.css";

import "./style.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
