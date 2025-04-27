import { IOxygenSaturation, IPatchOxygenSaturation } from '@/interfaces/measurements';
import { Modal, View, TouchableWithoutFeedback } from 'react-native';
import HvInputForm from '../ui/hvInputForm/hvInputForm';
import HvInputFormContainer from '../ui/hvInputForm/hvInputFormContainer';
import HvInputField from '../ui/hvInputForm/hvInputField';
import { STYLES } from '@/constants/styles';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import HvText from '../ui/hvText';
import { patchOxygenSaturation } from '@/queries/patch';
import HvButtonCheck from '../ui/hvButtonCheck';
import { DARK_RED } from '@/constants/colors';

interface Props {
	visible: boolean;
	onClose: () => void;
	onSubmit: () => void;
	itemId: string;
	item: IOxygenSaturation;
}

const EditBloodOxygen = ({ visible, onClose, onSubmit, itemId, item }: Props): JSX.Element => {
	const queryClient = useQueryClient();

	const [defaultBloodOxygen, setDefaultBloodOxygen] = useState(
		item.oxygenSaturationValue.toString(),
	);
	const [bloodOxygen, setBloodOxygen] = useState(item.oxygenSaturationValue.toString());

	useEffect(() => {
		setBloodOxygen(item.oxygenSaturationValue.toString());
		setDefaultBloodOxygen(item.oxygenSaturationValue.toString());
	}, [item]);

	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IPatchOxygenSaturation) =>
			patchOxygenSaturation(itemId, measurement),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['oxygensaturation'] });
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			onSubmit();
		},
	});

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

	const DisableButton = (): boolean => {
		return bloodOxygen === defaultBloodOxygen;
	};

	return (
		<Modal visible={visible} animationType='fade' onRequestClose={onClose} transparent={true}>
			<TouchableWithoutFeedback onPressIn={onClose}>
				<View style={STYLES.defaultModalViewDeep}>
					<TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
						<View>
							<HvInputForm onPress={HandleMutation} disabled={DisableButton()}>
								<View style={STYLES.checkmarkPos}>
									<HvButtonCheck cancel onPress={onClose} bgColor={DARK_RED} />
								</View>
								<HvText size='xl' color='darkGreen' weight='semibold' center>
									Breyta súrefnismettun
								</HvText>
								<HvInputFormContainer textInput>
									<HvInputField
										itemState={bloodOxygen}
										setItemState={setBloodOxygen}
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
