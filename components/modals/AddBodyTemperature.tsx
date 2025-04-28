import { IAddBodyTemperature } from '@/interfaces/measurements';
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
import { getClaimBySubstring } from '@/utility/utility';
import { useSession } from '@/hooks/ctx';
import ModalContext from '@/contexts/modalContext';
import { BODYTEMPERATURE_URL } from '@/constants/api';
import axios from 'axios';

const postBodyTemperature = async (measurement: IAddBodyTemperature) => {
	const response = await axios.post(
		`${BODYTEMPERATURE_URL}/${measurement.patientID}`,
		measurement,
	);
	return response.data;
};

const AddBodyTemperature = (): JSX.Element => {
	const { session } = useSession();
	const queryClient = useQueryClient();
	const modals = useContext(ModalContext);

	// const [weight, setWeight] = useState('');
	const [temperature, setTemperature] = useState('');

	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IAddBodyTemperature) => postBodyTemperature(measurement),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['bodytemperature'] });
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			// status popup
			modals.setValidationStatus(data.status);
			modals.setAddBTVisible(false);
			modals.setValidationVisible(true);
			setTemperature('');
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
				temperature: Number(parseFloat(temperature).toFixed(1)),
			});
		} catch (error) {
			console.error('Error adding body weight:', error);
		}
	};

	const DisableButton = (): boolean => {
		return temperature === '';
	};

	return (
		<Modal
			visible={modals.addBTVisible}
			animationType='fade'
			onRequestClose={() => {
				modals.setAddBTVisible(false);
				setTemperature('');
			}}
			transparent={true}
		>
			<TouchableWithoutFeedback
				onPressIn={() => {
					modals.setAddBTVisible(false);
					setTemperature('');
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
											modals.setAddBTVisible(false);
											setTemperature('');
										}}
										bgColor={DARK_RED}
									/>
								</View>
								<HvText size='xl' color='darkGreen' weight='semibold' center>
									Skrá líkamshita
								</HvText>
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
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

export default AddBodyTemperature;
