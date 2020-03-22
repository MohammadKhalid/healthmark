import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as Utilities from '../../helper/Utilities';
import * as InventoryService from './InventoryService'
import history from '../../History';
// import { SessionManager } from '../Helper/SessionsManager';
export default class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GetAllInventory: [],
            selectedUser: [],
            ddl: [],
            modal: false,
            search_productName: '',
            search_productQty: 0,
            search_productRetailPrice: 0,
            search_productInternalPrice: 0,
            search_product_value: 0,
            search_id: 0,

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
        this.searchInventory = this.searchInventory.bind(this);
    }
    componentWillMount() {
        // this.props.isSetupUser()
        this.GetAllInventory();
        this.DropDownListAPI();
    }

    DropDownListAPI() {

    }
    GetAllInventory = async () => {
        try {
            var AllInventory = await InventoryService.GetAllInventory();
            this.setState({
                GetAllInventory: AllInventory.data.data,
                selectedUser: AllInventory.data.data
            })
        }
        catch (e) {
            console.log("Inventory Service Get All Inventory Exception", e);
        }
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }


    editInventory(val) {
        this.toggle();
        this.setState({
            IsEdit: true,
            search_productName: val.productName,
            search_productQty: val.productQty,
            search_productRetailPrice: val.productRetailPrice,
            search_productInternalPrice: val.productInternalPrice,
            search_product_value: val.productQty * val.productRetailPrice,
            search_id: val.productId
        })
    }
    editModalUser() {
        this.toggle();
        this.ModalclearAll();
        let { search_productName, search_productQty, search_productRetailPrice, search_productInternalPrice, selectedUser, search_id } = this.state

        let payload = {
            productName: search_productName,
            productRetailPrice: search_productRetailPrice,
            productQty: search_productQty,
            productInternalPrice: search_productInternalPrice,
            productValue: search_productQty * search_productRetailPrice,
            productId: search_id
        }
        InventoryService.InventoryEdit(payload)
            .then(res => {
                let { code } = res.data
                if (code == 200) {
                    let filteredIndex = selectedUser.findIndex(x => x.uid == search_id)
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
            search_productName:'',
            search_productRetailPrice: 0,
            search_productInternalPrice: 0,
            search_name: '',
            selectedUser: this.state.GetAllInventory

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
    searchInventory() {
        let obj = {
            productName: this.state.search_productName,
            productRetailPrice: parseInt(this.state.search_productRetailPrice),
            productInternalPrice: parseInt(this.state.search_productInternalPrice)
        }
        console.log("obj", obj);
        console.log("this.state.GetAllInventory", this.state.GetAllInventory);
        let record = this.state.GetAllInventory.filter(a => a.productName == this.state.search_productName || a.productRetailPrice == obj.productRetailPrice || a.productInternalPrice == this.state.search_productInternalPrice)
        console.log("record",record);
        this.setState({
            selectedUser: record
        })
    }
    render() {
        return (
            <div id="App">
                <div className="mt-4" style={{ width: '90%', margin: '0 auto' }}>
                    <div class="container-fluid bg-chart">
                        <p class="text-light pt-2 pb-2 font-weight-bold cent">Search Inventory</p>
                    </div>
                    <div class="container-fluid  bg-light">
                        <div className="row">
                            <div className="col-sm-12 " style={{ margin: '0 auto' }}>
                                <form style={{ marginTop: '40px' }}>
                                    <div className="form-group row mt-2">
                                        <div className="col-sm-3">
                                            <label for=" ">Product Name</label>
                                            <input name="search_productName" value={this.state.search_productName} onChange={this.searchOnchange} type="text" className="form-control txt_SearchUserName " />
                                        </div>

                                        <div className="col-sm-3">
                                            <label for=" ">Product Retail Price</label>
                                            <input name="search_productRetailPrice" value={this.state.search_productRetailPrice} onChange={this.searchOnchange} type="number" className="form-control txt_SearchUserName " />
                                        </div>

                                        <div className="col-sm-3">
                                            <label for=" ">Product Internal Price</label>
                                            <input name="search_productInternalPrice" value={this.state.search_productInternalPrice} onChange={this.searchOnchange} type="number" className="form-control txt_SearchUserName " />
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
                                        <button onClick={this.searchInventory} className="btn btn-block  btn-sm  btn-outline-success mt-2 mb-2 float-right">Search</button>
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
                                                                <th className="panel-th2">Name </th>
                                                                <th className="panel-th2">Retail Price</th>
                                                                <th className="panel-th2">Internal Price</th>
                                                                <th className="panel-th1">Quantity</th>
                                                                <th className="panel-th2">Value</th>
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
                                                                                {val.productName}
                                                                            </td>
                                                                            <td className="project-title text-center">
                                                                                {val.productRetailPrice}
                                                                            </td>
                                                                            <td className="project-title text-center">
                                                                                {val.productInternalPrice}
                                                                            </td>
                                                                            <td className="project-title text-center">
                                                                                {val.productQty}
                                                                            </td>
                                                                            <td className="project-title text-center">
                                                                                {val.productValue}
                                                                            </td>
                                                                            <td className="project-actions text-center">

                                                                                <button onClick={this.editInventory.bind(this, val)} className="btn btn-sm btn-outline-success mb-2 mr-2 ">
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
                                            <label class="col-lg-12">Product Name </label>
                                            <div class="col-lg-12">
                                                <input type="text" name="search_productName" value={this.state.search_productName} onChange={this.AddOnChange} className="form-control txt_SearchEmail " /><span class="help-block m-b-none"></span>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-12">Product Retail Price </label>
                                            <div class="col-lg-12">
                                                <input type="number" name="search_productRetailPrice" value={this.state.search_productRetailPrice} onChange={this.AddOnChange} className="form-control txt_SearchEmail " /><span class="help-block m-b-none"></span>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-12">Product Internal Price </label>
                                            <div class="col-lg-12">
                                                <input type="number" name="search_productInternalPrice" value={this.state.search_productInternalPrice} onChange={this.AddOnChange} className="form-control txt_SearchEmail " /><span class="help-block m-b-none"></span>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-lg-12">Product Quantity </label>
                                            <div class="col-lg-12">
                                                <input type="number" name="search_productQty" value={this.state.search_productQty} onChange={this.AddOnChange} className="form-control txt_SearchEmail " /><span class="help-block m-b-none"></span>
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


