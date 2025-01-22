import { TouchableOpacity, View } from 'react-native'
import { ThemedText as Text } from '@/components/ThemedText'
import { useNavigation } from '@react-navigation/native'
import styles from './style'

export default function WelcomeScreen() {
    const navigation = useNavigation()
    
    return (
        <View style = { styles.mainContainer }>
            <View style = { styles.logoContainer }>
                <Text>LOGO HERE</Text>
            </View>
            
            <Text style = { styles.title }>Welcome to iGrocery</Text>
            <Text style = { styles.subtitle }>A new way to keep track of your grocery needs.</Text>

            <TouchableOpacity
                style = {[ styles.btns, styles.signupBtn ]}
                onPress = { () => navigation.navigate('Signup') }
            >
                <Text lightColor = '#fff' darkColor = '#fff' style = { styles.btnsText }>Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style = {[ styles.btns, styles.loginBtn ]}
                onPress = { () => navigation.navigate('Login') }
            >
                <Text lightColor = 'rgb(10, 132, 255)' darkColor = 'rgb(10, 132, 255)' style = { styles.btnsText }>Log in</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style = {[ styles.btns, styles.loginBtn ]}
                onPress = { () => navigation.navigate('Main') }
            >
                <Text lightColor = 'rgb(10, 132, 255)' darkColor = 'rgb(10, 132, 255)' style = { styles.btnsText }>Backdoor entrance</Text>
            </TouchableOpacity>
        </View>
    )
}