import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import HvImage from './hvImage';

interface Props {
	size: number;
	innerIcon: string;
	outerIcon: string;
	shiftUp?: number;
}

/**
 * Custom layered icon component with two images
 *
 * @param size - size of the icon
 * @param outerIcon - outer icon image
 * @param innerIcon - inner icon image
 * @param shiftUp - shift inner icon up
 * @returns layered icon component
 */
const HvLayeredIcon = ({ size, outerIcon, innerIcon, shiftUp = 0 }: Props): JSX.Element => {
	const topShift = -0.8 * size - shiftUp;

	return (
		<View style={{ width: size, height: size }}>
			<Image source={outerIcon} style={Styles.outer} />
			<HvImage
				source={innerIcon}
				size={size * 0.6}
				style={[Styles.inner, { top: topShift }]}
			/>
		</View>
	);
};

const Styles = StyleSheet.create({
	outer: {
		width: '100%',
		height: '100%',
	},
	inner: {
		left: '20%',
		position: 'relative',
	},
});

export default HvLayeredIcon;
