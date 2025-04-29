import { IBodyTemperature, IPatchBodyTemperature } from '@/interfaces/measurements';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import HvInputForm from '../ui/hvInputForm/hvInputForm';
import HvInputFormContainer from '../ui/hvInputForm/hvInputFormContainer';
import HvInputField from '../ui/hvInputForm/hvInputField';
import { STYLES } from '@/constants/styles';
import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import HvText from '../ui/hvText';
import { patchTemperature } from '@/queries/patch';
import HvButtonCheck from '../ui/hvButtonCheck';
import { DARK_RED } from '@/constants/colors';
import ModalContext from '@/contexts/modalContext';

const EditTemperature = (): JSX.Element => {
	const queryClient = useQueryClient();
	const modals = useContext(ModalContext);
	const item = modals.editModalData.item as IBodyTemperature;
	const itemId = item.id.toString();

	// measurements
	const [temperature, setTemperature] = useState(item.temperature.toString());

	// mutations (edit)
	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IPatchBodyTemperature) =>
			patchTemperature(itemId, measurement),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['bodytemperature'] });
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			modals.setEditBTVisible(false);
			modals.setIsOpen(false);
		},
	});

	const HandleMutation = async (): Promise<void> => {
		try {
			await addMutation({
				temperature: parseFloat(temperature),
				status: item.status,
			});
		} catch (error) {
			console.error('Error patching oxygen saturation:', error);
		}
	};

	const handleClose = (): void => {
		modals.setEditBTVisible(false);
		modals.setIsEditOpen(true);
		modals.setIsOpen(true);
	};

	// validation
	const DisableButton = (): boolean => {
		return temperature === item.temperature.toString();
	};

	return (
		<Modal
			visible={modals.editBTVisible}
			animationType={modals.editReady ? 'fade' : 'none'}
			onRequestClose={handleClose}
			transparent={true}
		>
			<TouchableWithoutFeedback onPressIn={handleClose}>
				<View style={[STYLES.defaultModalViewDeep, { opacity: modals.editModalVisible }]}>
					<TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
						<View>
							<HvInputForm onPress={HandleMutation} disabled={DisableButton()}>
								<View style={STYLES.checkmarkPos}>
									<HvButtonCheck
										cancel
										onPress={handleClose}
										bgColor={DARK_RED}
									/>
								</View>
								<HvText size='xl' color='darkGreen' weight='semibold' center>
									Breyta líkamshita
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

export default EditTemperature;
