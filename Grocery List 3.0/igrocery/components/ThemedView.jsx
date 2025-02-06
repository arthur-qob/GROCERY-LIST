import { useTheme } from '@/contexts/ThemeContext'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  StatusBar
} from 'react-native'

export function ThemedView({ style, ...otherProps }) {
  const { currentTheme } = useTheme()
  const theme = currentTheme === 'light' ? 'light' : 'dark'

  return (
    <SafeAreaView style = { styles.safeArea } { ...otherProps }>
      <StatusBar barStyle = { theme === 'light' ? 'dark-content' : 'light-content' } />
      <KeyboardAvoidingView
        style = { styles.keyboardAvoidingView }
        behavior = { Platform.OS === 'ios' ? 'padding' : 'height' }
      >
        <ScrollView contentContainerStyle = { styles.scrollView }>
          <View style = {[ style, Platform.OS === 'android' ? { paddingVertical: 50 } : null ]}>
            { otherProps.children }
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollView: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
})