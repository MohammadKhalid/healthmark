import React, { Component } from 'react';
import './Sidebar.css';
import SideBar from './sidebar';
import Header from '../../components/Header/Header';
import routes from './routes';
import Login from './Login';
import { Redirect, Route, Switch } from 'react-router-dom';

export default class Main extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        let data = JSON.parse(localStorage.getItem('User'))
        if (data != null) {
            var decode = jwt.decode(data, secret);
            SessionManager.Userdata = decode[0].data;
            SessionManager.RoleAccess = decode[0].data1;
            SessionManager.Menu = decode[0].data2;
        }
        //     if(data==undefined && data==null){
        //         return <Redirect push to="/Login" />
        //    }
        if (data != null) {
            return (
                <div>
                    <Header />
                    <SideBar data={this.props.current_user} data2={this.props.current_user_role} />
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
                                <Redirect from="/" to="/" />
                            </Switch>
                        </div>
                    </main>
                </div>
            );
        }
        else {

            return (
                <div>
                    {/* <Header />
                <SideBar data={this.props.current_user} data2={this.props.current_user_role} /> */}
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
                                <Redirect from="/" to="/" />
                            </Switch>
                        </div>
                    </main>
                </div>
            );
        }
    }
}
