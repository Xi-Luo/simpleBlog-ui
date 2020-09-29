import VueRouter from "vue-router";
import Vue from "vue";
import home from './view/home'
import newBlog from "./view/newBlog";
import view from "@/view/viewBlog";
import login from "@/view/login";
import manage from "@/view/manage";
import account from "@/view/account";
// eslint-disable-next-line no-undef
Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home',
            component: home,
            children:[]
        },
        {
            path: '/view',
            name: 'home',
            component: view
        },
        {
            path: '/new',
            name: 'new',
            component: newBlog,
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/manage',
            name: 'manage',
            component: manage
        },
        {
            path: '/account',
            name: 'account',
            component: account
        }

    ]
})

export default router