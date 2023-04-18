import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
const NotFount = () => import(/* webpackChunkName: "NotFound" */ '../views/PageNotFound')
const FormView = () => import(/* webpackChunkName: "FormView" */ '../views/FormView')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'Cadastro Rápido',
    },
  },
  {
    path: '/new-register',
    name: 'new-edit-register',
    component: FormView,
    meta: {
      title: 'Cadastro Rápido - Novo cadastro',
    },
  },
  {
    path: '*',
    name: 'about',
    component: NotFount,
    meta: {
      title: 'Cadastro Rápido - Página não encontrada',
    },
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  return next();
});

export default router
