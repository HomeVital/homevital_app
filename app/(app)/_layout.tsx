import React, { useEffect, useState } from 'react';
import { AppState, View, StyleSheet } from 'react-native';
import { Redirect, Stack } from 'expo-router';
// components
import { useSession } from '@/hooks/ctx';
import HvText from '@/components/ui/hvText';
import HvTabBar from '@/components/ui/hvTabBar/hvTabBar';
// constants
import { LIGHT_THEME } from '@/constants/colors';
import AddBloodSugar from '@/components/modals/AddBloodSugar';
import HvModalValidation from '@/components/modals/hvModalValidation';
import ModalContext from '@/contexts/modalContext';
import AddBloodOxygen from '@/components/modals/AddBloodOxygen';
import AddBloodPressure from '@/components/modals/AddBloodPressure';
import AddBodyWeight from '@/components/modals/AddBodyWeight';
import AddBodyTemperature from '@/components/modals/AddBodyTemperature';

const AppLayout = (): JSX.Element => {
	const { session, isLoading, signOut } = useSession();

	// validation modal
	const [validationVisible, setValidationVisible] = useState(false);
	const [validationStatus, setValidationStatus] = useState('');
	// measurements modals
	const [addBPVisible, setAddBPVisible] = useState(false);
	const [addBSVisible, setAddBSVisible] = useState(false);
	const [addBOVisible, setAddBOVisible] = useState(false);
	const [addBWVisible, setAddBWVisible] = useState(false);
	const [addBTVisible, setAddBTVisible] = useState(false);

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
		<ModalContext.Provider
			value={{
				addBPVisible,
				setAddBPVisible,
				addBSVisible,
				setAddBSVisible,
				addBOVisible,
				setAddBOVisible,
				addBWVisible,
				setAddBWVisible,
				addBTVisible,
				setAddBTVisible,
				validationVisible,
				setValidationVisible,
				validationStatus,
				setValidationStatus,
			}}
		>
			<View style={styles.container}>
				<Stack
					screenOptions={{
						headerShown: false,
						contentStyle: { backgroundColor: LIGHT_THEME },
					}}
				>
					<Stack.Screen name='index' />
				</Stack>

				<AddBloodSugar />
				<AddBloodOxygen />
				<AddBloodPressure />
				<AddBodyWeight />
				<AddBodyTemperature />

				<HvModalValidation
					visible={validationVisible}
					onClose={() => {
						setValidationVisible(false);
						// router.dismissAll();
					}}
					validationStatus={validationStatus}
				/>
			</View>
			<HvTabBar />
		</ModalContext.Provider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default AppLayout;
