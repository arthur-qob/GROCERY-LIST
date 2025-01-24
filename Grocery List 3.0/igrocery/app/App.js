import { ThemedView as Div } from '@/components/ThemedView'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import StackNavigator from './navigation/StackNavigator'
import { useColorScheme } from 'react-native'


const CustomLightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'rgb(255, 255, 255)',
    },
}

const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: 'rgb(12, 12, 12)',
    }
}

export default function App() {
    const theme = useColorScheme() ?? 'light'

    const MyTheme = theme === 'dark' ? CustomDarkTheme : CustomLightTheme

    return (
        <NavigationContainer theme = { MyTheme }>
            <StackNavigator />
        </NavigationContainer>
    )   
}