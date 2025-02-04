import { ThemedView as Div } from '@/components/ThemedView'
import { ThemedText as Text } from '@/components/ThemedText'
import { CustomButton as Button } from '@/components/CustomButton'
// import { Collapsible } from '@/components/Collapsible'
import styles from './style'
import { useNavigation } from '@react-navigation/native'
import { Switch, TouchableOpacity, View } from 'react-native'
import { useTheme } from '@/contexts/ThemeContext'
import React, { useEffect, useState } from 'react'
import { Logout } from '@/utils/auth'

export default function SettingsScreen() {
    const navigation = useNavigation()
    const { themeOption, changeTheme } = useTheme()
    const [ loading, setLoading ] = useState(false)
    const theme = themeOption === 'light' ? 'light' : 'dark'

    const [activeSwitch, setActiveSwitch] = useState(themeOption)

    const handleSwitchChange = (theme) => {
        setActiveSwitch(theme)
        changeTheme(theme)
    }

    return (
        <Div style = { styles.mainContainer }>
            <Text type = 'title'>Settings</Text>

            <View style = {[ styles.swithTable, {
                backgroundColor: theme === 'dark' ? 'rgb(28, 28, 30)' : 'rgb(255, 255, 255)',
            } ]}>
                <View style = { styles.switchContainer }>
                    <Text>Light</Text>
                    <Switch
                        value = { activeSwitch === 'light' }
                        onValueChange = { () => handleSwitchChange('light') }
                        trackColor = {{
                            false: 'rgb(233, 233, 235)',
                            true: 'rgb(10, 132, 255)',
                        }}
                        thumbColor = { 'rgb(255, 255, 255)' }
                    />
                </View>

                <View style = {[ styles.switchContainerSeparator, {
                    borderBottomColor: theme === 'light' ? 'rgb(228, 227, 233)' : 'rgb(142, 142, 147)',
                } ]} />

                <View style = { styles.switchContainer }>
                    <Text>Dark</Text>
                    <Switch
                        value = { activeSwitch === 'dark' }
                        onValueChange = { () => handleSwitchChange('dark') }
                        trackColor = {{
                            false: 'rgb(233, 233, 235)',
                            true: 'rgb(10, 132, 255)',
                        }}
                        thumbColor = { 'rgb(255, 255, 255)' }
                    />
                </View>

                <View style = {[ styles.switchContainerSeparator, {
                    borderBottomColor: theme === 'light' ? 'rgb(228, 227, 233)' : 'rgb(142, 142, 147)',
                } ]} />

                <View style = { styles.switchContainer }>
                    <Text>System</Text>
                    <Switch
                        value = { activeSwitch === 'system' }
                        onValueChange = { () => handleSwitchChange('system') }
                        trackColor = {{
                            false: 'rgb(233, 233, 235)',
                            true: 'rgb(10, 132, 255)',
                        }}
                        thumbColor = { 'rgb(255, 255, 255)' }
                    />
                </View>
            </View>

            <Button title = 'Log Out' type = 'primary' style = { styles.button } loading = { loading } onPress = { () => {
                setLoading(true)
                Logout()
                setTimeout(() => {
                    setLoading(false)
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Welcome', params: { from: 'main' } }],
                    })    
                }, 1000)
            } }  />
        </Div>
    )
}