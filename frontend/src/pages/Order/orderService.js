import Axios from "axios";
import { baseURL } from "../../helper/systemConstants";

export function getAllproducts() {
    return Axios.post(`${baseURL}/getAllInventory`)
}

export function addOrder() {
    return Axios.post(`${baseURL}/addOrder`)
}