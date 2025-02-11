import { createRouter, createWebHistory } from 'vue-router'
import JobEntry from '../views/JobEntry.vue'
import Dashboard from '../views/Dashboard.vue'
import Jobs from '../views/Jobs.vue'

const routes = [
  {
    path: '/',
    redirect: '/job-entry'
  },
  {
    path: '/job-entry',
    name: 'JobEntry',
    component: JobEntry
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: Jobs
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
