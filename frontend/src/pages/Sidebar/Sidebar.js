import React, { Component } from 'react';

import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import * as Utilities from '../../helper/Utilities';
export default class SidebarMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userObject: '',
        }
        this.userExist();
    }
    userExist = async () => {
        var response = await Utilities.usersExist('/');
        this.setState({
            userObject: response
        })
    }
    render() {
        return (
            <Menu >
                <div className="sidebar-userpic">
                    <img src={'assets/images/maaz.jpg'} className="rounded-circle imgg" alt="Alternate Text" />
                    {this.state.userObject != "" &&
                        <p>{this.state.userObject.userName}</p>
                    }
                </div>
                <div className="sidebar">
                    <ul className="mt-5">
                        <a className="menu-item" href="/Home"> <li><span className="fa fa-home  pr-2"></span>  Home  </li></a>
                        <a className="menu-item" href="/"> <li><span className="fa fa-home  pr-2"></span>  laravel  </li></a>
                        <a className="menu-item" href="/"><li><span className="fa fa-home  pr-2"></span>  Angular  </li></a>
                    </ul>
                    {this.state.userObject != '' &&
                        <div>
                            {this.state.userObject.userType.id == 1 &&
                                <div className="dropdown">
                                    <a className="dropdown-toggle btn-dropdown" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Setup Pages
                                     </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <ul className="mt-5 ul-sub-menu-item">
                                            <a className="sub-menu-item" href="/Users"> <li><span className="fa fa-home  pr-2"></span>Add User</li></a>
                                            <a className="sub-menu-item" href="/Inventory"> <li><span className="fa fa-home  pr-2"></span>Add Inventory</li></a>
                                            <a className="sub-menu-item" href="/Customer"><li><span className="fa fa-home  pr-2"></span>Add Customer</li></a>
                                            <a className="sub-menu-item" href="/Order"> <li><span className="fa fa-home  pr-2"></span>Order</li></a>
                                        </ul>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
            </Menu>
        )
    }
}

