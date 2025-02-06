import { StyleSheet } from 'react-native'
import { GlobalStyles as globals } from '@/app/global/styles'

const ListScreenStyles = StyleSheet.create({
    mainContainer: globals.mainContainer,
    listDataContainer: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 20,
        gap: 20,
    },
    listDataRows: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10
    },
    listDataSeparator: {
        width: '100%',
        borderBottomWidth: 1,
    },
    collapsibleContainer: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        // alignItems: 'center',
        borderRadius: 10,
        padding: 20,
    },
    collapsibleRows: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        gap: 10
    },
})

export default ListScreenStyles