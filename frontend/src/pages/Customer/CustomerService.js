import Axios from "axios";
import { baseURL } from "../../helper/systemConstants";

export function GetAllCustomer() {
    return Axios.post(`${baseURL}/getAllCustomer`)
}

export function CreateCustomer(payload){
    return Axios.post(`${baseURL}/createCustomer`,payload)
}