import Axios from "axios";
import { baseURL } from "../../helper/systemConstants";

export function userSignUp(payload){
    return Axios.post(`${baseURL}/createUser`,payload)
}


export function userLogin(payload){
    return Axios.post(`${baseURL}/loginUser`,payload)
}