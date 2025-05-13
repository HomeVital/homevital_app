import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar'; // battery life and such
import { Redirect, Slot } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from '@/hooks/ctx';
import { LIGHT_THEME } from '@/constants/colors';
import NotificationProvider from '@/contexts/notificationContext';
import { LoadingView } from '@/components/queryStates';
import Toast from 'react-native-toast-message';
import { toastConfig } from '@/utility/utility';
import '@/utility/i18n';

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
		return <LoadingView />;
	}
	// Set up the auth context and render our layout inside of it.
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				<NotificationProvider>
					<StatusBar style='dark' backgroundColor={LIGHT_THEME} />
					<Slot />
					<Redirect href='/initial-screen' />
					<Toast config={toastConfig} />
				</NotificationProvider>
			</SessionProvider>
		</QueryClientProvider>
	);
};

export default RootLayout;
