import React from 'react';
import { View, StyleSheet } from 'react-native';
import HvLayeredIcon from '../hvLayeredIcon';
import { TAB_ICON_SIZE } from '@/constants/constants';
import HvButtonContainer from '../hvButtonContainer';

interface Props {
	roundness: number;
	radius: number;
	buttons: {
		name: string;
		onPress: () => void;
		isVisible: boolean;
	}[];
}

/**
 * Circular button wheel component
 * @param radius - radius of the button wheel
 * @param roundness - roundness of the button wheel
 * @param buttons - array of buttons with icons and onPress functions
 * @returns circular button wheel component
 */
const HvTabButtonWheel = ({ radius, roundness, buttons }: Props): JSX.Element => {
	const bottomPaddings = [35, 15, -5, -5, -5];

	/**
	 * Converts index to radian for the button wheel
	 * @param index - index of the button
	 * @returns radian value for the button
	 */
	const radianConverter = (index: number): number => {
		return (
			((index + 0.5) / buttons.length) * (Math.PI * (roundness * 2)) +
			Math.PI * ((1 - roundness * 2) / 2)
		);
	};

	/**
	 * Calculates margins for the button wheel
	 * @param index - index of the button
	 * @returns margin values for the position in the circular button wheel
	 * the button wheel
	 */
	const margins = (index: number): { bottom: number; left: number } => {
		return {
			bottom:
				Math.sin(radianConverter(index)) * Math.sqrt(buttons.length) * radius +
				bottomPaddings[buttons.length - 1],
			left: Math.cos(radianConverter(index)) * Math.sqrt(buttons.length) * radius,
		};
	};

	return (
		<View style={Styles.container}>
			{buttons
				.slice(0)
				.reverse()
				.map((button, index) => {
					return (
						<HvButtonContainer
							key={index}
							onPress={button.onPress}
							style={[margins(index), { position: 'absolute' }]}
						>
							<HvLayeredIcon
								size={TAB_ICON_SIZE * 2}
								outerIcon={require('@/assets/svgs/filledCircle.svg')}
								innerIcon={button.name}
							/>
						</HvButtonContainer>
					);
				})}
		</View>
	);
};

const Styles = StyleSheet.create({
	container: {
		left: -TAB_ICON_SIZE,
		bottom: TAB_ICON_SIZE,
	},
});

export default HvTabButtonWheel;
