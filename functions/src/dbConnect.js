// All these directions come from the SOURCE (GOOGLE) on how to build

import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { secrets } from "../secrets.js"; 

initializeApp({ // CONNECT TO OUR FIREBASE PROJECT
  credential: cert(secrets) //USING THESE CREDENTIALS
})

export const db = getFirestore() // connect us to FireStore DB