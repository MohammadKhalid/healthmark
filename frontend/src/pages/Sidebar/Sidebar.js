import React, { Component } from 'react';

import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
// import { SessionManager } from './Helper/SessionsManager';
export default class SidebarMenu extends Component {
    constructor(props) {
        super(props);


    }
    render() {
        return (
            <Menu >
                <div className="sidebar-userpic">
                    <img src={'assets/images/maaz.jpg'} className="rounded-circle imgg" alt="Alternate Text" />
                    <p>Maaz Mehtab</p>
                </div>
                <div className="sidebar">
                    <ul className="mt-5">
                        <a className="menu-item" href="/Home"> <li><span className="fa fa-home  pr-2"></span>  Home  </li></a>
                        <a className="menu-item" href="/"> <li><span className="fa fa-home  pr-2"></span>  laravel  </li></a>
                        <a className="menu-item" href="/"><li><span className="fa fa-home  pr-2"></span>  Angular  </li></a>
                    </ul>
                    <div className="dropdown">
                        <a className="dropdown-toggle btn-dropdown" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Setup Pages
                        </a>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <ul className="mt-5 ul-sub-menu-item">
                                <a className="sub-menu-item" href="/Users"> <li><span className="fa fa-home  pr-2"></span> Setup_User  </li></a>
                                <a className="sub-menu-item" href="/Inventory"> <li><span className="fa fa-home  pr-2"></span>  Setup_Inventory  </li></a>
                                <a className="sub-menu-item" href="/Customer"><li><span className="fa fa-home  pr-2"></span>   Setup_Customer </li></a>
                            </ul>
                        </div>
                    </div>
                </div>
            </Menu>
        )
    }
}

