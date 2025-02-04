import { StyleSheet } from 'react-native'
import { GlobalStyles as globals } from '@/app/global/styles'

const ItemsScreenStyles = StyleSheet.create({
    mainContainer: globals.mainContainer,
    searchBar: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        borderRadius: 10,
    },
    searchBarInput: {
        width: '100%',
        height: 40,
        marginLeft: 5,
        fontSize: 16
    },
    itemsContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 20,
        paddingHorizontal: 10,
    },
})

export default ItemsScreenStyles