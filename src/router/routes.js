import MainPage from "@/views/MainPage.vue";
import AboutPage from "@/views/AboutPage.vue";
import HousesPage from "@/views/HousesPage.vue";
import UsersPage from "@/views/UsersPage.vue";
import RolesTable from "@/components/RolesTable";
import UsersTable from "@/components/UsersTable";
import Login from "@/views/Login.vue";
import Registration from "@/views/Registration.vue";
import TodoListPage from '@/views/TodoListPage.vue';

const routes = [
  { path: "/", name: 'main', component: MainPage},
  { path: "/about", name:'about', component: AboutPage, meta: { title: 'О нас' }},
  { path: "/houses", name: 'houses', component: HousesPage, meta: { title: 'Все дома' } },
  {
    path: "/users",
    component: UsersPage,
    children: [
      {
        path: '',
        name: 'users',
        components: {
          table: UsersTable
        },
        meta: { title: 'Все Пользователи' }
      },
      {
        path: 'roles',
        name: 'roles',
        components: {
          table: RolesTable
        },
        meta: { title: 'Роли пользователей' }
      }
    ]
  },
  {
    path: '/todo',
    name: 'todo-list',
    component: TodoListPage,
  },
  {
    path: '/edit-todo/:id',
    name: 'todo-edit',
    component: () => import('@/views/EditPage.vue'),
  },

  {
    path: "/auth",
    children: [{
      path: 'login/',
      name: 'login',
      component: Login,
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
