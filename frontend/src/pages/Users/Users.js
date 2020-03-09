import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { SessionManager } from '../Helper/SessionsManager';
export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GetAllUser: [],
            selectedUser: [],
            ddl: [],
            modal: false,
            user_name: '',
            email: '',
            search_name: '',
            search_email: '',
            modal_role: 0,
            search_role: 0,
            search_department: 0,

            modal_dapartment: 0,
            edituserid: 0,
            IsEdit: false,
        }
        this.toggle = this.toggle.bind(this);
        this.ModelRoleChange = this.ModelRoleChange.bind(this);
        this.ModelDepartmentChange = this.ModelDepartmentChange.bind(this);
        this.SearchRoleChange = this.SearchRoleChange.bind(this);
        this.SearchDepartmentChange = this.SearchDepartmentChange.bind(this);
        this.AddOnChange = this.AddOnChange.bind(this);
        this.searchOnchange = this.searchOnchange.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.editModalUser = this.editModalUser.bind(this);
        this.searchUser = this.searchUser.bind(this);
    }
    componentWillMount() {
        // this.props.isSetupUser()
        this.GetAllUser();
        this.DropDownListAPI();
    }

    DropDownListAPI() {

    }

    GetAllUser() {

    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }


    edituser(val) {

    }
    editModalUser() {
        this.toggle();
        this.ModalclearAll();
        this.setState({
            IsEdit: false
        })

    }

    deleteUser(val) {

    }
    ModelRoleChange(event) {
        this.setState({ modal_role: event.target.value });
    }
    ModelDepartmentChange(event) {
        this.setState({ modal_dapartment: event.target.value });
    }
    SearchRoleChange(event) {
        this.setState({ search_role: event.target.value });
    }
    SearchDepartmentChange(event) {
        this.setState({ search_department: event.target.value });
    }
    AddUser() {

        this.ModalclearAll();
        this.toggle();

    }
    AddOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    clearAll() {
        this.setState({
            search_role: 0,
            search_department: 0,
            search_email: '',
            search_name: ''

        })
    }
    ModalclearAll() {
        this.setState({
            modal_role: 0,
            modal_dapartment: 0,
            user_name: '',
            email: ''

        })
    }
    searchOnchange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    searchUser() {
    
    }
    render() {

        let roles = [];
        let department = [];
        let setup_user = [];
        if (this.state.ddl.length > 0) {
            roles = this.state.ddl[0].data1
            department = this.state.ddl[0].data;
        }
        return (
            <div id="App">
                <div className="mt-4" style={{ width: '90%', margin: '0 auto' }}>
                    <div class="container-fluid bg-chart">
                        <p class="text-light pt-2 pb-2 font-weight-bold cent">Search</p>
                    </div>
                    <div class="container-fluid  bg-light">
                        <div className="row">
                            <div className="col-sm-12 " style={{ margin: '0 auto' }}>
                                <form style={{ marginTop: '40px' }}>
                                    <div className="form-group row mt-2">
                                        <div className="col-sm-3 d-inline-block">
                                            <label for=" ">Role</label>
                                            <select className="form-control txt_SearchUserName" value={this.state.search_role} onChange={this.SearchRoleChange}>
                                                <option value={0}>--Select--</option>
                                                <option value={1}>Admin</option>
                                                <option value={2}>Hospital</option>
                                                <option value={3}>Client</option>
                                                
                                            </select>
                                        </div>
                                        <div className="col-sm-3">
                                            <label for=" ">User Name</label>
                                            <input name="search_name" value={this.state.search_name} onChange={this.searchOnchange} type="text" className="form-control txt_SearchUserName " />
                                        </div>
                                        <div className="col-sm-3">
                                            <label for=" ">Email (Login-Id)</label>
                                            <input name="search_email" value={this.state.search_email} onChange={this.searchOnchange} type="email" className="form-control txt_SearchEmail " />
                                        </div>
                                        <div className="col-sm-3 d-inline-block">
                                            <label for=" ">Department</label>
                                            <select className="form-control txt_SearchUserName" value={this.state.search_department} onChange={this.SearchDepartmentChange}>
                                                <option value={0}>Select</option>
                                                <option value={1}>Select 1</option>
                                                <option value={2}>Select 2</option>
                                                <option value={3}>Select 3</option>
                                               
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-6 "></div>
                                <div className="col-sm-6  ">
                                    <div className="col-sm-3 float-right mb-2">
                                        <button onClick={this.clearAll} className="btn btn-block btn-sm btn-outline-danger mt-2 float-right">Cancel</button>
                                    </div>
                                    <div className="col-sm-3 float-right">
                                        <button onClick={this.searchUser} className="btn btn-block  btn-sm  btn-outline-success mt-2 mb-2 float-right">Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-fluid bg-chart">
                        <p class="text-light pt-2 pb-2 font-weight-bold cent">Records</p>
                    </div>
                    <div class=" container-fluid bg-white">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="wrapper wrapper-content animated fadeInUp">
                                    <div class="panel ">
                                        <div class="panel-body">
                                            <input type="button" data-toggle="modal" data-target="#CreateProjectModal" class="openmodal" style={{ display: 'none' }} />
                                            <button type="button" class="muModal btn btn-outline-success pull-right mb-2 pr-4 pl-4 cent btn_AddItem" onClick={() => { this.setState({ IsEdit: false }); this.toggle() }}><i class="fa fa-plus"></i>Add </button>
                                            <div class="project-list">
                                                <div class="table-responsive-sm">
                                                    <table class="table table-hover">
                                                        <thead class="bg-chart text-light">
                                                            <tr>
                                                                <th className="panel-th1">S.No</th>
                                                                <th className="panel-th2">Role </th>
                                                                <th className="panel-th3">User Name </th>
                                                                <th className="panel-th4">Email (Login-Id)</th>
                                                                <th className="panel-th5">Department</th>
                                                                <th className="panel-th6">Action</th>
                                                            </tr>
                                                        </thead>
                                                        {this.state.selectedUser.length > 0 &&
                                                            <tbody>
                                                                {(this.state.selectedUser.map((val, ind) => {

                                                                    return (
                                                                        <tr key={ind}>
                                                                            <td> {ind + 1} </td>
                                                                            <td className="project-title text-center">
                                                                                {val.RoleName}
                                                                            </td>
                                                                            <td className="project-title text-center">
                                                                                {val.FullName}
                                                                            </td>
                                                                            <td className="project-title text-center">
                                                                                {val.Email}
                                                                            </td>
                                                                            <td className="project-title text-center">
                                                                                {val.DepartmentName}
                                                                            </td>
                                                                            <td className="project-actions text-center">

                                                                                <button onClick={this.edituser.bind(this, val)} className="btn btn-sm btn-outline-success mb-2 mr-2 ">
                                                                                    <span aria-hidden="true" className="fa fa-edit btn-outline-success p-1"></span>
                                                                                </button>

                                                                                <button onClick={this.deleteUser.bind(this, val)} className="btn btn-sm  btn-outline-danger mb-2 ml-2">
                                                                                    <span aria-hidden="true" class="btn-outline-danger fa fa-trash p-1"></span>
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }))}
                                                            </tbody>
                                                        }
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader className="modal-header bg-chart text-light container center" toggle={this.toggle}>Add Edit/User</ModalHeader>
                        <ModalBody className="modal-body">
                            <div class="form-horizontal">
                                <div class="form-group">
                                    <div class="modal-body" style={{ paddingBottom: '10px', borderBottomWidth: '10px', paddingTop: '10px', height: 'auto' }}>
                                        <input name="ctl00$MainContent$hfModalId" type="hidden" id="MainContent_hfModalId" class="MainContent_hfModalId" />
                                        <div class="form-group">
                                            <div class="col-lg-12">
                                                <label for="exampleInputPassword2">Role </label>
                                                <span id="MainContent_RequiredFieldValidator5" style={{ color: 'Red', display: 'none' }}></span>
                                                <select className="form-control" value={this.state.modal_role} onChange={this.ModelRoleChange}>
                                                    <option value={0}>--Select--</option>
                                                    {roles.length > 0 &&
                                                        (roles.map((val, ind) => {
                                                            return (
                                                                <option key={ind} value={val.Role_Id}>{val.RoleName}</option>
                                                            )
                                                        }))
                                                    }
                                                </select>
                                            </div>
                                            <div class="col-lg-12">
                                                <label for="exampleInputPassword2">Department </label>
                                                <span id="MainContent_RequiredFieldValidator4" style={{ color: 'Red', display: 'none' }}></span>
                                                <select className="form-control" value={this.state.modal_dapartment} onChange={this.ModelDepartmentChange}>
                                                    <option value={0}>--Select--</option>
                                                    {department.length > 0 &&
                                                        (department.map((val, ind) => {

                                                            return (
                                                                <option key={ind} value={val.Department_Id}>{val.DepartmentName}</option>
                                                            )
                                                        }))
                                                    }
                                                </select>
                                            </div>
                                            <label class="col-lg-12">User Name </label>
                                            <div class="col-lg-12">
                                                <input type="email" name="user_name" value={this.state.user_name} onChange={this.AddOnChange} className="form-control txt_SearchEmail " /><span class="help-block m-b-none"></span>
                                            </div>
                                            <label class="col-lg-12">Email (Login-Id)</label>
                                            <div class="col-lg-12">
                                                <input type="email" name="email" value={this.state.email} onChange={this.AddOnChange} className="form-control txt_SearchEmail " /><span class="help-block m-b-none"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            {(this.state.IsEdit == false) ?
                                <Button color="primary" onClick={this.AddUser.bind(this)}>Add</Button>
                                :
                                <Button color="primary" onClick={this.editModalUser.bind(this)}>Edit</Button>
                            }
                            <Button color="secondary" onClick={() => { this.toggle(); this.ModalclearAll(); }}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}


