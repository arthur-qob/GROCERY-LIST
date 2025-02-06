import { StyleSheet } from 'react-native'
import { GlobalStyles as globals } from '@/app/global/styles'

const ProfileScreenStyles = StyleSheet.create({
    mainContainer: globals.mainContainer,
    userDataContainer: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 20,
        gap: 20,
    },
    profileImageContainer: {
        width: 150,
        height: 150,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    userDataRows: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10
    },
    userDataContainerSeparator: {
        width: '100%',
        borderBottomWidth: 1,
    },
    profileImage: {
        width: 250,
        height: 250,
        borderRadius: 10,
        marginBottom: 10,
    },
})

export default ProfileScreenStyles