import { View, StyleSheet, ViewProps } from 'react-native';
// constants
import { WHITE } from '@/constants/colors';
import HvButton from '../hvButton';

interface Props extends ViewProps {
	onPress: () => void;
}

/**
 * Custom input form component with padding and background color
 * @param children - children components
 * @param onPress - function to execute on button press
 * @returns custom input form component
 */
const HvInputForm = ({ onPress, ...props }: Props): JSX.Element => {
	return (
		<View style={[Styles.container, props.style]}>
			{props.children}
			<HvButton text='Vista' onPress={onPress} />
		</View>
	);
};

const Styles = StyleSheet.create({
	container: {
		marginTop: 10,
		padding: 20,
		gap: 20,
		borderRadius: 10,
		backgroundColor: WHITE,
		maxWidth: 800,
	},
});

export default HvInputForm;
