import Vue from 'vue'
import Router from 'vue-router'

import Login from "../components/home/Login";
import UserHomepage from "../components/home/UserHomepage";
import SuperContestHome from "../components/supercontest/SuperContestHome";
import Homepage from "../components/home/Homepage";
import PickSixHome from "../components/pickem/PickSixHome";
import AdminPage from "../components/home/AdminPage";
import GolfPicksHome from "@/components/golfpicks/GolfPicksHome";
import Details from "@/components/golfpicks/Details";

Vue.use(Router);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Homepage,
        alias: '/resume',
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/admin',
        name: 'AdminHome',
        component: AdminPage,
    },
    {
        path: '/userhome',
        name: 'UserHome',
        component: UserHomepage,
    },
    {
        path: '/supercontest',
        name: 'SuperContestHome',
        component: SuperContestHome,
    },
    {
        path: '/picksix',
        name: 'PickSixHome',
        component: PickSixHome,
    },
    {
        path: '/golf',
        name: 'GolfPicksHome',
        component: GolfPicksHome,
    },
    {
        path: '/golf/details/:name',
        name: 'GolfDetails',
        component: Details,
    },
];

const router = new Router({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    if (to === from) {
        next(false)
    } else next()
});


export { router, routes }