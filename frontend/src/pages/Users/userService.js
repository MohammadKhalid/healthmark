import Axios from "axios";
import { baseURL } from "../../helper/systemConstants";

export function GetAllUsers(params) {
    // return Axios.get(`${baseURL}/users`, {
    //     params
    // })
    return Axios.get(`http://localhost:5000/testproject-98a49/us-central1/users`, {
        params
    })
}


export function userLogin(payload) {
    return Axios.post(`${baseURL}/loginUser`, payload)
}

export function userEdit(payload) {
    return Axios.post(`${baseURL}/updateUser`, payload)
}