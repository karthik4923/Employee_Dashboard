import { createRouter, createWebHistory } from 'vue-router'
import Employee from './Project/Employee.vue'
import Detail from './Project/Details.vue'
import Project from './Project/Projects.vue'
import Task from './Project/Tasks.vue'
import Assign from './Project/Assigniment.vue'
import Attend from './Project/Attendance.vue'
import Page from './Project/page.vue'
import Login from './Project/login.vue'

const routes = [
  { path: '/', name: 'login', component: Login },
  {
    path: '/page',
    name: 'page',
    component: Page,
    children: [
      {path: '', redirect: '/page/detail' },
      { path: 'detail', name: 'details', component: Detail },
      { path: 'emp', name: 'Employee', component: Employee },
      { path: 'attend', name: 'attend', component: Attend },
      { path: 'project', name: 'project', component: Project },
      { path: 'task', name: 'tasks', component: Task },
      { path: 'assign', name: 'assign', component: Assign },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
           routes
})

export default router
