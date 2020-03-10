import React from 'react';

import Loadable from 'react-loadable'
function Loading() {
    return <div>Loading...</div>;
}

const Dashboard = Loadable({
    loader: () => import('../Dashboard/Dashboard'),
    loading: Loading,
});
const Main = Loadable({
    loader: () => import('../Main/Main'),
    loading: Loading,
});
const Login = Loadable({
    loader: () => import('../Auth/Login'),
    loading: Loading,
});
const Signup = Loadable({
    loader: () => import('../Auth/Signup'),
    loading: Loading,
});
const Users = Loadable({
    loader: () => import('../Users/Users'),
    loading: Loading,
});
const Inventory = Loadable({
    loader: () => import('../Inventory/Inventory'),
    loading: Loading,
});
const Customer = Loadable({
    loader: () => import('../Customer/Customer'),
    loading: Loading,
});

const routes = [
    { path: '/Main', exact: true, name: 'Main', component: Main },
    // { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/Login', exact: true, name: 'Login', component: Login },
    { path: '/Signup', exact: true, name: 'Login', component: Signup },
    { path: '/Users', exact: true, name: 'Users', component: Users },
    { path: '/Inventory', exact: true, name: 'Inventory', component: Inventory },
    { path: '/Customer', exact: true, name: 'Customer', component: Customer },
   
   
];

export default routes;