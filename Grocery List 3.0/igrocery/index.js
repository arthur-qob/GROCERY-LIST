import { registerRootComponent } from 'expo'
import { ThemeProvider } from '@/contexts/ThemeContext'
import App from './app/App'

const AppContent = () => {
    return (
        <ThemeProvider>
            <App />
        </ThemeProvider>
    )
}

registerRootComponent(AppContent)