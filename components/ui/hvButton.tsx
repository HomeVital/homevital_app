import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
// components
import HvText from './hvText';
// constants
import { DARK_GREEN, WHITE } from '@/constants/colors';

interface Props {
	text: string;
	onPress: () => void;
	width?: number;
	style?: object; // optional
	bgColor?: string; // optional
	loading?: boolean; // optional
	disabled?: boolean; // optional
	small?: boolean; // optional
	bright?: boolean; // optional
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
	loading = false,
	disabled = false,
	small = false,
	bright = false,
}: Props): JSX.Element => {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.5}
			disabled={disabled || loading}
			style={[
				{
					width: width ? width : {},
					borderRadius: 10,
					backgroundColor: !bright ? bgColor : 'white',
					borderColor: !bright ? undefined : bgColor,
					borderWidth: !bright ? 0 : 1,
					opacity: disabled || loading ? 0.5 : 1,
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
		// height: 56, // expected 48
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default HvButton;
