import { ThemedView as Div } from '@/components/ThemedView'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import StackNavigator from './navigation/StackNavigator'

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'rgb(255, 255, 255)',
    },
}

export default function App() {
    return (
        <Div>
            <NavigationContainer theme = { MyTheme }>
                <StackNavigator />
            </NavigationContainer>
        </Div>
    )   
}