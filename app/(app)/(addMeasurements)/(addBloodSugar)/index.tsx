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
import { IAddBloodSugar } from '@/interfaces/measurements';
import HvModalValidation from '@/components/modals/hvModalValidation';

const postBloodSugar = async (sessionId: string, measurement: IAddBloodSugar) => {
	const response = await axios.post(`${BLOODSUGAR_URL}/${sessionId}`, measurement);
	return response.data;
};

const BloodSugar = (): JSX.Element => {
	const queryClient = useQueryClient();
	const { session } = useSession();
	// states
	const [bloodSugar, setbloodSugar] = useState('');
	// post modal
	const [modalVisible, setModalVisible] = useState(false);
	const [modalStatus, setModalStatus] = useState('');

	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IAddBloodSugar) =>
			postBloodSugar(session?.toString() || '', measurement),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			// status popup
			setModalStatus(data.status);
			setModalVisible(true);
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

	const isDisabled = () => {
		if (bloodSugar === '') return true;
		// if (parseFloat(bloodSugar) < 0) return true;
		// if (parseFloat(bloodSugar) > 100) return true;
		return false;
	};

	return (
		<HvScrollView>
			<View style={STYLES.defaultView}>
				<HvInputForm onPress={HandleMutation} disabled={isDisabled()}>
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
			<HvModalValidation
				visible={modalVisible}
				onClose={() => {
					setModalVisible(false);
					router.dismissAll();
				}}
				validationStatus={modalStatus}
			/>
		</HvScrollView>
	);
};

export default BloodSugar;
