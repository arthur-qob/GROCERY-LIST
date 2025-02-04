import { Platform, TouchableOpacity } from 'react-native'
import { ThemedText as Text } from '@/components/ThemedText'
import { ThemedView as Div } from '@/components/ThemedView'
import { CustomTextInput as Input } from '@/components/CustomTextInput'
import { CustomButton as Button } from '@/components/CustomButton'
import { Button as Link } from 'react-native'
import { useColorScheme } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styles from './style'
import { useState } from 'react'
import { Signup } from '@/utils/auth'
import Toast from 'react-native-toast-message'

export default function LoginScreen() {
    const theme = useColorScheme() ?? 'light'
    const navigation = useNavigation()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmation, setConfirmation] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSignup = async () => {
        setLoading(true)
    
        if (name === '' || email === '' || password === '') {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please enter your name, email, and password'
            })
            setLoading(false)
            return
        }
    
        if (password !== confirmation) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Passwords do not match'
            })
            setLoading(false)
            return
        }
    
        const signupResponse = await Signup(name, email, password)
        setLoading(false)
    
        if (signupResponse.response.type === 'error') {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: signupResponse.response.message,
                onShow: () => {
                    setEmail('')
                    setPassword('')
                }
            })
        } else {
            Toast.show({
                type: signupResponse.response.type,
                text1: signupResponse.response.type.charAt(0).toUpperCase() + signupResponse.response.type.slice(1),
                text2: signupResponse.response.message,
                onHide: () => {
                    setEmail('')
                    setPassword('')
                    navigation.navigate('Login')
                }
            })
        }
    }
    

    return (
        <Div style = { styles.mainContainer }>
            <Text style = { styles.title }>Sign up</Text>

            <Input type = "name" value = { name } onChangeText = { setName } />
            <Input type = "email" value = { email } onChangeText = { setEmail } />
            <Input type = "password" value = { password } onChangeText = { setPassword } />
            <Input type = "confirmation" value = { confirmation } onChangeText = { setConfirmation } />

            <Button title = "Sign up" type = "primary" style = { styles.btn } loading = { loading } onPress = { handleSignup } />

            {
                Platform.OS === 'ios' ? (
                    <Link title = 'Already have an account?' onPress = { () => navigation.navigate('Login') } />
                ) : (
                    <TouchableOpacity onPress = { () => navigation.navigate('Login') } >
                        <Text lightColor = 'rgb(10, 132, 255)' darkColor = 'rgb(10, 132, 255)'>Already have an account?</Text>
                    </TouchableOpacity>
                )
            }
        </Div>
    )
}