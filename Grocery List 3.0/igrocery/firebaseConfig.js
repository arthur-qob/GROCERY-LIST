import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
    apiKey: 'AIzaSyA2Rdt3yfd2hdstlhgVAPLATaLBC95kwI0',
    authDomain: 'igrocery-2c454.firebaseapp.com',
    databaseURL: 'https://igrocery-2c454-default-rtdb.firebaseio.com',
    projectId: 'igrocery-2c454',
    storageBucket: 'igrocery-2c454.firebasestorage.app',
    messagingSenderId: '849621336121',
    appId: '1:849621336121:web:539a0083d8bec530b8cde8',
    measurementId: 'G-7S31SE3P1F'
}

const app = initializeApp(firebaseConfig)
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const db = getDatabase(app)
export const storage = getStorage(app)