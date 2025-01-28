import { StyleSheet, TouchableOpacity } from 'react-native'
import { ThemedText as Text } from '@/components/ThemedText'

export function CustomButton({ title, type, style, onPress, ...otherProps }) {
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
                <Text
                    lightColor = { type === 'primary' ? '#fff' : 'rgb(10, 132, 255)' }
                    darkColor = { type === 'primary' ? '#fff' : 'rgb(10, 132, 255)' }
                >{ title }</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 5,
        width: '45%',
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