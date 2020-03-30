import Axios from "axios";
import { baseURL } from "../../helper/systemConstants";

export function getAllOrders(params) {
    return Axios.get(`${baseURL}/getAllOrders`, {
        params
    })
}

export function addOrder(payload) {
    return Axios.post(`${baseURL}/addOrder`, payload)
}