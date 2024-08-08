import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import "firebase/auth"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    //   apiKey: "AIzaSyA3e-DoPN3PEd497rCD7O6qKSFcpEqHZSQ",
    //   authDomain: "react-list-demo.firebaseapp.com",
    //   projectId: "react-list-demo",
    //   storageBucket: "react-list-demo.appspot.com",
    //   messagingSenderId: "260151869989",
    //   appId: "1:260151869989:web:ccdeb5ecbb5d941ed935cc"
    apiKey: "AIzaSyBn1zKrghQoWbaTZ9O04Htr_L8sDkULj_4",
    authDomain: "clinicedge-cc34c.firebaseapp.com",
    projectId: "clinicedge-cc34c",
    storageBucket: "clinicedge-cc34c.appspot.com",
    messagingSenderId: "639114495384",
    appId: "1:639114495384:web:3da9689b3f9dce19dbd7ed"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const authDatabase = getAuth(app)
export const database = getFirestore(app)