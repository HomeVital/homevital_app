import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQueries } from '@tanstack/react-query';
// components
import HvHeader from '@/components/homeScreen/hvHeader';
import HvText from '@/components/ui/hvText';
import { STYLES } from '@/constants/styles';
import { useSession } from '@/hooks/ctx';
import HvScrollView from '@/components/ui/HvScrollView';
import { fetchPatient, fetchRecentMeasurements } from '@/queries/get';
import HvCardRecentMeasurements from '@/components/cards/hvCardRecentMeasurement';
import { ErrorView, LoadingView } from '@/components/queryStates';
import { getClaimBySubstring } from '@/utility/utility';
import { TAB_ICON_SIZE } from '@/constants/constants';

const MainScreen = (): JSX.Element => {
	const { session } = useSession();

	const [patient, recentMeasurements] = useQueries({
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
		],
	});

	if (patient.isLoading && recentMeasurements.isLoading) return <LoadingView />;

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

	if (patient.isError || recentMeasurements.isError) return <ErrorView />;

	// if (mError) {
	// 	return (
	// 		<SafeAreaView>
	// 			{patient && (
	// 				<>
	// 					<HvHeader name={patient.name} />
	// 					<HvScrollView>
	// 						<View style={STYLES.defaultView}>
	// 							<HvText weight='semibold' size='l'>
	// 								Seinustu Mælingar
	// 							</HvText>
	// 							<HvText>Error loading</HvText>
	// 						</View>
	// 					</HvScrollView>
	// 				</>
	// 			)}
	// 		</SafeAreaView>
	// 	);
	// }

	return (
		<SafeAreaView>
			{patient.data && (
				<>
					<HvHeader name={patient.data.name.split(' ')[0]} />
					<View style={STYLES.defaultNoPadView}>
						<HvText weight='semibold' size='l' style={{ paddingInline: 20 }}>
							Seinustu 10 Mælingar
						</HvText>
						<HvScrollView style={{ marginBottom: 166 + TAB_ICON_SIZE + 10 }}>
							<View style={STYLES.defaultView}>
								{recentMeasurements.data && recentMeasurements.data.length > 0 ? (
									<HvCardRecentMeasurements items={recentMeasurements.data} />
								) : (
									<HvText>Engar mælingar</HvText>
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
