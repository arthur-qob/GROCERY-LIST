import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import { ThemedText as Text } from '@/components/ThemedText'
import { useTheme } from '@/contexts/ThemeContext'

export function CustomButton({ title, type, style, onPress, loading, ...otherProps }) {
    const { currentTheme } = useTheme()
    const theme = currentTheme === 'dark' ? 'dark' : 'light'

    return (
        <>
            <TouchableOpacity
                style = {[ 
                    style,
                    styles.button,
                    type === 'primary' ? styles.primary : styles.secondary
                ]}
                onPress = { onPress }
            >
                {
                    loading ? (
                        <ActivityIndicator
                            size = 'small'
                            color = { type !== 'primary' ? (theme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)') : 'rgb(255, 255, 255)' }
                        />
                    ) : (
                        <Text
                            lightColor = { type === 'primary' ? '#fff' : 'rgb(10, 132, 255)' }
                            darkColor = { type === 'primary' ? '#fff' : 'rgb(10, 132, 255)' }
                        >{ title }</Text>
                    )
                }
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    primary: {
        backgroundColor: 'rgb(10, 132, 255)',
        borderColor: 'transparent',
    },
    secondary: {
        backgroundColor: 'transparent',
        borderColor: 'rgb(10, 132, 255)',
    }
})