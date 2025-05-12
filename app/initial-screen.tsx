import { router } from 'expo-router';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HvButton from '@/components/ui/hvButton';
import { LIGHT_GREEN } from '@/constants/colors';
import { WIN_WIDTH } from '@/constants/window';
import { useTranslation } from 'react-i18next';
import { useSession } from '@/hooks/ctx';
import { useEffect } from 'react';
import { useNotification } from '@/contexts/notificationContext';
import { isExpired } from '@/utility/utility';
import i18n from '@/utility/i18n';

/**
 * Initial screen for the app that goes to the sign-in screen
 * when the user presses the button
 * @returns initial screen
 */
const InitialScreen = (): JSX.Element => {
	const { t } = useTranslation();
	const { session, token } = useSession();
	const { setNotificationCount, setNotifications, language } = useNotification();
	// const modals = useContext(ModalContext);

	useEffect(() => {
		// clearing for other potential users
		setNotificationCount(0);
		setNotifications([]);
		i18n.changeLanguage(language || 'us');
		// log automatically in
		if (session && !isExpired(token)) {
			if (router.canDismiss()) {
				router.dismissAll();
			}
			router.replace('/');
		}
	}, [session, token, setNotificationCount, setNotifications, language]);

	return (
		<SafeAreaView style={Styles.container}>
			<Image
				source={require('@/assets/svgs/logo.svg')}
				contentFit='contain'
				style={Styles.homeImage}
			/>

			{/* <View style={{ position: 'absolute', top: 50, right: 20 }}>

				<HvButtonContainer
					onPress={() => {
						modals.setChangeLangVisible(true);
						modals.setIsOpen(true);
					}}>
					<CountryFlag
						isoCode={language ? language : i18n.language}
						size={32}
						style={{
							borderRadius: 4,
							// borderColor: DARK_GREEN,
							// borderWidth: 1,
							boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.5)',
						}}
					/>
				</HvButtonContainer>
			</View> */}

			<HvButton
				text={t('signIn.title')}
				width={WIN_WIDTH * 0.75}
				onPress={() => router.push('/sign-in')}
			/>
		</SafeAreaView>
	);
};

const Styles = StyleSheet.create({
	container: {
		flex: 1, // take up entire screen
		justifyContent: 'space-around', // center vertically
		alignItems: 'center', // center horizontally
		backgroundColor: LIGHT_GREEN,
	},
	homeImage: {
		height: '50%',
		width: '70%',
	},
});

export default InitialScreen;
