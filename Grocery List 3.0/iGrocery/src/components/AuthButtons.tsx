import { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

interface AuthButtonsProps {
    option?: string,
}

export function AuthButtons({ option }: AuthButtonsProps) {
    let btnTitle = ''

    if (option) {
        btnTitle = 'Continue with ' + option
    } else {
        btnTitle = 'Continue with Email and Password'
    }

    option = option?.toLowerCase()

    const [loading, setLoading] = useState(false)

    const handlePress = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }
    
    return (
        <View>
            <TouchableOpacity
                style = { styles.button }
                onPress = { handlePress }
            >
                {
                    loading ? (
                        <ActivityIndicator size = 'small' color = 'rgb(255, 255, 255)' />
                    ) : (
                        <>
                            <Ionicons name = { option === 'google' ? 'logo-google' : (option === 'apple' ? 'logo-apple' : (option === 'facebook' ? 'logo-facebook' : 'mail')) } size = { 25 } color = 'rgb(255, 255, 255)' />
                            <Text style = {{
                                color: 'rgb(255, 255, 255)',
                                fontSize: 20,
                            }}>{ btnTitle }</Text>
                        </>
                    )
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '90%',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: 'rgb(10, 132, 255)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginHorizontal: 'auto',
    }
})