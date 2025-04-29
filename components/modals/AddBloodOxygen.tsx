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
import { getClaimBySubstring } from '@/utility/utility';
import { useSession } from '@/hooks/ctx';
import ModalContext from '@/contexts/modalContext';
import { postOxygenSaturation } from '@/queries/post';
import { useTranslation } from 'react-i18next';

const AddBloodOxygen = (): JSX.Element => {
	const { t } = useTranslation();
	const { session } = useSession();
	const queryClient = useQueryClient();
	const modals = useContext(ModalContext);

	// measurements
	const [bloodOxygen, setBloodOxygen] = useState('');

	// mutations
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
			modals.setIsOpen(false);
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
				status: 'pending',
			});
		} catch (error) {
			console.error('Error adding oxygen saturation:', error);
		}
	};

	// validation
	const DisableButton = (): boolean => {
		return bloodOxygen === '' || parseFloat(bloodOxygen) <= 0 || parseFloat(bloodOxygen) > 100;
	};

	return (
		<Modal
			visible={modals.addBOVisible}
			animationType={modals.contentReady ? 'fade' : 'none'}
			onRequestClose={() => {
				modals.setAddBOVisible(false);
				setBloodOxygen('');
				modals.setIsOpen(false);
			}}
			transparent={true}
		>
			<TouchableWithoutFeedback
				onPressIn={() => {
					modals.setAddBOVisible(false);
					setBloodOxygen('');
					modals.setIsOpen(false);
				}}
			>
				<View style={[STYLES.defaultModalViewDeep, { opacity: modals.modalVisible }]}>
					<TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
						<View>
							<HvInputForm onPress={HandleMutation} disabled={DisableButton()}>
								<View style={STYLES.checkmarkPos}>
									<HvButtonCheck
										cancel
										onPress={() => {
											modals.setAddBOVisible(false);
											setBloodOxygen('');
											modals.setIsOpen(false);
										}}
										bgColor={DARK_RED}
									/>
								</View>
								<HvText size='xl' color='darkGreen' weight='semibold' center>
									{t('modals.oxygenSaturation.addTitle')}
								</HvText>
								<HvInputFormContainer textInput>
									<HvInputField
										itemState={bloodOxygen}
										setItemState={setBloodOxygen}
										header={t('modals.oxygenSaturation.oxygenSaturation')}
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
