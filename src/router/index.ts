import { createRouter, createWebHashHistory } from "vue-router";
import ProjectList from "../views/ProjectList.vue";
import ProjectDetail from "../views/ProjectDetail.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "project_list",
      component: ProjectList,
    },
    {
      path: "/project/:id",
      name: "project_detail",
      component: () => import("../views/ProjectDetail.vue"),
    },
  ],
});

export default router;
