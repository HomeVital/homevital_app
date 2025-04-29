import { IBloodSugar, IPatchBloodSugar } from '@/interfaces/measurements';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import HvInputForm from '../ui/hvInputForm/hvInputForm';
import HvInputFormContainer from '../ui/hvInputForm/hvInputFormContainer';
import HvInputField from '../ui/hvInputForm/hvInputField';
import { STYLES } from '@/constants/styles';
import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import HvText from '../ui/hvText';
import { patchBloodSugar } from '@/queries/patch';
import HvButtonCheck from '../ui/hvButtonCheck';
import { DARK_RED } from '@/constants/colors';
import ModalContext from '@/contexts/modalContext';

const EditBloodSugar = (): JSX.Element => {
	const queryClient = useQueryClient();
	const modals = useContext(ModalContext);
	const item = modals.editModalData.item as IBloodSugar;
	const itemId = item.id.toString();

	// measurements
	const [bloodSugar, setBloodSugar] = useState(item.bloodsugarLevel.toString());

	// mutations
	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IPatchBloodSugar) => patchBloodSugar(itemId, measurement),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['bloodsugar'] });
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			modals.setEditBSVisible(false);
			modals.setIsOpen(false);
		},
	});

	const HandleMutation = async (): Promise<void> => {
		try {
			await addMutation({
				bloodsugarLevel: parseFloat(bloodSugar),
				status: item.status,
			});
		} catch (error) {
			console.error('Error patching blood sugar:', error);
		}
	};

	const handleClose = (): void => {
		modals.setEditBSVisible(false);
		modals.setIsEditOpen(true);
		modals.setIsOpen(true);
	};

	// validation
	const DisableButton = (): boolean => {
		return bloodSugar === item.bloodsugarLevel.toString();
	};

	return (
		<Modal
			visible={modals.editBSVisible}
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
									Breyta blóðsykur
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

export default EditBloodSugar;
