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
import { postBodyTemperature } from '@/queries/post';
import { useTranslation } from 'react-i18next';

const AddBodyTemperature = (): JSX.Element => {
	const { t } = useTranslation();
	const { token, signOut } = useSession();
	const queryClient = useQueryClient();
	const modals = useContext(ModalContext);

	// measurements
	const [temperature, setTemperature] = useState('');

	// mutations
	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IAddBodyTemperature) =>
			postBodyTemperature(measurement, token),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['bodytemperature'] });
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			// status popup
			modals.setValidationStatus(data.status);
			modals.setAddBTVisible(false);
			modals.setValidationVisible(true);
			setTemperature('');
			modals.setIsOpen(false);
		},
		onError: (error) => {
			if (error.message === 'Token expired') {
				signOut();
			}
		},
	});

	const HandleMutation = async (): Promise<void> => {
		try {
			await addMutation({
				patientID: parseInt(getClaimBySubstring(token, 'sub').toString() || '0', 10),
				temperature: Number(parseFloat(temperature).toFixed(1)),
				status: 'pending',
			});
		} catch (error) {
			console.error('Error adding body temperature:', error);
		}
	};

	// validation
	const DisableButton = (): boolean => {
		return (
			temperature === '' ||
			isNaN(Number(temperature)) ||
			Number(temperature) <= 0 ||
			Number(temperature) > 99
		);
	};

	return (
		<Modal
			visible={modals.addBTVisible}
			animationType={modals.contentReady ? 'fade' : 'none'}
			onRequestClose={() => {
				modals.setAddBTVisible(false);
				setTemperature('');
				modals.setIsOpen(false);
			}}
			transparent={true}
		>
			<TouchableWithoutFeedback
				onPressIn={() => {
					modals.setAddBTVisible(false);
					setTemperature('');
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
											modals.setAddBTVisible(false);
											setTemperature('');
											modals.setIsOpen(false);
										}}
										bgColor={DARK_RED}
									/>
								</View>
								<HvText size='xl' color='darkGreen' weight='semibold' center>
									{/* Skrá líkamshita */}
									{t('modals.bodyTemperature.addTitle')}
								</HvText>
								<HvInputFormContainer textInput>
									<HvInputField
										itemState={temperature}
										setItemState={setTemperature}
										// header='Hitastig'
										header={t('modals.bodyTemperature.temperature')}
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
