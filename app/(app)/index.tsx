import { View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
// components
import HvHeader from '@/components/homeScreen/hvHeader';
import HvText from '@/components/ui/hvText';
import { STYLES } from '@/constants/styles';
import { useSession } from '@/hooks/ctx';
import HvScrollView from '@/components/ui/HvScrollView';
import { fetchPatient } from '@/queries/queries';

const MainScreen = (): JSX.Element => {
	const { session } = useSession();

	const {
		data: patient,
		isLoading: pLoading,
		isError: pError,
	} = useQuery({
		queryKey: ['patient'],
		queryFn: async () => fetchPatient(session?.toString() || ''),
	});

	// const {
	// 	data: measurements,
	// 	isError: mError,
	// 	isLoading: mLoading,
	// } = useQuery({
	// 	queryKey: ['measurements'],
	// 	queryFn: async () => fetchAllMeasurements(session?.toString() || ''),
	// });

	if (pLoading) {
		return (
			<SafeAreaView style={STYLES.loadingView}>
				<ActivityIndicator size='large' color='#3A7283' />
			</SafeAreaView>
		);
	}

	if (pError) {
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

	// if (mLoading) {
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
	// 							<ActivityIndicator size='large' color='#3A7283' />
	// 						</View>
	// 					</HvScrollView>
	// 				</>
	// 			)}
	// 		</SafeAreaView>
	// 	);
	// }

	return (
		<SafeAreaView>
			{patient && (
				<>
					<HvHeader name={patient.name.split(' ')[0]} />
					<HvScrollView>
						<View style={STYLES.defaultView}>
							<HvText weight='semibold' size='l'>
								Seinustu Mælingar
							</HvText>
						</View>
					</HvScrollView>
				</>
			)}
		</SafeAreaView>
	);
};

export default MainScreen;
