import { useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
// components
import HvScrollView from '@/components/ui/HvScrollView';
import HvInputForm from '@/components/ui/hvInputForm/hvInputForm';
// constants
import { STYLES } from '@/constants/styles';
import HvInputField from '@/components/ui/hvInputForm/hvInputField';
import HvInputFormContainer from '@/components/ui/hvInputForm/hvInputFormContainer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from '@/hooks/ctx';
import { IAddOxygenSaturation } from '@/interfaces/measurements';
import { OXYGENSATURATION_URL } from '@/constants/api';
import axios from 'axios';

const postOxygenSaturation = async (sessionId: string, measurement: IAddOxygenSaturation) => {
	const response = await axios.post(`${OXYGENSATURATION_URL}/${sessionId}`, measurement);
	return response.data;
};

const BloodOxygen = (): JSX.Element => {
	const queryClient = useQueryClient();
	const { session } = useSession();
	// states
	const [bloodOxygen, setBloodOxygen] = useState('');

	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IAddOxygenSaturation) =>
			postOxygenSaturation(session?.toString() || '', measurement),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			if (router.canGoBack()) router.back();
		},
	});

	const HandleMutation = async (): Promise<void> => {
		try {
			await addMutation({
				patientID: parseInt(session?.toString() || '0', 10),
				oxygenSaturationValue: parseInt(bloodOxygen, 10),
			});
		} catch (error) {
			console.error('Error adding oxygen saturation:', error);
		}
	};

	return (
		<HvScrollView>
			<View style={STYLES.defaultView}>
				<HvInputForm onPress={HandleMutation}>
					<HvInputFormContainer textInput>
						<HvInputField
							itemState={bloodOxygen}
							setItemState={setBloodOxygen}
							description='%'
							keyboardMax={3}
						/>
					</HvInputFormContainer>
				</HvInputForm>
			</View>
		</HvScrollView>
	);
};

export default BloodOxygen;
