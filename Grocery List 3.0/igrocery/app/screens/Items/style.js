import { StyleSheet } from 'react-native'

const ItemsScreenStyles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 20
    },
    searchBar: {
        width: '80%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        borderRadius: 10,
    },
    searchBarInput: {
        width: '100%',
        height: 35,
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