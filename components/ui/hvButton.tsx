import { View, StyleSheet, TouchableOpacity } from 'react-native';
// components
import HvText from './hvText';
// constants
import { DARK_GREEN } from '@/constants/colors';

interface Props {
	text: string;
	onPress: () => void;
	width?: number;
	style?: object; // optional
	bgColor?: string; // optional
	disabled?: boolean; // optional
}

/**
 * Custom button component
 * @param text - button text
 * @param onPress - function to execute on button press
 * @param width - button width
 * @param style - additional button styles
 * @returns custom button component
 */
const HvButton = ({
	text,
	onPress,
	width,
	style = {},
	bgColor = DARK_GREEN,
	disabled = false,
}: Props): JSX.Element => {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.5}
			disabled={disabled}
			// rippleColor="rgba(0, 0, 0, .32)"
			// borderless={true}
			style={[
				{
					width: width ? width : {},
					borderRadius: 10,
					backgroundColor: bgColor,
					opacity: disabled ? 0.5 : 1,
				},
				style,
			]}
		>
			<View style={Styles.button}>
				<HvText size='l' color='white' weight='semibold'>
					{text}
				</HvText>
			</View>
		</TouchableOpacity>
	);
};

const Styles = StyleSheet.create({
	button: {
		// height: 56, // expected 48
		padding: 15,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default HvButton;
