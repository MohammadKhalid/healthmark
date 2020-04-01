import Axios from "axios";
import { baseURL } from "../../helper/systemConstants";

export function GetAllCustomer(payload) {
    return Axios.get(`${baseURL}/getAllCustomer`, { params: payload })
}

export function CreateCustomer(payload) {
    return Axios.post(`${baseURL}/createCustomer`, payload)
}

export function CustomerEdit(payload){
    return Axios.post(`${baseURL}/updateCustomer`,payload)
}