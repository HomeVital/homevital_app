import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQueries } from '@tanstack/react-query';
// components
import HvHeader from '@/components/homeScreen/hvHeader';
import HvText from '@/components/ui/hvText';
import { STYLES } from '@/constants/styles';
import { useSession } from '@/hooks/ctx';
import HvScrollView from '@/components/ui/HvScrollView';
import { fetchPatient, fetchPlan, fetchRecentMeasurements } from '@/queries/get';
import HvCardRecentMeasurements from '@/components/cards/hvCardRecentMeasurement';
import { ErrorView, LoadingView } from '@/components/queryStates';
import { getClaimBySubstring } from '@/utility/utility';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect } from 'react';
import { scheduleNotifications } from '@/utility/notificationHelper';
import HvCard from '@/components/cards/hvCard';
import HvLayeredIcon from '@/components/ui/hvLayeredIcon';
import { useNotification } from '@/contexts/notificationContext';
import { NotificationService } from '@/utility/notificationService';
import ModalContext from '@/contexts/modalContext';
import HvImage from '@/components/ui/hvImage';
import HvButtonContainer from '@/components/ui/hvButtonContainer';

const MainScreen = (): JSX.Element => {
	const { t } = useTranslation();
	const { token } = useSession();
	const modals = useContext(ModalContext);
	const { getNotificationState, setNotificationCount } = useNotification();
	// queries
	const [patient, recentMeasurements, plan] = useQueries({
		queries: [
			{
				queryKey: ['patient'],
				queryFn: async () => fetchPatient(getClaimBySubstring(token, 'sub'), token),
			},
			{
				queryKey: ['recentmeasurements'],
				queryFn: async () =>
					fetchRecentMeasurements(getClaimBySubstring(token, 'sub'), token),
			},
			{
				queryKey: ['plan'],
				queryFn: async () => fetchPlan(getClaimBySubstring(token, 'sub'), token),
			},
		],
	});

	const todayMeasurements = recentMeasurements.data?.filter((measurement) => {
		const measurementDate = new Date(measurement.measurementDate);
		const today = new Date();
		return (
			measurementDate.getDate() === today.getDate() &&
			measurementDate.getMonth() === today.getMonth() &&
			measurementDate.getFullYear() === today.getFullYear()
		);
	});

	const measurementsLeftToday = (): string[] => {
		const today = new Date();
		const weekday = today.getDay();

		const todayMeasurementsLeft = [] as string[];

		if (
			plan.data?.endDate &&
			today <= new Date(plan.data.endDate) &&
			plan.data?.startDate &&
			today >= new Date(plan.data.startDate)
		) {
			if (plan.data?.weightMeasurementDays[weekday]) {
				if (todayMeasurements && todayMeasurements.length > 0) {
					let found = false;
					for (let i = 0; i < todayMeasurements.length; i++) {
						if (todayMeasurements[i].measurementType === 'BodyWeight') {
							found = true;
							break;
						}
					}
					if (!found) {
						todayMeasurementsLeft.push('BodyWeight');
					}
				} else {
					todayMeasurementsLeft.push('BodyWeight');
				}
			}
			if (plan.data?.bloodSugarMeasurementDays[weekday]) {
				if (todayMeasurements && todayMeasurements.length > 0) {
					let found = false;
					for (let i = 0; i < todayMeasurements.length; i++) {
						if (todayMeasurements[i].measurementType === 'BloodSugar') {
							found = true;
							break;
						}
					}
					if (!found) {
						todayMeasurementsLeft.push('BloodSugar');
					}
				} else {
					todayMeasurementsLeft.push('BloodSugar');
				}
			}
			if (plan.data?.bloodPressureMeasurementDays[weekday]) {
				if (todayMeasurements && todayMeasurements.length > 0) {
					let found = false;
					for (let i = 0; i < todayMeasurements.length; i++) {
						if (todayMeasurements[i].measurementType === 'BloodPressure') {
							found = true;
							break;
						}
					}
					if (!found) {
						todayMeasurementsLeft.push('BloodPressure');
					}
				} else {
					todayMeasurementsLeft.push('BloodPressure');
				}
			}
			if (plan.data?.oxygenSaturationMeasurementDays[weekday]) {
				if (todayMeasurements && todayMeasurements.length > 0) {
					let found = false;
					for (let i = 0; i < todayMeasurements.length; i++) {
						if (todayMeasurements[i].measurementType === 'OxygenSaturation') {
							found = true;
							break;
						}
					}
					if (!found) {
						todayMeasurementsLeft.push('OxygenSaturation');
					}
				} else {
					todayMeasurementsLeft.push('OxygenSaturation');
				}
			}
			if (plan.data?.bodyTemperatureMeasurementDays[weekday]) {
				if (todayMeasurements && todayMeasurements.length > 0) {
					let found = false;
					for (let i = 0; i < todayMeasurements.length; i++) {
						if (todayMeasurements[i].measurementType === 'BodyTemperature') {
							found = true;
							break;
						}
					}
					if (!found) {
						todayMeasurementsLeft.push('BodyTemperature');
					}
				} else {
					todayMeasurementsLeft.push('BodyTemperature');
				}
			}
		}
		return todayMeasurementsLeft;
	};

	// reset count when notification modal is open
	useEffect(() => {
		if (modals.viewNotificationsVisible) {
			setNotificationCount(0);
		}
	}, [modals.viewNotificationsVisible, setNotificationCount]);

	// Set up calendar notifications
	useEffect(() => {
		const setupNotifications = async () => {
			if (
				plan.data &&
				!plan.isLoading &&
				!plan.isError &&
				!recentMeasurements.isLoading &&
				!recentMeasurements.isError &&
				getNotificationState() === true
			) {
				await scheduleNotifications(plan.data, t, measurementsLeftToday() || []);
			} else if (getNotificationState() === false) {
				NotificationService.cancelAllNotifications();
			}
		};
		setupNotifications();
	}, [
		plan.data,
		plan.isLoading,
		plan.isError,
		t,
		getNotificationState,
		recentMeasurements,
		measurementsLeftToday,
	]);

	// error
	if (patient.isError && recentMeasurements.isError && plan.isError) return <ErrorView />;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{patient.data && (
				<>
					<View style={{ flex: 1, gap: 12 }}>
						{patient.data && patient.data.name ? (
							<HvHeader name={t('home.welcome') + patient.data.name.split(' ')[0]} />
						) : (
							<HvHeader name={t('home.welcome') + '?'} />
						)}
						{/* instructions */}
						{plan.isLoading ? (
							<LoadingView />
						) : plan.data && plan.data.instructions ? (
							<View style={STYLES.defaultViewNoMargin}>
								<HvCard padding={20} gap={20} row spacing={'flex-start'}>
									<View style={{ justifyContent: 'center' }}>
										<HvLayeredIcon
											innerIcon='Instruction'
											outerIcon={require('@/assets/svgs/circle.svg')}
											size={40}
										/>
									</View>
									<View style={{ flex: 1, justifyContent: 'center' }}>
										<HvText weight='semibold'>{plan.data.instructions}</HvText>
									</View>
								</HvCard>
							</View>
						) : plan.data ? (
							<></>
						) : (
							<View style={STYLES.defaultViewNoMargin}>
								<HvCard padding={20} gap={20} row spacing={'flex-start'}>
									<HvText weight='semibold'>{t('home.noInstructions')}</HvText>
								</HvCard>
							</View>
						)}
						{/* today measurements */}
						{measurementsLeftToday().length > 0 && (
							<View style={STYLES.defaultViewNoMargin}>
								<HvText weight='semibold' size='l'>
									{t('home.today')}
								</HvText>
								<View
									style={{
										justifyContent: 'space-evenly',
										flexDirection: 'row',
									}}
								>
									{measurementsLeftToday().map((measurement) => (
										<HvButtonContainer
											key={measurement}
											onPress={() => {
												modals.setIsOpen(true);
												if (measurement === 'BodyWeight') {
													modals.setAddBWVisible(true);
												}
												if (measurement === 'BloodSugar') {
													modals.setAddBSVisible(true);
												}
												if (measurement === 'BloodPressure') {
													modals.setAddBPVisible(true);
												}
												if (measurement === 'OxygenSaturation') {
													modals.setAddBOVisible(true);
												}
												if (measurement === 'BodyTemperature') {
													modals.setAddBTVisible(true);
												}
											}}
										>
											<HvCard key={measurement} padding={10}>
												<HvImage source={measurement} size={34} />
											</HvCard>
										</HvButtonContainer>
									))}
								</View>
							</View>
						)}

						{/* recent measurements */}
						{recentMeasurements && (
							<HvText weight='semibold' size='l' style={{ paddingInline: 20 }}>
								{t('home.recentMeasurements')}
							</HvText>
						)}
						{recentMeasurements && (
							<HvScrollView onRefresh={() => recentMeasurements.refetch()}>
								<View style={STYLES.defaultView}>
									{recentMeasurements.data &&
									recentMeasurements.data.length > 0 ? (
										<HvCardRecentMeasurements items={recentMeasurements.data} />
									) : (
										<HvText>{t('home.noMeasurements')}</HvText>
									)}
								</View>
							</HvScrollView>
						)}
					</View>
				</>
			)}
		</SafeAreaView>
	);
};

export default MainScreen;
