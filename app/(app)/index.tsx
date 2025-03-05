import { View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
// components
import HvHeader from '@/components/homeScreen/hvHeader';
import HvText from '@/components/ui/hvText';
import { STYLES } from '@/constants/styles';
import { Card } from 'react-native-paper';
import { useSession } from '@/authentication/ctx';
import { IBloodPressure } from '@/interfaces/bloodPressureInterfaces';
import HvScrollView from '@/components/ui/HvScrollView';
import { fetchBloodPressure, fetchPatient } from '@/queries/queries';

const MainScreen = (): JSX.Element => {
	const { session } = useSession();

	const {
		data: measurements,
		isError,
		isLoading,
	} = useQuery({
		queryKey: ['bloodpressure'],
		queryFn: async () => fetchBloodPressure(session?.toString() || ''),
	});

	const {
		data: patient,
		isError: userError,
		isLoading: userLoading,
	} = useQuery({
		queryKey: ['name'],
		queryFn: async () => fetchPatient(session?.toString() || ''),
	});

	if (isError || userError) {
		return (
			<SafeAreaView style={STYLES.defaultView}>
				<ActivityIndicator size='large' color='#0000ff' />
			</SafeAreaView>
		);
	}

	if (isLoading || userLoading) {
		return (
			<SafeAreaView style={STYLES.defaultView}>
				<HvText>Error loading measurements</HvText>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView>
			{patient && (
				<>
					<HvHeader name={patient.name} />
					<HvScrollView>
						<View style={STYLES.defaultView}>
							<HvText weight='semibold' size='l'>
								Seinustu Mælingar
							</HvText>
							{measurements?.map((measurement: IBloodPressure) => (
								<Card key={measurement.id}>
									<Card.Content>
										<HvText>{measurement.patientID}</HvText>
										<View>
											<HvText>{measurement.measureHand}</HvText>
											<HvText>{measurement.bodyPosition}</HvText>
											<HvText>{measurement.systolic}</HvText>
											<HvText>{measurement.diastolic}</HvText>
											<HvText>{measurement.pulse}</HvText>
											<HvText>{measurement.date}</HvText>
											<HvText>{measurement.status}</HvText>
										</View>
									</Card.Content>
								</Card>
							))}
						</View>
					</HvScrollView>
				</>
			)}
		</SafeAreaView>
	);
};

export default MainScreen;
