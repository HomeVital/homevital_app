import { IBloodSugar, IPatchBloodSugar } from '@/interfaces/measurements';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import HvInputForm from '../ui/hvInputForm/hvInputForm';
import HvInputFormContainer from '../ui/hvInputForm/hvInputFormContainer';
import HvInputField from '../ui/hvInputForm/hvInputField';
import { STYLES } from '@/constants/styles';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import HvText from '../ui/hvText';
import { patchBloodSugar } from '@/queries/patch';
import HvButtonCheck from '../ui/hvButtonCheck';
import { DARK_RED } from '@/constants/colors';

interface Props {
	visible: boolean;
	onClose: () => void;
	onSubmit: () => void;
	itemId: string;
	item: IBloodSugar;
}

const EditBloodSugar = ({ visible, onClose, onSubmit, itemId, item }: Props): JSX.Element => {
	const queryClient = useQueryClient();

	const [defaultBloodSugar, setDefaultBloodSugar] = useState(item.bloodsugarLevel.toString());
	const [bloodSugar, setBloodSugar] = useState(item.bloodsugarLevel.toString());

	useEffect(() => {
		setBloodSugar(item.bloodsugarLevel.toString());
		setDefaultBloodSugar(item.bloodsugarLevel.toString());
	}, [item]);

	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IPatchBloodSugar) => patchBloodSugar(itemId, measurement),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['bloodsugar'] });
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			onSubmit();
		},
	});

	const HandleMutation = async (): Promise<void> => {
		try {
			await addMutation({
				bloodsugarLevel: parseFloat(bloodSugar),
				status: item.status,
			});
		} catch (error) {
			console.error('Error patching oxygen saturation:', error);
		}
	};

	const DisableButton = (): boolean => {
		return bloodSugar === defaultBloodSugar;
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
									Breyta blóðsykur
								</HvText>
								<HvInputFormContainer textInput>
									<HvInputField
										itemState={bloodSugar}
										setItemState={setBloodSugar}
										description='Blóðsykur'
										metric='mmol/L'
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

export default EditBloodSugar;
