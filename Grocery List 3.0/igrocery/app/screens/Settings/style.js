import { StyleSheet } from 'react-native'

const SettingsScreenStyles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },
    sectionTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: 20
    },
    button: {
        width: '50%',
    },
    swithTable: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 20,
        gap: 20,
    },
    switchContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
    },
    switchContainerSeparator: {
        width: '100%',
        borderBottomWidth: 1,
    }    
})

export default SettingsScreenStyles