import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../../History';
export default class Header extends Component {
    constructor(props) {
        super(props);

    }
    logout() {

        history.replace('/Login', null);

    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-chart ">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-3 "></div>
                        <div className="col-sm-6">
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav m-2 ">
                                    <a className="nav-item nav-link active" > <span className="sr-only">(current)</span></a>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-sm-3">
                        <Link onClick={this.logout.bind(this)} className="float-right text-light" style={{ fontSize: '16px' }} to="/Login   ">
                            <i className="fa fa-sign-out text-white pl-3"></i>
                        </Link>
                    </div>
                </div>
            </nav>
        );
    }
}

