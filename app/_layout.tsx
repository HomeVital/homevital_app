import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar'; // battery life and such
import { Redirect, Slot } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// components
import { SessionProvider } from '@/hooks/ctx';
// constants
import { LIGHT_THEME } from '@/constants/colors';
// import { PaperProvider } from 'react-native-paper';

const queryClient = new QueryClient();

const RootLayout = (): JSX.Element => {
	const [loaded] = useFonts({
		OpenSans: require('../assets/fonts/OpenSans-Regular.ttf'),
		OpenSansBold: require('../assets/fonts/OpenSans-Bold.ttf'),
		OpenSansSemibold: require('../assets/fonts/OpenSans-Semibold.ttf'),
		OpenSansLight: require('../assets/fonts/OpenSans-Light.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return <></>;
	}
	// Set up the auth context and render our layout inside of it.
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				{/* <PaperProvider> */}
				<StatusBar style='dark' backgroundColor={LIGHT_THEME} />
				<Slot />
				<Redirect href='/initial-screen' />
				{/* </PaperProvider> */}
			</SessionProvider>
		</QueryClientProvider>
	);
};

export default RootLayout;
