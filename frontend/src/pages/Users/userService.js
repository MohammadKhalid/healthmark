import Axios from "axios";
import { baseURL } from "../../helper/systemConstants";

export function GetAllUsers(params) {
    return Axios.get(`${baseURL}/users`, {
        params
    })
}


export function userLogin(payload) {
    return Axios.post(`${baseURL}/loginUser`, payload)
}

export function userEdit(payload) {
    return Axios.post(`${baseURL}/updateUser`, payload)
}