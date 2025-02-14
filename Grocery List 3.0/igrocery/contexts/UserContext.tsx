import React, { createContext, useEffect, useState, useContext, ReactNode } from 'react'
import { auth, db, strg } from '@/firebaseConfig'
import { User, onAuthStateChanged } from 'firebase/auth'
import { ref as dbRef, onValue, set } from 'firebase/database'
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'

// Define the context type
interface UserContextProps {
    user: User | null
    userName: string
    userImage: string | null
    emailVerified: boolean
    updateUserName: (newName: string) => Promise<void>
    uploadProfileImage: (imageUri: string) => Promise<void>
}

interface UserProviderProps {
    children: ReactNode
}

// Create UserContext with default values
const UserContext = createContext<UserContextProps | null>(null)

// Provider component
export const UserProvider = ({ children }: UserProviderProps) => {
    const [user, setUser] = useState<User | null>(auth.currentUser)
    const [userName, setUserName] = useState('')
    const [userImage, setUserImage] = useState<string | null>(null)
    const [emailVerified, setEmailVerified] = useState(false)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser)

            if (firebaseUser) {
                fetchUserData(firebaseUser)
            } else {
                setUserName('')
                setUserImage(null)
                setEmailVerified(false)
            }
        })

        return () => unsubscribe()
    }, [])

    const fetchUserData = async (firebaseUser: User) => {
        if (!firebaseUser) return

        // Fetch user name from Realtime Database
        const userRef = dbRef(db, `users/${firebaseUser.uid}/name`)
        const unsubscribe = onValue(userRef, (snapshot) => {
            const name = snapshot.val()
            setUserName(name || '')
        })

        // Fetch profile picture from Firebase Storage
        try {
            const profilePicRef = storageRef(strg, `users/${firebaseUser.uid}/profile.jpg`)
            const url = await getDownloadURL(profilePicRef).catch(() => null)
            setUserImage(url)
        } catch (error) {
            console.error('Error fetching user image:', error)
        }

        setEmailVerified(firebaseUser.emailVerified)

        return () => unsubscribe() // Clean up listener
    }

    const updateUserName = async (newName: string) => {
        if (!user) return

        try {
            await set(dbRef(db, `users/${user.uid}/name`), newName)
            setUserName(newName)
        } catch (error) {
            console.error('Error updating user name:', error)
        }
    }

    const uploadProfileImage = async (imageUri: string) => {
        if (!user || !imageUri) return

        try {
            const response = await fetch(imageUri)
            const blob = await response.blob()
            const imageRef = storageRef(strg, `users/${user.uid}/profile.jpg`)

            await uploadBytes(imageRef, blob)
            const url = await getDownloadURL(imageRef)
            setUserImage(url)
        } catch (error) {
            console.error('Error uploading image:', error)
        }
    }

    return (
        <UserContext.Provider value = {{ user, userName, userImage, emailVerified, updateUserName, uploadProfileImage }}>
            { children }
        </UserContext.Provider>
    )
}

// Custom hook to use the UserContext
export const useUser = (): UserContextProps => {
    const context = useContext(UserContext)
    if (!context) throw new Error('useUser must be used within a UserProvider')
    return context
}