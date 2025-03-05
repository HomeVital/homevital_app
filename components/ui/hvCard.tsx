import { WHITE } from '@/constants/colors';
import { StyleSheet, ViewProps, View } from 'react-native';

interface Props extends ViewProps {
	key?: number;
}

const HvCard = ({ key, ...props }: Props): JSX.Element => {
	return (
		<View {...(key ? { key } : {})} style={[props.style, Styles.item]}>
			{props.children}
		</View>
	);
};

const Styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 10,
		backgroundColor: WHITE,
		boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
	},
});

export default HvCard;
