import { createRouter, createWebHistory } from 'vue-router'
import ListUser from '../views/UserList.vue'

const routes = [
  {
    path: '/',
    name: 'list',
    component: ListUser
  },
  {
    path: '/add-user',
    name: 'add',
    component: () => import('../views/AddUser.vue')
  },
  {
    // définir que la route update attend un paramètre id
    path: '/update-user/:id',
    name: 'update',
    component: () => import('../views/UpdateUser.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
