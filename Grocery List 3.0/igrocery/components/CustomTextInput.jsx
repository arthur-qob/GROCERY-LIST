import { StyleSheet, useColorScheme, View, TextInput } from 'react-native'
// import { ThemedText as Text } from '@/components/ThemedText'
import Ionicons from 'react-native-vector-icons/Ionicons'

export function CustomTextInput({ type, ...otherProps }) {
    const theme = useColorScheme() ?? 'light'

    return (
        <View style = { styles.textInputContainer }>
            <TextInput
                { ...otherProps }
                style = {{
                    width: '80%',
                }}
                placeholder = {
                    type === 'confirmation'
                        ? 'Confirm Password'
                        : type.toUpperCase().charAt(0) + type.slice(1)
                }
                placeholderTextColor = { theme === 'dark' ? '#ccc' : '#aaa' }
                secureTextEntry = { type === 'password' || type === 'confirmation' }
            />
            { type === 'password' || type === 'confirmation' ? (
                <Ionicons
                    name = "eye"
                    size = {24}
                    color = { theme === 'dark' ? '#ccc' : '#aaa' }
                    style = {{
                        width: '10%',
                        alignSelf: 'center',
                        height: '100%',
                    }}
                />
            ) : null }
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
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})