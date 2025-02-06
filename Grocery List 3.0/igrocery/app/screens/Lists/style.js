import { StyleSheet } from 'react-native'
import { GlobalStyles as globals } from '@/app/global/styles'

const HomeScreenStyles = StyleSheet.create({
    mainContainer: globals.mainContainer,
    listsContainer: {
        // width: '80%',
        // height: '80%',
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'flex-start',
        // gap: 20,
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 20,
        gap: 20,
    },
    listsSeparator: {
        width: '100%',
        borderBottomWidth: 1,
    },
})

export default HomeScreenStyles