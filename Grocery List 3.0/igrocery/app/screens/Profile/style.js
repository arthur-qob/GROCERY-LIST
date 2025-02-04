import { StyleSheet } from 'react-native'
import { GlobalStyles as globals } from '@/app/global/styles'

const ProfileScreenStyles = StyleSheet.create({
    mainContainer: globals.mainContainer,
    userInfoContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 25,
    },
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
    userPictureContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    noProfileImageContainer: {
        width: 150,
        height: 150,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userDataRows: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10
    },
    userDataContainerSeparator: {
        width: '100%',
        borderBottomWidth: 1,
    },
    warningAlert: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    successAlert: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    warningText: {
        color: 'rgb(246, 198, 9)'
    },
    successText: {
        color: 'rgb(52, 200, 91)'
    },
    profileImage: {
        width: 250,
        height: 250,
        borderRadius: 10,
        marginBottom: 10,
    },
})

export default ProfileScreenStyles