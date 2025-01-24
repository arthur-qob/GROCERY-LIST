import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

// Tabs
import Home from '../screens/Home'
import Lists from '../screens/Lists'
import Items from '../screens/Items'
import Settings from '../screens/Settings'

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions = {{
                headerShown: false,
                animation: 'fade'
            }}
        >
            <Tab.Screen
                name = 'Home'
                component = { Home }
            />
            
            <Tab.Screen
                name = 'Lists'
                component = { Lists }
            />

            <Tab.Screen
                name = 'Items'
                component = { Items }
            />

            <Tab.Screen
                name = 'Settings'
                component = { Settings }
            />
        </Tab.Navigator>
    )
}

export default TabNavigator