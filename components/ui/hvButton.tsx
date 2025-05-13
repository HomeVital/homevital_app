import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import HvText from './hvText';
import { DARK_GREEN, WHITE } from '@/constants/colors';
import { useState, useRef, useEffect } from 'react';

interface Props {
	text: string;
	onPress: () => void;
	width?: number;
	style?: object;
	bgColor?: string;
	loading?: boolean;
	disabled?: boolean;
	small?: boolean;
	bright?: boolean;
	seeThrough?: boolean;
}

/**
 * Gets the background color based on the button state
 * @param bgColor - background color of the button
 * @param bright - bright button variant
 * @param seeThrough - see-through button variant
 * @returns background color of the button
 */
const GetBGColor = (bgColor: string, bright: boolean, seeThrough: boolean): string => {
	if (seeThrough) {
		return 'rgba(255, 255, 255, 0.5)';
	}
	if (bright) {
		return 'white';
	}
	return bgColor;
};

/**
 * Custom button component
 * @param text - button text
 * @param onPress - function to execute on button press
 * @param width - button width
 * @param style - additional button styles
 * @param bgColor - background color of the button
 * @param loading - loading state of the button
 * @param disabled - disabled state of the button
 * @param small - small button variant
 * @param bright - bright button variant
 * @param seeThrough - see-through button variant
 * @returns custom button component
 */
const HvButton = ({
	text,
	onPress,
	width,
	style = {},
	bgColor = DARK_GREEN,
	loading = false,
	disabled = false,
	small = false,
	bright = false,
	seeThrough = false,
}: Props): JSX.Element => {
	const [isPressIn, setIsPressIn] = useState(false);
	const animationRef = useRef<number | null>(null);
	const wasPressed = useRef(false);

	// Clean up any pending animation frame on unmount
	useEffect(() => {
		return () => {
			if (animationRef.current !== null) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, []);

	/**
	 * Handles the press in animation
	 */
	const handlePressIn = () => {
		setIsPressIn(true);
		wasPressed.current = true;
	};

	/**
	 * Handles the press out animation
	 */
	const handlePressOut = () => {
		setIsPressIn(false);
		// Only trigger the press animation if this was a real press (not a cancel)
		if (wasPressed.current) {
			wasPressed.current = false;
			if (animationRef.current !== null) {
				cancelAnimationFrame(animationRef.current);
			}
			// smooth animation timing
			animationRef.current = requestAnimationFrame(() => {
				animationRef.current = requestAnimationFrame(() => {
					animationRef.current = null;
				});
			});
		}
	};

	const disabledBtn = disabled || loading || isPressIn ? true : false;

	return (
		<TouchableOpacity
			onPress={onPress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			activeOpacity={0.5}
			disabled={disabledBtn}
			style={[
				{
					width: width ? width : {},
					borderRadius: 10,
					backgroundColor: GetBGColor(bgColor, bright, seeThrough),
					borderColor: !bright ? undefined : bgColor,
					borderWidth: !bright ? 0 : 1,
					opacity: disabledBtn ? 0.5 : 1,
					padding: !small ? 15 : 10,
				},
				style,
			]}
		>
			<View style={Styles.button}>
				<HvText
					size={!small ? 'l' : 'sm'}
					color={!bright ? 'white' : bgColor}
					weight='semibold'
				>
					{loading ? <ActivityIndicator color={WHITE} size={30} /> : text}
				</HvText>
			</View>
		</TouchableOpacity>
	);
};

const Styles = StyleSheet.create({
	button: {
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default HvButton;
