import { createApp } from "vue";
import { createPinia } from "pinia";
import { BlackBoxUI } from "@repo/ui";

import "./style.css";
import "primeicons/primeicons.css";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(BlackBoxUI);

app.mount("#app");
