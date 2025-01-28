import { StyleSheet } from "react-native"

const SignupScreenStyles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        marginTop: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        margin: 10,
    },
    btn: {
        width: '80%',
    },
})

export default SignupScreenStyles