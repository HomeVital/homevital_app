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
import { useEffect } from 'react';
import { PlanItem, schedulePlanNotifications } from '@/utility/notidicationHelper';
import HvCard from '@/components/cards/hvCard';
import HvLayeredIcon from '@/components/ui/hvLayeredIcon';

const MainScreen = (): JSX.Element => {
	const { t } = useTranslation();
	const { session } = useSession();

	const [patient, recentMeasurements, plan] = useQueries({
		queries: [
			{
				queryKey: ['patient'],
				queryFn: async () =>
					fetchPatient(getClaimBySubstring(session?.toString() || '', 'sub')),
			},
			{
				queryKey: ['recentmeasurements'],
				queryFn: async () =>
					fetchRecentMeasurements(getClaimBySubstring(session?.toString() || '', 'sub')),
			},
			{
				queryKey: ['plan'],
				queryFn: async () =>
					fetchPlan(getClaimBySubstring(session?.toString() || '', 'sub')),
			},
		],
	});

	// Set up notifications when the plan data is available
	useEffect(() => {
		if (plan.data && !plan.isLoading && !plan.isError) {
			// Transform your plan data to match the PlanItem interface
			// This will depend on your actual data structure
			const planItems: PlanItem[] = [];

			// get current week
			const currentDate = new Date();

			let scheduleCounter = 0;

			while (currentDate <= new Date(plan.data.endDate) && scheduleCounter < 7) {
				//
				const weekday = currentDate.getDay();

				let measurementCounter = 0;

				if (plan.data.weightMeasurementDays[weekday]) {
					measurementCounter++;
				}
				if (plan.data.bloodSugarMeasurementDays[weekday]) {
					measurementCounter++;
				}
				if (plan.data.bloodPressureMeasurementDays[weekday]) {
					measurementCounter++;
				}
				if (plan.data.oxygenSaturationMeasurementDays[weekday]) {
					measurementCounter++;
				}
				if (plan.data.bodyTemperatureMeasurementDays[weekday]) {
					measurementCounter++;
				}
				if (measurementCounter >= 1) {
					const planSetDate = new Date(currentDate);
					planSetDate.setHours(8, 0, 0, 0); // Set time to 8:00 AM
					planItems.push({
						id: planItems.length.toString(),
						title: t('notifications.title'),
						description: t('notifications.message', { count: measurementCounter }),
						scheduledTime: new Date(planSetDate).toISOString(),
						type: 'measurements',
					});
				}

				currentDate.setDate(currentDate.getDate() + 1);
				scheduleCounter++;
			}

			// const year = '2025';
			// const month = '05';
			// const day = '11';
			// const hour = '13';
			// const minute = '30';

			planItems.push({
				id: Math.floor(Math.random() * 10000 + 1).toString(),
				title: t('notifications.title'),
				description: t('notifications.message', { count: 4 }),
				scheduledTime: new Date(new Date().getTime() + 5000).toISOString(),
				type: 'test',
			});

			planItems.push({
				id: Math.floor(Math.random() * 10000 + 1).toString(),
				title: t('notifications.title'),
				description: t('notifications.message', { count: 1 }),
				scheduledTime: new Date(new Date().getTime() + 10000).toISOString(),
				type: 'test',
			});

			planItems.push({
				id: Math.floor(Math.random() * 10000 + 1).toString(),
				title: t('notifications.title'),
				description: t('notifications.message', { count: 3 }),
				scheduledTime: new Date(new Date().getTime() + 15000).toISOString(),
				type: 'test',
			});

			planItems.push({
				id: Math.floor(Math.random() * 10000 + 1).toString(),
				title: t('notifications.title'),
				description: t('notifications.message', { count: 4 }),
				scheduledTime: new Date(new Date().getTime() + 20000).toISOString(),
				type: 'test',
			});

			planItems.push({
				id: Math.floor(Math.random() * 10000 + 1).toString(),
				title: t('notifications.title'),
				description: t('notifications.message', { count: 2 }),
				scheduledTime: new Date(new Date().getTime() + 25000).toISOString(),
				type: 'test',
			});

			planItems.push({
				id: Math.floor(Math.random() * 10000 + 1).toString(),
				title: t('notifications.title'),
				description: t('notifications.message', { count: 2 }),
				scheduledTime: new Date(new Date().getTime() + 30000).toISOString(),
				type: 'test',
			});

			//
			schedulePlanNotifications(planItems);
		}
	}, [plan.data, plan.isLoading, plan.isError, t]);

	// loading
	// if (patient.isLoading && recentMeasurements.isLoading && plan.isLoading) return <LoadingView />;

	if (recentMeasurements.isLoading || plan.isLoading || patient.isLoading) {
		return (
			<SafeAreaView>
				<HvHeader name={patient.data?.name ? patient.data?.name.split(' ')[0] : ''} />
				<LoadingView />
			</SafeAreaView>
		);
	}

	if (patient.isError || recentMeasurements.isError || plan.isError) return <ErrorView />;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{patient.data && (
				<>
					<View style={{ flex: 1, gap: 12 }}>
						<HvHeader name={t('home.welcome') + patient.data.name.split(' ')[0]} />

						{/* instructions */}
						{plan.data && plan.data.instructions && (
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
										<HvText>{plan.data?.instructions}</HvText>
									</View>
								</HvCard>
							</View>
						)}

						{/* recent measurements */}
						<HvText weight='semibold' size='l' style={{ paddingInline: 20 }}>
							{t('home.recentMeasurements')}
						</HvText>
						<HvScrollView>
							<View style={STYLES.defaultView}>
								{recentMeasurements.data && recentMeasurements.data.length > 0 ? (
									<HvCardRecentMeasurements items={recentMeasurements.data} />
								) : (
									<HvText>{t('home.noMeasurements')}</HvText>
								)}
							</View>
						</HvScrollView>
					</View>
				</>
			)}
		</SafeAreaView>
	);
};

export default MainScreen;
