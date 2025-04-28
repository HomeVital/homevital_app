import { IAddBloodSugar } from '@/interfaces/measurements';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import HvInputForm from '../ui/hvInputForm/hvInputForm';
import HvInputFormContainer from '../ui/hvInputForm/hvInputFormContainer';
import HvInputField from '../ui/hvInputForm/hvInputField';
import { STYLES } from '@/constants/styles';
import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import HvText from '../ui/hvText';
import HvButtonCheck from '../ui/hvButtonCheck';
import { DARK_RED } from '@/constants/colors';
import { BLOODSUGAR_URL } from '@/constants/api';
import axios from 'axios';
import { getClaimBySubstring } from '@/utility/utility';
import { useSession } from '@/hooks/ctx';
import ModalContext from '@/contexts/modalContext';

const postBloodSugar = async (measurement: IAddBloodSugar) => {
	const response = await axios.post(`${BLOODSUGAR_URL}/${measurement.patientID}`, measurement);
	return response.data;
};

const AddBloodSugar = (): JSX.Element => {
	const { session } = useSession();
	const queryClient = useQueryClient();
	const modals = useContext(ModalContext);

	const [bloodSugar, setBloodSugar] = useState('');

	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IAddBloodSugar) => postBloodSugar(measurement),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['bloodsugar'] });
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			// status popup
			modals.setValidationStatus(data.status);
			modals.setAddBSVisible(false);
			modals.setValidationVisible(true);
			setBloodSugar('');
			// setModalVisible(true);
		},
	});

	const HandleMutation = async (): Promise<void> => {
		try {
			await addMutation({
				patientID: parseInt(
					getClaimBySubstring(session?.toString() || '', 'sub').toString() || '0',
					10,
				),
				bloodsugarLevel: Number(parseFloat(bloodSugar).toFixed(1)),
			});
		} catch (error) {
			console.error('Error adding blood pressure:', error);
		}
	};

	const DisableButton = (): boolean => {
		return bloodSugar === '';
	};

	return (
		<Modal
			visible={modals.addBSVisible}
			animationType='fade'
			onRequestClose={() => {
				modals.setAddBSVisible(false);
				setBloodSugar('');
			}}
			transparent={true}
		>
			<TouchableWithoutFeedback
				onPressIn={() => {
					modals.setAddBSVisible(false);
					setBloodSugar('');
				}}
			>
				<View style={STYLES.defaultModalView}>
					<TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
						<View>
							<HvInputForm onPress={HandleMutation} disabled={DisableButton()}>
								<View style={STYLES.checkmarkPos}>
									<HvButtonCheck
										cancel
										onPress={() => {
											modals.setAddBSVisible(false);
											setBloodSugar('');
										}}
										bgColor={DARK_RED}
									/>
								</View>
								<HvText size='xl' color='darkGreen' weight='semibold' center>
									Skrá blóðsykur
								</HvText>
								<HvInputFormContainer textInput>
									<HvInputField
										itemState={bloodSugar}
										setItemState={setBloodSugar}
										description='Blóðsykur'
										metric='mmol/L'
									/>
								</HvInputFormContainer>
							</HvInputForm>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

export default AddBloodSugar;
