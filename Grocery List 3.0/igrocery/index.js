import { registerRootComponent } from 'expo'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { UserProvider } from '@/contexts/UserContext'
import App from './app/App'

const AppContent = () => {
    return (
        <ThemeProvider>
            <UserProvider>
                <App />
            </UserProvider>
        </ThemeProvider>
    )
}

registerRootComponent(AppContent)