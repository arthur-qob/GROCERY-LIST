import { Button as Link, TouchableOpacity, View } from 'react-native'
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
            <Text style = { styles.title }>Sign up</Text>

            <Input type = 'name' />

            <Input type = 'email' />

            <Input type = 'password' />
            
            <Input type = 'confirmation' />

            <Button title = 'Sign up' type = 'primary' style = { styles.btn } />

            <Link 
                title = 'Already have an account?' 
                onPress = { () => navigation.navigate('Login') }
            />
        </Div>
    )
}