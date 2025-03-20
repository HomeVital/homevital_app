import { WHITE } from '@/constants/colors';
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
	align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
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
	align = 'center',
	...props
}: Props): JSX.Element => {
	return (
		<View
			style={[
				props.style,
				Styles.item,
				{
					flexDirection: row ? 'row' : 'column',
					justifyContent: spacing,
					alignItems: align,
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
		backgroundColor: WHITE,
		boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
	},
});

export default HvCard;
