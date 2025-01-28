import { StyleSheet } from 'react-native'

const WelcomeScreenStyles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 25,
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