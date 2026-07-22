import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyB4s-952tAs4NU7clRdMs_YlZPoar06Te0',
  authDomain: 'portodzak-4b99f.firebaseapp.com',
  projectId: 'portodzak-4b99f',
  storageBucket: 'portodzak-4b99f.firebasestorage.app',
  messagingSenderId: '494620306321',
  appId: '1:494620306321:web:1c217428778af977f1c830',
  measurementId: 'G-BVRK3F81D6',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
