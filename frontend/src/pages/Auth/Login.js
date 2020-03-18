import React, { Component } from 'react';
import './Login.css';
import history from '../../History';
import { userType, emailRegex, stringIsEmpty } from '../../helper/systemConstants';
import Messages from '../../helper/Messages';
import { userLogin } from "./authServices";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            // email: 'maaz@gmail.com',
            // password: '123123',
            email: '',
            password: '',
            errorEmail: false,
            errorPassword: false,
            ResponseData: undefined
        }
        this.Login = this.Login.bind(this)
        this.signUp = this.signUp.bind(this)
        this.onChangeState = this.onChangeState.bind(this)
    }
    onChangeState(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    Login = async () => {
        var isError = false;
        console.log('email', this.state.email)
        console.log('password', this.state.password)
        if (stringIsEmpty(this.state.email)) {
            this.setState({
                errorEmail: true
            })
            isError = true;
        }
        if (stringIsEmpty(this.state.password)) {
            this.setState({
                errorPassword: true
            })
            isError = true;
        }
        if (!isError) {
            let obj = {
                email: this.state.email,
                password: this.state.password
            }
            var response = await userLogin(obj);
            history.push('/')
        }
    }
    signUp = () => {
        history.push('/Signup')
    }

    render() {

        return (
            <div className=" container-fluid loginColumns animated fadeInDown">
                <div className="row">
                    <div className=" d-none d-sm-block col-sm-7 col-md-8 col-lg-8 loginColumnsimg">
                        <img src={'assets/images/newlog.png'} className="img-responsive" alt="Alternate Text" />
                    </div>
                    <div className="col-sm-5 col-md-4 col-lg-4">
                        <div className="login-bar pb-2">
                            <div className="m-t d-sm-block " role="form">
                                <div className="form-group">
                                    <img className="img-responsive" src={'assets/images/logo1.png'} alt='Profile-Photo' style={{ width: '200px' }} /></div>
                                <h3>Login to continue</h3>
                                <div className="form-group" id="divform">

                                    <div className="form-group" >
                                        <input name="email" type="email" value={this.state.email}
                                            onChange={() => {
                                                this.onChangeState()
                                                this.setState({ errorEmail: false })
                                            }
                                            } className="form-control" placeholder="Username" />
                                        {this.state.errorEmail &&
                                            <div style={{ color: "red", position: 'relative', height: 10, top: -30, float: 'right', width: 20 }}>
                                                <p style={{ textAlign: 'center' }}>*</p>
                                            </div>
                                        }
                                    </div>


                                    {/* {this.state.errorEmail &&
                                        <div className="alert-danger" id="divError" visible="true">
                                            <p className="text-danger pl-1">{Messages.EmptyEmail}</p>
                                        </div>
                                    } */}
                                    <div className="form-group">
                                        <input name="password" value={this.state.password}
                                            onChange={() => {
                                                this.onChangeState()
                                                this.setState({ errorPassword: false })
                                            }
                                            } type="Password" className="form-control" placeholder="Password" />
                                        {this.state.errorPassword &&
                                            <div style={{ color: "red", position: 'relative', top: -30, height: 10, float: 'right', width: 20 }}>
                                                <p style={{ textAlign: 'center' }}>*</p>
                                            </div>
                                        }
                                    </div>
                                    {/* {this.state.errorPassword &&
                                        <div className="alert-danger" id="divError" visible="true">
                                            <p className="text-danger pl-1">{Messages.EmptyPassword}</p>
                                        </div>
                                    } */}
                                    <button className="btn btn-outline-success block full-width m-b" onClick={this.Login}>Login</button>

                                    <button className="btn btn-outline-danger block full-width m-b float-right" onClick={this.signUp}  >Signup</button>
                                    <label className="alert-link" />
                                    <div className="" id="divError" visible="false">
                                    </div>
                                    <a>
                                        <small>Forgot password?</small>
                                    </a>
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

export default Login;