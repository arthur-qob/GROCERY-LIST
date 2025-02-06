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
                    type === 'primary' ? styles.primary : 
                    type === 'secondary' ? styles.secondary :
                    type === 'danger-primary' ? styles.danger_primary :
                    type === 'danger-secondary' ? styles.danger_secondary :
                    styles.primary
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
                            lightColor = { type === 'primary' || type === 'danger-primary' ? '#fff' :
                                           type === 'secondary' ? 'rgb(10, 132, 255)' :
                                           'rgb(255, 69, 58)' }
                            darkColor = { type === 'primary' || type === 'danger-primary' ? '#fff' :
                                          type === 'secondary' ? 'rgb(10, 132, 255)' :
                                          'rgb(255, 69, 58)' }
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
    },
    danger_primary: {
        backgroundColor: 'rgb(255, 69, 58)',
        borderColor: 'transparent',
    },
    danger_secondary: {
        backgroundColor: 'transparent',
        borderColor: 'rgb(255, 69, 58)',
    }
})