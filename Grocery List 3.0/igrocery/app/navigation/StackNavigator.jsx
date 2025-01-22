import { createStackNavigator } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Stack = createStackNavigator()

// Stacks
import Welcome from '../screens/Welcome/index'
import Login from '../screens/Login/index'
import Signup from '../screens/Signup/index'
import Main from './TabNavigator'
import Task from '../screens/Task/index'
import { TouchableOpacity } from 'react-native'

const StackNavigator = () => {
    const navigation = useNavigation()
    
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
                options = {{
                    animation: 'fade',
                    headerShown: false
                }}
            />

            <Stack.Screen
                name = 'Task'
                component = { Task }
                options = {{
                    presentation: 'modal',
                    headerLeft: () => (
                        <TouchableOpacity onPress = { () => navigation.goBack() }>
                            <Ionicons name = 'chevron-down' size = { 24 } color = 'rgb(10, 132, 255)' />
                        </TouchableOpacity>
                    ),
                    headerTitle: 'Task'
                }}
            />
        </Stack.Navigator>
    )
}

export default StackNavigator