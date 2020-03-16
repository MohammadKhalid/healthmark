import React, { Component } from 'react';
import './Login.css';
import { userType, emailRegex } from '../../helper/systemConstants';
import { userSignUp } from "./authServices";


export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            // email: 'maaz@gmail.com',
            // password: '123123',
            name: '',
            email: '',
            password: '',
            conformpassword: '',
            phone: '',
            userTypeSelect: '',
            ResponseData: undefined,
            isinFormValid: true,
            formError: {
                name: '',
                email: '',
                phone: '',
                password: '',
                userTypeSelect: '',
                emptyFields: ''
            }
        }
        this.signUp = this.signUp.bind(this)
    }
    onChangeState(e) {
        let name = e.target.name
        let value = e.target.value
        let { formError, password, isinFormValid } = this.state

        switch (name) {
            case 'email': {
                isinFormValid = emailRegex.test(value) ? false : true
                formError.email = emailRegex.test(value) ?
                    ''
                    :
                    'E-mail is not valid.'
                break;
            }
            case 'password': {
                isinFormValid = value.length < 8 ? true : false
                formError.password = value.length < 8 ?
                    'Password must be greater than 8 characters.'
                    :
                    ''
                break;
            }
            case 'conformpassword': {
                isinFormValid = value !== password ? true : false

                formError.password = value !== password ?
                    'Password doesnot match.'
                    :
                    ''
                break;
            }
            case 'phone': {
                isinFormValid = value === "" ? true : false
                break;
            }
            case 'name': {
                isinFormValid = value === "" ? true : false
                break;
            }
            case 'userTypeSelect': {
                isinFormValid = value === "" ? true : false
                break;
            }
        }
        this.setState({
            formError,
            [name]: e.target.value,
            isinFormValid
        })
    }
    signUp() {
        let { formError, email, phone, conformpassword, password, name, userTypeSelect } = this.state

        if (email === "" || phone === "" || password === "" || name === "" || userTypeSelect === "") {
            formError.emptyFields = "All fileds are required."
            this.setState({
                formError,
                isinFormValid: true
            })

        } else {

            formError.emptyFields = ""
            formError.name = ""
            formError.email = ""
            formError.password = ""
            formError.userTypeSelect = ""
            let userTypeObj = userType.find(x => x.id == userTypeSelect)
            let obj = {
                email,
                phone,
                password,
                name,
                conformpassword,
                userType: userTypeObj
            }

            // userSignUp(obj)
            //     .then(res => {
            //         let { data, code } = res.data
            //         console.log(res.data)
            //         if (code === 200) {

            //         }
            //     }).catch(err => {
            //         let { data, code } = err

            //         console.log(err)
            //         if (code === 422) {

            //         }
            //     })
        }
    }

    renderUserTypeOption() {

        let options = userType.filter(x => x.id !== 2 && x.id !== 3).map(x => {
            return (
                <option key={x.id} value={x.id}>{x.name}</option>
            )
        })
        return options
    }

    render() {
        let { formError, isinFormValid } = this.state
console.log(isinFormValid)
        return (
            <div className=" container-fluid loginColumns animated fadeInDown">
                <div className="row">
                    <div className=" d-none d-sm-block col-sm-7 col-md-8 col-lg-8 loginColumnsimg">
                        <img src={'assets/images/newlog.png'} className="img-responsive" alt="Alternate Text" />
                    </div>
                    <div className="col-sm-5 col-md-4 col-lg-4">
                        <div className="signup-bar">
                            <div className="m-t" role="form">
                                <div className="form-group">
                                    <img className="img-responsive" src={'assets/images/logo1.png'} alt='Profile-Photo' style={{ width: '200px' }} /></div>
                                {/* <h3>Login to continue</h3> */}
                                <div className="form-group" id="divform">

                                    <div className="form-group">
                                        <input name="name" value={this.state.name} onChange={this.onChangeState.bind(this)} type="text" className="form-control" placeholder="Name" />
                                    </div>
                                    <div className="form-group">
                                        <input name="email" type="email" value={this.state.email} onChange={this.onChangeState.bind(this)} className="form-control" placeholder="Email" />
                                    </div>
                                    <div className="form-group">
                                        <input name="password" value={this.state.password} onChange={this.onChangeState.bind(this)} type="Password" className="form-control" placeholder="Password" />
                                    </div>

                                    <div className="form-group">
                                        <input name="conformpassword" value={this.state.conformpassword} onChange={this.onChangeState.bind(this)} type="Password" className="form-control" placeholder="Conform Password" />
                                    </div>

                                    <div className="form-group">
                                        <input name="phone" type="text" value={this.state.phone} onChange={this.onChangeState.bind(this)} className="form-control" placeholder="Phone" />
                                    </div>

                                    <div className="form-group">
                                        {/* <label for=" ">User Type</label> */}
                                        <select name="userTypeSelect" className="form-control txt_SearchUserName" onChange={this.onChangeState.bind(this)}>
                                            <option disabled selected value={0}>Signup as..</option>
                                            {
                                                this.renderUserTypeOption()
                                            }
                                        </select>
                                    </div>

                                    {
                                        formError.emptyFields != "" ?

                                            <div className="alert alert-danger" role="alert">
                                                This is a danger alert—check it out!
                                            </div>
                                            :
                                            null
                                    }

                                    <button disabled={isinFormValid} className="btn btn-success block full-width m-b" onClick={this.signUp}  >Signup</button>

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

