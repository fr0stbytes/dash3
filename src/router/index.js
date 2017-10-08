import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Login from '@/components/login'
import Dashboard from '@/components/dashboard'
import Empty from '@/components/empty'
import Register from '@/components/register'
import Locations from '@/components/locations'
import Users from '@/components/users'
import Messages from '@/components/messages'
import Contact from '@/components/contact'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Empty,
      children: [
        {
          path: '/',
          component: Dashboard,
          children: [
            {
              path: '/',
              component: Locations
            },
            {
              path: '/users',
              component: Users
            },
            {
              path: '/messages',
              component: Messages
            },
            {
              path: '/contact',
              component: Contact
            }
          ]
        },
        {
          path: 'login',
          component: Login
        },
        {
          path: 'register',
          component: Register
        }
      ]
    }
  ]
})
