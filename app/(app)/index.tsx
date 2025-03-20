import { View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQueries } from '@tanstack/react-query';
// components
import HvHeader from '@/components/homeScreen/hvHeader';
import HvText from '@/components/ui/hvText';
import { STYLES } from '@/constants/styles';
import { useSession } from '@/hooks/ctx';
import HvScrollView from '@/components/ui/HvScrollView';
import { fetchPatient, fetchRecentMeasurements } from '@/queries/queries';
import HvCardRecentMeasurements from '@/components/cards/hvCardRecentMeasurement';

const MainScreen = (): JSX.Element => {
	const { session } = useSession();

	const [patient, recentMeasurements] = useQueries({
		queries: [
			{
				queryKey: ['patient'],
				queryFn: async () => fetchPatient(session?.toString() || ''),
			},
			{
				queryKey: ['recentmeasurements'],
				queryFn: async () => fetchRecentMeasurements(session?.toString() || ''),
			},
		],
	});

	if (patient.isLoading && recentMeasurements.isLoading) {
		return (
			<SafeAreaView style={STYLES.loadingView}>
				<ActivityIndicator size='large' color='#3A7283' />
			</SafeAreaView>
		);
	}

	if (recentMeasurements.isLoading) {
		return (
			<SafeAreaView>
				{patient.data && (
					<>
						<HvHeader name={patient.data.name} />
						<HvScrollView>
							<View style={STYLES.loadingView}>
								<ActivityIndicator size='large' color='#3A7283' />
							</View>
						</HvScrollView>
					</>
				)}
			</SafeAreaView>
		);
	}

	if (patient.isError || recentMeasurements.isError) {
		return (
			<SafeAreaView>
				<HvText>Error loading</HvText>
			</SafeAreaView>
		);
	}

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
					<HvScrollView>
						<View style={STYLES.defaultView}>
							<HvText weight='semibold' size='l'>
								Seinustu Mælingar
							</HvText>
							{recentMeasurements.data && recentMeasurements.data.length > 0 ? (
								<HvCardRecentMeasurements items={recentMeasurements.data} />
							) : (
								<HvText>Engar mælingar</HvText>
							)}
						</View>
					</HvScrollView>
				</>
			)}
		</SafeAreaView>
	);
};

export default MainScreen;
