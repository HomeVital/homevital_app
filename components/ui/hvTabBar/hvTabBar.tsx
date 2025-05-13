import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Modal } from 'react-native';
import { RelativePathString, router } from 'expo-router';
import HvTabItem from './hvTabItem';
import { LIGHT_GRAY, WHITE } from '@/constants/colors';
import HvTabItemAnimated from './hvTabItemAnimated';
import HvTabButtonWheel from './hvTabButtonWheel';
import ModalContext from '@/contexts/modalContext';
import { useTranslation } from 'react-i18next';
import { useSession } from '@/hooks/ctx';
import { useQuery } from '@tanstack/react-query';
import { fetchPlan } from '@/queries/get';
import { getClaimBySubstring } from '@/utility/utility';
import { ErrorView } from '@/components/queryStates';

/**
 * Custom tab bar component with possible large tab, and a rotating tab for a button wheel
 * @returns custom tab bar component
 */
const HvTabBar = (): JSX.Element => {
	const { t } = useTranslation();
	const { token } = useSession();
	const modals = useContext(ModalContext);
	const [stackName, setStackName] = useState('');
	const [wheelOpen, setWheelOpen] = useState(false);
	const [buttonsToShow, setButtonsToShow] = useState<
		{ title: string; name: string; onPress: () => void; isVisible: boolean }[]
	>([]);

	const { data, isError, isLoading } = useQuery({
		queryKey: ['plan'],
		queryFn: async () => fetchPlan(getClaimBySubstring(token, 'sub'), token),
	});

	// visibility
	const [contentReady, setContentReady] = useState(false);
	const [modalVisible, setModalVisible] = useState(0);

	useEffect(() => {
		if (wheelOpen) {
			setModalVisible(1);
			setContentReady(true);
		} else {
			setContentReady(false);
			setModalVisible(0);
		}
	}, [wheelOpen]);

	/**
	 * Handles tab route with proper depth
	 * @param route - route to navigate to
	 * @param prev - previous route
	 * @returns route to navigate to
	 */
	const handleTabRoute = (route: string, prev: string): string => {
		modals.setIsOpen(false);
		setWheelOpen(false);
		router.push(route as RelativePathString);
		return route;
	};

	// Define your buttons with isVisible based on data
	useEffect(() => {
		if (data) {
			const updatedButtons = [
				{
					title: 'bodyTemperatureMeasurementDays',
					name: 'BodyTemperatureLight',
					onPress: () => {
						modals.setAddBTVisible(true);
						setWheelOpen(false);
					},
					isVisible:
						data.bodyTemperatureMeasurementDays.reduce((sum, day) => sum + day, 0) !==
						0,
				},
				{
					title: 'bloodPressureMeasurementDays',
					name: 'BloodPressureLight',
					onPress: () => {
						modals.setAddBPVisible(true);
						setWheelOpen(false);
					},
					isVisible:
						data.bloodPressureMeasurementDays.reduce((sum, day) => sum + day, 0) !== 0,
				},
				{
					title: 'weightMeasurementDays',
					name: 'BodyWeightLight',
					onPress: () => {
						modals.setAddBWVisible(true);
						setWheelOpen(false);
					},
					isVisible: data.weightMeasurementDays.reduce((sum, day) => sum + day, 0) !== 0,
				},
				{
					title: 'oxygenSaturationMeasurementDays',
					name: 'OxygenSaturationLight',
					onPress: () => {
						modals.setAddBOVisible(true);
						setWheelOpen(false);
					},
					isVisible:
						data.oxygenSaturationMeasurementDays.reduce((sum, day) => sum + day, 0) !==
						0,
				},
				{
					title: 'bloodSugarMeasurementDays',
					name: 'BloodSugarLight',
					onPress: () => {
						modals.setAddBSVisible(true);
						setWheelOpen(false);
					},
					isVisible:
						data.bloodSugarMeasurementDays.reduce((sum, day) => sum + day, 0) !== 0,
				},
			];

			setButtonsToShow(updatedButtons);
		} else {
			setButtonsToShow([
				{
					title: 'bodyTemperatureMeasurementDays',
					name: 'BodyTemperatureLight',
					onPress: () => {
						modals.setAddBTVisible(true);
						setWheelOpen(false);
					},
					isVisible: false,
				},
				{
					title: 'bloodPressureMeasurementDays',
					name: 'BloodPressureLight',
					onPress: () => {
						modals.setAddBPVisible(true);
						setWheelOpen(false);
					},
					isVisible: false,
				},
				{
					title: 'weightMeasurementDays',
					name: 'BodyWeightLight',
					onPress: () => {
						modals.setAddBWVisible(true);
						setWheelOpen(false);
					},
					isVisible: false,
				},
				{
					title: 'oxygenSaturationMeasurementDays',
					name: 'OxygenSaturationLight',
					onPress: () => {
						modals.setAddBOVisible(true);
						setWheelOpen(false);
					},
					isVisible: false,
				},
				{
					title: 'bloodSugarMeasurementDays',
					name: 'BloodSugarLight',
					onPress: () => {
						modals.setAddBSVisible(true);
						setWheelOpen(false);
					},
					isVisible: false,
				},
			]);
		}
	}, [data, modals]);

	if (isError) return <ErrorView />;

	if (isLoading)
		return (
			<View style={Styles.container}>
				<HvTabItem
					onPress={() => {
						setStackName(handleTabRoute('/(app)/(measurements)', stackName));
					}}
					source={require('@/assets/svgs/barChart.svg')}
					text={t('tabbar.measurements')}
				/>
				{buttonsToShow.some((button) => button.isVisible) && (
					<HvTabItemAnimated
						onPress={() => {
							modals.setIsOpen(!wheelOpen);
							setWheelOpen(!wheelOpen);
						}}
						source={require('@/assets/svgs/add.svg')}
						source2={require('@/assets/svgs/addRed.svg')}
						text={t('tabbar.addMeasurement')}
						addOpen={wheelOpen}
						large
					/>
				)}
				<HvTabItem
					onPress={() => {
						setStackName(handleTabRoute('/(app)/(settings)', stackName));
					}}
					source={require('@/assets/svgs/manUser.svg')}
					text={t('tabbar.settings')}
				/>
			</View>
		);

	return (
		<>
			<View>
				<Modal
					visible={wheelOpen}
					animationType={contentReady ? 'fade' : 'none'}
					onRequestClose={() => {
						modals.setIsOpen(false);
						setWheelOpen(false);
					}}
					transparent={true}
				>
					<TouchableWithoutFeedback
						onPressIn={() => {
							modals.setIsOpen(false);
							setWheelOpen(false);
						}}
					>
						<View style={[Styles.scrollView, { opacity: modalVisible }]}>
							<HvTabButtonWheel
								radius={65}
								roundness={0.5}
								buttons={buttonsToShow.filter((button) => button.isVisible)}
							/>
						</View>
					</TouchableWithoutFeedback>
				</Modal>
			</View>
			<View style={Styles.container}>
				<HvTabItem
					onPress={() => {
						setStackName(handleTabRoute('/(app)/(measurements)', stackName));
					}}
					source={require('@/assets/svgs/barChart.svg')}
					text={t('tabbar.measurements')}
				/>
				{buttonsToShow.some((button) => button.isVisible) && (
					<HvTabItemAnimated
						onPress={() => {
							modals.setIsOpen(!wheelOpen);
							setWheelOpen(!wheelOpen);
						}}
						source={require('@/assets/svgs/add.svg')}
						source2={require('@/assets/svgs/addRed.svg')}
						text={t('tabbar.addMeasurement')}
						addOpen={wheelOpen}
						large
					/>
				)}
				<HvTabItem
					onPress={() => {
						setStackName(handleTabRoute('/(app)/(settings)', stackName));
					}}
					source={require('@/assets/svgs/manUser.svg')}
					text={t('tabbar.settings')}
				/>
			</View>
		</>
	);
};

const Styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		position: 'relative',
		bottom: 0,
		width: '100%',
		paddingHorizontal: 20,
		backgroundColor: WHITE,
		borderTopWidth: 1,
		borderTopColor: LIGHT_GRAY,
	},

	scrollView: {
		position: 'absolute',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
		alignItems: 'flex-end',
		justifyContent: 'center',
	},

	overlay: {
		position: 'absolute',
		top: -1,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
	},
});

export default HvTabBar;
