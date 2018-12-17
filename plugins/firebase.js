import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

if (!firebase.apps.length) {
  firebase.initializeApp(process.env.firebaseConfig)
}

const firestore = firebase.firestore()
const provider = new firebase.auth.GoogleAuthProvider();
const fbProvider = new firebase.auth.FacebookAuthProvider();
const settings = { timestampsInSnapshots: true }
firestore.settings(settings)

export const db = firestore
export const auth = firebase.auth()
export const googleAuthProvider = provider
export const facebookAuthProvider = fbProvider
export const storage = firebase.storage().ref()
export const storagePath = firebase.storage()
