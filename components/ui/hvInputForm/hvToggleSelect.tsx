import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
// components
import HvText from '@/components/ui/hvText';

interface Props {
	itemState: string;
	setItemState: (value: string) => void;
	leftIcon: string;
	rightIcon: string;
	description: string;
	leftText: string;
	rightText: string;
}

/**
 * Custom toggle select component for an input form
 * @param itemState - state of the selected item
 * @param setItemState - function to set the selected item state
 * @param leftIcon - icon for the left side
 * @param rightIcon - icon for the right side
 * @param description - description of the toggle
 * @param leftText - text for the left side
 * @param rightText - text for the right side
 * @returns custom toggle select component
 */
const HvToggleSelect = ({
	itemState,
	setItemState,
	leftIcon,
	rightIcon,
	description,
	leftText,
	rightText,
}: Props): JSX.Element => {
	/**
	 * Set the item state to the left text
	 */
	const selectLeft = (): void => {
		setItemState(leftText);
	};

	/**
	 * Set the item state to the right text
	 */
	const selectRight = (): void => {
		setItemState(rightText);
	};

	return (
		<View style={Styles.inputContainer}>
			<View style={Styles.descriptionContainer}>
				<HvText weight='semibold' size='l'>
					{description}
				</HvText>
				<HvText size='s'>{itemState}</HvText>
			</View>
			<View style={Styles.radioContainer}>
				<TouchableOpacity
					onPress={selectLeft}
					style={itemState !== leftText ? { opacity: 0.3 } : {}}
				>
					<Image source={require('@/assets/svgs/circle.svg')} style={Styles.circle} />
					<Image source={leftIcon} style={Styles.iconInCircle} />
					<HvText size='xs' style={Styles.leftText}>
						{leftText}
					</HvText>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={selectRight}
					style={itemState !== rightText ? { opacity: 0.3 } : {}}
				>
					<Image source={require('@/assets/svgs/circle.svg')} style={Styles.circle} />
					<Image source={rightIcon} style={Styles.iconInCircle} />
					<HvText size='xs'>{rightText}</HvText>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const Styles = StyleSheet.create({
	inputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	radioContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		gap: 20,
		width: 120,
	},
	descriptionContainer: {
		justifyContent: 'center',
	},
	circle: {
		width: 40,
		height: 40,
	},
	iconInCircle: {
		position: 'absolute',
		top: 3,
		left: 4,
		width: 32,
		height: 32,
	},
	leftText: {
		position: 'absolute',
		width: 100,
		textAlign: 'right',
		bottom: 0,
		right: 0,
	},
});

export default HvToggleSelect;
