//import React from 'react'

// Reads display name from session storage
export const readDisplayName: () => string | null = () => {

    return (sessionStorage.getItem("displayName"))
}

// Reads email from session storage
export function readEmail() {

    return (sessionStorage.getItem("email"))
}

// Reads uid from session storage
export function readUID() {

    return (sessionStorage.getItem("uid"))

}

// Reads goole user profile pic url from session storage
export function readImageURL(): any {
    return (sessionStorage.getItem("imageURL"))
}

// Reads XP amount from session storage
export function readXPAmount(): any {
    return (sessionStorage.getItem("XPAmount"))
}

// Checks if user is logged in (based on content in session storage) - this is only used to redirect the user to the logged in state without reloading the page
export function isLoggedIn() {
    let keys = Object.keys(window.sessionStorage)

    if (sessionStorage.getItem(keys[0]) == null) {
        return (false)
    } else {
        return (true)
    }
}

// Returns the first name from the Google displayname
export function getFirstName() {
    let name = readDisplayName()
    const firstName:any = name?.split(" ")

    return (firstName[0])
}