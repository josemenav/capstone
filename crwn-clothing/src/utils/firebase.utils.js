import { initializeApp } from "firebase/app";
import {getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
} from 'firebase/auth' 
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBClFScU3btGrXqOk6w6t_k5-gcwt7u5Ns",
  authDomain: "crwn-clothing-db-413b3.firebaseapp.com",
  projectId: "crwn-clothing-db-413b3",
  storageBucket: "crwn-clothing-db-413b3.appspot.com",
  messagingSenderId: "107714589372",
  appId: "1:107714589372:web:ef12656706b55a1a1f56b9"
};

const firebaseApp = initializeApp(firebaseConfig); 
const provider = new GoogleAuthProvider(); 

provider.setCustomParameters({
  prompt: "select_account"
}); 

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); 
export const db = getFirestore(); 

export const createUserDocumentFromAuth = async (userAuth, aditionalInformation) => {
  const userDocRef = doc(db, 'users', userAuth.uid); 
  console.log(userDocRef); 
  const userSnapshot = await getDoc(userDocRef); 
  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth; 
    const createdAt = new Date(); 
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt, 
        ...aditionalInformation
      }); 
    } catch (error) {
      console.log('error creating user', error.message); 
    }
  }

  return userDocRef; 
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return; 
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return; 
  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth); 

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback); 
}