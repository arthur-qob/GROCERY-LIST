import React, { useRef, useEffect, useState } from 'react'
import { Animated, useColorScheme } from 'react-native'
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import StackNavigator from '@/app/navigation/StackNavigator'
import { useTheme } from '@/contexts/ThemeContext'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'

export default function App() {
    // const currentTheme = useColorScheme() ?? 'light'
    const { currentTheme } = useTheme()

    const theme = currentTheme === 'light' ? 'light' : 'dark'

    const themePackage = currentTheme === 'light' ? DefaultTheme : DarkTheme

    const [ loaded, setLoaded ] = useState(false)

    const [fontsLoaded] = useFonts({
        'Poppins-Regular': require('@/assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf'),
        'Poppins-SemiBold': require('@/assets/fonts/Poppins-SemiBold.ttf'),
        'Poppins-Medium': require('@/assets/fonts/Poppins-Medium.ttf'),
        'Poppins-Light': require('@/assets/fonts/Poppins-Light.ttf'),
        'SFPro-Regular': require('@/assets/fonts/SF-Pro-Rounded-Regular.otf'),
        'SFPro-Bold': require('@/assets/fonts/SF-Pro-Rounded-Bold.otf'),
        'SFPro-Medium': require('@/assets/fonts/SF-Pro-Rounded-Medium.otf'),
    })

    // const isDarkTheme = currentTheme === 'dark'

    // const animatedValue = useRef(new Animated.Value(0)).current

    // const interpolatedBackgroundColor = animatedValue.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: ['rgb(255, 255, 255)', 'rgb(12, 12, 12)'],
    // })

    // useEffect(() => {
    //     Animated.timing(animatedValue, {
    //         toValue: isDarkTheme ? 1 : 0,
    //         duration: 300,
    //         useNativeDriver: false,
    //     }).start()
    // }, [isDarkTheme])

    const CustomTheme = {
        ...themePackage,
        colors: {
            ...themePackage.colors,
            background: currentTheme === 'light' ? 'rgb(243, 242, 248)' : 'rgb(0, 0, 0)',
            card: currentTheme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(28, 28, 30)',
        },
    }

    const toastConfig = {
        warning: (props) => (
            <BaseToast
                {...props}
                style = {{ borderLeftColor: 'rgb(246, 198, 9)', backgroundColor: theme  ===  'dark' ? 'rgb(28, 28, 30)' : 'rgb(255, 255, 255)' }}
                contentContainerStyle = {{ paddingHorizontal: 15 }}
                text1Style = {{ fontSize: 15, color: theme  ===  'dark' ? 'white' : 'black' }}
                text2Style = {{ fontSize: 13, color: theme  ===  'dark' ? 'white' : 'black' }}
            />
        ),
        error: (props)  => (
            <ErrorToast
                {...props}
                style = {{ borderLeftColor: 'rgb(255, 61, 49)', backgroundColor: theme  ===  'dark' ? 'rgb(28, 28, 30)' : 'rgb(255, 255, 255)' }}
                contentContainerStyle = {{ paddingHorizontal: 15 }}
                text1Style = {{ fontSize: 15, color: theme  ===  'dark' ? 'white' : 'black' }}
                text2Style = {{ fontSize: 13, color: theme  ===  'dark' ? 'white' : 'black' }}
            />
        ),
        success: (props)  => (
            <BaseToast
                {...props}
                style = {{ borderLeftColor: 'rgb(52, 200, 91)', backgroundColor: theme  ===  'dark' ? 'rgb(28, 28, 30)' : 'rgb(255, 255, 255)' }}
                contentContainerStyle = {{ paddingHorizontal: 15 }}
                text1Style = {{ fontSize: 15, color: theme  ===  'dark' ? 'white' : 'black' }}
                text2Style = {{ fontSize: 13, color: theme  ===  'dark' ? 'white' : 'black' }}
            />
        )
    }

    useEffect(() => {
        const prepareApp = async () => {
            try {
                await SplashScreen.preventAutoHideAsync()
                if (fontsLoaded) {
                    await SplashScreen.hideAsync()
                }
            } catch (e) {
                console.warn(e)
            }
        }

        prepareApp()
    }, [fontsLoaded])

    return (
        <>
            <NavigationContainer 
                theme = { CustomTheme }
            >
                <StackNavigator />
            </NavigationContainer>
            <Toast config = { toastConfig } />
        </>
    )
}