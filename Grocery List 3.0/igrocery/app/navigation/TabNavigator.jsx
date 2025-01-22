import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

// Tabs
import Home from '../screens/Home'
import Lists from '../screens/Lists'

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
        </Tab.Navigator>
    )
}

export default TabNavigator