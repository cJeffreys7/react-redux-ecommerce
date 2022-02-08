import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithPopup } from  'firebase/auth'
import firebaseConfig from './config'

const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
export const firestore = getFirestore(firebaseApp)

const GoogleProvider = new GoogleAuthProvider()
GoogleProvider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => signInWithPopup(auth, GoogleProvider)

export const handleUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return
  const { uid } = userAuth

  const userRef = doc(firestore, 'users', uid)
  const snapshot = await getDoc(userRef)
  
  if (!snapshot.exists()) {
    const { displayName, email } = userAuth
    const timestamp = new Date()
    try {
      await setDoc(doc(firestore, 'users', uid), {
        displayName,
        email,
        createdDate: timestamp,
        ...additionalData
      })
    } catch (error) {
      // console.log(error)
    }
  }

  return userRef
}