import { IAddBloodSugar } from '@/interfaces/measurements';
import { Keyboard, Modal, TouchableWithoutFeedback, View } from 'react-native';
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
import { postBloodSugar } from '@/queries/post';
import { useTranslation } from 'react-i18next';

const AddBloodSugar = (): JSX.Element => {
	const { t } = useTranslation();
	const { token, signOut } = useSession();
	const queryClient = useQueryClient();
	const modals = useContext(ModalContext);

	// measurements
	const [bloodSugar, setBloodSugar] = useState('');

	// mutations
	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IAddBloodSugar) => postBloodSugar(measurement, token),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['bloodsugar'] });
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			// status popup
			modals.setValidationStatus(data.status);
			modals.setAddBSVisible(false);
			modals.setValidationVisible(true);
			setBloodSugar('');
			modals.setIsOpen(false);
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
			Keyboard.dismiss();
			await addMutation({
				patientID: parseInt(getClaimBySubstring(token, 'sub').toString() || '0', 10),
				bloodsugarLevel: Number(parseFloat(bloodSugar).toFixed(1)),
				status: 'pending',
			});
		} catch (error) {
			console.error('Error adding blood sugar:', error);
		}
	};

	/**
	 * Disable button if input is invalid
	 * @returns {boolean}
	 */
	const DisableButton = (): boolean => {
		return (
			bloodSugar === '' ||
			isNaN(Number(bloodSugar)) ||
			Number(bloodSugar) < 0 ||
			Number(bloodSugar) > 500
		);
	};

	return (
		<Modal
			visible={modals.addBSVisible}
			animationType={modals.contentReady ? 'fade' : 'none'}
			onRequestClose={() => {
				modals.setAddBSVisible(false);
				setBloodSugar('');
				modals.setIsOpen(false);
			}}
			transparent={true}
		>
			<TouchableWithoutFeedback
				onPressIn={() => {
					modals.setAddBSVisible(false);
					setBloodSugar('');
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
											modals.setAddBSVisible(false);
											setBloodSugar('');
											modals.setIsOpen(false);
										}}
										bgColor={DARK_RED}
									/>
								</View>
								<HvText size='xl' color='darkGreen' weight='semibold' center>
									{t('modals.bloodSugar.addTitle')}
								</HvText>
								<HvInputFormContainer textInput>
									<HvInputField
										itemState={bloodSugar}
										setItemState={setBloodSugar}
										header={t('modals.bloodSugar.bloodSugar')}
										description='mmol/L'
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
