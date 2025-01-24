import {
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'

export function ThemedView({ style, ...otherProps }) {
  const theme = useColorScheme() ?? 'light'

  return (
    <SafeAreaView style = { styles.safeArea } { ...otherProps }>
      <KeyboardAvoidingView
        style = { styles.keyboardAvoidingView }
        behavior = { Platform.OS === 'ios' ? 'padding' : 'height' }
      >
        <ScrollView contentContainerStyle = { styles.scrollView }>
          <View style = { style }>
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