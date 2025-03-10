import { useState } from 'react';
import { View } from 'react-native';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useSession } from '@/authentication/ctx';
import axios from 'axios';
import { router } from 'expo-router';
// components
import HvScrollView from '@/components/ui/HvScrollView';
import HvInputForm from '@/components/ui/hvInputForm/hvInputForm';
// constants
import { STYLES } from '@/constants/styles';
import HvInputField from '@/components/ui/hvInputForm/hvInputField';
import HvInputFormContainer from '@/components/ui/hvInputForm/hvInputFormContainer';
import { IAddBodyWeight } from '@/interfaces/bodyWeightInterfaces';
import { BODYWEIGHT_URL } from '@/constants/api';

const postBodyWeight = async (sessionId: string, measurement: IAddBodyWeight) => {
	const response = await axios.post(`${BODYWEIGHT_URL}/${sessionId}`, measurement);
	return response.data;
};

const Weight = (): JSX.Element => {
	const queryClient = useQueryClient();
	const { session } = useSession();
	const [weight, setWeight] = useState('');

	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IAddBodyWeight) =>
			postBodyWeight(session?.toString() || '', measurement),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['bloodsugar'] });
			if (router.canGoBack()) router.back();
		},
	});

	const HandleMutation = async (): Promise<void> => {
		try {
			await addMutation({
				patientID: parseInt(session?.toString() || '0', 10),
				weight: Number(weight),
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
							itemState={weight}
							setItemState={setWeight}
							description='Kg'
							keyboardMax={5}
						/>
					</HvInputFormContainer>
				</HvInputForm>
			</View>
		</HvScrollView>
	);
};

export default Weight;
