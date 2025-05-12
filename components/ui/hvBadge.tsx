import { View, StyleSheet } from 'react-native';
import HvText from './hvText';
import { DARK_RED } from '@/constants/colors';

interface Props {
	count: number;
	size: number;
	position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}

/**
 * Badge component for displaying a count
 * @param count - count to display
 * @returns badge component for displaying a count
 */
const HvBadge = ({ count, size, position }: Props): JSX.Element => {
	return (
		<View
			style={[
				Styles.badge,
				{
					display: count > 0 ? 'flex' : 'none',
					minWidth: size,
					height: size,
					top: position === 'topLeft' || position === 'topRight' ? -5 : undefined,
					bottom:
						position === 'bottomLeft' || position === 'bottomRight' ? -5 : undefined,
					left: position === 'topLeft' || position === 'bottomLeft' ? -5 : undefined,
					right: position === 'topRight' || position === 'bottomRight' ? -5 : undefined,
				},
			]}
		>
			<HvText center color='white' size='xs' weight='bold'>
				{count > 99 ? `99+` : count}
			</HvText>
		</View>
	);
};

const Styles = StyleSheet.create({
	badge: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		backgroundColor: DARK_RED,
		paddingInline: 5,
	},
});

export default HvBadge;
