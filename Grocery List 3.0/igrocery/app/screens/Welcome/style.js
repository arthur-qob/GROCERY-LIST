import { StyleSheet } from 'react-native'
import { GlobalStyles as globals } from '@/app/global/styles'

const WelcomeScreenStyles = StyleSheet.create({
    mainContainer: [ globals.mainContainer, {
        gap: 0
    } ],
    logo: {
        height: 200,
        width: 200,
        marginBottom: 50,
    },
    logoContainer: {
        height: 100,
        width: 100,
        backgroundColor: 'grey',
        borderRadius: 50,
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 50
    },
    btns: {
        width: '80%',
        marginBottom: 20,
    },
})

export default WelcomeScreenStyles