import { StyleSheet, Animated } from 'react-native'
import { useTheme } from '@/contexts/ThemeContext'
import { useEffect, useRef } from 'react'

export function ThemedText({ style, lightColor = '#000', darkColor = '#fff', type = 'default', ...rest }) {
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
                type === 'default' ? styles.default : undefined,
                type === 'title' ? styles.title : undefined,
                type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
                type === 'subtitle' ? styles.subtitle : undefined,
                type === 'link' ? styles.link : undefined,
                style,
            ]}
            { ...rest }
        />
    )
}

const styles = StyleSheet.create({
    default: {
        fontSize: 16,
        lineHeight: 24,
    },
    defaultSemiBold: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '600',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        lineHeight: 32,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        lineHeight: 30,
        fontSize: 16,
        color: '#0a7ea4',
    },
})