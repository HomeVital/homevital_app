import { IAddOxygenSaturation } from '@/interfaces/measurements';
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
import { OXYGENSATURATION_URL } from '@/constants/api';
import axios from 'axios';
import { getClaimBySubstring } from '@/utility/utility';
import { useSession } from '@/hooks/ctx';
import ModalContext from '@/contexts/modalContext';

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

const AddBloodOxygen = (): JSX.Element => {
	const { session } = useSession();
	const queryClient = useQueryClient();
	const modals = useContext(ModalContext);

	const [bloodOxygen, setBloodOxygen] = useState('');

	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IAddOxygenSaturation) => postOxygenSaturation(measurement),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['oxygensaturation'] });
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			// status popup
			modals.setValidationStatus(data.status);
			modals.setAddBOVisible(false);
			modals.setValidationVisible(true);
			setBloodOxygen('');
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
				oxygenSaturationValue: Number(parseFloat(bloodOxygen).toFixed(1)),
			});
		} catch (error) {
			console.error('Error adding oxygen saturation:', error);
		}
	};

	const DisableButton = (): boolean => {
		return bloodOxygen === '';
	};

	return (
		<Modal
			visible={modals.addBOVisible}
			animationType='fade'
			onRequestClose={() => {
				modals.setAddBOVisible(false);
				setBloodOxygen('');
			}}
			transparent={true}
		>
			<TouchableWithoutFeedback
				onPressIn={() => {
					modals.setAddBOVisible(false);
					setBloodOxygen('');
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
											modals.setAddBOVisible(false);
											setBloodOxygen('');
										}}
										bgColor={DARK_RED}
									/>
								</View>
								<HvText size='xl' color='darkGreen' weight='semibold' center>
									Skrá súrefnismettun
								</HvText>
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
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

export default AddBloodOxygen;
