import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar'; // battery life and such
import { Redirect, Slot } from 'expo-router';
// import { router } from "expo-router";

// components
import { SessionProvider } from '@/authentication/ctx';
// constants
import { LIGHT_THEME } from '@/constants/colors';
// import { PaperProvider } from 'react-native-paper';

const RootLayout = (): JSX.Element => {
	const [loaded] = useFonts({
		OpenSans: require('../assets/fonts/OpenSans-Regular.ttf'),
		OpenSansSemibold: require('../assets/fonts/OpenSans-Semibold.ttf'),
		OpenSansLight: require('../assets/fonts/OpenSans-Light.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
			// router.replace("/initial-screen");
		}
	}, [loaded]);

	if (!loaded) {
		return <></>;
	}
	// Set up the auth context and render our layout inside of it.
	return (
		<SessionProvider>
			{/* <PaperProvider> */}
			<StatusBar style='dark' backgroundColor={LIGHT_THEME} />
			{/* <View style={Styles.container}> */}
			<Slot />

			<Redirect href='/initial-screen' />
			{/* </View> */}
			{/* </PaperProvider> */}
		</SessionProvider>
	);
};

// const Styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//   },
// });

export default RootLayout;
