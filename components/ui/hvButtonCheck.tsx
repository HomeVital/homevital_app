import { View, StyleSheet, TouchableOpacity } from 'react-native';
// constants
import { DARK_GREEN } from '@/constants/colors';
import HvImage from './hvImage';

interface Props {
	// text: string;
	onPress: () => void;
	// width?: number;
	style?: object; // optional
	bgColor?: string; // optional
	loading?: boolean; // optional
	disabled?: boolean; // optional
	small?: boolean; // optional
	bright?: boolean; // optional
	cancel?: boolean; // optional
}

/**
 * Custom button component
 * @param onPress - function to execute on button press
 * @param width - button width
 * @param style - additional button styles
 * @returns custom button component
 */
const HvButtonCheck = ({
	// text,
	onPress,
	// width,
	style = {},
	bgColor = DARK_GREEN,
	loading = false,
	disabled = false,
	small = false,
	bright = false,
	cancel = false,
}: Props): JSX.Element => {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.5}
			disabled={disabled || loading}
			style={[
				{
					// width: width ? width : {},
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
				{cancel ? <HvImage source='Cancel' size={20} /> : <></>}
				{/* added cancel text display */}
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
		width: 5,
		height: 5,
		zIndex: 1,
	},
});

export default HvButtonCheck;
