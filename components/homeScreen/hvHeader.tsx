import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import HvText from '../ui/hvText';
import HvBadge from '../ui/hvBadge';
import { useNotification } from '@/contexts/notificationContext';
import { useContext } from 'react';
import ModalContext from '@/contexts/modalContext';
import HvButtonContainer from '../ui/hvButtonContainer';

interface Props {
	name: string;
}

/**
 * Custom header component for the home screen (ONLY)
 * @param name - name of the user
 * @returns header component for the home screen
 */
const HvHeader = ({ name }: Props): JSX.Element => {
	const { notificationCount, setNotificationCount } = useNotification();
	const modals = useContext(ModalContext);

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
			<HvButtonContainer
				onPress={() => {
					modals.setIsOpen(true);
					modals.setViewNotificationsVisible(true);
					setNotificationCount(0);
				}}
			>
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
			</HvButtonContainer>
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
