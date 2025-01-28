import React, { useRef, useEffect } from 'react'
import { Animated, useColorScheme } from 'react-native'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import StackNavigator from './navigation/StackNavigator'
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext'

function AppContent() {
    // const currentTheme = useColorScheme() ?? 'light'
    const { currentTheme } = useTheme()

    const themePackage = currentTheme === 'light' ? DefaultTheme : DarkTheme

    const animatedValue = useRef(new Animated.Value(0)).current

    const isDarkTheme = currentTheme === 'dark'

    const interpolatedBackgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgb(255, 255, 255)', 'rgb(12, 12, 12)'],
    })

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: isDarkTheme ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start()
    }, [isDarkTheme])

    const CustomTheme = {
        ...themePackage,
        colors: {
            ...themePackage.colors,
            background: currentTheme === 'light' ? 'rgb(243, 242, 248)' : 'rgb(0, 0, 0)',
            card: currentTheme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(28, 28, 30)',
        },
    }

    return (
        <NavigationContainer 
            theme = { CustomTheme }
        >
            <StackNavigator />
        </NavigationContainer>
    )
}

export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    )
}