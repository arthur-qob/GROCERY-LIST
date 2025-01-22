import { Button, TextInput, TouchableOpacity, View } from 'react-native'
import { ThemedText as Text } from '@/components/ThemedText'
import { CustomTextInput as Input } from '@/components/CustomTextInput'
import { useColorScheme } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styles from './style'

export default function LoginScreen() {
    const theme = useColorScheme() ?? 'light'
    const navigation = useNavigation()

    return (
        <View style = { styles.mainContainer }>
            <Text style = { styles.title }>Login</Text>

            <Input type = 'email' />

            <Input type = 'password' />

            <Button title = 'Forgot password?' />

            <TouchableOpacity style = { styles.btn }>
                <Text lightColor = '#fff' darkColor = '#fff'>Log in</Text>
            </TouchableOpacity>

            <Button 
                title = "Don't have an account?"
                onPress = { () => navigation.navigate('Signup') }
            />
        </View>
    )
}