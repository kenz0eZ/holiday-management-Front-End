import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MyCalendar from "../views/mycalendar.vue";
import Users from "@/views/Users.vue";
import Dashboard from "@/views/Dashboard.vue";
import Verify from "@/views/Verify.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Home',
        component: Home
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
    },
    {
        path: '/mycalendar',
        name: 'mycalendar',
        component: MyCalendar
    },
    {
        path: '/users',
        name: 'users',
        component: Users
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    // {
    //   path: '/appbar',
    //   name: 'AppBar',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/AppBar.vue')
    // }
    {
        path: '/verify-email/:id/:hash',
        name: 'Verify',
        component: Verify
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router