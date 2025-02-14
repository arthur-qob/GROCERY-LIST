import { useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'
import { UserProvider, useUser } from '@/contexts/UserContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { DynamicContainer as Div } from '@/components/DynamicContainer'

export default function RootLayout() {
    console.log('Root layout loaded')
    const { user } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (user) {
            router.replace('/(main)/(tabs)')
        } else {
            router.replace('/(auth)')
        }
    }, [user])

    return (
        <UserProvider>
            <ThemeProvider>
                <Div>
                    <Stack>
                        <Stack.Screen name = 'index' />
                        <Stack.Screen name = '(auth)' />
                        <Stack.Screen name = '(main)' />
                    </Stack>
                </Div>
            </ThemeProvider>
        </UserProvider>
    )
}