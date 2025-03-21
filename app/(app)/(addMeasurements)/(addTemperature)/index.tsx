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
import { IAddBodyTemperature } from '@/interfaces/measurements';
import { BODYTEMPERATURE_URL } from '@/constants/api';

const postBodyTemperature = async (sessionId: string, measurement: IAddBodyTemperature) => {
	const response = await axios.post(`${BODYTEMPERATURE_URL}/${sessionId}`, measurement);
	return response.data;
};

const Temperature = (): JSX.Element => {
	const queryClient = useQueryClient();
	const { session } = useSession();
	// states
	const [temperature, setTemperature] = useState('');

	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IAddBodyTemperature) =>
			postBodyTemperature(session?.toString() || '', measurement),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			if (router.canGoBack()) router.back();
		},
	});

	const HandleMutation = async (): Promise<void> => {
		try {
			await addMutation({
				patientID: parseInt(session?.toString() || '0', 10),
				temperature: Number(parseFloat(temperature).toFixed(1)),
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
							itemState={temperature}
							setItemState={setTemperature}
							header='Hitastig'
							description='C°'
							keyboardMax={4}
						/>
					</HvInputFormContainer>
				</HvInputForm>
			</View>
		</HvScrollView>
	);
};

export default Temperature;
