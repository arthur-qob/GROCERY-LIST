import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'

export function ThemedView({ style, ...otherProps }) {
  return (
    <SafeAreaView style = { styles.safeArea } { ...otherProps }>
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