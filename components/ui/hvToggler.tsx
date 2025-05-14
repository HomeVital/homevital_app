import { View, StyleSheet, TouchableOpacity } from 'react-native';
import HvText from '@/components/ui/hvText';
import { DARK_GREEN, GREEN } from '@/constants/colors';

interface Props {
	toggler: boolean;
	setToggledTrue: () => void;
	setToggledFalse: () => void;
	textLeft: string;
	textRight: string;
	margin?: number;
}

/**
 * Toggler component with two sides
 * @param toggler - boolean value to determine which side is toggled
 * @param setToggledTrue - function to set toggler to true
 * @param setToggledFalse - function to set toggler to false
 * @param textLeft - text to display on the left side
 * @param textRight - text to display on the right side
 * @param margin - margin to apply to the container
 * @returns toggle component with two sides
 */
const HvToggler = ({
	toggler,
	setToggledTrue,
	setToggledFalse,
	textLeft,
	textRight,
	margin = 0,
}: Props): JSX.Element => {
	return (
		<View style={[Styles.container, { marginHorizontal: margin }]}>
			<TouchableOpacity
				style={[toggler ? Styles.toggled : {}, Styles.toggler]}
				onPress={setToggledTrue}
			>
				<HvText color='white' weight='bold'>
					{textLeft}
				</HvText>
			</TouchableOpacity>

			<TouchableOpacity
				style={[toggler ? {} : Styles.toggled, Styles.toggler]}
				onPress={setToggledFalse}
			>
				<HvText color='white' weight='bold'>
					{textRight}
				</HvText>
			</TouchableOpacity>
		</View>
	);
};

const Styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: GREEN,
		height: 44,
		padding: 3,
		borderRadius: 10,
	},
	toggler: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
	},
	toggled: {
		backgroundColor: DARK_GREEN,
	},
});

export default HvToggler;
