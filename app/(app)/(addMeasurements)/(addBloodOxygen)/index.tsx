import { useState } from 'react';
import { View } from 'react-native';
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
import HvModalValidation from '@/components/modals/hvModalValidation';
import { router } from 'expo-router';
import { getClaimBySubstring } from '@/utility/utility';

const postOxygenSaturation = async (measurement: IAddOxygenSaturation) => {
	try {
		const response = await axios.post(
			`${OXYGENSATURATION_URL}/${measurement.patientID}`,
			measurement,
		);
		return response.data;
	} catch (error) {
		console.error('Error posting oxygen saturation:', error);
		throw error;
	}
};

// const showModal = ({ status, onClose }: { status: string; onClose: () => void }) => {
//

// 	switch (status) {
// 		case 'Normal':
// 			// show modal with normal status
//
// 			break;
// 		case 'Raised':
// 			// show modal with raised status
//
// 			break;
// 		default:
// 			// show modal with high status
//
// 			break;
// 	}
// 	onClose();
// };

const BloodOxygen = (): JSX.Element => {
	const queryClient = useQueryClient();
	const { session } = useSession();
	// states
	const [bloodOxygen, setBloodOxygen] = useState('');
	// post modal
	const [modalVisible, setModalVisible] = useState(false);
	const [modalStatus, setModalStatus] = useState('');

	// const closeModal = () => {
	// 	// close modal9
	// 	setModalVisible(false);

	// 	while (router.canGoBack()) {
	// 		router.back();
	// 	}
	// };

	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IAddOxygenSaturation) => postOxygenSaturation(measurement),
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
				patientID: parseInt(
					getClaimBySubstring(session?.toString() || '', 'sub').toString() || '0',
					10,
				),
				oxygenSaturationValue: parseInt(bloodOxygen, 10),
			});
		} catch (error) {
			console.error('Error adding oxygen saturation:', error);
		}
	};

	const isDisabled = () => {
		if (bloodOxygen === '') return true;
		if (parseInt(bloodOxygen, 10) < 0) return true;
		if (parseInt(bloodOxygen, 10) > 100) return true;
		return false;
	};

	return (
		<HvScrollView>
			<View style={STYLES.defaultView}>
				<HvInputForm onPress={HandleMutation} disabled={isDisabled()}>
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

export default BloodOxygen;
