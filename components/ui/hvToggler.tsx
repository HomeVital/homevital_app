import { View, StyleSheet, TouchableOpacity } from 'react-native';
// components
import HvText from '@/components/ui/hvText';
// constants
import { DARK_GREEN, GREEN } from '@/constants/colors';

interface Props {
	toggled: boolean;
	setToggled: (value: boolean) => void;
	textLeft: string;
	textRight: string;
	margin?: number;
}

const HvToggler = ({
	toggled,
	setToggled,
	textLeft,
	textRight,
	margin = 0,
}: Props): JSX.Element => {
	return (
		<View style={[Styles.container, { marginHorizontal: margin }]}>
			<TouchableOpacity
				style={[toggled ? Styles.toggled : {}, Styles.toggler]}
				onPress={() => setToggled(true)}
			>
				<HvText color='white' weight='bold'>
					{textLeft}
				</HvText>
			</TouchableOpacity>

			<TouchableOpacity
				style={[toggled ? {} : Styles.toggled, Styles.toggler]}
				onPress={() => setToggled(false)}
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
