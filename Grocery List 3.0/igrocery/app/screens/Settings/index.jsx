import { ThemedView as Div } from '@/components/ThemedView'
import { ThemedText as Text } from '@/components/ThemedText'
import styles from './style'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'

export default function SettingsScreen() {
    const navigation = useNavigation()
    return (
        <Div style = { styles.mainContainer }>
            <Text>Settings</Text>

            <TouchableOpacity
                style = { styles.button }
                onPress = { () => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Welcome', params: { from: 'main' } }],
                    })
                } }
            >
                <Text>Exit</Text>
            </TouchableOpacity>
        </Div>
    )
}