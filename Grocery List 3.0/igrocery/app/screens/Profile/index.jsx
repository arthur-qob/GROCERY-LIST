import { useUser } from '@/contexts/UserContext'
import * as ImagePicker from 'expo-image-picker'
import { useEffect, useState } from 'react'
import { Image, View, Platform, ActivityIndicator } from 'react-native'
import { ThemedView as Div } from '@/components/ThemedView'
import { ThemedText as Text } from '@/components/ThemedText'
import { CustomButton as Button } from '@/components/CustomButton'
import Toast from 'react-native-toast-message'
import { SymbolView } from 'expo-symbols'
import { Ionicons } from '@expo/vector-icons'
import styles from './style'
import { useTheme } from '@/contexts/ThemeContext'

export default function ProfileScreen() {
    const { currentTheme } = useTheme()
    const theme = currentTheme === 'dark' ? 'dark' : 'light'
    const { user, userName, userImage, uploadProfileImage } = useUser()

    const [newName, setNewName] = useState('')
    const [pickedImageUri, setPickedImageUri] = useState(userImage || '')
    const [isLoading, setIsLoading] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }, [])

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

        if (!result.canceled && result.assets.length > 0) {
            setPickedImageUri(result.assets[0].uri)
        }
    }

    const uploadImage = async () => {
        if (!pickedImageUri) {
            Toast.show({
                type: 'error',
                text1: 'No image selected!'
            })
            
            return
        }

        setLoading(true)

        setTimeout( async () => {
            try {
                await uploadProfileImage(pickedImageUri)
                setLoading(false)    
                Toast.show({
                    type: 'success',
                    text1: 'Success!',
                    text2: 'Profile image uploaded successfully!'
                })
            } catch (error) {
                setLoading(false)
                Toast.show({
                    type: 'error',
                    text1: 'Error!',
                    text2: 'Failed to upload image!'
                })
            }
        }, 1500)
    }

    return (
        <Div style = { styles.mainContainer }>
            { pickedImageUri ? (
                <View
                    style = {[ styles.profileImageContainer, {
                        backgroundColor: theme === 'dark' ? 'rgb(28, 28, 30)' : 'rgb(255, 255, 255)',
                    } ]}
                >
                    <Image
                        source = {{ uri: pickedImageUri }}
                        style = {{ width: 150, height: 150, borderRadius: 10, position: 'relative' }}
                        onLoadStart = { () => setIsLoading(true) }
                        onLoadEnd = { () => setIsLoading(false) }
                    />

                    {
                        isLoading && (
                            <View style = {{
                                position: 'absolute',
                                width: 150,
                                height: 150,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <ActivityIndicator animating = { true } size = 'small' color = { theme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)' } />
                            </View>
                        )
                    }
                </View>
            ) : (
                <View style = { styles.profileImageContainer }>
                    {
                        Platform.OS === 'ios' ? (
                            <SymbolView name = 'person.circle' size = { 100 } tintColor = { theme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)' } />
                        ) : (
                            <Ionicons name = 'person-circle' size = { 100 } color = { theme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)' } />
                        )
                    }
                    <Text>No profile picture</Text>
                </View>
            )}
            
            <View style = {{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                marginTop: 10
            }}>
                <Button title = 'Pick an Image' type = 'primary' onPress = { pickImage } style = {{
                    width: '35%'
                }} />
                <Button title = 'Upload Image' loading = { loading } onPress = { uploadImage } style = {{
                    width: '35%'
                }} />
            </View>

            <View style = {[ styles.userDataContainer, {
                backgroundColor: theme === 'dark' ? 'rgb(28, 28, 30)' : 'rgb(255, 255, 255)'
            } ]}>
                <View style = { styles.userDataRows }>
                    <Text>Name:</Text>
                    <Text>{ userName }</Text>
                </View>

                <View style = {[ styles.userDataContainerSeparator, {
                    borderBottomColor: theme === 'light' ? 'rgb(228, 227, 233)' : 'rgb(142, 142, 147)'
                } ]}></View>

                <View style = { styles.userDataRows }>
                    <Text style = {{
                        alignSelf: 'flex-start'
                    }}>Email:</Text>
                    <View>
                        <Text>{ user.email }</Text>
                        <View style = {{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                            marginTop: 5
                        }}>
                            {
                                user.emailVerified ? (
                                    <>
                                        {
                                            Platform.OS === 'ios' ? (
                                                <SymbolView name = 'checkmark.circle' size = { 20 } tintColor = 'rgb(52, 200, 91)' />
                                            ) : (
                                                <Ionicons name = 'checkmark-circle' size = { 20 } color = 'rgb(52, 200, 91)' />
                                            )
                                        }
                                        <Text style = {{ color: 'rgb(52, 200, 91)' }}>Email verified</Text>
                                    </>
                                ) : (
                                    <>
                                        {
                                            Platform.OS === 'ios' ? (
                                                <SymbolView name = 'exclamationmark.triangle' size = { 20 } tintColor = 'rgb(246, 198, 9)' />
                                            ) : (
                                                <Ionicons name = 'exclamationmark-triangle' size = { 20 } color = 'rgb(246, 198, 9)' />
                                            )
                                        }
                                        <Text style = {{ color: 'rgb(246, 198, 9)' }}>Email not verified</Text>
                                    </>
                                )
                            }
                        </View>
                    </View>
                </View>
            </View>
        </Div>
    )
}