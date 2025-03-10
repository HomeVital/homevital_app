import { WHITE } from '@/constants/colors';
import { StyleSheet, ViewProps, View } from 'react-native';

const HvCard = ({ ...props }: ViewProps): JSX.Element => {
	return <View style={[props.style, Styles.item]}>{props.children}</View>;
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
