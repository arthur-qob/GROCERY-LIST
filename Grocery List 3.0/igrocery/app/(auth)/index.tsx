import { Button } from '@/components/Button'
import { Div } from '@/components/DynamicInterfaceView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Colors } from '@/constants/Colors'
import { useTheme } from '@/contexts/ThemeContext'
import { useRouter } from 'expo-router'
import { SymbolView } from 'expo-symbols'
import Ionicons from '@expo/vector-icons/Ionicons'
import {
	Dimensions,
	Platform,
	PlatformColor,
	StyleSheet,
	View,
	Text,
	Image,
	processColor,
} from 'react-native'
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg'

export default function WelcomeScreen() {
	const router = useRouter()

	const { width, height } = Dimensions.get('window')

	const { currentTheme } = useTheme()

	const backgroundColor =
		Platform.OS === 'ios'
			? PlatformColor('systemBackground')
			: Colors[currentTheme as keyof typeof Colors].background

	const backgroundElementImg = require('@/assets/images/background-element.png')

	const backgroundElementStyles = StyleSheet.create({
		backgroundElement: {
			flexGrow: 1,
			position: 'relative',
			backgroundColor: backgroundColor,
			borderWidth: 1,
		},
		backgroundElementImg: {
			position: 'absolute',
			top: -250,
			right: -300,
			width: width * 2,
			height: width * 2.2,
		},
		svg: {
			position: 'absolute',
			top: -250,
			right: -300,
			display: 'flex',
			justifyContent: 'flex-end',
			alignItems: 'flex-end',
			borderRadius: width,
			shadowColor: Colors.backgroundElement.borderColor,
			shadowOffset: {
				width: 0,
				height: 0,
			},
			shadowOpacity: 0.98,
			shadowRadius: -2,
			overflow: 'hidden',
		},
	})

	const styles = StyleSheet.create({
		outterContainer: {
			backgroundColor: 'transparent',
			zIndex: 1,
		},
		innerContainer: {
			paddingTop: 0,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: Platform.OS === 'ios' ? 'center' : 'flex-start',
			alignItems: 'center',
			gap: 50,
		},
		text: {
			color: Colors[currentTheme as keyof typeof Colors].text,
		},
		title: {
			fontSize: 70,
			textAlign: 'center',
		},
		appName: {
			fontWeight: 'bold',
		},
		btnsContainer: {
			marginTop: 250,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			gap: 20,
		},
	})

	return (
		<>
			<View style={backgroundElementStyles.backgroundElement}>
				{Platform.OS === 'ios' ? (
					<Svg
						height={width * 2}
						style={backgroundElementStyles.svg}
						width={width * 2}>
						<Defs>
							<RadialGradient
								id='grad'
								cx='50%'
								cy='40%' // Moves the bright center upwards
								r='80%' // Covers a larger area
							>
								<Stop
									offset='15%'
									stopColor={String(
										Colors.backgroundElement.color1
									)}
									stopOpacity='0'
								/>
								<Stop
									offset='45%'
									stopColor={String(
										Colors.backgroundElement.color2
									)}
									stopOpacity='0.25'
								/>
								<Stop
									offset='75%'
									stopColor={String(
										Colors.backgroundElement.color3
									)}
									stopOpacity='1'
								/>
							</RadialGradient>
						</Defs>
						<Rect
							height={width * 2}
							width={width * 2.5}
							fill='url(#grad)'
						/>
					</Svg>
				) : (
					<Image
						source={backgroundElementImg}
						style={backgroundElementStyles.backgroundElementImg}
					/>
				)}
				<Div
					outterContainerStyle={styles.outterContainer}
					innerContainerStyle={styles.innerContainer}>
					<Text style={[styles.title, styles.text]}>
						Welcome to <Text style={styles.appName}>iGrocery</Text>
					</Text>
					<View style={styles.btnsContainer}>
						<Button
							variant='filled'
							title='Sign In'
							onPress={() => {
								router.push('/signin')
							}}
						/>
						<Button
							variant='outlined'
							title='Sign Up'
							onPress={() => {
								router.push('/signup')
							}}
						/>
					</View>
				</Div>
			</View>
		</>
	)
}
