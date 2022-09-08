import MainPage from "@/views/MainPage.vue";
import AboutPage from "@/views/AboutPage.vue";
import HousesPage from "@/views/HousesPage.vue";
import Login from "@/views/Login.vue";
import Registration from "@/views/Registration.vue";

const routes = [
  { path: "/", name: 'main', component: MainPage },
  { path: "/about", name:'about', component: AboutPage },
  { path: "/houses", name: 'houses', component: HousesPage },

  {
    path: "/auth",
    children: [{
      path: 'login/',
      name: 'login',
      component: Login
    },
    {
      path: 'registration',
      name: 'registration',
      components: {
        default: Registration,
        // helper: AuthWithGoogle
      }
    }]
  }
];

export default routes;
