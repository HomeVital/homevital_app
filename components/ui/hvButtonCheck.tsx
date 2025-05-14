import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { DARK_GREEN } from '@/constants/colors';
import HvImage from './hvImage';

interface Props {
	onPress: () => void;
	style?: object;
	bgColor?: string;
	loading?: boolean;
	disabled?: boolean;
	small?: boolean;
	bright?: boolean;
	cancel?: boolean;
}

/**
 * Custom button component
 * @param onPress - function to execute on button press
 * @param width - button width
 * @param style - additional button styles
 * @returns custom button component
 */
const HvButtonCheck = ({
	onPress,
	style = {},
	bgColor = DARK_GREEN,
	loading = false,
	disabled = false,
	small = false,
	bright = false,
	cancel = false,
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
			activeOpacity={0.3}
			disabled={disabledBtn}
			style={[
				{
					borderRadius: 10,
					backgroundColor: !bright ? bgColor : 'white',
					borderColor: !bright ? undefined : bgColor,
					borderWidth: !bright ? 0 : 1,
					opacity: disabledBtn ? 0.3 : 1,
					padding: !small ? 15 : 10,
				},
				style,
			]}
		>
			<View style={Styles.button}>
				{cancel ? <HvImage source='Cancel' size={20} /> : <></>}
			</View>
		</TouchableOpacity>
	);
};

const Styles = StyleSheet.create({
	button: {
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		width: 5,
		height: 5,
		zIndex: 1,
	},
});

export default HvButtonCheck;
