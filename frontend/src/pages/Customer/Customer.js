import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { SessionManager } from '../Helper/SessionsManager';
import Map from '../../helper/Maps';
import LocationSearchInput from '../../helper/LocationSearchInput';

import * as InventoryService from '../Inventory/InventoryService';
import * as CustomerService from './CustomerService';
import DataTable, { createTheme } from 'react-data-table-component';

export default class Customer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            seletedLocationName: '',
            seletedLocationAddress: '',
            GetAllCustomer: [],
            GetAllProduct: [],
            selectedUser: [],
            ddl: [],
            modal: false,
            user_name: '',
            email: '',
            toggledClearRows: false,
            search_name: '',
            search_email: '',
            modal_role: 0,
            search_role: 0,
            search_department: 0,
            modal_dapartment: 0,
            edituserid: 0,
            modal_customerId: '',
            modal_customerName: '',
            modal_contactPerson: '',
            modal_contactPerson: '',
            IsEdit: false,
            ExpanableComponent: '',
            columns: [],
        }
        this.toggle = this.toggle.bind(this);
        this.GetAllProduct = this.GetAllProduct.bind(this);
        this.GetAllCustomer = this.GetAllCustomer.bind(this);
        this.ModelRoleChange = this.ModelRoleChange.bind(this);
        this.ModelDepartmentChange = this.ModelDepartmentChange.bind(this);
        this.SearchRoleChange = this.SearchRoleChange.bind(this);
        this.SearchDepartmentChange = this.SearchDepartmentChange.bind(this);
        this.AddOnChange = this.AddOnChange.bind(this);
        this.searchOnchange = this.searchOnchange.bind(this);
        this.clearAll = this.clearAll.bind(this);
        this.editModalUser = this.editModalUser.bind(this);
        this.searchUser = this.searchUser.bind(this);
        this.prodcutCheck = this.prodcutCheck.bind(this);
        this.changeAddress = this.changeAddress.bind(this);
        this.state.ExpanableComponent = ({ data }) => {
            return (
                <div className="alert alert-secondary">
                    <div className="row "><p style={{ fontWeight: 'bold', paddingLeft: 10, fontSize: 12 }}> CustomerName: </p><p style={{ paddingLeft: 5, fontSize: 12 }}>{data.CustomerName}</p></div>
                    <div className="row "><p style={{ fontWeight: 'bold', paddingLeft: 10, fontSize: 12 }}> Location Area </p><p style={{ paddingLeft: 5, fontSize: 12 }}>{data.customerLocation.area}</p></div>
                    <div className="row "><p style={{ fontWeight: 'bold', paddingLeft: 10, fontSize: 12 }}> Latitude / Logitude </p><p style={{ paddingLeft: 5, fontSize: 12 }}>{data.customerLocation.latitude + " / " + data.customerLocation.longitude}</p></div>
                    <div className=" "><p style={{ fontWeight: 'bold', paddingLeft: 0, fontSize: 12 }}> Interested Products </p>
                        {data.productList.map((item, index) => {
                            return (
                                <div>
                                    <p style={{ paddingLeft: 5, fontSize: 12 }}>
                                        {index + 1} ) {item.productName}
                                    </p>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
            )
        }
        this.state.columns = [

            {
                name: 'Customer ID',
                selector: 'CustomerId',

            },
            {
                name: 'Customer Name',
                selector: 'CustomerName',
                sortable: true,
            },
            {
                name: 'Contact Person Name ',
                selector: 'ContactPerson',
                sortable: true,
                right: true,
            },
            {
                name: 'Contact Person Number ',
                selector: 'ContactNumber',
                sortable: true,
                right: true,
            },


            {
                name: 'Country',
                cell: row => <div><div>{row.customerLocation.country}</div></div>,
                sortable: true,
            },
            {
                name: 'Action',
                cell: row => <div> <button onClick={() => this.edituser(row)} className="btn btn-sm btn-outline-success mb-2 mr-2 ">
                    <span aria-hidden="true" className="fa fa-edit btn-outline-success p-1"></span>
                </button>

                    <button className="btn btn-sm  btn-outline-danger mb-2 ml-2">
                        <span aria-hidden="true" class="btn-outline-danger fa fa-trash p-1"></span>
                    </button></div>
            },

        ];
    }


    componentWillMount() {
        // this.props.isSetupUser()
        this.GetAllCustomer();
        this.GetAllProduct();
        this.DropDownListAPI();
    }


    changeAddress(name, cord) {
        this.setState({
            seletedLocationName: name,
            seletedLocationAddress: cord,
        })
    }
    GetAllProduct = async () => {
        try {
            var AllInventory = await InventoryService.GetAllInventory();
            var Dataset = AllInventory.data.data;
            var checkbox = false;
            for (var i = 0; i < Dataset.length; i++) {
                Dataset[i].checkbox = checkbox
            }
            console.log("Dataset", Dataset);
            this.setState({
                GetAllProduct: Dataset,
            })
        }
        catch (e) {
            console.log("Product Service Get All Product Exception", e);
        }
    }

    GetAllCustomer = async () => {
        try {
            var AllCustomer = await CustomerService.GetAllCustomer();
            this.setState({
                GetAllCustomer: AllCustomer.data.data,
                selectedUser: AllCustomer.data.data
            })
        }
        catch (e) {
            console.log("Inventory Service Get All Inventory Exception", e);
        }
    }
    prodcutCheck(product) {
        for (var i = 0; i < this.state.GetAllProduct.length; i++) {
            if (this.state.GetAllProduct[i].productId == product.productId) {
                if (!this.state.GetAllProduct[i].checkbox) {
                    this.state.GetAllProduct[i].checkbox = true
                    this.setState({
                        GetAllProduct: this.state.GetAllProduct

                    })
                }
                else {
                    this.state.GetAllProduct[i].checkbox = false
                    this.setState({
                        GetAllProduct: this.state.GetAllProduct

                    })
                }
            }

        }
    }

    DropDownListAPI() {

    }

    GetAllUser() {

    }
    toggle() {
        this.setState({
            modal: !this.state.modal,
            seletedLocationAddress: ''
        });
    }

    edituser = (val) => {
        console.log("val", val);
        this.toggle();
        this.setState({
            IsEdit: true,
            modal_customerId: val.CustomerId,
            modal_customerName: val.CustomerName,
            modal_contactPerson: val.ContactPerson,
            modal_contactNumber: val.ContactNumber,
            seletedLocationName: val.customerLocation.area,
            seletedLocationAddress: {
                lat: val.customerLocation.latitude,
                lng: val.customerLocation.longitude,
            },
        })
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

        if (this.state.modal_customerId == "") {
            alert("please Enter Customer Id ")
            return;
        }
        else if (this.state.modal_customerName == "") {
            alert("please Enter Customer Name ")
            return;
        }
        else if (this.state.modal_contactPerson == "") {
            alert("please Enter Contact Person ")
            return;
        }

        else if (this.state.modal_contactNumber == "") {
            alert("please Enter Customer Contact Number ")
            return;
        }

        else if (this.state.seletedLocationName == "") {
            alert("set Location Marker with auto complete ")
            return;
        }
        let country = this.state.seletedLocationName.split(',')
        country = country[country.length - 1]
        var productList = [];
        for (var i = 0; i < this.state.GetAllProduct.length; i++) {
            if (this.state.GetAllProduct[i].checkbox == true) {
                productList.push(this.state.GetAllProduct[i])
            }
        }
        var payload = {
            CustomerId: this.state.modal_customerId,
            CustomerName: this.state.modal_customerName,
            ContactPerson: this.state.modal_contactPerson,
            ContactNumber: this.state.modal_contactNumber,
            customerLocation: {
                area: this.state.seletedLocationName,
                latitude: this.state.seletedLocationAddress.lat,
                longitude: this.state.seletedLocationAddress.lng,
                country: country
            },
            productList: productList
        }
        CustomerService.CreateCustomer(payload)
            .then(res => {
                let { code } = res.data
                if (code == 200) {
                    this.GetAllCustomer();
                    this.GetAllProduct();
                    this.ModalclearAll();
                    this.toggle();
                }
            }).catch(err => {
                console.log(err)
                this.ModalclearAll();
                this.toggle();
            })

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
            modal_customerId: '',
            modal_customerName: '',
            modal_contactPerson: '',
            modal_contactNumber: '',
            seletedLocationName: '',
            seletedLocationAddress: '',


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
        console.log("this.state.GetallCustomer", this.state.GetAllCustomer);
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
                        <p class="text-light pt-2 pb-2 font-weight-bold cent">Search Customer</p>
                    </div>
                    <div class="container-fluid  bg-light">
                        <div className="row">
                            <div className="col-sm-12 " style={{ margin: '0 auto' }}>
                                <form style={{ marginTop: '40px' }}>
                                    <div className="form-group row mt-2">
                                        <div className="col-sm-3 d-inline-block">
                                            <label for=" ">Item Categoty</label>
                                            <select className="form-control txt_SearchUserName" value={this.state.search_role} onChange={this.SearchRoleChange}>
                                                <option value={0}>--Select--</option>
                                                <option value={1}>Categoty 1</option>
                                                <option value={2}>Categoty 2</option>
                                                <option value={3}>Categoty 3</option>

                                            </select>
                                        </div>
                                        <div className="col-sm-3">
                                            <label for=" ">Item Name</label>
                                            <input name="search_name" value={this.state.search_name} onChange={this.searchOnchange} type="text" className="form-control txt_SearchUserName " />
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
                                                <DataTable
                                                    // title="Arnold Movies"
                                                    columns={this.state.columns}
                                                    theme="light"
                                                    expandableRows
                                                    noHeader={true}
                                                    fixedHeader={true}
                                                    responsive={true}
                                                    striped={true}
                                                    data={this.state.GetAllCustomer}
                                                    onSelectedRowsChange={this.edituser}
                                                    clearSelectedRows={this.state.toggledClearRows}
                                                    pagination={true}
                                                    expandableRowsComponent={<this.state.ExpanableComponent />}

                                                />
                                                {/* <div class="table-responsive-sm">
                                                    <table class="table table-hover">
                                                        <thead class="bg-chart text-light">
                                                            <tr>
                                                                <th className="panel-th1">S.No</th>
                                                                <th className="panel-th2">Customer Id </th>
                                                                <th className="panel-th2">Customer Name </th>
                                                                <th className="panel-th2">Contact Person Name </th>
                                                                <th className="panel-th2">Contact Person Number </th>
                                                                <th className="panel-th2">Location Area </th>
                                                                <th className="panel-th2">Country </th>
                                                                <th className="panel-th2">Location Lat/Lng </th>
                                                                <th className="panel-th2">Action</th>
                                                            </tr>
                                                        </thead>
                                                        {this.state.selectedUser.length > 0 &&
                                                            <tbody>
                                                                {(this.state.selectedUser.map((val, ind) => {

                                                                    return (
                                                                        <tr key={ind}>
                                                                            <td> {ind + 1} </td>
                                                                            <td className="project-title text-center">
                                                                                {val.CustomerId}
                                                                            </td>
                                                                            <td className="project-title text-center">
                                                                                {val.CustomerName}
                                                                            </td>
                                                                            <td className="project-title text-center">
                                                                                {val.ContactPerson}
                                                                            </td>
                                                                            <td className="project-title text-center">
                                                                                {val.ContactNumber}
                                                                            </td>
                                                                            <td className="project-title text-center">
                                                                                {val.customerLocation.area}
                                                                            </td>
                                                                            <td className="project-title text-center">
                                                                                {val.customerLocation.country}
                                                                            </td>
                                                                            <td className="project-title text-center">
                                                                                {val.customerLocation.latitude + "/" + val.customerLocation.longitude}
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
                                            <label class="col-lg-12">Customer Id </label>
                                            <div class="col-lg-12">
                                                <input type="text" name="modal_customerId" value={this.state.modal_customerId} onChange={this.AddOnChange} className="form-control txt_SearchEmail " /><span class="help-block m-b-none"></span>
                                            </div>
                                            <label class="col-lg-12">Customer Name </label>
                                            <div class="col-lg-12">
                                                <input type="text" name="modal_customerName" value={this.state.modal_customerName} onChange={this.AddOnChange} className="form-control txt_SearchEmail " /><span class="help-block m-b-none"></span>
                                            </div>
                                            <label class="col-lg-12">Contact Person </label>
                                            <div class="col-lg-12">
                                                <input type="text" name="modal_contactPerson" value={this.state.modal_contactPerson} onChange={this.AddOnChange} className="form-control txt_SearchEmail " /><span class="help-block m-b-none"></span>
                                            </div>
                                            <label class="col-lg-12">Contact Number </label>
                                            <div class="col-lg-12">
                                                <input type="text" name="modal_contactNumber" value={this.state.modal_contactNumber} onChange={this.AddOnChange} className="form-control txt_SearchEmail " /><span class="help-block m-b-none"></span>
                                            </div>
                                            {this.state.seletedLocationName != "" && this.state.seletedLocationAddress != '' &&
                                                < div >
                                                    < label class="col-lg-12">Location Name </label>
                                                    <div class="col-lg-12">
                                                        <p name="modal_contactNumber" className="form-control txt_SearchEmail " style={{ minHeight: 35 }} >{this.state.seletedLocationName}</p>
                                                    </div>

                                                    <label class="col-lg-12">Latitude </label>
                                                    <div class="col-lg-12">
                                                        <p name="modal_contactNumber" className="form-control txt_SearchEmail " style={{ minHeight: 35 }} >{this.state.seletedLocationAddress.lat}</p>
                                                    </div>

                                                    <label class="col-lg-12">Logitude </label>
                                                    <div class="col-lg-12">
                                                        <p name="modal_contactNumber" className="form-control txt_SearchEmail " style={{ minHeight: 35 }} >{this.state.seletedLocationAddress.lng}</p>
                                                    </div>
                                                </div>
                                            }

                                            <label class="col-lg-12">Product List </label>
                                            <div class="col-lg-12">
                                                {this.state.GetAllProduct.map((product, index) => {
                                                    return (
                                                        <div className="d-inline m-2" key={index}>
                                                            <input name="search_isActive" onChange={() => this.prodcutCheck(product)} checked={product.checkbox} type="checkbox" className="txt_SearchUserName " />
                                                            <label className="pl-1" for=" ">{product.productName}</label>
                                                        </div>
                                                    )
                                                })}

                                            </div>

                                            <div className="mb-3" >
                                                <LocationSearchInput latlng={(this.state.seletedLocationAddress != '') ? this.state.seletedLocationAddress.lat + "/" + this.state.seletedLocationAddress.lng : undefined} changeAddress={this.changeAddress} />
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
            </div >
        );
    }
}


