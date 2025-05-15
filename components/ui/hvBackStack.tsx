import { router, Stack } from 'expo-router';
import { BackHandler, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { DARK_GREEN, LIGHT_THEME } from '@/constants/colors';
import { useEffect } from 'react';

interface Props {
	title: string;
	ignoreHeaderRoutes?: string[];
}

/**
 * Custom back stack component
 * @param title - title of the screen
 * @param ignoreHeaderRoutes - routes for which to ignore the header
 * @returns custom back stack component
 */
const HvBackStack = ({ title, ignoreHeaderRoutes = [] }: Props): JSX.Element => {
	/**
	 * Function to go back to the previous screen if possible
	 */
	const goBack = (): boolean => {
		if (router.canDismiss()) {
			router.dismissAll();
			return true;
		}
		router.back();
		return true;
	};

	useEffect(() => {
		const backHandler = BackHandler.addEventListener('hardwareBackPress', goBack);

		return () => backHandler.remove();
	}, [goBack]);

	return (
		<Stack
			screenOptions={{
				headerShown: true,
				contentStyle: { backgroundColor: LIGHT_THEME },
				headerBackButtonDisplayMode: 'default',
				headerStyle: {
					backgroundColor: LIGHT_THEME,
				},
			}}
		>
			<Stack.Screen
				name='index'
				options={{
					title: title,
					headerTitleStyle: {
						...Styles.headerTitle,
					},
					headerBlurEffect: 'light',
					headerShadowVisible: false,
					headerLeft: () => (
						<TouchableOpacity style={Styles.headerBack} onPressIn={goBack}>
							<Image
								source={require('@/assets/svgs/back.svg')}
								contentFit='contain'
								style={Styles.headerBackIcon}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			{ignoreHeaderRoutes.map((route) => (
				<Stack.Screen
					key={route}
					name={route}
					options={{
						headerShown: false,
					}}
				/>
			))}
		</Stack>
	);
};

const Styles = StyleSheet.create({
	headerTitle: {
		fontFamily: 'OpenSansSemibold',
		fontSize: 18,
		color: DARK_GREEN,
	},
	headerBack: {
		alignItems: 'flex-start',
		width: 60,
		height: '100%',
		position: 'relative',
		left: -20,
		zIndex: 1000,
		marginRight: 20,
	},
	headerBackIcon: {
		width: '100%',
		height: 40,
	},
});

export default HvBackStack;
