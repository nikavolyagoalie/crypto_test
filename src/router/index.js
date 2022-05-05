import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Converter',
    component: () => import("../components/Converter")
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: () => import("../components/Portfolio")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
