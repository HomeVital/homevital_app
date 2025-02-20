import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import HvLayeredIcon from '../hvLayeredIcon';
import { TAB_ICON_SIZE } from '@/constants/sizes';
// import useButtonAnimation from "@/hooks/useButtonAnimation";
// import Animated from "react-native-reanimated";

interface Props {
	state: boolean;
	roundness: number;
	radius: number;
	buttons: {
		icon: string;
		onPress: () => void;
		isVisible: boolean;
	}[];
}

// const useButtonAnimations = (
//   state: boolean,
//   radius: number,
//   roundness: number,
//   buttons: Props["buttons"],
// ) => {
//   const bottomPaddings = [35, 15, -5, -5, -5];
//   const filteredButtons = buttons.filter((button) => button.isVisible);

//   return filteredButtons.map((button, index) =>
//     useButtonAnimation({
//       state,
//       index,
//       bottom: bottomPaddings[filteredButtons.length - 1],
//       radius,
//       roundness,
//       buttonsLength: filteredButtons.length,
//     }),
//   );
// };

const HvTabButtonWheel = ({ state, radius, roundness, buttons }: Props): JSX.Element => {
	// const buttonStyles = useButtonAnimations(state, radius, roundness, buttons);

	return (
		<View style={Styles.container}>
			{buttons.map((button, index) => {
				if (!button.isVisible) return null;
				return (
					<TouchableOpacity key={index} onPress={button.onPress}>
						{/* <Animated.View style={buttonStyles[tmpIndex]}> */}
						<HvLayeredIcon
							size={TAB_ICON_SIZE * 2}
							outerIcon={require('@/assets/svgs/filledCircle.svg')}
							innerIcon={button.icon}
						/>
						{/* </Animated.View> */}
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
	buttonClosed: {
		bottom: 0,
		left: 0,
	},
});

export default HvTabButtonWheel;
