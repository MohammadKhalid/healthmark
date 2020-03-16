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