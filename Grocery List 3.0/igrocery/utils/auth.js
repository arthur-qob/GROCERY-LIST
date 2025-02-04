import { auth, db } from '../firebaseConfig'
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { ref, set, get, query } from 'firebase/database'

export const Signup = async (name, email, password) => {
    if (name && validateEmail(email) && validatePassword(password)) {
        try {
            const userCred = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCred.user
            const userRef = ref(db, `users/${user.uid}`)
            const data = {
                role: 'USER',
                name,
                email,
                createdAt: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).replace(/[/]/g, '-').replace(',', ' | ')
            }
            await set(userRef, data)
            await sendEmailVerification(user)

            return {
                response: {
                    type: 'success',
                    message: 'User created successfully. Please check your email to verify your account.',
                }
            }
        } catch (e) {
            return {
                response: {
                    type: 'error',
                    message: e.message || 'An error occurred during signup.',
                }
            }
        }
    } else {
        return {
            response: {
                type: 'error',
                message: 'Invalid input. Ensure all fields are correctly filled.',
            }
        }
    }
}

export const Login = async (email, password) => {
    if (validateEmail(email) && validatePassword(password)) {
        try {
            const userCred = await signInWithEmailAndPassword(auth, email, password)
            const user = userCred.user
            const userRef = ref(db, `users/${user.uid}`)
            const userSnap = await get(query(userRef))

            if (userSnap.exists()) {
                const userData = userSnap.val()

                if (!user.emailVerified) {
                    return {
                        response: {
                            type: 'warning',
                            message: 'Your email is not verified. Please check your inbox.',
                        }
                    }
                }

                return {
                    response: {
                        type: 'success',
                        message: 'Login successful!',
                        data: userData,
                    }
                }
            }
        } catch (e) {
            return {
                response: {
                    type: 'error',
                    message: e.message || 'Login failed. Please check your credentials.',
                }
            }
        }
    } else {
        return {
            response: {
                type: 'error',
                message: 'Invalid email or password format.',
            }
        }
    }
}

export const Logout = async () => {
    try {
        await signOut(auth)
        return {
            response: {
                type: 'success',
                message: 'Successfully logged out.',
            }
        }
    } catch (e) {
        return {
            response: {
                type: 'error',
                message: e.message || 'Logout failed. Please try again.',
            }
        }
    }
}

// Utility functions
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const validatePassword = (password) => /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(password)