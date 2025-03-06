import { View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
// components
import HvHeader from '@/components/homeScreen/hvHeader';
import HvText from '@/components/ui/hvText';
import { STYLES } from '@/constants/styles';
import { useSession } from '@/authentication/ctx';
import HvScrollView from '@/components/ui/HvScrollView';
import { fetchPatient } from '@/queries/queries';

const MainScreen = (): JSX.Element => {
	const { session } = useSession();

	const {
		data: patient,
		isError: pError,
		isLoading: pLoading,
	} = useQuery({
		queryKey: ['name'],
		queryFn: async () => fetchPatient(session?.toString() || ''),
	});

	if (pError) {
		return (
			<SafeAreaView style={STYLES.defaultView}>
				<HvText>Error loading</HvText>
			</SafeAreaView>
		);
	}

	if (pLoading) {
		return (
			<SafeAreaView style={STYLES.defaultView}>
				<ActivityIndicator size='large' color='#3A7283' />
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
						</View>
					</HvScrollView>
				</>
			)}
		</SafeAreaView>
	);
};

export default MainScreen;
