import { TouchableOpacity, ViewProps } from 'react-native';
import { useState, useRef, useEffect } from 'react';

interface Props extends ViewProps {
	onPress: () => void;
	width?: number;
	style?: object; // optional
	loading?: boolean; // optional
	disabled?: boolean; // optional
	small?: boolean; // optional
	bright?: boolean; // optional
	seeThrough?: boolean; // optional
}

/**
 * Custom button component
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
const HvButtonContainer = ({
	onPress,
	width,
	style = {},
	loading = false,
	disabled = false,
	small = false,
	bright = false,
	seeThrough = false,
	...props
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

	const handlePressIn = () => {
		setIsPressIn(true);
		wasPressed.current = true;
	};

	const handlePressOut = () => {
		setIsPressIn(false);

		// Only trigger the press animation if this was a real press (not a cancel)
		if (wasPressed.current) {
			// Mark that we've handled this press
			wasPressed.current = false;
			// Clear any existing animation
			if (animationRef.current !== null) {
				cancelAnimationFrame(animationRef.current);
			}

			// Use requestAnimationFrame for smooth animation timing
			animationRef.current = requestAnimationFrame(() => {
				// Schedule the reset of pressed state in the next frame
				animationRef.current = requestAnimationFrame(() => {
					animationRef.current = null;
				});
			});
		}
	};

	const handlePress = () => {
		onPress();
	};

	const disabledBtn = disabled || loading || isPressIn ? true : false;

	return (
		<TouchableOpacity
			onPress={handlePress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
			activeOpacity={0.3} // Disable default opacity effect
			disabled={disabledBtn}
			style={[
				{
					opacity: disabledBtn ? 0.3 : 1,
				},
				style,
			]}
		>
			{props.children}
		</TouchableOpacity>
	);
};

export default HvButtonContainer;
