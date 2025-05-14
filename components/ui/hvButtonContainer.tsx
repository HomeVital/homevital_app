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
