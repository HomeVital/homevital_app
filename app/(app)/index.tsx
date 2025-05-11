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

const MainScreen = (): JSX.Element => {
	const { t } = useTranslation();
	const { session } = useSession();
	const modals = useContext(ModalContext);
	const { notificationsActive, notificationCount, setNotificationCount } = useNotification();

	// queries
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

	// reset count when notification modal is open
	useEffect(() => {
		if (modals.viewNotificationsVisible) {
			setNotificationCount(0);
		}
	}, [modals.viewNotificationsVisible, notificationCount, setNotificationCount]);

	// Set up calendar notifications
	useEffect(() => {
		const setupNotifications = async () => {
			if (plan.data && !plan.isLoading && !plan.isError && notificationsActive) {
				await scheduleNotifications(plan.data, t);
			} else if (notificationsActive === false) {
				NotificationService.cancelAllNotifications();
			}
		};
		setupNotifications();
	}, [plan.data, plan.isLoading, plan.isError, t, notificationsActive]);

	// loading
	if (recentMeasurements.isLoading || plan.isLoading || patient.isLoading) {
		return (
			<SafeAreaView>
				<HvHeader name={patient.data?.name ? patient.data?.name.split(' ')[0] : ''} />
				<LoadingView />
			</SafeAreaView>
		);
	}

	// error
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
										<HvText weight='semibold'>{plan.data?.instructions}</HvText>
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
