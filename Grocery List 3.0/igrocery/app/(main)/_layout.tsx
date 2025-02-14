import { Stack } from 'expo-router'

export default function MainLayout() {
    return (
        <Stack
            initialRouteName = '(tabs)'
        >
            <Stack.Screen name = '(tabs)' />
            <Stack.Screen name = 'item' />
            <Stack.Screen name = 'list' />
            <Stack.Screen name = 'profile' />
        </Stack>
    )
}