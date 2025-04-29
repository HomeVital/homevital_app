import { IBloodPressure, IPatchBloodPressure } from '@/interfaces/measurements';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import HvInputForm from '../ui/hvInputForm/hvInputForm';
import HvInputFormContainer from '../ui/hvInputForm/hvInputFormContainer';
import HvInputField from '../ui/hvInputForm/hvInputField';
import { STYLES } from '@/constants/styles';
import { useContext, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import HvText from '../ui/hvText';
import { patchBloodPressure } from '@/queries/patch';
import HvToggleSelect from '../ui/hvInputForm/hvToggleSelect';
import HvScrollView from '../ui/HvScrollView';
import HvButtonCheck from '../ui/hvButtonCheck';
import { DARK_RED } from '@/constants/colors';
import ModalContext from '@/contexts/modalContext';

const EditBloodPressure = (): JSX.Element => {
	const queryClient = useQueryClient();
	const modals = useContext(ModalContext);
	const item = modals.editModalData.item as IBloodPressure;
	const itemId = item.id.toString();

	const [hand, setHand] = useState(item.measureHand.toString());
	const [position, setPosition] = useState(item.bodyPosition.toString());
	const [sys, setSys] = useState(item.systolic.toString());
	const [dia, setDia] = useState(item.diastolic.toString());
	const [pulse, setPulse] = useState(item.pulse.toString());

	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IPatchBloodPressure) =>
			patchBloodPressure(itemId, measurement),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['bloodpressure'] });
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			modals.setEditBPVisible(false);
			modals.setIsOpen(false);
		},
	});

	const HandleMutation = async (): Promise<void> => {
		try {
			await addMutation({
				measureHand: hand === 'Vinstri' ? 'Left' : 'Right',
				bodyPosition: position === 'Sitjandi' ? 'Sitting' : 'Laying',
				systolic: parseInt(sys, 10),
				diastolic: parseInt(dia, 10),
				pulse: parseInt(pulse, 10),
				status: item.status,
			});
		} catch (error) {
			console.error('Error patching blood pressure:', error);
		}
	};

	const handleClose = (): void => {
		modals.setEditBPVisible(false);
		modals.setIsEditOpen(true);
		modals.setIsOpen(true);
	};

	const DisableButton = (): boolean => {
		return (
			hand === item.measureHand &&
			position === item.bodyPosition &&
			sys === item.systolic.toString() &&
			dia === item.diastolic.toString() &&
			pulse === item.pulse.toString()
		);
	};

	return (
		<Modal
			visible={modals.editBPVisible}
			animationType={modals.editReady ? 'fade' : 'none'}
			onRequestClose={handleClose}
			transparent={true}
		>
			<HvScrollView isModal>
				<TouchableWithoutFeedback onPressIn={handleClose}>
					<View
						style={[STYLES.defaultModalViewDeep, { opacity: modals.editModalVisible }]}
					>
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
										Breyta Blóðþrýsting
									</HvText>
									<HvInputFormContainer>
										<HvToggleSelect
											itemState={hand}
											setItemState={setHand}
											leftIcon={require('@/assets/svgs/handLeftArrow.svg')}
											rightIcon={require('@/assets/svgs/handRightArrow.svg')}
											description='Mæli hönd'
											leftText='Vinstri'
											rightText='Hægri'
										/>
									</HvInputFormContainer>

									<HvInputFormContainer>
										<HvToggleSelect
											itemState={position}
											setItemState={setPosition}
											leftIcon={require('@/assets/svgs/sitting.svg')}
											rightIcon={require('@/assets/svgs/laying.svg')}
											description='Líkamsstaða'
											leftText='Sitjandi'
											rightText='Liggjandi'
										/>
									</HvInputFormContainer>

									<HvInputFormContainer textInput>
										<HvInputField
											itemState={sys}
											setItemState={setSys}
											header='Efri mörk'
											description='SYS'
											metric='mmHg'
										/>
										<HvInputField
											itemState={dia}
											setItemState={setDia}
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
			</HvScrollView>
		</Modal>
	);
};

export default EditBloodPressure;
