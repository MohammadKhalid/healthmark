import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as Utilities from '../../helper/Utilities';
import * as moment from 'moment';

// import { SessionManager } from '../Helper/SessionsManager';
import * as orderService from "./orderService"
export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            GetAllUser: [],
            selectedUser: [],
            allProducts: [],
            orderNumber: '',
            selectedProducts: [],
            errorArray: [],
            isFormOrderValid: true,
            allOrders: [],
            ddl: [],
            modal: false,
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
        this.fetchProducts = this.fetchProducts.bind(this);

    }
    componentDidMount() {
        // this.props.isSetupUser()
        this.fetchProducts()
        this.fetchOrders()
    }

    fetchProducts() {
        orderService.getAllproducts()
            .then(res => {
                let { code, data } = res.data
                this.setState({
                    allProducts: data
                })
            }).catch(err => {
                console.log(err)
            })
    }

    fetchOrders() {
        orderService.getAllOrders()
            .then(res => {
                let { code, data } = res.data
                this.setState({
                    allOrders: data
                })
            }).catch(err => {
                console.log(err)
            })
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
    addOrder() {
        let { orderNumber, selectedProducts, isFormOrderValid, errorArray, allProducts } = this.state

        errorArray = []
        if (orderNumber == '') {
            isFormOrderValid = false
            errorArray.push("Please enter order number.")
        } else {
            isFormOrderValid = true
            errorArray = []
        }

        if (selectedProducts.length == 0) {
            isFormOrderValid = false
            errorArray.push("Please select some products.")
        } else {
            isFormOrderValid = true
            errorArray = []
        }

        this.setState({
            errorArray,
            isFormOrderValid
        })

        if (isFormOrderValid) {

            let date = moment().format('YYYY-MM-DD')
            let obj = {
                date: date,
                selectedProducts,
                orderNumber
            }
            orderService.addOrder(obj)
                .then(res => {
                    let { code, data } = res.data
                    if (code == 200) {
                        this.fetchOrders()
                    }
                }).catch(err => {
                    console.log(err)
                })
            this.ModalclearAll();
            this.toggle();
        }

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
            selectedProducts: [],
            orderNumber: '',
            errorArray: []
        })
    }
    searchOnchange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onChangeSelectedProducts(product, event) {
        let { selectedProducts } = this.state
        let checked = event.target.checked
        if (checked) {
            let obj = {
                productId: product.productId,
                productName: product.productName,
                productRetailPrice: product.productRetailPrice,
                discountType: '',
                discount: 0,
                quantity: 0,
                totalPrice: 0
            }
            selectedProducts.push(obj)
            this.setState({
                selectedProducts: selectedProducts
            })
        } else {
            let filtered = selectedProducts.filter(x => x.productId != product.productId)

            this.setState({
                selectedProducts: filtered
            })
        }
    }

    onChangePrice(index, event) {
        let targetName = event.target.name
        let { selectedProducts } = this.state
        let findProduct = selectedProducts[index]

        if (targetName == "discountType") {
            findProduct.discountType = event.target.value
            let price = findProduct.totalPrice
            if (findProduct.discountType == 1) {
                let discout = findProduct.discount
                price = price - discout
                findProduct.totalPrice = price
            } else {

            }
        }
        if (targetName == "discount") {
            let price = findProduct.totalPrice
            let discount = event.target.value
            findProduct.discount = discount
            if (findProduct.discountType == 1) {
                if (discount == "") {
                    findProduct.totalPrice = findProduct.productRetailPrice * findProduct.quantity
                } else {
                    price = price - discount
                    findProduct.totalPrice = price
                }

            } else {
                if (discount == "") {
                    findProduct.totalPrice = findProduct.productRetailPrice * findProduct.quantity
                } else {
                    let disPercent = price * (discount / 100)
                    findProduct.totalPrice = price - disPercent
                }

            }
        }
        if (targetName == "quantity") {
            let quantity = event.target.value
            findProduct.quantity = quantity
            let totalPrice = findProduct.productRetailPrice * quantity
            findProduct.totalPrice = totalPrice
            selectedProducts[index] = findProduct
        }
        this.setState({
            selectedProducts
        })

    }

    renderUserTypeOption() {

        let options = Utilities.discountType.map(x => {
            return (
                <option key={x.id} value={x.id}>{x.name}</option>
            )
        })
        return options
    }

    getTotalQuatity(products) {
        return products.map(x => x.quantity).reduce((total, current) => parseInt(total) + parseInt(current))
    }

    getTotalPrice(products) {
        return products.map(x => x.totalPrice).reduce((total, current) => parseInt(total) + parseInt(current))
    }

    render() {

        let { allProducts, selectedProducts, orderNumber, errorArray, isFormOrderValid, allOrders } = this.state
        console.log(selectedProducts)
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
                        <p class="text-light pt-2 pb-2 font-weight-bold cent">Search Order</p>
                    </div>
                    <div class="container-fluid  bg-light">
                        <div className="row">
                            <div className="col-sm-12 " style={{ margin: '0 auto' }}>
                                <form style={{ marginTop: '40px' }}>
                                    <div className="form-group row mt-2">
                                        <div className="col-sm-3">
                                            <label for=" ">Order Number</label>
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
                                                <div class="table-responsive-sm">
                                                    <table class="table table-hover">
                                                        <thead class="bg-chart text-light">
                                                            <tr>
                                                                <th className="panel-th1">S.No</th>
                                                                <th className="panel-th3">Order No.</th>
                                                                <th className="panel-th3">Order Date</th>
                                                                <th className="panel-th2">Total Quantity</th>
                                                                <th className="panel-th2">Total Amount</th>
                                                                <th className="panel-th2">Discount</th>
                                                                <th className="panel-th3">Products</th>
                                                                <th className="panel-th4">Action</th>
                                                            </tr>
                                                        </thead>
                                                        {allOrders.length > 0 &&
                                                            <tbody>
                                                                {(allOrders.map((val, ind) => {

                                                                    return (
                                                                        <tr key={ind}>
                                                                            <td> {ind + 1} </td>
                                                                            <td className="project-title text-center">
                                                                                {val.orderNumber}
                                                                            </td>
                                                                            <td className="project-title text-center">
                                                                                {val.date}
                                                                            </td>
                                                                            <td className="project-title text-center">
                                                                                {this.getTotalQuatity(val.selectedProducts)}
                                                                            </td>
                                                                            <td className="project-title text-center">
                                                                                {this.getTotalPrice(val.selectedProducts)}
                                                                            </td>
                                                                            <td className="project-title text-center">

                                                                            </td>
                                                                            <td className="project-title text-center">
                                                                                <a>view</a>
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
                    <Modal isOpen={this.state.modal} toggle={this.toggle} size={"lg"} className={this.props.className}>
                        <ModalHeader className="modal-header bg-chart text-light container center" toggle={this.toggle}>Add/Edit Order</ModalHeader>
                        <ModalBody className="modal-body">
                            <div class="form-horizontal">
                                <div class="form-group">
                                    <div class="modal-body" style={{ paddingBottom: '10px', borderBottomWidth: '10px', paddingTop: '10px', height: 'auto' }}>
                                        <input name="ctl00$MainContent$hfModalId" type="hidden" id="MainContent_hfModalId" class="MainContent_hfModalId" />
                                        <div class="form-group">

                                            {
                                                !isFormOrderValid ?
                                                    <div className="alert alert-danger">
                                                        <ul>
                                                            {
                                                                errorArray.map((x, ind) => {
                                                                    return (
                                                                        <li key={ind}>
                                                                            {x}
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                    :
                                                    null
                                            }

                                            <label class="col-lg-12">Order Number</label>
                                            <div class="col-lg-12">
                                                <input type="text" name="orderNumber" value={orderNumber} onChange={this.AddOnChange} className="form-control txt_SearchEmail " /><span class="help-block m-b-none"></span>
                                            </div>
                                            <label className="col-lg-12">Products List</label>

                                            {
                                                allProducts.map((row, ind) => {
                                                    return (
                                                        <div key={ind} class="col-lg-2 form-check form-check-inline">
                                                            <input class="form-check-input" onChange={this.onChangeSelectedProducts.bind(this, row)} type="checkbox" id="inlineCheckbox1" value={row.productId} />
                                                            <label class="form-check-label" >{row.productName}</label>
                                                        </div>
                                                    )
                                                })
                                            }


                                            <label class="col-lg-12">Order Details</label>

                                            <table class="table">
                                                <thead class="thead-dark">
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Product Name</th>
                                                        <th scope="col">Price/Unit</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col">Discount Type</th>
                                                        <th scope="col">Discount Amount</th>
                                                        <th scope="col">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {
                                                        selectedProducts.map((x, ind) => {
                                                            return (
                                                                <tr key={ind}>
                                                                    <th scope="row">{ind + 1}</th>
                                                                    <td>{x.productName}</td>
                                                                    <td>{x.productRetailPrice}</td>
                                                                    <td>
                                                                        <input name="quantity" type="number" className="form-control" onChange={this.onChangePrice.bind(this, ind)}></input>
                                                                    </td>
                                                                    <td>
                                                                        <select name="discountType" className="form-control" onChange={this.onChangePrice.bind(this, ind)}>
                                                                            <option value="-1" disabled selected>..</option>
                                                                            {
                                                                                this.renderUserTypeOption()
                                                                            }
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <input name="discount" type="number" className="form-control" onChange={this.onChangePrice.bind(this, ind)}></input>
                                                                    </td>
                                                                    <td>{x.totalPrice}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        selectedProducts.length > 0 &&
                                                        <>
                                                            <tr>
                                                                <th scope="col"></th>
                                                                <th scope="col">Total Items</th>
                                                                <th scope="col"></th>
                                                                <th scope="col">Quantity</th>
                                                                <th scope="col"></th>
                                                                <th scope="col">Discount Amount</th>
                                                                <th scope="col">Total Amount</th>
                                                            </tr>
                                                            <tr>
                                                                <th scope="col"></th>
                                                                <th scope="col">{selectedProducts.length}</th>
                                                                <th scope="col"></th>
                                                                <th scope="col">{this.getTotalQuatity(selectedProducts)}</th>
                                                                <th scope="col"></th>
                                                                <th scope="col"></th>
                                                                <th scope="col">{this.getTotalPrice(selectedProducts)}</th>
                                                            </tr>
                                                        </>

                                                    }
                                                </tbody>


                                            </table>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            {(this.state.IsEdit == false) ?
                                <Button color="primary" onClick={this.addOrder.bind(this)}>Add Order</Button>
                                :
                                <Button color="primary" onClick={this.editModalUser.bind(this)}>Edit</Button>
                            }
                            {/* <Button color="secondary" onClick={() => { this.toggle(); this.ModalclearAll(); }}>Cancel</Button> */}
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}


