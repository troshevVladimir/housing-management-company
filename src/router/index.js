import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes.js";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {

})

export default router;
