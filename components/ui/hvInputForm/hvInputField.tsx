import { View, StyleSheet, TextInput } from 'react-native';
// components
import HvText from '@/components/ui/hvText';
// constants
import { DARK_GREEN, WHITE } from '@/constants/colors';
import { FieldError } from 'react-hook-form';

interface Props {
	itemState: string | number;
	setItemState: (value: string) => void;
	description: string;
	header?: string;
	metric?: string;
	keyboardMax?: number;
	error?: FieldError | undefined;
}

/**
 * Custom input field component for an input form
 * @param itemState - state of the input field
 * @param setItemState - function to set the input field state
 * @param description - description of the input field
 * @param header - header text for the input field
 * @param metric - metric text for the input field
 * @param keyboardMax - maximum number of characters for the input field
 * @returns custom input field component
 */
const HvInputField = ({
	itemState,
	setItemState,
	description,
	header = '',
	metric = '',
	keyboardMax = 3,
	error = undefined,
}: Props): JSX.Element => {
	return (
		<View style={Styles.itemContainer}>
			<HvText weight='light' size='l'>
				{header}
			</HvText>
			<View style={Styles.inputContainer}>
				<View style={Styles.descriptionContainer}>
					<HvText weight='semibold' size='xxl'>
						{description}
					</HvText>
					{metric && <HvText size='xs'>{metric}</HvText>}
				</View>
				<View style={Styles.inputShadow}>
					<TextInput
						value={itemState as string}
						keyboardType='number-pad'
						maxLength={keyboardMax}
						// placeholder='ex. 120'
						selectTextOnFocus={true}
						textAlign='right'
						// enterKeyHint='next'
						onChangeText={(text) => setItemState(text)}
						style={Styles.textInput}
					/>
				</View>
			</View>
		</View>
	);
};

const Styles = StyleSheet.create({
	itemContainer: {
		gap: 2,
	},
	inputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	descriptionContainer: {
		justifyContent: 'center',
	},
	inputShadow: {
		width: 120,
		height: 60,
		marginRight: 20,
		borderRadius: 10,
		boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
	},
	textInput: {
		width: '100%',
		height: '100%',
		paddingHorizontal: 20,
		borderRadius: 10,
		backgroundColor: WHITE,
		fontSize: 24,
		fontFamily: 'OpenSansSemiBold',
		color: DARK_GREEN,
	},
});

export default HvInputField;
