import { StyleSheet } from 'react-native'
import { GlobalStyles as global } from '@/app/global/styles'

const HomeScreenStyles = StyleSheet.create({
    mainContainer: global.mainContainer,
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