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
}

const HvCard = ({ row = false, spacing = 'space-between', ...props }: Props): JSX.Element => {
	return (
		<View
			style={[
				props.style,
				Styles.item,
				{ flexDirection: row ? 'row' : 'column', justifyContent: spacing },
			]}
		>
			{props.children}
		</View>
	);
};

const Styles = StyleSheet.create({
	item: {
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 10,
		backgroundColor: WHITE,
		boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
	},
});

export default HvCard;
