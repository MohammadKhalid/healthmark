import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as Utilities from '../../helper/Utilities';
import * as moment from 'moment';
import DataTable from 'react-data-table-component';
import * as orderService from "./orderService"
import * as productService from "../Inventory/InventoryService"
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
            searchOrderNumber: '',
            allOrders: [],
            totalRecords: 0,
            ddl: [],
            modal: false,
            edituserid: 0,
            IsEdit: false,
            orderArray: [],
            page: 0,
            limit: 10,
            columns: [],
            loading: true,
            searchDate: ''
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
        this.searchOrder = this.searchOrder.bind(this)

    }

    componentDidMount() {
        // this.props.isSetupUser()
        this.setColumns()
        this.fetchProducts()
        this.fetchOrders()

    }

    setColumns() {
        let { columns } = this.state
        columns = [
            {
                name: 'Order number',
                selector: 'orderNumber',
                sortable: true
            },
            {
                name: 'Order Date',
                selector: 'date',
                sortable: true

            },
            {
                name: 'Total Quantity',
                selector: row => this.getTotalQuatity(row.selectedProducts),
                sortable: true

            },
            {
                name: 'Total Amount',
                selector: row => this.getTotalPrice(row.selectedProducts),
                sortable: true

            },
            {
                name: 'Discount',
                selector: row => this.getTotalDiscountPrice(row.selectedProducts),
                sortable: true

            }
        ]
        this.setState({
            columns
        })
    }

    fetchProducts() {
        productService.GetAllInventory()
            .then(res => {
                let { code, data } = res.data
                this.setState({
                    allProducts: data
                })
            }).catch(err => {
                console.log(err)
            })
    }

    fetchOrders(page = 0, limit = 10, ) {
        let { searchOrderNumber, searchDate } = this.state
        let params = {
            page,
            limit,
            orderNumber: searchOrderNumber,
            date: searchDate
        }
        this.setState({
            loading: true
        })

        orderService.getAllOrders(params)
            .then(res => {
                let { code, data, totalRecords } = res.data
                this.setState({
                    allOrders: data,
                    orderArray: data,
                    totalRecords,
                    loading: false
                })
            }).catch(err => {
                console.log(err)
                this.setState({
                    loading: false
                })
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

        if (selectedProducts.length == 0 || orderNumber == '') {
            isFormOrderValid = false
            errorArray.push("Enter Order number and select products.")
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
            // let createdAt = moment().to
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
        let { orderArray } = this.state
        this.setState({
            searchOrderNumber: '',
            searchDate: '',
            allProducts: orderArray
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
                discountPrice: 0,
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

    onChangeDiscount(index, event) {
        let { selectedProducts } = this.state
        let findProduct = selectedProducts[index]
        let discount = event.target.value
        let quantity = findProduct.quantity
        let price = findProduct.productRetailPrice
        findProduct.discount = discount
        price = price * quantity
        if (findProduct.discountType == 1) {
            findProduct.totalPrice = price - discount
            findProduct.discountPrice = discount
        } else if (findProduct.discountType == 2) {
            let disPercent = price * (discount / 100)
            findProduct.discountPrice = disPercent
            findProduct.totalPrice = price - disPercent
        }
        this.setState({
            selectedProducts
        })
    }

    onChangeDiscountType(index, event) {
        let { selectedProducts } = this.state
        let findProduct = selectedProducts[index]
        let discount = findProduct.discount
        let quantity = findProduct.quantity
        let price = findProduct.productRetailPrice
        let discountType = event.target.value
        price = price * quantity
        findProduct.discountType = discountType

        if (findProduct.discountType == 1) {
            findProduct.totalPrice = price - discount
            findProduct.discountPrice = discount
        } else if (findProduct.discountType == 2) {
            let disPercent = price * (discount / 100)
            findProduct.discountPrice = disPercent
            findProduct.totalPrice = price - disPercent
        }

        this.setState({
            selectedProducts
        })
    }

    onChangePrice(index, event) {
        let { selectedProducts } = this.state
        let findProduct = selectedProducts[index]

        let quantity = event.target.value
        findProduct.quantity = quantity
        let totalPrice = findProduct.productRetailPrice * quantity
        findProduct.totalPrice = totalPrice
        selectedProducts[index] = findProduct

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

    getTotalDiscountPrice(products) {
        return products.map(x => x.discountPrice).reduce((total, current) => parseInt(total) + parseInt(current))
    }

    searchOrder() {
        let { page, limit } = this.state

        this.fetchOrders(page, limit)
    }
    onChangePage(data) {
        let { page, limit } = this.state
        
        page = data - 1
        this.setState({
            page
        })
        this.fetchOrders(page, limit)
    }
    render() {

        let { allProducts, page, selectedProducts, loading, orderNumber, totalRecords, columns, errorArray, isFormOrderValid, allOrders, searchOrderNumber, searchDate } = this.state
        console.log(page)
        console.log(allOrders)
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
                                            <input name="searchOrderNumber" value={searchOrderNumber} onChange={this.searchOnchange} type="text" className="form-control txt_SearchUserName " />
                                        </div>
                                        <div className="col-sm-3">
                                            <label for=" ">Date</label>
                                            <input name="searchDate" value={searchDate} onChange={this.searchOnchange} type="date" className="form-control txt_SearchUserName " />
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
                                        <button onClick={this.searchOrder} className="btn btn-block  btn-sm  btn-outline-success mt-2 mb-2 float-right">Search</button>
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
                                                    expandableRows={true}
                                                    data={allOrders}
                                                    expandableRowsComponent={<RenderExpandableRow />}
                                                ></DataTable>
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
                                                                        <select name="discountType" onChange={this.onChangeDiscountType.bind(this, ind)} className="form-control">
                                                                            <option value="-1" disabled selected>..</option>
                                                                            {
                                                                                this.renderUserTypeOption()
                                                                            }
                                                                        </select>
                                                                    </td>
                                                                    <td>
                                                                        <input name="discount" type="number" className="form-control" onChange={this.onChangeDiscount.bind(this, ind)}></input>
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
                                                                <th scope="col">{this.getTotalDiscountPrice(selectedProducts)}</th>
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


function RenderExpandableRow(props) {
    let { data } = props
    return (
        <div className="alert alert-white">
            <h4>Products List</h4>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Discount Given</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.selectedProducts.map((x, ind) => {
                            return (
                                <tr key={ind}>
                                    <th scope="row">{(ind + 1)}</th>
                                    <td>{x.productName}</td>
                                    <td>{x.productRetailPrice}</td>
                                    <td>{x.quantity}</td>
                                    <td>{x.discountType == 1 ? x.discountPrice : x.discount + "%"}</td>
                                    <td>{x.totalPrice}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

