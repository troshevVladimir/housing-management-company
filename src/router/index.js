import { createRouter as _createRouter} from "vue-router";
import routes from "./routes.js";

export default function (history) {
  return _createRouter({
    history,
    routes,
  });
}

// router.beforeEach((to, from) => {

// })
