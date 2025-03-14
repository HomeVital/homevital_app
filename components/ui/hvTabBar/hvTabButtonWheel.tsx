import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
// components
import HvLayeredIcon from '../hvLayeredIcon';
// constants
import { TAB_ICON_SIZE } from '@/constants/sizes';

interface Props {
	roundness: number;
	radius: number;
	buttons: {
		icon: string;
		onPress: () => void;
		isVisible: boolean;
	}[];
}

const HvTabButtonWheel = ({ radius, roundness, buttons }: Props): JSX.Element => {
	const bottomPaddings = [35, 15, -5, -5, -5];

	const radianConverter = (index: number): number => {
		return (
			((index + 0.5) / buttons.length) * (Math.PI * (roundness * 2)) +
			Math.PI * ((1 - roundness * 2) / 2)
		);
	};

	const margins = (indexc: number): { bottom: number; left: number } => {
		return {
			bottom:
				Math.sin(radianConverter(indexc)) * Math.sqrt(buttons.length) * radius +
				bottomPaddings[buttons.length - 1],
			left: Math.cos(radianConverter(indexc)) * Math.sqrt(buttons.length) * radius,
		};
	};

	return (
		<View style={Styles.container}>
			{buttons
				.slice(0)
				.reverse()
				.map((button, index) => {
					return (
						<TouchableOpacity
							key={index}
							onPress={button.onPress}
							style={[margins(index), { position: 'absolute' }]}
						>
							<HvLayeredIcon
								size={TAB_ICON_SIZE * 2}
								outerIcon={require('@/assets/svgs/filledCircle.svg')}
								innerIcon={button.icon}
							/>
						</TouchableOpacity>
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
