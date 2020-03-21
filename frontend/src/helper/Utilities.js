import history from '../History';
import Storage from './Storage';
export let localStorage_SaveKey = async (key, value) => {
    try {
        await localStorage.setItem(key, value);
    } catch (error) {
        console.log("Error saving data" + error);
    }
}

export let localStorage_GetKey = async (key) => {
    try {
        const value = await localStorage.getItem(key);
        return value;
    } catch (error) {
        console.log("Error retrieving data" + error);
    }
}

export let localStorage_RemoveKey = async (key) => {
    try {
        await localStorage.removeItem(key);
    } catch (error) {
        console.log("Error resetting data" + error);
    }
}

export const userType = [
    {
        id: 2,
        name: "Admin"
    },
    {
        id: 3,
        name: "Sales"
    },
    {
        id: 4,
        name: "Hospital"
    },
    {
        id: 5,
        name: "Client"
    },
]

export const baseURL = "https://us-central1-testproject-98a49.cloudfunctions.net"

export const emailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

export const stringIsEmpty = (str) => {
    return (!str || /^\s*$/.test(str));
};

export const usersExist = async (route) => {
    var response = await localStorage_GetKey("userObject")
    if (response != null) {
        Storage.userObject = JSON.parse(response);
        history.replace(route)
        return Storage.userObject
    }
    else {
        history.replace('/Login')
        return {};
    }
}
