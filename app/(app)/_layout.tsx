import React, { useEffect, useState } from 'react';
import { AppState, View, StyleSheet } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useSession } from '@/hooks/ctx';
import HvTabBar from '@/components/ui/hvTabBar/hvTabBar';
import { LIGHT_THEME } from '@/constants/colors';
import AddBloodSugar from '@/components/modals/AddBloodSugar';
import HvModalValidation from '@/components/modals/hvModalValidation';
import ModalContext from '@/contexts/modalContext';
import AddBloodOxygen from '@/components/modals/AddBloodOxygen';
import AddBloodPressure from '@/components/modals/AddBloodPressure';
import AddBodyWeight from '@/components/modals/AddBodyWeight';
import AddBodyTemperature from '@/components/modals/AddBodyTemperature';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import EditBloodOxygen from '@/components/modals/EditBloodOxygen';
import {
	IBloodPressure,
	IBloodSugar,
	IBodyTemperature,
	IBodyWeight,
	IOxygenSaturation,
} from '@/interfaces/measurements';
import HvModalEdit from '@/components/modals/hvModalEdit';
import EditBloodPressure from '@/components/modals/EditBloodPressure';
import EditBodyWeight from '@/components/modals/EditBodyWeight';
import EditTemperature from '@/components/modals/EditTemperature';
import EditBloodSugar from '@/components/modals/EditBloodSugar';
import ViewNotifications from '@/components/modals/ViewNotifications';
import { isExpired } from '@/utility/utility';
import { LoadingView } from '@/components/queryStates';

const AppLayout = (): JSX.Element => {
	const { session, isLoading, signOut, token } = useSession();
	// validation modal
	const [validationVisible, setValidationVisible] = useState(false);
	const [validationStatus, setValidationStatus] = useState('');
	// measurements modals
	const [addBPVisible, setAddBPVisible] = useState(false);
	const [addBSVisible, setAddBSVisible] = useState(false);
	const [addBOVisible, setAddBOVisible] = useState(false);
	const [addBWVisible, setAddBWVisible] = useState(false);
	const [addBTVisible, setAddBTVisible] = useState(false);
	// edit modals
	const [editBPVisible, setEditBPVisible] = useState(false);
	const [editBSVisible, setEditBSVisible] = useState(false);
	const [editBOVisible, setEditBOVisible] = useState(false);
	const [editBWVisible, setEditBWVisible] = useState(false);
	const [editBTVisible, setEditBTVisible] = useState(false);
	// language modal
	const [changeLangVisible, setChangeLangVisible] = useState(false);
	// notifications modal
	const [viewNotificationsVisible, setViewNotificationsVisible] = useState(false);
	// grayed overlay
	const [isOpen, setIsOpen] = useState(false);
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [editModalData, setEditModalData] = useState<{
		title: string;
		item: IBloodPressure | IBloodSugar | IBodyWeight | IBodyTemperature | IOxygenSaturation;
	}>({
		title: '',
		item: {} as
			| IBloodPressure
			| IBloodSugar
			| IBodyWeight
			| IBodyTemperature
			| IOxygenSaturation,
	});

	const isAnyInitModalVisible =
		addBTVisible ||
		addBPVisible ||
		addBWVisible ||
		addBOVisible ||
		addBSVisible ||
		isEditOpen ||
		changeLangVisible ||
		viewNotificationsVisible;

	const isAnyEditModalVisible =
		editBTVisible || editBPVisible || editBWVisible || editBOVisible || editBSVisible;

	// visibility
	const [contentReady, setContentReady] = useState(false);
	const [modalVisible, setModalVisible] = useState(0);
	const [editReady, setEditReady] = useState(false);
	const [editModalVisible, setEditModalVisible] = useState(0);

	// add handler
	useEffect(() => {
		if (isAnyInitModalVisible) {
			setModalVisible(1);
			setContentReady(true);
		} else {
			setContentReady(false);
			setModalVisible(0);
		}
	}, [isAnyInitModalVisible]);

	// edit handler
	useEffect(() => {
		if (isAnyEditModalVisible) {
			setEditModalVisible(1);
			setEditReady(true);
		} else {
			setEditReady(false);
			setEditModalVisible(0);
		}
	}, [isAnyEditModalVisible]);

	useEffect(() => {
		const handleAppStateChange = (nextAppState: string) => {
			if (nextAppState === 'background') {
				if (isExpired(token)) {
					signOut();
					return;
				}
			}
		};
		// Listen for app state change, and deletes after state change to avoid duplicates
		const subscription = AppState.addEventListener('change', handleAppStateChange);
		return () => {
			subscription.remove();
		};
	}, [signOut, token]);

	// animated dark grey overlay
	const opacity = useSharedValue<number>(0);

	useEffect(() => {
		opacity.value = withTiming(isOpen ? 1 : 0, {
			duration: 350, // Animation duration in milliseconds
		});
	}, [isOpen, opacity]);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			opacity: opacity.value,
			display: opacity.value !== 0 ? 'flex' : 'none',
		};
	});

	if (isLoading) {
		return <LoadingView />;
	}

	if (!session) {
		return <Redirect href='/initial-screen' />;
	}

	// This layout can be deferred because it's not the root layout.
	return (
		<ModalContext.Provider
			value={{
				// add
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
				// edit
				editBPVisible,
				setEditBPVisible,
				editBSVisible,
				setEditBSVisible,
				editBOVisible,
				setEditBOVisible,
				editBWVisible,
				setEditBWVisible,
				editBTVisible,
				setEditBTVisible,
				// other
				validationVisible,
				setValidationVisible,
				validationStatus,
				setValidationStatus,
				// between modals
				isOpen,
				setIsOpen,
				isEditOpen,
				setIsEditOpen,
				editModalData,
				setEditModalData,
				// loading
				contentReady,
				setContentReady,
				modalVisible,
				setModalVisible,
				editReady,
				setEditReady,
				editModalVisible,
				setEditModalVisible,
				// language
				changeLangVisible,
				setChangeLangVisible,
				// notifications
				viewNotificationsVisible,
				setViewNotificationsVisible,
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

				{addBSVisible && <AddBloodSugar />}
				{addBOVisible && <AddBloodOxygen />}
				{addBPVisible && <AddBloodPressure />}
				{addBWVisible && <AddBodyWeight />}
				{addBTVisible && <AddBodyTemperature />}

				<HvModalEdit />

				{editBOVisible && <EditBloodOxygen />}
				{editBPVisible && <EditBloodPressure />}
				{editBWVisible && <EditBodyWeight />}
				{editBTVisible && <EditTemperature />}
				{editBSVisible && <EditBloodSugar />}

				{viewNotificationsVisible && <ViewNotifications />}

				<HvModalValidation
					visible={validationVisible}
					onClose={() => {
						setValidationVisible(false);
					}}
					validationStatus={validationStatus}
				/>
			</View>
			{/* default gray seethrough overlaying background */}
			<Animated.View style={[styles.defaultSeethrough, animatedStyle, { zIndex: 10 }]} />
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
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
});

export default AppLayout;
