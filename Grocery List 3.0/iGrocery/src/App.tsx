import { Platform, StyleSheet, Text, useColorScheme, View } from 'react-native'
import { AuthButtons } from './components/AuthButtons'

export default function App() {
    const theme = useColorScheme() ?? 'light'

    return (
        <View style = {[ styles.container, {
            backgroundColor: theme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
        } ]}>
            <Text style = { styles.title }>Social Auth Test</Text>

            <AuthButtons option = 'Google' />
            {
                Platform.OS === 'ios' && <AuthButtons option = 'Apple' />
            }
            <AuthButtons option = 'Facebook' />
            <AuthButtons />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})