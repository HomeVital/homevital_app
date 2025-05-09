import { IAddBloodPressure } from '@/interfaces/measurements';
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
import HvToggleSelect from '../ui/hvInputForm/hvToggleSelect';
import { postBloodPressure } from '@/queries/post';
import { useTranslation } from 'react-i18next';

const AddBloodPressure = (): JSX.Element => {
	const { t } = useTranslation();
	const { session } = useSession();
	const queryClient = useQueryClient();
	const modals = useContext(ModalContext);

	// measurements
	const [measuredHand, setMeasuredHand] = useState(t('modals.bloodPressure.right'));
	const [bodyPosition, setBodyPosition] = useState(t('modals.bloodPressure.sitting'));
	const [systolic, setSystolic] = useState('');
	const [diastolic, setDiastolic] = useState('');
	const [pulse, setPulse] = useState('');

	// mutations
	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IAddBloodPressure) => postBloodPressure(measurement),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['bloodpressure'] });
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			// status popup
			modals.setValidationStatus(data.status);
			modals.setAddBPVisible(false);
			modals.setValidationVisible(true);

			setMeasuredHand(t('modals.bloodPressure.right'));
			setBodyPosition(t('modals.bloodPressure.sitting'));
			setSystolic('');
			setDiastolic('');
			setPulse('');
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
				measuredHand: measuredHand === t('modals.bloodPressure.left') ? 0 : 1,
				bodyPosition: bodyPosition === t('modals.bloodPressure.sitting') ? 0 : 1,
				systolic: Number(parseFloat(systolic).toFixed(1)),
				diastolic: Number(parseFloat(diastolic).toFixed(1)),
				pulse: Number(parseFloat(pulse).toFixed(1)),
				status: 'pending',
			});
		} catch (error) {
			console.error('Error adding blood pressure:', error);
		}
	};

	// validation
	const DisableButton = (): boolean => {
		return systolic === '' || diastolic === '' || pulse === '';
	};

	return (
		<Modal
			visible={modals.addBPVisible}
			animationType={modals.contentReady ? 'fade' : 'none'}
			onRequestClose={() => {
				modals.setAddBPVisible(false);
				// setBloodOxygen('');
				setMeasuredHand('Hægri');
				setBodyPosition('Sitjandi');
				setSystolic('');
				setDiastolic('');
				setPulse('');
				modals.setIsOpen(false);
			}}
			transparent={true}
		>
			<TouchableWithoutFeedback
				onPressIn={() => {
					modals.setAddBPVisible(false);
					setMeasuredHand('Hægri');
					setBodyPosition('Sitjandi');
					setSystolic('');
					setDiastolic('');
					setPulse('');
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
											modals.setAddBPVisible(false);
											setMeasuredHand(t('modals.bloodPressure.right'));
											setBodyPosition(t('modals.bloodPressure.sitting'));
											setSystolic('');
											setDiastolic('');
											setPulse('');
											modals.setIsOpen(false);
										}}
										bgColor={DARK_RED}
									/>
								</View>
								<HvText size='xl' color='darkGreen' weight='semibold' center>
									{t('modals.bloodPressure.addTitle')}
								</HvText>

								<HvInputFormContainer>
									<HvToggleSelect
										itemState={measuredHand}
										setItemState={setMeasuredHand}
										leftIcon={require('@/assets/svgs/handLeftArrow.svg')}
										rightIcon={require('@/assets/svgs/handRightArrow.svg')}
										description={t('modals.bloodPressure.hand')}
										leftText={t('modals.bloodPressure.left')}
										rightText={t('modals.bloodPressure.right')}
									/>
								</HvInputFormContainer>

								<HvInputFormContainer>
									<HvToggleSelect
										itemState={bodyPosition}
										setItemState={setBodyPosition}
										leftIcon={require('@/assets/svgs/sitting.svg')}
										rightIcon={require('@/assets/svgs/laying.svg')}
										description={t('modals.bloodPressure.position')}
										leftText={t('modals.bloodPressure.sitting')}
										rightText={t('modals.bloodPressure.laying')}
									/>
								</HvInputFormContainer>

								<HvInputFormContainer textInput>
									<HvInputField
										itemState={systolic}
										setItemState={setSystolic}
										header={t('modals.bloodPressure.upper')}
										description='SYS'
										metric='mmHg'
									/>

									<HvInputField
										itemState={diastolic}
										setItemState={setDiastolic}
										header={t('modals.bloodPressure.lower')}
										description='DIA'
										metric='mmHg'
									/>

									<HvInputField
										itemState={pulse}
										setItemState={setPulse}
										header={t('modals.bloodPressure.pulse')}
										description={t('modals.bloodPressure.bpm')}
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

export default AddBloodPressure;
