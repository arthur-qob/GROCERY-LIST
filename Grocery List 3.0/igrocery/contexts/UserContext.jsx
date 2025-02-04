import { createContext, useContext, useState, useEffect } from 'react'
import { auth, db, storage } from '@/firebaseConfig'
import { User, onAuthStateChanged } from 'firebase/auth'
import { ref as dbRef, onValue, set } from 'firebase/database'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(auth.currentUser || null)
    const [userName, setUserName] = useState('')
    const [userImage, setUserImage] = useState(null)
    const [emailVerified, setEmailVerified] = useState(false)

    // Listen for Firebase Auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser)
            if (firebaseUser) {
                fetchUserData(firebaseUser)
            } else {
                setUserName('')
                setUserImage('')
                setEmailVerified(false)
            }
        })

        return () => unsubscribe()
    }, [])

    // Fetch user's name and profile picture from Firebase
    const fetchUserData = async (firebaseUser) => {
        if (!firebaseUser) return

        // Fetch user name from Realtime Database
        const userRef = dbRef(db, `users/${firebaseUser.uid}/name`)
        onValue(userRef, (snapshot) => {
            const name = snapshot.val()
            setUserName(name || '')
        })

        // Fetch profile picture from Firebase Storage
        try {
            const storageRef = ref(storage, `users/${firebaseUser.uid}/profile.jpg`)
            const url = await getDownloadURL(storageRef).catch(() => null)
            setUserImage(url)
        } catch (error) {
            console.error('Error fetching user image:', error)
        }

        setEmailVerified(firebaseUser.emailVerified)
    }

    // Function to update the user name in Firebase Realtime Database
    const updateUserName = async (newName) => {
        if (!user) return

        try {
            await set(dbRef(db, `users/${user.uid}/name`), newName)
            setUserName(newName) // Update local state
        } catch (error) {
            console.error("Error updating user name:", error)
        }
    }

    // Function to upload a new profile picture
    const uploadProfileImage = async (imageUri) => {
        if (!user || !imageUri) return

        try {
            const response = await fetch(imageUri)
            const blob = await response.blob()
            const storageRef = ref(storage, `users/${user.uid}/profile.jpg`)

            await uploadBytes(storageRef, blob)
            const url = await getDownloadURL(storageRef)
            setUserImage(url) // Update local state
        } catch (error) {
            console.error("Error uploading image:", error)
        }
    }

    return (
        <UserContext.Provider value = {{ 
            user, userName, userImage, emailVerified, 
            updateUserName, uploadProfileImage 
        }}>
            {children}
        </UserContext.Provider>
    )
}

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext)
