import Axios from "axios";
import { baseURL } from "../../helper/systemConstants";

export function GetAllUsers(){
    return Axios.post(`${baseURL}/users`)
}


export function userLogin(payload){
    return Axios.post(`${baseURL}/loginUser`,payload)
}

export function userEdit(payload){
    return Axios.post(`${baseURL}/updateUser`,payload)
}