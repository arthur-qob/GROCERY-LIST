import { StyleSheet, Animated, Platform } from 'react-native'
import { useTheme } from '@/contexts/ThemeContext'
import { useEffect, useRef } from 'react'

export function ThemedText({ style, lightColor = '#000', darkColor = '#fff', type = 'default', ...rest }) {
    // const currentTheme = useColorScheme() ?? 'light'
    // const color = currentTheme === 'light' ? lightColor : darkColor
    
    const { currentTheme } = useTheme()
    const animatedValue = useRef(new Animated.Value(0)).current
    const isLightTheme = currentTheme === 'light'

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: isLightTheme ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start()
    }, [isLightTheme])

    const color = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [lightColor, darkColor],
    })

    return (
        <Animated.Text
            style = {[
                { color },
                !type && styles.default,
                type === 'default' ? styles.default : undefined,
                type === 'title' ? styles.title : undefined,
                type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
                type === 'subtitle' ? styles.subtitle : undefined,
                type === 'link' ? styles.link : undefined,
                style,
            ]}
            { ...rest }
        />
        // <Text
        //     style = {[
        //         { color },
        //         type === 'default' ? styles.default : undefined,
        //         type === 'title' ? styles.title : undefined,
        //         type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        //         type === 'subtitle' ? styles.subtitle : undefined,
        //         type === 'link' ? styles.link : undefined,
        //         style,
        //     ]}
        //     { ...rest }
        // />
    )
}

const styles = StyleSheet.create({
    default: {
        fontSize: 18,
        fontFamily: Platform.OS === 'ios' ? 'SFPro-Regular' : 'Poppins-Regular',
    },
    defaultSemiBold: {
        fontSize: 18,
        fontFamily: Platform.OS === 'ios' ? 'SFPro-Medium' : 'Poppins-SemiBold',
    },
    title: {
        fontSize: 32,
        fontFamily: Platform.OS === 'ios' ? 'SFPro-Bold' : 'Poppins-Bold',
    },
    subtitle: {
        fontSize: 20,
        fontFamily: Platform.OS === 'ios' ? 'SFPro-Medium' : 'Poppins-SemiBold',
    },
    link: {
        fontSize: 18,
        color: 'rgb(10, 132, 255)',
        fontFamily: Platform.OS === 'ios' ? 'SFPro-Regular' : 'Poppins-Regular',
    },
})