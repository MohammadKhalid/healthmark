import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';
import Main from './pages/Main/Main';
import history from './History';

class Routers extends Component {
    render() {
        return (
            <Router history={history}>

                <Switch>
                    <Route path="/" component={Main} />
                    
                </Switch>
            </Router>
        )
    }
}

export default Routers;