import Axios from "axios";
import { baseURL } from "../../helper/systemConstants";

export function userSignUp(payload){
    return Axios.post(`${baseURL}/createUser`,payload)
}