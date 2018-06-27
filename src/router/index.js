import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Todo from '@/components/todo'
import layout from '@/components/layout'
import test from '@/components/test'
import login from '@/components/login'
import Register from '@/components/register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/todo',
      component: layout
    },
    {
    	path: '/test',
    	component: test
    }
  ]
})
