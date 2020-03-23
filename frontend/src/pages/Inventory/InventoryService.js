import Axios from "axios";
import { baseURL } from "../../helper/systemConstants";

export function GetAllInventory() {
    return Axios.post(`${baseURL}/getAllInventory`)
}

export function InventoryEdit(payload){
    return Axios.post(`${baseURL}/updateInventory`,payload)
}
export function CreateInventory(payload){
    return Axios.post(`${baseURL}/createInventory`,payload)
}
export function DeleteInventory(payload){
    return Axios.post(`${baseURL}/deleteInventory`,payload)
}