import { IAddBodyWeight } from '@/interfaces/measurements';
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
import { postBodyWeight } from '@/queries/post';
import { useTranslation } from 'react-i18next';

const AddBodyWeight = (): JSX.Element => {
	const { t } = useTranslation();
	const { token, signOut } = useSession();
	const queryClient = useQueryClient();
	const modals = useContext(ModalContext);
	// measurements
	const [weight, setWeight] = useState('');

	// mutations
	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IAddBodyWeight) => postBodyWeight(measurement, token),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['bodyweight'] });
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			// status popup
			modals.setValidationStatus(data.status);
			modals.setAddBWVisible(false);
			modals.setValidationVisible(true);
			setWeight('');
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
				weight: Number(parseFloat(weight).toFixed(1)),
				status: 'pending',
			});
		} catch (error) {
			console.error('Error adding body weight:', error);
		}
	};

	// validation
	const DisableButton = (): boolean => {
		return (
			weight === '' || isNaN(Number(weight)) || Number(weight) <= 0 || Number(weight) > 500
		);
	};

	return (
		<Modal
			visible={modals.addBWVisible}
			animationType={modals.contentReady ? 'fade' : 'none'}
			onRequestClose={() => {
				modals.setAddBWVisible(false);
				setWeight('');
				modals.setIsOpen(false);
			}}
			transparent={true}
		>
			<TouchableWithoutFeedback
				onPressIn={() => {
					modals.setAddBWVisible(false);
					setWeight('');
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
											modals.setAddBWVisible(false);
											setWeight('');
											modals.setIsOpen(false);
										}}
										bgColor={DARK_RED}
									/>
								</View>
								<HvText size='xl' color='darkGreen' weight='semibold' center>
									{t('modals.bodyWeight.addTitle')}
								</HvText>
								<HvInputFormContainer textInput>
									<HvInputField
										itemState={weight}
										setItemState={setWeight}
										header={t('modals.bodyWeight.bodyWeight')}
										description='Kg'
										keyboardMax={5}
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

export default AddBodyWeight;
