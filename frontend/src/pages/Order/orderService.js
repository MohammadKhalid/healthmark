import Axios from "axios";
import { baseURL } from "../../helper/systemConstants";

export function getAllOrders() {
    return Axios.get(`${baseURL}/getAllOrders`)
}

export function addOrder(payload) {
    return Axios.post(`${baseURL}/addOrder`,payload)
}