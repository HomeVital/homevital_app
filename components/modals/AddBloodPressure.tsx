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

const AddBloodPressure = (): JSX.Element => {
	const { session } = useSession();
	const queryClient = useQueryClient();
	const modals = useContext(ModalContext);

	// measurements
	const [measureHand, setMeasureHand] = useState('Hægri');
	const [bodyPosition, setBodyPosition] = useState('Sitjandi');
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

			setMeasureHand('Hægri');
			setBodyPosition('Sitjandi');
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
				measureHand: measureHand === 'Vinstri' ? 'Left' : 'Right',
				bodyPosition: bodyPosition === 'Sitjandi' ? 'Sitting' : 'Laying',
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
				setMeasureHand('Hægri');
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
					setMeasureHand('Hægri');
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
											setMeasureHand('Hægri');
											setBodyPosition('Sitjandi');
											setSystolic('');
											setDiastolic('');
											setPulse('');
											modals.setIsOpen(false);
										}}
										bgColor={DARK_RED}
									/>
								</View>
								<HvText size='xl' color='darkGreen' weight='semibold' center>
									Skrá blóðþrýsting
								</HvText>

								<HvInputFormContainer>
									<HvToggleSelect
										itemState={measureHand}
										setItemState={setMeasureHand}
										leftIcon={require('@/assets/svgs/handLeftArrow.svg')}
										rightIcon={require('@/assets/svgs/handRightArrow.svg')}
										description='Mæli hönd'
										leftText='Vinstri'
										rightText='Hægri'
									/>
								</HvInputFormContainer>

								<HvInputFormContainer>
									<HvToggleSelect
										itemState={bodyPosition}
										setItemState={setBodyPosition}
										leftIcon={require('@/assets/svgs/sitting.svg')}
										rightIcon={require('@/assets/svgs/laying.svg')}
										description='Líkamsstaða'
										leftText='Sitjandi'
										rightText='Liggjandi'
									/>
								</HvInputFormContainer>

								<HvInputFormContainer textInput>
									<HvInputField
										itemState={systolic}
										setItemState={setSystolic}
										header='Efri mörk'
										description='SYS'
										metric='mmHg'
									/>

									<HvInputField
										itemState={diastolic}
										setItemState={setDiastolic}
										header='Neðri mörk'
										description='DIA'
										metric='mmHg'
									/>

									<HvInputField
										itemState={pulse}
										setItemState={setPulse}
										description='Púls'
										// metric="bpm"
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
