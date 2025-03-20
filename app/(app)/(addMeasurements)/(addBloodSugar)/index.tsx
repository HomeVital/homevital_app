import { useState } from 'react';
import { View } from 'react-native';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useSession } from '@/hooks/ctx';
import axios from 'axios';
import { router } from 'expo-router';
// components
import HvScrollView from '@/components/ui/HvScrollView';
import HvInputForm from '@/components/ui/hvInputForm/hvInputForm';
// constants
import { STYLES } from '@/constants/styles';
import HvInputField from '@/components/ui/hvInputForm/hvInputField';
import HvInputFormContainer from '@/components/ui/hvInputForm/hvInputFormContainer';
import { BLOODSUGAR_URL } from '@/constants/api';
import { IAddBloodSugar } from '@/interfaces/bloodSugarInterfaces';

const postBloodSugar = async (sessionId: string, measurement: IAddBloodSugar) => {
	const response = await axios.post(`${BLOODSUGAR_URL}/${sessionId}`, measurement);
	return response.data;
};

const BloodSugar = (): JSX.Element => {
	const queryClient = useQueryClient();
	const { session } = useSession();
	// states
	const [bloodSugar, setbloodSugar] = useState('');

	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IAddBloodSugar) =>
			postBloodSugar(session?.toString() || '', measurement),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			if (router.canGoBack()) router.back();
		},
	});

	const HandleMutation = async (): Promise<void> => {
		try {
			await addMutation({
				patientID: parseInt(session?.toString() || '0', 10),
				bloodsugarLevel: Number(parseFloat(bloodSugar).toFixed(1)),
			});
		} catch (error) {
			console.error('Error adding blood pressure:', error);
		}
	};

	return (
		<HvScrollView>
			<View style={STYLES.defaultView}>
				<HvInputForm onPress={HandleMutation}>
					<HvInputFormContainer textInput>
						<HvInputField
							itemState={bloodSugar}
							setItemState={setbloodSugar}
							description='Blóðsykur'
							metric='mmol/L'
						/>
					</HvInputFormContainer>
				</HvInputForm>
			</View>
		</HvScrollView>
	);
};

export default BloodSugar;
