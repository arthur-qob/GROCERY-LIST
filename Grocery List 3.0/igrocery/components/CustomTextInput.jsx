import { useTheme } from '@/contexts/ThemeContext'
import { SymbolView } from 'expo-symbols'
import { useState } from 'react'
import { StyleSheet, useColorScheme, View, TextInput, Platform, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export function CustomTextInput({ type = 'text', ...otherProps }) {
    // const theme = useColorScheme() ?? 'light'
    const { currentTheme } = useTheme()
    const theme = currentTheme === 'dark' ? 'dark' : 'light'

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)

    const isEmailType = type === 'email'
    const isPasswordType = type === 'password'
    const isConfirmationType = type === 'confirmation'

    return (
        <View style = { styles.textInputContainer }>
            <TextInput
                { ...otherProps }
                style = {[ styles.textInput, {
                    color: theme === 'dark' ? '#ccc' : '#000',
                } ]}
                placeholder = {
                    isConfirmationType
                        ? 'Confirm Password'
                        : type.charAt(0).toUpperCase() + type.slice(1)
                }
                placeholderTextColor = { theme === 'dark' ? '#ccc' : '#aaa' }
                keyboardType = { isEmailType ? 'email-address' : 'default' }
                secureTextEntry = {
                    (isPasswordType && !showPassword) || (isConfirmationType && !showConfirmation)
                }
            />
            {(isPasswordType || isConfirmationType) && (
                <TouchableOpacity
                    onPress = { () => {
                        if (isPasswordType) setShowPassword(!showPassword)
                        if (isConfirmationType) setShowConfirmation(!showConfirmation)
                    } }
                    style = { styles.iconContainer }
                >
                    { Platform.OS === 'ios' ? (
                        <SymbolView
                            name = {
                                (isPasswordType && showPassword) || (isConfirmationType && showConfirmation)
                                    ? 'eye.slash'
                                    : 'eye'
                            }
                            size = { 24 }
                            tintColor = { theme === 'dark' ? '#ccc' : '#aaa' }
                        />
                    ) : (
                        <Ionicons
                            name = {
                                (isPasswordType && showPassword) || (isConfirmationType && showConfirmation)
                                    ? 'eye-off'
                                    : 'eye'
                            }
                            size = { 24 }
                            color = { theme === 'dark' ? '#ccc' : '#aaa' }
                        />
                    )}
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    textInputContainer: {
        width: '80%',
        height: 45,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        height: '100%',
    },
    iconContainer: {
        width: '10%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
})