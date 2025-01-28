import { StyleSheet } from 'react-native'

const HomeScreenStyles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },
    sectionContainers: {
        width: '100%',
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: 10,
        borderWidth: 1,
    },
    sectionTitles: {
        width: '100%',
    },
    section1BtnsContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    section1Btns: {
        width: '25%',
    }
})

export default HomeScreenStyles