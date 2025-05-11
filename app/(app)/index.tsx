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
import { TAB_ICON_SIZE } from '@/constants/constants';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { PlanItem, schedulePlanNotifications } from '@/utility/notidicationHelper';

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

			// for (const day of plan.data.weightMeasurementDays) {
			// 	planItems.push({
			// 		id: day,
			// 		title: t('home.weightMeasurement'),
			// 		description: t('home.weightMeasurementDescription'),
			// 		scheduledTime: day,
			// 		type: 'weight',
			// 	});
			// }

			planItems.push({
				id: '1',
				title: 'Mæling',
				description: 'Þú hefur 1. mælingu í dag',
				scheduledTime: new Date(Date.now() + 5000).toISOString(), // Schedule for 5 seconds from now in ISO format
				type: 'bloodSugar',
			});

			schedulePlanNotifications(planItems);

			// // Schedule notifications based on the plan data
			// schedulePlanNotifications(planNotifications)
			// 	.then(() => )
			// 	.catch((error) => {
			// 		console.error('Failed to set up notifications:', error);
			// 	});
		}
	}, [plan.data, plan.isLoading, plan.isError, t]);

	// loading
	if (patient.isLoading && recentMeasurements.isLoading && plan.isLoading) return <LoadingView />;

	if (recentMeasurements.isLoading) {
		return (
			<SafeAreaView>
				{patient.data && (
					<>
						<HvHeader name={patient.data.name} />
						<LoadingView />
					</>
				)}
			</SafeAreaView>
		);
	}

	if (patient.isError || recentMeasurements.isError || plan.isError) return <ErrorView />;

	return (
		<SafeAreaView>
			{patient.data && (
				<>
					<HvHeader name={t('home.welcome') + patient.data.name.split(' ')[0]} />
					<View style={STYLES.defaultNoPadView}>
						<HvText weight='semibold' size='l' style={{ paddingInline: 20 }}>
							{t('home.recentMeasurements')}
						</HvText>
						<HvScrollView style={{ marginBottom: 166 + TAB_ICON_SIZE + 10 }}>
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
