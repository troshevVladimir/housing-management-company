const MainPage = () => import('@/views/MainPage.vue')
const AboutPage = () => import('@/views/AboutPage.vue')
const HousesPage = () => import('@/views/HousesPage.vue')
const UsersPage = () => import('@/views/UsersPage.vue')
const RolesTable = () => import('@/components/RolesTable.vue')
const UsersTable = () => import('@/components/UsersTable.vue')
const Registration = () => import('@/views/Registration.vue')
const Login = () => import('@/views/Login.vue')
const TodoListPage = () => import('@/views/TodoListPage.vue')

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
