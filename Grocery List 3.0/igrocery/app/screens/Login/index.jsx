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
import { Login } from '@/utils/auth'
import Toast from 'react-native-toast-message'

export default function LoginScreen() {
    const theme = useColorScheme() ?? 'light'
    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        if (email === '' || password === '') {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please enter your email and password'
            })
            return
        }

        setLoading(true)

        const loginResponse = await Login(email, password)
        setLoading(false)

        if (loginResponse.response.type === 'error') {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: loginResponse.response.message,
                onShow: () => {
                    setEmail('')
                    setPassword('')
                }
            })
        } else {
            Toast.show({
                type: loginResponse.response.type,
                text1: loginResponse.response.type.charAt(0).toUpperCase() + loginResponse.response.type.slice(1),
                text2: loginResponse.response.message,
                onHide: () => {
                    setEmail('')
                    setPassword('')
                    navigation.navigate('Main', { from: 'auth' })
                }
            })
        }
    }

    return (
        <Div style = { styles.mainContainer } >
            <Text style = { styles.title } >Login</Text>

            <Input type = "email" value = { email }  onChangeText = { setEmail} />
            <Input type = "password" value = { password }  onChangeText = { setPassword } />

            { Platform.OS === 'ios' ? (
                <Link title = 'Forgot password' />
            ) : (
                <TouchableOpacity>
                    <Text lightColor = 'rgb(10, 132, 255)' darkColor = 'rgb(10, 132, 255)'>Forgot password?</Text>
                </TouchableOpacity>
            ) }

            <Button title = "Log in" type = "primary" style = { styles.btn }  loading = { loading }  onPress = { handleLogin }  />

            {
                Platform.OS === 'ios' ? (
                    <Link title = "Don't have an account?" onPress = { () => navigation.navigate('Signup') } />
                ) : (
                    <TouchableOpacity onPress = { () => navigation.navigate('Signup') } >
                        <Text lightColor = 'rgb(10, 132, 255)' darkColor = 'rgb(10, 132, 255)' style = {{ textAlign: 'center' }}>Don't have an account?</Text>
                    </TouchableOpacity>
                )
            }

        </Div>
    )
}