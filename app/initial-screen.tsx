import { router } from 'expo-router';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HvButton from '@/components/ui/hvButton';
import { LIGHT_GREEN } from '@/constants/colors';
import { WIN_WIDTH } from '@/constants/window';
import { useTranslation } from 'react-i18next';

/**
 * Initial screen for the app that goes to the sign-in screen
 * when the user presses the button
 * @returns initial screen
 */
const InitialScreen = (): JSX.Element => {
	const { t } = useTranslation();
	return (
		<SafeAreaView style={Styles.container}>
			<Image
				source={require('@/assets/svgs/logo.svg')}
				contentFit='contain'
				style={Styles.homeImage}
			/>
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
