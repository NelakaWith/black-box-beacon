import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import DemoView from "../views/DemoView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [
        {
          path: "",
          name: "home",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/HomeView.vue"),
        },
        {
          path: "demo",
          name: "demo",
          component: DemoView,
        },
      ],
    },
  ],
});

export default router;
