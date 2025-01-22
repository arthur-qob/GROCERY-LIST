import { StyleSheet } from 'react-native'

const HomeScreenStyles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 25,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 25,
    },
    listsContainer: {
        width: '80%',
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 20,
    },
})

export default HomeScreenStyles