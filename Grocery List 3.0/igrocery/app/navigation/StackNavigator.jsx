import { createStackNavigator } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, Image, Platform, TouchableOpacity } from 'react-native'
import { SymbolView } from 'expo-symbols'
import { ThemedText as Text } from '@/components/ThemedText'
import { auth, storage } from '@/firebaseConfig'
import { getDownloadURL, ref, uploadBytes, listAll, deleteObject } from 'firebase/storage'
import { useEffect, useState } from 'react'

const Stack = createStackNavigator()

// Stacks
import Welcome from '../screens/Welcome/index'
import Login from '../screens/Login/index'
import Signup from '../screens/Signup/index'
import Main from './TabNavigator'
import Profile from '../screens/Profile/index'
import { useTheme } from '@/contexts/ThemeContext'

const StackNavigator = () => {
    const navigation = useNavigation()
    const { currentTheme } = useTheme()
    const theme = currentTheme === 'dark' ? 'dark' : 'light'

    const [ user, setUser ] = useState(auth.currentUser || null)
    const [ userProfileImage, setUserProfileImage ] = useState('')

    const fetchUserProfileImage = async (user) => {
        const storageRef = ref(storage, `users/${user.uid}/profile.jpg`)
        try {
            const url = await getDownloadURL(storageRef)
            setUserProfileImage(url)
        } catch (error) {
            return
        }
    }

    useEffect(() => {
        if (user) {
            fetchUserProfileImage(user)
        }
    }, [ user ])
    
    return (
        <Stack.Navigator
            initialRouteName = 'Welcome'
            screenOptions = {({ route }) => ({
                headerTransparent: true,
                headerTitle: '',
                headerLeft: route.name !== 'Welcome' ? () => (
                    <TouchableOpacity onPress = { () => navigation.goBack() }>
                        <Ionicons name = 'chevron-back' size = { 24 } color = 'rgb(10, 132, 255)' />
                    </TouchableOpacity>
                ) : null,
                headerStyle: {
                    height: 115,
                }
            })}
        >
            <Stack.Screen 
                name = 'Welcome'
                component = { Welcome }
                options = {({ route }) => {
                    const previousRouteName  = route.params?.from || null

                    let animationType = previousRouteName === 'main' ? 'fade' : 'slide_from_left'

                    return {
                        animation: animationType
                    }
                }}
            />
            
            <Stack.Screen
                name = 'Login'
                component = { Login }
            />
            
            <Stack.Screen
                name = 'Signup' 
                component = { Signup }
            />
            
            <Stack.Screen
                name = 'Main'
                component = { Main }
                options = {({ route }) => ({
                    animation: 'fade',
                    headerTransparent: false,
                    headerLeft: () => (
                        <View
                            style = {{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 10,
                            }}
                        >
                            <Image
                                source = { theme === 'light' ? require('@/assets/images/app/light_app_logo.png') : require('@/assets/images/app/dark_app_logo.png') }
                                style = {{ width: 40, height: 40 }}
                            />
                            <Text
                            lightColor = 'rgb(0, 0, 0)'
                            darkColor = 'rgb(255, 255, 255)'
                                style = {{
                                    fontSize: 28,
                                }}
                            >iGrocery</Text>
                        </View>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style = {{ marginRight: 10 }} onPress = { () => navigation.navigate('Profile') }>
                            {
                                userProfileImage ? (
                                    <Image
                                        source = {{ uri: userProfileImage }}
                                        style = {{ width: 35, height: 35, borderRadius: 15 }}
                                    />
                                ) : (
                                    Platform.OS === 'ios' ? (
                                        <SymbolView name = 'person.circle' size = { 35 } tintColor = 'rgb(10, 132, 255)' />
                                    ) : (
                                        <Ionicons name = 'person-circle' size = { 35 } color = 'rgb(10, 132, 255)' />
                                    )
                                )
                            }
                        </TouchableOpacity>
                    ),
                })}
            />

            <Stack.Screen
                name = 'Profile'
                component = { Profile }
                options = {{
                    presentation: 'modal',
                    headerLeft: () => (
                        <TouchableOpacity onPress = { () => navigation.goBack() }>
                            <Ionicons name = 'chevron-down' size = { 24 } color = 'rgb(10, 132, 255)' />
                        </TouchableOpacity>
                    ),
                    headerTitle: '',
                    headerStyle: {
                        height: 55
                    }
                }}
            />
        </Stack.Navigator>
    )
}

export default StackNavigator