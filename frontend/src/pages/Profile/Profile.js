import React, { Component } from 'react';
import history from '../../History';
import Messages from '../../helper/Messages';
import * as Utilities from '../../helper/Utilities';
import Storage from '../../helper/Storage';
export default class Profile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="bg-white">
                <div className="container">
                    <h1>Edit Profile</h1>
                    <hr />
                    <div className="row">

                        <div className="col-md-3">
                            <div className="text-center">
                                <img src={'assets/images/maaz.jpg'} className="avatar img-circle" alt="avatar" />
                                <h6>Upload a different photo...</h6>

                                <input type="file" className="form-control" />
                            </div>
                        </div>


                        <div className="col-md-9 personal-info">
                            <div className="alert alert-info alert-dismissable">
                                <a className="panel-close close" data-dismiss="alert">×</a>
                                <i className="fa fa-coffee"></i>
                  This is an <strong>.alert</strong>. Use this to show important messages to the user.
                </div>
                            <h3>Personal info</h3>

                            <form className="form-horizontal" role="form">
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">User Name:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="text" value="Maaz" />
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Email:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" type="text" value="maaz@gmail.com" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-md-3 control-label">Phone:</label>
                                    <div className="col-md-8">
                                        <input className="form-control" type="text" value="123456789" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-3 control-label">Password:</label>
                                    <div className="col-md-8">
                                        <input className="form-control" type="password" value="123123123" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-3 control-label">Confirm password:</label>
                                    <div className="col-md-8">
                                        <input className="form-control" type="password" value="123123123" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-3 control-label"></label>
                                    <div className="col-md-8">
                                        <input type="button" className="btn btn-primary" value="Save Changes" />
                                        <span></span>
                                        <input type="reset" className="btn btn-default" value="Cancel" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        )
    }
}