import { Button as Link, Platform, TextInput, TouchableOpacity, View } from 'react-native'
import { ThemedText as Text } from '@/components/ThemedText'
import { ThemedView as Div } from '@/components/ThemedView'
import { CustomTextInput as Input } from '@/components/CustomTextInput'
import { CustomButton as Button } from '@/components/CustomButton'
import { useColorScheme } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styles from './style'

export default function LoginScreen() {
    const theme = useColorScheme() ?? 'light'
    const navigation = useNavigation()

    return (
        <Div style = { styles.mainContainer }>
            <Text style = { styles.title }>Login</Text>

            <Input type = 'email' />

            <Input type = 'password' />

            { Platform.OS === 'ios' ? (
                <Link title = 'Forgot password?' />
            ) : (
                <TouchableOpacity>
                    <Text lightColor = '#000' darkColor = '#fff'>Forgot password?</Text>
                </TouchableOpacity>
            )}

            <Button title = 'Log in' type = 'primary' style = { styles.btn } />

            <Link 
                title = "Don't have an account?"
                onPress = { () => navigation.navigate('Signup') }
            />
        </Div>
    )
}