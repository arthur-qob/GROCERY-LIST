import { useState, useEffect, useRef } from 'react'
import { StyleSheet, TouchableOpacity, Animated, LayoutAnimation, View } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { Ionicons } from '@expo/vector-icons'
import { useTheme } from '@/contexts/ThemeContext'

export function Collapsible({ children, title, style, isOpen: controlledOpen, onToggle, ...otherProps }) {
  const { currentTheme } = useTheme()
  const theme = currentTheme === 'light' ? 'light' : 'dark'
  const [isOpen, setIsOpen] = useState(controlledOpen ?? false)
  const heightAnim = useRef(new Animated.Value(isOpen ? 1 : 0)).current

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [isOpen])

  const toggleOpen = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setIsOpen((prev) => !prev)
    onToggle?.(!isOpen)
  }

  return (
    <View style = {[ styles.container, style, {
      gap: isOpen ? 20 : 0,
    } ]} { ...otherProps }>
      <View style = { styles.header }>
        <View>
          <TouchableOpacity
            style = { styles.heading }
            onPress = { toggleOpen }
            activeOpacity = { 0.8 }
            accessibilityRole = 'button'
            accessibilityState = {{ expanded: isOpen }}>
            <Ionicons
              name = 'chevron-forward'
              size = { 18 }
              color = { theme === 'light' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)' }
              style = {{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
            />
            <ThemedText lightColor = 'rgb(0, 0, 0)' darkColor = 'rgb(255, 255, 255)' type = 'defaultSemiBold'>{ title }</ThemedText>
          </TouchableOpacity>
        </View>
        {
          otherProps.headerRight &&
          <View>
            { otherProps.headerRight }
          </View>
        }
      </View>

      <View style = {{
        borderBottomWidth: isOpen ? 1 : 0,
        borderBottomColor: theme === 'light' ? 'rgb(228, 227, 233)' : 'rgb(142, 142, 147)',
      }}></View>
      
      <Animated.View style = {[ styles.content, { opacity: heightAnim }]}>
        { isOpen && children }
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
})