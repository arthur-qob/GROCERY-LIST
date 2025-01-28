import { TouchableOpacity, View } from 'react-native'
import { ThemedText as Text } from '@/components/ThemedText'
import { ThemedView as Div } from '@/components/ThemedView'
import { CustomButton as Button } from '@/components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import styles from './style'

export default function WelcomeScreen() {
    const navigation = useNavigation()
    
    return (
        <Div>
            <View style = { styles.mainContainer }>
                <View style = { styles.logoContainer }>
                    <Text>LOGO HERE</Text>
                </View>
                
                <Text style = { styles.title }>Welcome to iGrocery</Text>
                <Text style = { styles.subtitle }>A new way to keep track of your grocery needs.</Text>

                <Button title = 'Sign up' style = {[ styles.btns ]} type = 'primary' onPress = { () => navigation.navigate('Signup') } />
                    
                <Button title = 'Log in' style = {[ styles.btns ]} type = 'secondary' onPress = { () => navigation.navigate('Login') } />
                
                <Button title = 'Backdoor entrance' style = {[ styles.btns ]} type = 'secondary' onPress = { () => navigation.navigate('Main') } />
            </View>
        </Div>
    )
}