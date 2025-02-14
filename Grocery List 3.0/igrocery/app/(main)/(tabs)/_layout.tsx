import { Tabs, useRouter } from 'expo-router'
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { SymbolView } from 'expo-symbols'
import { ThemedText as Text } from '@/components/ThemedText'
import { useTheme } from '@/contexts/ThemeContext'
import { useUser } from '@/contexts/UserContext'

export default function TabsLayout() {
    const router = useRouter()
    const { user, userImage } = useUser()
    const { currentTheme } = useTheme()
    const appLogo = currentTheme === 'light' ? require('@/assets/app/static/light/App Logo - Light Mode.png') : require('@/assets/app/static/dark/App Logo - Dark Mode.png')

    return (
        <Tabs
            screenOptions = {{
                tabBarActiveTintColor: 'rgb(10, 132, 255)',
                tabBarInactiveTintColor: 'rgb(174, 174, 178)',
                animation: 'fade'
            }}    
        >
            <Tabs.Screen
                name = 'index'
                options = {{
                    title: '',
                    headerLeft: () => (
                        <TouchableOpacity
                            style = { styles.tabHeaderLogo }
                            onPress = {() => router.replace('/tabs')}
                        >
                            <Image source = { appLogo } style = { styles.logoImg } />
                            <Text>iGrocery</Text>
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity
                            onPress = {() => router.push(`/profile/${user?.uid}`)}
                        >
                            {
                                userImage ? (
                                    <Image
                                        source = {{ uri: userImage }}
                                        style = { styles.userImg }
                                    />
                                ) : (
                                    Platform.OS === 'ios' ? (
                                        <SymbolView name = 'person.circle' size = { 28 } tintColor = 'rgb(10, 132, 255)' />            
                                    ) : (
                                        <Ionicons name = 'person-circle-outline' size = { 28 } color = 'rgb(10, 132, 255)' />    
                                    )
                                )
                            }
                        </TouchableOpacity>
                    ),
                    tabBarIcon: ({ focused, color, size }) => (
                        Platform.OS === 'ios' ? (
                            <SymbolView name = { focused ? 'house.fill' : 'house' } size = { size } tintColor = { color } />
                        ) : (
                            <Ionicons name = { focused ? 'home' : 'home-outline' } size = { size } color = { color } />
                        )
                    )
                }}
            />
            
            <Tabs.Screen
                name = 'lists'
                options = {{
                    title: '',
                    headerTransparent: true,
                    tabBarIcon: ({ focused, color, size }) => (
                        Platform.OS === 'ios' ? (
                            <SymbolView name = 'list.bullet' size = { size } tintColor = { color } />
                        ) : (
                            <Ionicons name = { focused ? 'list' : 'list-outline'} size = { size } color = { color } />
                        )
                    )
                }}
            />
            
            <Tabs.Screen
                name = 'items'
                options = {{
                    title: '',
                    headerTransparent: true,
                    tabBarIcon: ({ focused, color, size }) => (
                        Platform.OS === 'ios' ? (
                            <SymbolView name = { focused ? 'tag.fill' : 'tag'} size = { size } tintColor = { color } />
                        ) : (
                            <Ionicons name = { focused ? 'pricetag' : 'pricetag-outline'} size = { size } color = { color } />
                        )
                    )
                }}
            />
            
            <Tabs.Screen
                name = 'settings'
                options = {{
                    title: '',
                    headerTransparent: true,
                    tabBarIcon: ({ focused, color, size }) => (
                        Platform.OS === 'ios' ? (
                            <SymbolView name = 'gear' size = { size } tintColor = { color } />
                        ) : (
                            <Ionicons name = { focused ? 'cog' : 'cog-outline'} />
                        )
                    )
                }}
            />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    tabHeaderLogo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10
    },
    logoImg: {
        width: 40,
        height: 40
    },
    userImg: {
        width: 50,
        height: 50,
        borderRadius: 50
    }
})