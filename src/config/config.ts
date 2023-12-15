import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


// Firebase config setup - details are stored in a .env file for security
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    databaseURL: import.meta.env.VITE_DATABASE_URL
}


const app = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(app)

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import { child, get, getDatabase, ref, set } from 'firebase/database'


const db = getDatabase()


// Writes user data upon login
export function writeUserData(uid: string, name: string, email: string, imageURL: string) {
    const reference = ref(db, 'users/' + uid)
    const dbRef = ref(getDatabase())

    // Gets the location of the data, checks the value of XP and updates session storage, if no XP was found, sets XP to 0 (to avoid NaN bug)
    get(child(dbRef, 'users/' + uid + "/XPAmount")).then((snapshot) => {
        if (snapshot.exists()) {
            console.log("VALUE OF XP  " + snapshot.val())
            if (snapshot.val() > 0) {
                sessionStorage.setItem("XPAmount", snapshot.val() || '')
            } else {
                sessionStorage.setItem("XPAmount", "0" || '')
            }
        } else {
            // If XP has not been found, assumes it is a new user and sets up the database with their details
            console.log("XP HAS NOT BEEN FOUND")
            sessionStorage.setItem("XPAmount", "0" || '')
            set(reference, {
                name: name,
                email: email,
                image: imageURL,
                XPAmount: 0,
            })
        }
    })

}

// Updates user data upon logout
export function updateXPAmount(uid: string, name: string, email: string, imageURL: string) {
    const totalXP: any = sessionStorage.getItem("XPAmount")
    const updateXPVal = parseInt(totalXP)

    console.log("this is the updated xp amount in firebase :  " + updateXPVal)

    const reference = ref(db, 'users/' + uid)

    set(reference, {
        name: name,
        email: email,
        image: imageURL,
        XPAmount: updateXPVal,
    })
}

// Returns XP retrieved from the database
export async function getXPFromDatabase(uid: string) {

    const snapshot = await get(ref(db, '/users/' + uid + '/XPAmount'))
    const xpValue = snapshot.val()
    
    return xpValue
}

// Sets XP in the database
export async function setXPFromDatabase(uid: string, xp: number) {
    await set(ref(db, '/users/' + uid + '/XPAmount'), xp)
}