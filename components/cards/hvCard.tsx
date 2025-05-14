import { DARK_GREEN, WHITE } from '@/constants/colors';
import { StyleSheet, ViewProps, View } from 'react-native';

interface Props extends ViewProps {
	row?: boolean;
	spacing?:
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'space-between'
		| 'space-around'
		| 'space-evenly';
	align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' | undefined;
	gap?: number | null;
	padding?: number | null;
	bgColor?: string;
	fullBorder?: boolean;
	border?: boolean;
	borderColor?: string;
	hideShadow?: boolean;
}

/**
 * Custom card component
 * @param row - if true, children will be displayed in a row
 * @param spacing - justify content for the children
 * @param props - additional view props
 * @returns custom card component
 */
const HvCard = ({
	row = false,
	spacing = 'space-between',
	align = undefined,
	gap = null,
	padding = null,
	bgColor = WHITE,
	fullBorder = false,
	border = false,
	borderColor = DARK_GREEN,
	hideShadow = false,
	...props
}: Props): JSX.Element => {
	/**
	 * Get color from borderColor status prop
	 * @returns color based on the border color
	 */
	const getColor = () => {
		switch (borderColor) {
			case 'Normal':
				return '#77DD77'; // green
			case 'Raised':
				return '#FFD555'; // yellow
			case 'High':
				return '#FF3333'; // red
			case 'Critical':
				return '#FF3333'; // red
			default:
				return '#FF3333'; // red
		}
	};

	let borderColorStyle = borderColor;
	if (border) {
		borderColorStyle = getColor();
	}

	return (
		<View
			style={[
				props.style,
				Styles.item,
				{
					flexDirection: row ? 'row' : 'column',
					justifyContent: spacing,
					alignItems: align,
					gap: gap ? gap : undefined,
					padding: padding ? padding : undefined,
					backgroundColor: bgColor,
					borderBottomWidth: border ? 4 : undefined,
					borderWidth: fullBorder ? 1 : undefined,
					borderColor: border || fullBorder ? borderColorStyle : undefined,
					boxShadow: hideShadow ? undefined : '0px 2px 4px rgba(0, 0, 0, 0.25)',
				},
			]}
		>
			{props.children}
		</View>
	);
};

const Styles = StyleSheet.create({
	item: {
		borderRadius: 10,
	},
});

export default HvCard;
