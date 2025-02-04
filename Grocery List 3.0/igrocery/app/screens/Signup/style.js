import { StyleSheet } from 'react-native'
import { GlobalStyles as globals } from '@/app/global/styles'

const SignupScreenStyles = StyleSheet.create({
    mainContainer: [ globals.mainContainer, {
        gap: 5
    } ],
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