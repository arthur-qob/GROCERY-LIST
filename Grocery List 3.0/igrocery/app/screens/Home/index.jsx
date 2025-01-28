import { TouchableOpacity, useColorScheme, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '@/contexts/ThemeContext'
import { ThemedView as Div } from '@/components/ThemedView'
import { ThemedText as Text } from '@/components/ThemedText'
import styles from './style'

export default function HomeScreen() {
    const navigation = useNavigation()

    return (
        <Div style = { styles.mainContainer }>
            <Text>Home</Text>

            <TouchableOpacity
                style = { styles.button }
                onPress = { () => { navigation.navigate('Task') } }
            >
                <Text>Task Modal</Text>
            </TouchableOpacity>
        </Div>
    )
}