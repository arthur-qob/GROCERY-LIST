import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { Input } from '@/components/Input'
import { BackgroundElement } from '@/components/ui/BackgroundElement'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'
import { BlurTint, BlurView } from 'expo-blur'
import { useRouter } from 'expo-router'
import { Platform, PlatformColor, StyleSheet, View, Text } from 'react-native'

export default function SignUpScreen() {
	const router = useRouter()

	const { currentTheme } = useTheme()

	const backgroundColor =
		Platform.OS === 'ios'
			? PlatformColor('systemBackground')
			: Colors[currentTheme as keyof typeof Colors].background

	const styles = StyleSheet.create({
		mainContainer: {
			backgroundColor: 'transparent',
			paddingTop: Platform.OS === 'ios' ? 40 : 100,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			gap: 20,
		},
		text: {
			color: Colors[currentTheme as keyof typeof Colors].text,
		},
		title: {
			fontSize: Platform.OS === 'ios' ? 70 : 65,
			textAlign: 'center',
		},
		appName: {
			fontWeight: 'bold',
		},
		blurView: {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
		},
		formContainer: {
			backgroundColor: Colors[currentTheme as keyof typeof Colors].panel,
			borderWidth: 1,
			borderColor:
				Colors[currentTheme as keyof typeof Colors].panelBorder,
			borderRadius: 10,
			paddingVertical: 30,
			paddingHorizontal: 20,
			width: '80%',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			gap: 20,
		},
	})

	return (
		<BackgroundElement backgroundColor={backgroundColor}>
			<Div style={styles.mainContainer}>
				<BlurView
					tint={
						Platform.OS === 'ios'
							? `${currentTheme}`
							: ('prominent' as BlurTint)
					}
					experimentalBlurMethod='dimezisBlurView'
					intensity={50}
					style={[StyleSheet.absoluteFill, styles.blurView]}>
					<View style={styles.formContainer}>
						<Input
							placeholder='Name'
							variant='clean'
						/>
						<Input
							placeholder='Email'
							variant='clean'
						/>
						<Input
							placeholder='Password'
							variant='clean'
							type='password'
						/>
						<Input
							placeholder='Confirm Password'
							variant='clean'
							type='password'
						/>
						<Button
							variant='filled'
							title='Sign Up'
							onPress={() => router.push('/signup')}
						/>
					</View>
				</BlurView>
			</Div>
		</BackgroundElement>
	)
}
