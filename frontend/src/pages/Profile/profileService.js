import Axios from "axios";
import { baseURL } from "../../helper/systemConstants";


export function updateProfile(payload){
    return Axios.post(`${baseURL}/updateUser`,payload)
}

export function updateProfileImage(payload){
    return Axios.post(`${baseURL}/updateProfileImage`,payload)
}