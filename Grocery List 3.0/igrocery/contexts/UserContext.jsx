import { createContext, useContext, useState, useEffect } from 'react'
import { auth, db, storage } from '@/firebaseConfig'
import { User, onAuthStateChanged } from 'firebase/auth'
import { ref as dbRef, onValue, set, get } from 'firebase/database'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(auth.currentUser || null)
    const [userUid, setUserUid] = useState('')
    const [userName, setUserName] = useState('')
    const [userRole, setUserRole] = useState('')
    const [userCreatedAt, setUserCreatedAt] = useState('')
    const [userImage, setUserImage] = useState(null)
    const [emailVerified, setEmailVerified] = useState(false)
    const [UserData, setUserData] = useState({})

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
    
        setUserUid(firebaseUser.uid)
    
        try {
            const nameSnapshot = await get(dbRef(db, `users/${firebaseUser.uid}/name`))
            setUserName(nameSnapshot.val() || '')
    
            const roleSnapshot = await get(dbRef(db, `users/${firebaseUser.uid}/role`))
            setUserRole(roleSnapshot.val() || '')
    
            const createdAtSnapshot = await get(dbRef(db, `users/${firebaseUser.uid}/createdAt`))
            setUserCreatedAt(createdAtSnapshot.val() || '')
    
            // Fetch da imagem no Storage
            const storageRef = ref(storage, `users/${firebaseUser.uid}/profile.jpg`)
            const url = await getDownloadURL(storageRef).catch(() => null)
            setUserImage(url)
    
            setEmailVerified(firebaseUser.emailVerified)
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error)
        }
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
            user,
            userUid,
            userName,
            userRole,
            userCreatedAt,
            userImage,
            emailVerified,
            updateUserName,
            uploadProfileImage
         }}>
            { children }
        </UserContext.Provider>
    )
}

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext)