import { Slot } from 'expo-router'
import { Platform } from 'react-native'
import { SymbolView } from 'expo-symbols'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function AuthLayout() {
    return (
        <Slot
            screenOptions = {({ route }) => {
                const commonHeaderOptions = {
                    headerTitle: '',
                    headerTransparent: true,
                }

                if (route.name === 'login' || route.name === 'signin') {
                    return {
                        ...commonHeaderOptions,
                        headerLeft: () => (
                            Platform.OS === 'ios' ? (
                                <SymbolView name = 'chevron.left' size = { 28 } tintColor = 'rgb(10, 132, 255)' />
                            ) : (
                                <Ionicons name = 'chevron-back' size = { 28 } color = 'rgb(10, 132, 255)' />
                            )
                        ),
                    }
                }

                return {
                    ...commonHeaderOptions,
                    headerLeft: () => null, 
                }
            }}
        />
    )
}