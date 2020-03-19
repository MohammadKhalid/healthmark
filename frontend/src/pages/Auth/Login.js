import React, { Component } from 'react';
import './Login.css';
import history from '../../History';
import { userType, emailRegex, stringIsEmpty } from '../../helper/systemConstants';
import Messages from '../../helper/Messages';
import { userLogin } from "./authServices";
import * as Utilities from '../../helper/Utilities';
import Storage from '../../helper/Storage';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            email: '',
            password: '',
            errorEmail: false,
            errorPassword: false,
            emailErrorMessaga: '',
            passwordErrorMessage: '',
            ResponseData: undefined
        }
        this.Login = this.Login.bind(this)
        this.signUp = this.signUp.bind(this)
        this.onChangeState = this.onChangeState.bind(this)
    }

    EmptyFields(e) {
        if (e.target.name == "email" && e.target.value != "") {
            this.setState({
                errorEmail: false
            })
        }
        if (e.target.name == "password" && e.target.value != "") {
            this.setState({
                errorPassword: false
            })
        }
    }
    onChangeState(e) {
        this.EmptyFields(e);
        this.setState({
            [e.target.name]: e.target.value,
            invalidCrediential: ''
        })
    }


    Login = async () => {
        try {
            var isError = false;

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
            if (!stringIsEmpty(this.state.email) && !emailRegex.test(this.state.email)) {
                this.setState({
                    errorEmail: true,
                    emailErrorMessaga: 'E-mail is not valid.'
                })
                isError = true;
            }
            if (!stringIsEmpty(this.state.password) && this.state.password.length < 8) {
                this.setState({
                    errorPassword: true,
                    passwordErrorMessage: 'Password must be greater than 8 characters.'
                })
                isError = true;
            }
            if (!isError) {
                let obj = {
                    email: this.state.email,
                    password: this.state.password
                }
                var response = await userLogin(obj);
                if (response.data.code == 422) {
                    this.setState({
                        invalidCrediential: response.data.data.message
                    })
                }
                else if (response.data.data.isVerified == false) {
                    this.setState({
                        invalidCrediential: "Email is not varified."
                    })
                }
                else {
                    let userObject = {
                        email: response.data.data.email,
                        userName: response.data.data.name,
                        phone: response.data.data.phone,
                        userId: response.data.data.uid
                    }
                    Storage.userObject = userObject

                    Utilities.localStorage_SaveKey("userObject", JSON.stringify(Storage.userObject))
                    history.push('/')
                }
            }
        }
        catch (e) {
            console.log("Login Exception", e)
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
                                            onChange={this.onChangeState}

                                            className="form-control" placeholder="Username" />
                                        {this.state.errorEmail &&
                                            <div style={{ color: "red", position: 'relative', height: 10, top: -30, float: 'right', width: 20 }}>
                                                <p style={{ textAlign: 'center' }}>*</p>
                                            </div>
                                        }
                                    </div>


                                    {this.state.errorEmail &&
                                        <div className="" id="divError" visible="true">
                                            <p className="text-danger pl-1">{this.state.emailErrorMessaga}</p>
                                        </div>
                                    }
                                    <div className="form-group">
                                        <input name="password" value={this.state.password}
                                            onChange={this.onChangeState}

                                            type="Password" className="form-control" placeholder="Password" />
                                        {this.state.errorPassword &&
                                            <div style={{ color: "red", position: 'relative', top: -30, height: 10, float: 'right', width: 20 }}>
                                                <p style={{ textAlign: 'center' }}>*</p>
                                            </div>
                                        }
                                    </div>
                                    {this.state.errorPassword &&
                                        <div className="" id="divError" visible="true">
                                            <p className="text-danger pl-1">{this.state.passwordErrorMessage}</p>
                                        </div>
                                    }
                                    {this.state.invalidCrediential != "" &&
                                        <div className="" id="divError" visible="true">
                                            <p className="text-danger pl-1">{this.state.invalidCrediential}</p>
                                        </div>
                                    }
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