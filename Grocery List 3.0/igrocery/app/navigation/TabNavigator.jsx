import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { HapticTab } from '@/components/HapticTab'
import { Platform } from 'react-native'
import { SymbolView } from 'expo-symbols'

const Tab = createBottomTabNavigator()

// Tabs
import Home from '../screens/Home'
import Lists from '../screens/Lists'
import Items from '../screens/Items'
import Settings from '../screens/Settings'

const TabNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName = 'Home'
            screenOptions = {{
                headerShown: false,
                animation: 'fade',
                tabBarActiveTintColor: 'rgb(10, 132, 255)',
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                tabBarButton: HapticTab,
            }}
        >
            <Tab.Screen
                name = "Home"
                component = { Home }
                options = {{
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName

                        if (focused) {
                            iconName = Platform.OS === 'ios' ? 'house.fill' : 'home'
                        } else {
                            iconName = Platform.OS === 'ios' ? 'house' : 'home-outline'
                        }

                        return Platform.OS === 'ios' ? (
                            <SymbolView name = { iconName } size = { size } tintColor = { color } />
                        ) : (
                            <Ionicons name = { iconName } size = { size } color = { color } />
                        )
                    }
                }}
            />

            <Tab.Screen
                name = "Lists"
                component = { Lists }
                options = {{
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName

                        if (focused) {
                            iconName = Platform.OS === 'ios' ? 'list.bullet' : 'list'
                        } else {
                            iconName = Platform.OS === 'ios' ? 'list.bullet' : 'list-outline'
                        }

                        return Platform.OS === 'ios' ? (
                            <SymbolView name = { iconName } size = { size } tintColor = { color } />
                        ) : (
                            <Ionicons name = { iconName } size = { size } color = { color } />
                        )
                    }
                }}
            />
            
            <Tab.Screen
                name = "Items"
                component = { Items }
                options = {{
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName

                        if (focused) {
                            iconName = Platform.OS === 'ios' ? 'cart.fill' : 'cart'
                        } else {
                            iconName = Platform.OS === 'ios' ? 'cart' : 'cart-outline'
                        }

                        return Platform.OS === 'ios' ? (
                            <SymbolView name = { iconName } size = { size } tintColor = { color } />
                        ) : (
                            <Ionicons name = { iconName } size = { size } color = { color } />
                        )
                    }
                }}
            />
            
            <Tab.Screen
                name = "Settings"
                component = { Settings }
                options = {{
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName

                        if (focused) {
                            iconName = 'cog'
                        } else {
                            iconName = 'cog-outline'
                        }

                        return <Ionicons name = { iconName } size = { size } color = { color } />
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator