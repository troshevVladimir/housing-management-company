import MainPage from "@/views/MainPage.vue";
import AboutPage from "@/views/AboutPage.vue";
import HousesPage from "@/views/HousesPage.vue";
import UsersPage from "@/views/UsersPage.vue";
import RolesTable from "@/components/RolesTable";
import UsersTable from "@/components/UsersTable";
import Login from "@/views/Login.vue";
import Registration from "@/views/Registration.vue";

const routes = [
  { path: "/", name: 'main', component: MainPage },
  { path: "/about", name:'about', component: AboutPage },
  { path: "/houses", name: 'houses', component: HousesPage },
  {
    path: "/users",
    component: UsersPage,
    children: [
      {
        path: '',
        name: 'users',
        components: {
          table: UsersTable
        }
      },
      {
        path: 'roles',
        name: 'roles',
        components: {
          table: RolesTable
        }
      }
    ]
  },

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
