import React, { Component } from 'react';
import { Route, Router,Switch } from 'react-router-dom';
// import Main from './modules/Main';
import Login from './pages/Auth/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Users from './pages/Users/Users';
import history from './History';
class Routers extends Component {
    render() {
        return (
            <Router history={history}>
            
            <Switch>
            
                    <Route exact path="/" component={Login} />
                    <Route exact path="/Dashboard" component={Dashboard} />
                    <Route exact path="/Users" component={Users} />
                    {/* <Route  path="/Main" component={Main} /> */}
                  
                  </Switch>
            </Router>
        )
    }
}

export default Routers;