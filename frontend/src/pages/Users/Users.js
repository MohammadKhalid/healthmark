import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { SessionManager } from '../Helper/SessionsManager';
import DataTable from 'react-data-table-component';
import * as Utilities from '../../helper/Utilities';
import * as UserService from './userService'
import history from '../../History';
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
            search_role: '',
            modal_varified: false,
            search_department: 0,
            loading: true,
            columns: [],
            totalRecords: 0,
            modal_dapartment: 0,
            edituserid: 0,
            IsEdit: false,
            page: 0,
            limit: 10
        }
        this.toggle = this.toggle.bind(this);
        this.ModelRoleChange = this.ModelRoleChange.bind(this);
        this.ModelDepartmentChange = this.ModelDepartmentChange.bind(this);
        this.ModelVarifiedChange = this.ModelVarifiedChange.bind(this);
        this.SearchRoleChange = this.SearchRoleChange.bind(this);
        this.SearchDepartmentChange = this.SearchDepartmentChange.bind(this);
        this.AddOnChange = this.AddOnChange.bind(this);
        this.searchOnchange = this.searchOnchange.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.editModalUser = this.editModalUser.bind(this);
        this.searchUser = this.searchUser.bind(this);
        this.setColumns = this.setColumns.bind(this)
        this.UserSession()
    }

    UserSession = () => {
        Utilities.localStorage_GetKey("userObject")
            .then(response => {
                if (response != null) {
                    Storage.userObject = JSON.parse(response);
                    history.push("/Users")
                }
                else {

                    history.push("/Login")
                }
            })
    }

    componentDidMount() {
        // this.props.isSetupUser()
        this.setColumns()
        this.GetAllUser();
        this.DropDownListAPI();
    }
    setColumns() {
        let { columns } = this.state
        columns = [
            {
                name: 'Name',
                selector: 'name',
                sortable: true
            },
            {
                name: 'Email',
                selector: 'email',
                sortable: true
            },
            {
                name: 'Country',
                selector: 'country',
                sortable: true
            },
            {
                name: 'Role',
                selector: row => <div>{row.userType.name}</div>,
                sortable: true

            },
            {
                name: 'Status',
                selector: row => <div>
                    <p style={{ color: (row.isVerified == "true") ? "#28a745" : "#dc3545" }}>
                        {(row.isVerified == "true") ? 'Verified' : "Not Verified"}
                    </p>
                </div>,
                sortable: true

            },

            // {
            //     name: 'Discount',
            //     selector: row => this.getTotalDiscountPrice(row.selectedProducts),
            //     sortable: true

            // }
        ]
        this.setState({
            columns
        })
    }

    DropDownListAPI() {

    }

    GetAllUser = async (page = 0, limit = 10) => {
        try {
            let {
                search_role,
                search_email,
                search_name
            } = this.state

            let params = {
                page,
                limit,
                role: search_role,
                email: search_email,
                name: search_name
            }
            this.setState({ loading: true })

            var response = await UserService.GetAllUsers(params);
            let { data, code, totalRecords } = response.data
            this.setState({
                GetAllUser: data,
                selectedUser: data,
                loading: false,
                totalRecords
            })
        }
        catch (e) {
            this.setState({
                loading: false
            })
            console.log("User Service Get All Users Exception", e);
        }
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }


    edituser(val) {
        this.toggle();
        this.setState({
            IsEdit: true,
            user_name: val.name,
            email: val.email,
            modal_role: val.userType.id,
            modal_varified: val.isVerified,
            edituserid: val.uid

        })
    }
    editModalUser() {
        this.toggle();
        this.ModalclearAll();
        let { user_name, email, modal_varified, edituserid, selectedUser } = this.state

        let payload = {
            name: user_name,
            email,
            isVerified: modal_varified,
            uid: edituserid
        }

        console.log(payload)
        UserService.userEdit(payload)
            .then(res => {
                let { code } = res.data

                if (code == 200) {
                    let filtered = selectedUser.find(x => x.uid == edituserid)
                    let filteredIndex = selectedUser.findIndex(x => x.uid == edituserid)

                    payload.userType = filtered.userType

                    selectedUser.splice(filteredIndex, 1, payload)

                    this.setState({
                        selectedUser
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        this.setState({
            IsEdit: false
        })

    }

    deleteUser(val) {

    }
    ModelRoleChange(event) {
        this.setState({ modal_role: event.target.value });
    }
    ModelVarifiedChange(event) {
        this.setState({ modal_varified: event.target.value });
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
        let { limit, page } = this.state
        this.setState({
            search_role: 0,
            search_department: 0,
            search_email: '',
            search_name: '',
        })

        this.GetAllUser(page, limit)
    }
    ModalclearAll() {
        this.setState({
            modal_role: 0,
            modal_dapartment: 0,
            user_name: '',
            email: '',
            modal_varified: false

        })
    }
    searchOnchange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    searchUser() {
        let { limit, page } = this.state

        this.GetAllUser(page, limit)
    }

    renderUserTypeOption() {

        let options = Utilities.userType.map(x => {
            return (
                <option key={x.id} value={x.id}>{x.name}</option>
            )
        })
        return options
    }

    onChangePage(data) {
        let { page, limit } = this.state

        page = data - 1
        this.setState({
            page
        })
        this.GetAllUser(page, limit)
    }

    render() {
        let { GetAllUser, totalRecords, loading, columns } = this.state
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
                        <p class="text-light pt-2 pb-2 font-weight-bold cent">Search Users</p>
                    </div>
                    <div class="container-fluid  bg-light">
                        <div className="row">
                            <div className="col-sm-12 " style={{ margin: '0 auto' }}>
                                <form style={{ marginTop: '40px' }}>
                                    <div className="form-group row mt-2">
                                        <div className="col-sm-3 d-inline-block">
                                            <label for=" ">Role</label>
                                            <select className="form-control txt_SearchUserName" value={this.state.search_role} onChange={this.SearchRoleChange}>
                                                <option disabled selected value={0}> Select Role </option>
                                                {
                                                    this.renderUserTypeOption()
                                                }

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
                                            {/* <input type="button" data-toggle="modal" data-target="#CreateProjectModal" class="openmodal" style={{ display: 'none' }} />
                                            <button type="button" class="muModal btn btn-outline-success pull-right mb-2 pr-4 pl-4 cent btn_AddItem" onClick={() => { this.setState({ IsEdit: false }); this.toggle() }}><i class="fa fa-plus"></i>Add </button> */}
                                            <div class="project-list">
                                                <DataTable
                                                    theme="light"
                                                    pagination={true}
                                                    columns={columns}
                                                    noHeader={true}
                                                    fixedHeader={true}
                                                    progressPending={loading}
                                                    onChangePage={this.onChangePage.bind(this)}
                                                    responsive={true}
                                                    paginationTotalRows={totalRecords}
                                                    paginationServer={true}
                                                    striped={true}
                                                    data={GetAllUser}
                                                ></DataTable>
                                                {/* <div class="table-responsive-sm">
                                                    <table class="table table-hover">
                                                        <thead class="bg-chart text-light">
                                                            <tr>
                                                                <th className="panel-th1">S.No</th>
                                                                <th className="panel-th2">Role </th>
                                                                <th className="panel-th3">User Name </th>
                                                                <th className="panel-th4">Country </th>
                                                                <th className="panel-th4">Email (Login-Id)</th>
                                                                <th className="panel-th6">Verified</th>
                                                                <th className="panel-th7">Action</th>
                                                            </tr>
                                                        </thead>
                                                        {this.state.selectedUser.length > 0 &&
                                                            <tbody>
                                                                {(this.state.selectedUser.map((val, ind) => {

                                                                    return (
                                                                        <tr key={ind}>
                                                                            <td> {ind + 1} </td>
                                                                            <td className="project-title text-center">
                                                                                {val.userType.name}
                                                                            </td>
                                                                            <td className="project-title text-center">
                                                                                {val.name}
                                                                            </td>
                                                                            <td className="project-title text-center">
                                                                                {val.country}
                                                                            </td>
                                                                            <td className="project-title text-center">
                                                                                {val.email}
                                                                            </td>
                                                                            <td className="project-title text-center " >
                                                                                <p style={{ color: (val.isVerified == "true") ? "#28a745" : "#dc3545" }}>
                                                                                    {(val.isVerified == "true") ? 'Yes' : "No"}
                                                                                </p>
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
                                                </div> */}
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
                                                    {
                                                        this.renderUserTypeOption()
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
                                            <div class="col-lg-12">
                                                <label for="exampleInputPassword2">Varified </label>
                                                <span id="MainContent_RequiredFieldValidator5" style={{ color: 'Red', display: 'none' }}></span>
                                                <select className="form-control" value={this.state.modal_varified} onChange={this.ModelVarifiedChange}>
                                                    <option key={0} value={false}>false</option>
                                                    <option key={1} value={true}>true</option>
                                                </select>
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


