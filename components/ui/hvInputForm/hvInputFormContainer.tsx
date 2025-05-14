import { View, StyleSheet, ViewProps } from 'react-native';
import { LIGHT_THEME } from '@/constants/colors';

interface Props extends ViewProps {
	textInput?: boolean;
}

/**
 * Custom input form container component with padding and background color
 * @param children - children components
 * @param textInput - boolean value to determine if the container has a text input
 * @returns custom input form container component
 */
const HvInputFormContainer = ({ textInput = false, ...props }: Props): JSX.Element => {
	return (
		<View
			style={[Styles.itemsContainer, props.style, { paddingBottom: textInput ? 30 : null }]}
		>
			{props.children}
		</View>
	);
};

const Styles = StyleSheet.create({
	itemsContainer: {
		paddingVertical: 15,
		paddingHorizontal: 20,
		gap: 20,
		borderRadius: 10,
		backgroundColor: LIGHT_THEME,
	},
});

export default HvInputFormContainer;
