import Axios from "axios";
import { baseURL } from "../../helper/systemConstants";

export function getAllproducts() {
    return Axios.post(`${baseURL}/getAllInventory`)
}

export function getAllOrders() {
    return Axios.post(`${baseURL}/getAllOrders`)
}

export function addOrder(payload) {
    return Axios.post(`${baseURL}/addOrder`,payload)
}