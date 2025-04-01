import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import { Redirect, Stack } from 'expo-router';
// components
import { useSession } from '@/hooks/ctx';
import HvText from '@/components/ui/hvText';
import HvTabBar from '@/components/ui/hvTabBar/hvTabBar';
// constants
import { LIGHT_THEME } from '@/constants/colors';

const AppLayout = (): JSX.Element => {
	const { session, isLoading, signOut } = useSession();

	// temporary sign out on app leave. TODO: CHANGE LATER
	useEffect(() => {
		const handleAppStateChange = (nextAppState: string) => {
			if (nextAppState === 'background') {
				//  || nextAppState === 'inactive'
				// router.replace('/initial-screen');
				// signOut();
			}
		};
		// Listen for app state change, and deletes after state change to avoid duplicates
		const subscription = AppState.addEventListener('change', handleAppStateChange);
		return () => {
			subscription.remove();
		};
	}, [signOut]);

	// You can keep the splash screen open, or render a loading screen like we do here.
	if (isLoading) {
		return <HvText center>Loading...</HvText>;
	}

	// Only require authentication within the (app) group's layout as users
	// need to be able to access the (auth) group and sign in again.
	if (!session) {
		// On web, static rendering will stop here as the user is not authenticated
		// in the headless Node process that the pages are rendered in.
		return <Redirect href='/sign-in' />;
	}

	// This layout can be deferred because it's not the root layout.
	return (
		<>
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: LIGHT_THEME },
				}}
			>
				<Stack.Screen name='index' />
			</Stack>
			<HvTabBar />
		</>
	);
};

export default AppLayout;
