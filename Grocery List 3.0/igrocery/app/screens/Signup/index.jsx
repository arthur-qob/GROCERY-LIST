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
            <Text style = { styles.title }>Sign up</Text>

            <Input type = 'name' />

            <Input type = 'email' />

            <Input type = 'password' />
            
            <Input type = 'confirmation' />

            <TouchableOpacity style = { styles.btn }>
                <Text lightColor = '#fff' darkColor = '#fff'>Sign up</Text>
            </TouchableOpacity>

            <Button 
                title = 'Already have an account?' 
                onPress = { () => navigation.navigate('Login') }
            />
        </View>
    )
}