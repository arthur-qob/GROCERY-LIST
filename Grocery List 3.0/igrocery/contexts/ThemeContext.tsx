import { createContext, useContext, useState, ReactNode } from 'react'
import { useColorScheme } from 'react-native'

// Define the type for the context value
interface ThemeContextType {
  themeOption: 'system' | 'light' | 'dark';
  currentTheme: 'light' | 'dark';
  changeTheme: (newTheme: 'light' | 'dark') => void;
}

// Create a context with the defined type
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const systemTheme = useColorScheme() ?? 'light'
    const [themeOption, setThemeOption] = useState<'system' | 'light' | 'dark'>('system')

    const changeTheme = (newTheme: 'light' | 'dark') => {
        setThemeOption(newTheme)
    }

    const currentTheme = themeOption === 'system' ? systemTheme : themeOption
    console.info('currentTheme', currentTheme)

    return (
        <ThemeContext.Provider value={{ themeOption, currentTheme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}