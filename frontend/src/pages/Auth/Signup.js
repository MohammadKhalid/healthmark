import React, { Component } from 'react';
import './Login.css';


export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            // email: 'maaz@gmail.com',
            // password: '123123',
            email: '',
            password: '',
            conformpassword: '',
            ResponseData: undefined
        }
        this.signUp = this.signUp.bind(this)
        this.onChangeState = this.onChangeState.bind(this)
    }
    onChangeState(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    signUp() {
        
    }

    render() {

        return (
            <div className=" container-fluid loginColumns animated fadeInDown">
                <div className="row">
                    <div className=" d-none d-sm-block col-sm-7 col-md-8 col-lg-8 loginColumnsimg">
                        <img src={'assets/images/newlog.png'} className="img-responsive" alt="Alternate Text" />
                    </div>
                    <div className="col-sm-5 col-md-4 col-lg-4">
                        <div className="login-bar">
                            <div className="m-t" role="form">
                                <div className="form-group">
                                    <img className="img-responsive" src={'assets/images/logo1.png'} alt='Profile-Photo' style={{ width: '200px' }} /></div>
                                {/* <h3>Login to continue</h3> */}
                                <div className="form-group" id="divform">
                                    <div className="form-group">
                                        <input name="email" type="email" value={this.state.email} onChange={this.onChangeState} className="form-control" placeholder="Username" />
                                    </div>
                                    <div className="form-group">
                                        <input name="password" value={this.state.password} onChange={this.onChangeState} type="Password" className="form-control" placeholder="Password" />
                                    </div>

                                    <div className="form-group">
                                        <input name="conformpassword" value={this.state.conformpassword} onChange={this.onChangeState} type="Password" className="form-control" placeholder="Conform Password" />
                                    </div>

                                    <button className="btn btn-success block full-width m-b" onClick={this.signUp}  >Signup</button>

                                    <label className="alert-link" />
                                    <div className="" id="divError" visible="false">
                                    </div>
                                  
                                </div>
                            </div>
                            <div className="m-t">
                                Copyright © 2020 Health Mark
					</div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

