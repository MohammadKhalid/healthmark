import React, { Component } from 'react';
import history from '../../History';
import * as Utilities from '../../helper/Utilities';
import * as profileService from './profileService';
export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            country: '',
            phone: '',
            uid: '',
            userType: '',
            profileImageUrl: '',
            profileImage: '',
            profileUpdated: false,
            isImageSelected: false

        }

        this.getUserDetails = this.getUserDetails.bind(this)
        this.updateProfile = this.updateProfile.bind(this)
        this.onChangeFile = this.onChangeFile.bind(this)
        this.onChangeValue = this.onChangeValue.bind(this)
        this.cancelImage = this.cancelImage.bind(this)

    }

    componentDidMount() {
        this.getUserDetails()
    }

    async getUserDetails() {
        let userObj = await Utilities.localStorage_GetKey('userObject')
            .catch(err => {
                console.log(err)
            })
        userObj = JSON.parse(userObj)

        this.setState({
            name: userObj.name,
            email: userObj.email,
            phone: userObj.phone,
            country: userObj.country,
            uid: userObj.uid,
            userType: userObj.userType,
        })
    }

    onChangeValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateProfile = () => {
        let { name, phone, country, uid, userType, email, profileUpdated } = this.state


        let payload = {
            name,
            phone,
            email,
            userType,
            country,
            uid
        }
        profileService.updateProfile(payload)
            .then((respone) => {
                let { data, code } = respone.data
                if (code == 200) {
                    this.setState({
                        profileUpdated: true
                    })
                    Utilities.localStorage_SaveKey('userObject', JSON.stringify(payload))
                    setTimeout(() => {
                        this.setState({
                            profileUpdated: false
                        })
                    }, 5000);
                }
            }).catch(err => {
                console.log(err)
            })
    }

    onChangeFile(e) {
        if (e.target.files.length > 0) {
            this.setState({
                [e.target.name]: e.target.files[0],
                isImageSelected: true
            })
        }
    }

    cancelImage() {
        this.setState({
            isImageSelected: false,
            profileImage: ''
        })
    }

    uploadImage() {
        let { profileImage, uid } = this.state
        let payload = new FormData

        payload.append('profileImage', profileImage)
        payload.append('uid', uid)

        profileService.updateProfileImage(payload)
            .then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
    }

    render() {
        let { name, country, phone, email, profileUpdated, profileImageUrl, isImageSelected } = this.state
        return (
            <div className="bg-white">
                <div className="container">
                    <h1>Edit Profile</h1>
                    <hr />
                    <div className="row">

                        <div className="col-md-3">
                            <div className="text-center">
                                <img src={profileImageUrl || 'assets/images/maaz.jpg'} className="avatar img-circle" alt="avatar" />
                                <input type="file" name="profileImage" onChange={this.onChangeFile} className="form-control" />
                                {
                                    isImageSelected ?
                                        <>
                                            <input type="button" onClick={this.uploadImage} className="btn btn-primary" value="Upload" />
                                            <input type="button" onClick={this.cancelImage} className="btn btn-primary" value="Cancel" />
                                        </>
                                        :
                                        null
                                }
                            </div>
                        </div>


                        <div className="col-md-9 personal-info">
                            {
                                profileUpdated ?
                                    <div className="alert alert-info alert-dismissable">
                                        <a className="panel-close close" data-dismiss="alert">×</a>
                                        Profile Updated.
                                    </div>
                                    :
                                    null
                            }

                            <h3>Personal info</h3>

                            <form className="form-horizontal" role="form">
                                <div className="form-group">
                                    <label className="col-lg-3 control-label">User Name:</label>
                                    <div className="col-lg-8">
                                        <input className="form-control" name='name' type="text" onChange={this.onChangeValue} value={name || ''} />
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label className="col-lg-3 control-label">Email:</label>
                                    <div className="col-lg-8">
                                        <input disabled className="form-control" type="text" value={email} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-md-3 control-label">Phone:</label>
                                    <div className="col-md-8">
                                        <input className="form-control" name="phone" type="text" onChange={this.onChangeValue} value={phone || ''} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-3 control-label">Country:</label>
                                    <div className="col-md-8">
                                        <input className="form-control" type="text" name="country" onChange={this.onChangeValue} value={country || ''} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-md-3 control-label"></label>
                                    <div className="col-md-8">
                                        <input type="button" className="btn btn-primary" onClick={this.updateProfile} value="Update" />
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