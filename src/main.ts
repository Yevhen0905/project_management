import { createApp } from "vue";
import { createPinia } from "pinia";

import "ag-grid-community/styles/ag-theme-quartz.css";
import "./assets/style/main.scss";

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
