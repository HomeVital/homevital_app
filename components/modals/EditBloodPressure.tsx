import { IBloodPressure, IPatchBloodPressure } from '@/interfaces/measurements';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import HvInputForm from '../ui/hvInputForm/hvInputForm';
import HvInputFormContainer from '../ui/hvInputForm/hvInputFormContainer';
import HvInputField from '../ui/hvInputForm/hvInputField';
import { STYLES } from '@/constants/styles';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import HvText from '../ui/hvText';
import { patchBloodPressure } from '@/queries/patch';
import HvToggleSelect from '../ui/hvInputForm/hvToggleSelect';
import HvScrollView from '../ui/HvScrollView';

interface Props {
	visible: boolean;
	onClose: () => void;
	onSubmit: () => void;
	itemId: string;
	item: IBloodPressure;
}

const EditBloodPressure = ({ visible, onClose, onSubmit, itemId, item }: Props): JSX.Element => {
	const queryClient = useQueryClient();

	const [defaultHand, setDefaultHand] = useState(item.measureHand.toString());
	const [hand, setHand] = useState(item.measureHand.toString());
	const [position, setPosition] = useState(item.bodyPosition.toString());
	const [defaultPosition, setDefaultPosition] = useState(item.bodyPosition.toString());
	const [sys, setSys] = useState(item.systolic.toString());
	const [defaultSys, setDefaultSys] = useState(item.systolic.toString());
	const [dia, setDia] = useState(item.diastolic.toString());
	const [defaultDia, setDefaultDia] = useState(item.diastolic.toString());
	const [pulse, setPulse] = useState(item.pulse.toString());
	const [defaultPulse, setDefaultPulse] = useState(item.pulse.toString());

	useEffect(() => {
		if (item.measureHand === 'Left') {
			setHand('Vinstri');
			setDefaultHand('Vinstri');
		} else if (item.measureHand === 'Right') {
			setHand('Hægri');
			setDefaultHand('Hægri');
		}
		if (item.bodyPosition === 'Sitting') {
			setPosition('Sitjandi');
			setDefaultPosition('Sitjandi');
		} else if (item.bodyPosition === 'Laying') {
			setPosition('Liggjandi');
			setDefaultPosition('Liggjandi');
		}
		setSys(item.systolic.toString());
		setDefaultSys(item.systolic.toString());
		setDia(item.diastolic.toString());
		setDefaultDia(item.diastolic.toString());
		setPulse(item.pulse.toString());
		setDefaultPulse(item.pulse.toString());
	}, [item]);

	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IPatchBloodPressure) =>
			patchBloodPressure(itemId, measurement),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['bloodpressure'] });
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			onSubmit();
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
			console.error('Error patching oxygen saturation:', error);
		}
	};

	const DisableButton = (): boolean => {
		return (
			hand === defaultHand &&
			position === defaultPosition &&
			sys === defaultSys &&
			dia === defaultDia &&
			pulse === defaultPulse
		);
	};

	return (
		<Modal visible={visible} animationType='fade' onRequestClose={onClose} transparent={true}>
			<HvScrollView isModal>
				<TouchableWithoutFeedback onPressIn={onClose}>
					<View style={STYLES.defaultModalViewDeep}>
						<TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
							<View>
								<HvInputForm onPress={HandleMutation} disabled={DisableButton()}>
									<HvText size='xl' color='darkGreen' weight='semibold' center>
										Breyta Blóðþrýsting
									</HvText>
									<HvInputFormContainer>
										<HvToggleSelect
											itemState={hand}
											setItemState={setHand}
											leftIcon={require('@/assets/svgs/handLeft.svg')}
											rightIcon={require('@/assets/svgs/handRight.svg')}
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
