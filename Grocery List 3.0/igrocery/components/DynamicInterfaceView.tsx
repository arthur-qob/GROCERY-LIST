import { Colors } from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'
import { ReactNode } from 'react'
import {
	KeyboardAvoidingView,
	ScrollView,
	ViewProps,
	ScrollViewProps,
	KeyboardAvoidingViewProps,
	Platform,
	PlatformColor,
	StyleSheet,
	ColorValue,
	View,
	ViewStyle,
} from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

type DynamicInterfaceViewProps = ViewProps &
	ScrollViewProps &
	KeyboardAvoidingViewProps & {
		children?: ReactNode
		outterContainerStyle?: ViewStyle
		innerContainerStyle?: ViewStyle
	}

const DynamicInterfaceView: React.FC<DynamicInterfaceViewProps> = ({
	children,
	style,
	outterContainerStyle,
	innerContainerStyle,
	...otherProps
}) => {
	const { currentTheme } = useTheme()

	const backgroundColor = (
		Platform.OS === 'ios'
			? PlatformColor('systemBackground')
			: Colors[currentTheme as keyof typeof Colors].background
	) as string

	const baseStyle: ViewStyle = {
		flex: 1,
		borderWidth: 0,
	}

	const styles = StyleSheet.flatten({
		outterContainer: [
			baseStyle,
			{ paddingHorizontal: 20, paddingTop: 150, backgroundColor },
			outterContainerStyle,
		],
		innerContainer: [
			innerContainerStyle,
			{ backgroundColor: 'transparent' },
		],
		general: [style, { backgroundColor: 'transparent' }],
	})

	return (
		<SafeAreaProvider style={styles.general}>
			<SafeAreaView style={[styles.outterContainer]}>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
					style={styles.general}>
					<ScrollView
						contentContainerStyle={styles.general}
						automaticallyAdjustsScrollIndicatorInsets
						contentInsetAdjustmentBehavior='automatic'
						contentInset={{ bottom: 0 }}
						scrollIndicatorInsets={{ bottom: 0 }}
						{...otherProps}>
						<View style={styles.innerContainer}>{children}</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}

export { DynamicInterfaceView as Div }
