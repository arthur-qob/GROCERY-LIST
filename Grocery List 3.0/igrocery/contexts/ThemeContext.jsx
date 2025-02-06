import React, { createContext, useContext, useState } from 'react'
import { useColorScheme } from 'react-native'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const systemTheme = useColorScheme() ?? 'light'
    const [themeOption, setThemeOption] = useState('system')

    const changeTheme = (newTheme) => {
        setThemeOption(newTheme)
    }

    const currentTheme = themeOption === 'system' ? systemTheme : themeOption

    return (
        <ThemeContext.Provider value = {{ themeOption, currentTheme, changeTheme }}>
            { children }
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}