import { ThemedView as Div } from '@/components/ThemedView'
import { ThemedText as Text } from '@/components/ThemedText'
import { CustomButton as Button } from '@/components/CustomButton'
import { auth, db, storage } from '@/firebaseConfig'
import { User, onAuthStateChanged } from 'firebase/auth'
import { ref as dbRef, onValue } from 'firebase/database'
import { getDownloadURL, ref, uploadBytes, listAll, deleteObject } from 'firebase/storage'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'
import styles from './style'
import { View, Image, Platform, TouchableOpacity, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SymbolView } from 'expo-symbols'
import { useTheme } from '@/contexts/ThemeContext'

export default function ProfileScreen() {
    const { currentTheme } = useTheme()
    const theme = currentTheme === 'dark' ? 'dark' : 'light'

    const [user, setUser] = useState(auth.currentUser || null)
    const [userName, setUserName] = useState('')
    const [userImage, setUserImage] = useState('')
    const [ emailVerified, setEmailVerified ] = useState(false)

    const [ newName, setNewName ] = useState('')
    const [ newEmail, setNewEmail ] = useState('')

    const fetchUserImage = async (user) => {
        const storageRef = ref(storage, `users/${user.uid}/profile.jpg`)
        try {
            const url = await getDownloadURL(storageRef)
            setUserImage(url)
        } catch (error) {
            return
        }
    }
    
    useEffect(() => {
        if (user) {
            const userRef = dbRef(db, `users/${user.uid}/name`)
            onValue(userRef, (snapshot) => {
                const data = snapshot.val()
                setUserName(data)
            })
            fetchUserImage(user)
        } else {
            onAuthStateChanged(auth, (user) => {
                setUser(user)
            })
        }
        
    }, [user])

    useEffect(() => {
        setEmailVerified(user.emailVerified)
    }, [user.emailVerified])

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (permissionResult.granted === false) {
            Toast.show({
                type: 'error',
                text1: 'Permission denied!',
                text2: 'Permission to access camera roll is required!'
            })
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setUserImage(result.assets[0].uri)
        }
    }

    const uploadImage = async () => {
        if (!user || !userImage) {
            Alert.alert('No user or image found!')
            return
        }

        try {
            const response = await fetch(userImage)
            const blob = await response.blob()
            const storageRef = ref(storage, `users/${user.uid}/profile.jpg`)
            await uploadBytes(storageRef, blob)
            const url = await getDownloadURL(storageRef)
            setUserImage(url)
        } catch (error) {
            console.error("Error uploading image: ", error)
            Alert.alert('Upload failed!', error.message)
        }
    }

    return (
        <Div style = { styles.mainContainer }>
            <View style = { styles.userInfoContainer }>
                <View style = { styles.userPictureContainer }>
                    {
                        userImage ? (
                            <>
                                <Image
                                    source = {{ uri: userImage }}
                                    style = { styles.profileImage }
                                />
                                <View style = {{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                                    <Button
                                        type = 'primary'
                                        title = 'Upload image'
                                        onPress = { uploadImage }
                                    />
                                    
                                    <Button 
                                        title = 'Change image'
                                        onPress = { pickImage }
                                    />
                                </View>
                            </>
                        ) : (

                            <View
                                style = {[ styles.noProfileImageContainer, 
                                    {
                                        backgroundColor: theme === 'light' ? 'rgb(228, 227, 233)' : 'rgb(28, 28, 30)',
                                    }
                                ]}
                            >
                                {
                                    Platform.OS === 'ios' ? (
                                        <Ionicons name = 'person-circle' size = { 80 } color = 'black' />
                                    ) : (
                                        <SymbolView name = 'person.circle' size = { 80 } tintColor = 'black' />
                                    )
                                }
                                <Text>No image</Text>
                            </View>
                        )
                    }
                </View>
                <View style = {[ styles.userDataContainer, {
                    backgroundColor: theme === 'dark' ? 'rgb(28, 28, 30)' : 'rgb(255, 255, 255)'
                } ]}>
                    <View style = { styles.userDataRows }>
                        <Text>Name:</Text>
                        <TextInput
                            value = { userName }
                            onChangeText = { setNewName }
                            style = {{
                                color: theme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
                                fontSize: 16
                            }}
                        />
                    </View>

                    <View style = {[ styles.userDataContainerSeparator, {
                        borderBottomColor: theme === 'light' ? 'rgb(228, 227, 233)' : 'rgb(142, 142, 147)',
                    } ]} />

                    <View style = { styles.userDataRows }>
                        <Text>Email:</Text>
                        <TextInput
                            value = { user.email }
                            onChangeText = { setNewEmail }
                            style = {{
                                color: theme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
                                fontSize: 16
                            }}
                        />
                    </View>
                    
                    <View style = {[ styles.userDataContainerSeparator, {
                        borderBottomColor: theme === 'light' ? 'rgb(228, 227, 233)' : 'rgb(142, 142, 147)',
                    } ]} />
                    <View style = {{
                        alignSelf: 'flex-start',
                    }}>
                        {
                            !user.emailVerified ? (
                                <View style = { styles.warningAlert }>
                                    {
                                        Platform.OS === 'ios' ? (
                                            <Ionicons name = 'warning' size = { 20 } color = 'rgb(246, 198, 9)' />
                                        ) : (
                                            <SymbolView name = 'exclamationmark.triangle' size = { 20 } tintColor = 'rgb(246, 198, 9)' />
                                        )
                                    }
                                    <Text style = { styles.warningText }>Email not verified!</Text>
                                </View>
                            ) : (
                                <View style = { styles.successAlert }>
                                    {
                                        Platform.OS === 'ios' ? (
                                            <Ionicons name = 'checkmark' size = { 20 } color = 'rgb(52, 200, 91)' />
                                        ) : (
                                            <SymbolView name = 'checkmark' size = { 20 } tintColor = 'rgb(52, 200, 91)' />
                                        )
                                    }
                                    <Text style = { styles.successText }>Email verified!</Text>
                                </View>
                            )
                        }
                    </View>
                </View>
            </View>
        </Div>
    )
}