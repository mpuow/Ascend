//import React, { useEffect } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, setPersistence, browserSessionPersistence } from 'firebase/auth'
import { updateXPAmount, writeUserData } from '../config/config'
import Hero2nd from './Hero2nd'
import { Flex } from '@chakra-ui/react'
import { useRef } from 'react'
import About from './About'
import Hero1st from './Hero1st'
import Hero3rd from './Hero3rd'
import { readDisplayName, readEmail, readImageURL, readUID } from '../functions'
import Hero4th from './Hero4th'


// Sign out with Google function - updates XP in the database, clears sesstion storage and handles the Google sign out
export const signOutWithGoogle = async (props: any) => {

    updateXPAmount(readUID() as string, readDisplayName() as string, readEmail() as string, readImageURL() as string)

    const auth = getAuth()

    signOut(auth).then(() => {
        console.log("signed out")
        sessionStorage.clear()

        props.setLoggedState(false)
    }) .catch((error) => {
        console.log(error)
    })

}

// Sign in with Google function - handles authorising the user, setting up session storage and writing new user data
export const signInWithGoogle = async (props:any) => {
    
    const auth = getAuth()

    setPersistence(auth, browserSessionPersistence).then(() => {
        return(signInWithPopup(auth, new GoogleAuthProvider())
        .then(async response => {
            console.log(response.user.uid)
            console.log(response.user.displayName)
            console.log(response.user.email)

            sessionStorage.setItem("displayName", response.user.displayName || '')
            sessionStorage.setItem("email", response.user.email || '')
            sessionStorage.setItem("uid", response.user.uid || '')
            sessionStorage.setItem("imageURL", response.user.photoURL || '')
            sessionStorage.setItem("XPAmount", "0" || '')

            writeUserData(response.user.uid, response.user.displayName as string, response.user.email as string, response.user.photoURL as string)
            
            props.setLoggedState(true)
        })
        .catch(error => {
            console.log(error)
        }))
    })
}

// Renders all the home page components
const Hero = (props: any) => {

    // Set up the reference for the 'learn more' button
    const resultRef = useRef(null);

    return (
        <>
            <Hero1st setLoggedState={props.setLoggedState} />

            <Flex>
                
                {/* {<Hero2nd resultRef={resultRef} />} */}
                {/* This is not the proper way to do this but above doesnt work for some reason */}
                {Hero2nd(resultRef, props)}

            </Flex>

            <Hero4th />

            <Hero3rd />

            {<About setLoggedState={props.setLoggedState} ref={resultRef} />}

        </>
    )
}

export default Hero