import React, { useRef, useEffect } from 'react'
import { Animated } from 'react-native'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import StackNavigator from './navigation/StackNavigator'
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext'

function AppContent() {
    const { currentTheme } = useTheme()

    const themePackage = currentTheme === 'light' ? DefaultTheme : DarkTheme

    const animatedValue = useRef(new Animated.Value(0)).current

    const isDarkTheme = currentTheme === 'dark'

    // Interpolating the background color between light and dark themes
    const interpolatedBackgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgb(255, 255, 255)', 'rgb(12, 12, 12)'], // Light to Dark
    })

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: isDarkTheme ? 1 : 0,
            duration: 300,
            useNativeDriver: false, // Needed for color animations
        }).start()
    }, [isDarkTheme])

    const CustomTheme = {
        ...themePackage,
        colors: {
            ...themePackage.colors,
            primary: 'rgb(10, 132, 255)', // Custom primary color
            background: interpolatedBackgroundColor, // Animated background color
        },
    }

    return (
        <NavigationContainer 
            // theme = { CustomTheme }
            theme = { themePackage }
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