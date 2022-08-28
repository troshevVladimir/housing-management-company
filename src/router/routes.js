import MainPage from "@/views/MainPage.vue";
import AboutPage from "@/views/AboutPage.vue";
import HousesPage from "@/views/HousesPage.vue";

const routes = [
  { path: "/", name:'main', component: MainPage },
  { path: "/about", name:'about', component: AboutPage },
  { path: "/houses", name:'houses', component: HousesPage },
];

export default routes;
