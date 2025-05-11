import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
// components
import HvText from '../ui/hvText';
import HvBadge from '../ui/hvBadge';

interface Props {
	name: string;
	notificationCount?: number;
}

/**
 * Custom header component for the home screen (ONLY)
 * @param name - name of the user
 * @returns header component for the home screen
 */
const HvHeader = ({ name, notificationCount }: Props): JSX.Element => {
	return (
		<View style={Styles.container}>
			<Image
				source={require('@/assets/svgs/logoSmall.svg')}
				contentFit='contain'
				style={Styles.headerLogo}
			/>
			<HvText size='l' weight='semibold' style={Styles.headerText}>
				{name}
			</HvText>
			<TouchableOpacity>
				<Image
					source={require('@/assets/svgs/notificationBell.svg')}
					contentFit='contain'
					style={Styles.headerRight}
				></Image>
				<HvBadge
					count={notificationCount ? notificationCount : 0}
					size={20}
					position='topRight'
				/>
			</TouchableOpacity>
		</View>
	);
};

const Styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 60,
		paddingHorizontal: 30,
	},
	headerLogo: {
		width: 40,
		height: 40,
	},
	headerText: {
		flex: 1,
		textAlign: 'center',
		textTransform: 'capitalize',
	},
	headerRight: {
		width: 40,
		height: 34,
	},
});

export default HvHeader;
