import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styles from './style'

export default function HomeScreen() {
    const navigation = useNavigation()

    return (
        <View style = { styles.mainContainer }>
            <Text>Home</Text>

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

            <TouchableOpacity
                style = { styles.button }
                onPress = { () => { navigation.navigate('Task') } }
            >
                <Text>Task Modal</Text>
            </TouchableOpacity>
        </View>
    )
}