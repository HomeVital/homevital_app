import { IOxygenSaturation, IPatchOxygenSaturation } from '@/interfaces/measurements';
import { Modal, View, TouchableWithoutFeedback } from 'react-native';
import HvInputForm from '../ui/hvInputForm/hvInputForm';
import HvInputFormContainer from '../ui/hvInputForm/hvInputFormContainer';
import HvInputField from '../ui/hvInputForm/hvInputField';
import { STYLES } from '@/constants/styles';
import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import HvText from '../ui/hvText';
import { patchOxygenSaturation } from '@/queries/patch';
import HvButtonCheck from '../ui/hvButtonCheck';
import { DARK_RED } from '@/constants/colors';
import ModalContext from '@/contexts/modalContext';
import { useTranslation } from 'react-i18next';
import { useSession } from '@/hooks/ctx';

const EditBloodOxygen = (): JSX.Element => {
	const { t } = useTranslation();
	const { token, signOut } = useSession();
	const queryClient = useQueryClient();
	const modals = useContext(ModalContext);
	const item = modals.editModalData.item as IOxygenSaturation;
	const itemId = item.id.toString();
	// measurements
	const [bloodOxygen, setBloodOxygen] = useState(item.oxygenSaturationValue.toString());

	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IPatchOxygenSaturation) =>
			patchOxygenSaturation(itemId, measurement, token),
		onSuccess: (itemDataResponse) => {
			queryClient.invalidateQueries({ queryKey: ['oxygensaturation'] });
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			modals.setEditBOVisible(false);
			modals.setIsEditOpen(true);
			modals.setEditModalData({
				title: t('measurements.oxygenSaturation'),
				item: itemDataResponse,
			});
			modals.setIsOpen(true);
		},
		onError: (error) => {
			if (error.message === 'Token expired') {
				signOut();
			}
		},
	});

	/**
	 * Handle mutation
	 * @returns {Promise<void>}
	 */
	const HandleMutation = async (): Promise<void> => {
		try {
			await addMutation({
				oxygenSaturationValue: parseInt(bloodOxygen, 10),
				status: item.status,
			});
		} catch (error) {
			console.error('Error patching oxygen saturation:', error);
		}
	};

	/**
	 * Handle close modal
	 * @returns {void}
	 */
	const handleClose = (): void => {
		modals.setEditBOVisible(false);
		modals.setIsEditOpen(true);
		modals.setIsOpen(true);
	};

	/**
	 * Disable button if input is invalid
	 * @returns {boolean}
	 */
	const DisableButton = (): boolean => {
		if (bloodOxygen === item.oxygenSaturationValue.toString()) {
			return true;
		}
		return (
			bloodOxygen === '' ||
			isNaN(parseFloat(bloodOxygen)) ||
			parseFloat(bloodOxygen) <= 0 ||
			parseFloat(bloodOxygen) > 100
		);
	};

	return (
		<Modal
			visible={modals.editBOVisible}
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
									{t('modals.oxygenSaturation.editTitle')}
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

export default EditBloodOxygen;
