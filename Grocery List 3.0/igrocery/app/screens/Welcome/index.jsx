import { Image, TouchableOpacity, View } from 'react-native'
import { ThemedText as Text } from '@/components/ThemedText'
import { ThemedView as Div } from '@/components/ThemedView'
import { CustomButton as Button } from '@/components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import styles from './style'
import { useTheme } from '@/contexts/ThemeContext'

export default function WelcomeScreen() {
    const navigation = useNavigation()
    const { currentTheme } = useTheme()
    const theme = currentTheme === 'dark' ? 'dark' : 'light'

    const logo = theme === 'light' ? require('@/assets/images/app/light_app_logo.png') : require('@/assets/images/app/dark_app_logo.png')
    
    return (
        <Div>
            <View style = { styles.mainContainer }>
                {
                    logo ? (
                        <Image
                            source = { logo }
                            style = { styles.logo }
                        />
                    ) : (
                        <View style = { styles.logoContainer }>
                            <Text>LOGO HERE</Text>
                        </View>
                    )
                }
                
                <Text style = { styles.title }>Welcome to iGrocery</Text>
                <Text style = { styles.subtitle }>A new way to keep track of your grocery needs.</Text>

                <Button title = 'Sign up' style = {[ styles.btns ]} type = 'primary' onPress = { () => navigation.navigate('Signup') } />
                    
                <Button title = 'Log in' style = {[ styles.btns ]} type = 'secondary' onPress = { () => navigation.navigate('Login') } />
                
                {/* <Button title = 'Backdoor entrance' style = {[ styles.btns ]} type = 'secondary' onPress = { () => navigation.navigate('Main') } /> */}
            </View>
        </Div>
    )
}