import { ThemedView as Div } from '@/components/ThemedView'
import { ThemedText as Text } from '@/components/ThemedText'
import styles from './style'
import { useNavigation } from '@react-navigation/native'
import { Button, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@/contexts/ThemeContext'

export default function SettingsScreen() {
    const navigation = useNavigation()
    const { themeOption, changeTheme } = useTheme()

    return (
        <Div style = { styles.mainContainer }>
            <Text>Settings</Text>

            <TouchableOpacity
                style = { styles.button }
                onPress = {() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Welcome', params: { from: 'main' } }],
                    })
                }}
            >
                <Text>Exit</Text>
            </TouchableOpacity>

            <View>
                <Text>Current Theme: { themeOption }</Text>
            </View>

            <Button title = "Change to Light" onPress = {() => changeTheme('light')} />
            <Button title = "Change to Dark" onPress = {() => changeTheme('dark')} />
            <Button title = "Change to Match System" onPress = {() => changeTheme('system')} />
        </Div>
    )
}