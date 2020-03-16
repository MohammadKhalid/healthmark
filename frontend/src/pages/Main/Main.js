import React, { Component } from 'react';
import SideBar from '../Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import routes from '../Routes/Routes';

import { Redirect, Route, Switch } from 'react-router-dom';

export default class Main extends Component {
    constructor(props) {
        super(props)

    }
    render() {

        let currentRoute = window.location.pathname;
        return (
            <div>
                {currentRoute != "/Login" && currentRoute != "/Signup" &&

                    <div>
                        <Header />
                        <SideBar />
                    </div>

                }
                <main className="main">
                    <div>
                        <Switch>
                            {routes.map((route, idx) => {
                                return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                                    <route.component {...props} />
                                )} />)
                                    : (null);
                            },
                            )}
                            <Redirect from="/" to={currentRoute} />
                        </Switch>
                    </div>
                </main>
            </div>
        );

    }
}
