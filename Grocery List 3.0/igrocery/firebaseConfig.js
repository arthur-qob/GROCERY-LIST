import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'

const firebaseConfig = {
    apiKey: Constants.expoConfig.extra.firebase.API_KEY,
    authDomain: Constants.expoConfig.extra.firebase.AUTH_DOMAIN,
    databaseURL: Constants.expoConfig.extra.firebase.DATABASE_URL,
    projectId: Constants.expoConfig.extra.firebase.PROJECT_ID,
    storageBucket: Constants.expoConfig.extra.firebase.STORAGE_BUCKET,
    messagingSenderId: Constants.expoConfig.extra.firebase.MESSAGING_SENDER_ID,
    appId: Constants.expoConfig.extra.firebase.APP_ID,
    measurementId: Constants.expoConfig.extra.firebase.MESSAGING_SENDER_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const db = getDatabase(app)
export const storage = getStorage(app)