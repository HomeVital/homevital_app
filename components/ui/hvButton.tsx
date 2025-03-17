import { View, StyleSheet, TouchableOpacity } from 'react-native';
// components
import HvText from './hvText';
// import { TouchableRipple } from 'react-native-paper';
// constants
import { DARK_GREEN } from '@/constants/colors';

interface Props {
	text: string;
	onPress: () => void;
	width?: number;
	style?: object; // optional
}

/**
 * Custom button component
 * @param text - button text
 * @param onPress - function to execute on button press
 * @param width - button width
 * @param style - additional button styles
 * @returns custom button component
 */
const HvButton = ({ text, onPress, width, style = {} }: Props): JSX.Element => {
	return (
		<View style={[{ width: width ? width : {}, borderRadius: 10 }, style]}>
			<TouchableOpacity
				style={Styles.button}
				onPress={onPress}
				activeOpacity={0.7}
				// rippleColor="rgba(0, 0, 0, .32)"
				// borderless={true}
			>
				<HvText size='l' color='white' weight='semibold'>
					{text}
				</HvText>
			</TouchableOpacity>
		</View>
	);
};

const Styles = StyleSheet.create({
	button: {
		// height: 56, // expected 48
		backgroundColor: DARK_GREEN,
		padding: 15,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default HvButton;
