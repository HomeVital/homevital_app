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
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

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
	// grayed overlay
	const [isOpen, setIsOpen] = useState(false);

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

	// animated dark grey overlay
	const opacity = useSharedValue<number>(0);

	useEffect(() => {
		opacity.value = withTiming(isOpen ? 1 : 0, {
			duration: 250, // Animation duration in milliseconds
		});
	}, [isOpen, opacity]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
			display: opacity.value !== 0 ? 'flex' : 'none',
		};
	});

	if (isLoading) {
		return <HvText center>Loading...</HvText>; // TODO
	}

	if (!session) {
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
				isOpen,
				setIsOpen,
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
			{/* default gray seethrough overlaying background */}
			<Animated.View
				style={[
					styles.defaultSeethrough,
					animatedStyle, // This already contains the opacity animation
				]}
			/>
			{/* {isOpen && <View style={styles.defaultSeethrough} />} */}
			<HvTabBar />
		</ModalContext.Provider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	defaultSeethrough: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
	},
});

export default AppLayout;
