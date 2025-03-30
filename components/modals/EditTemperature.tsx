import { IBodyTemperature, IPatchBodyTemperature } from '@/interfaces/measurements';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import HvInputForm from '../ui/hvInputForm/hvInputForm';
import HvInputFormContainer from '../ui/hvInputForm/hvInputFormContainer';
import HvInputField from '../ui/hvInputForm/hvInputField';
import { STYLES } from '@/constants/styles';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import HvText from '../ui/hvText';
import { patchTemperature } from '@/queries/patch';

interface Props {
	visible: boolean;
	onClose: () => void;
	onSubmit: () => void;
	itemId: string;
	item: IBodyTemperature;
}

const EditTemperature = ({ visible, onClose, onSubmit, itemId, item }: Props): JSX.Element => {
	const queryClient = useQueryClient();

	const [defaultTemperature, setDefaultTemperature] = useState(item.temperature.toString());
	const [temperature, setTemperature] = useState(item.temperature.toString());

	useEffect(() => {
		setTemperature(item.temperature.toString());
		setDefaultTemperature(item.temperature.toString());
	}, [item]);

	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IPatchBodyTemperature) =>
			patchTemperature(itemId, measurement),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['bodytemperature'] });
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			onSubmit();
		},
	});

	const HandleMutation = async (): Promise<void> => {
		try {
			await addMutation({
				temperature: parseFloat(temperature),
				status: item.status,
			});
		} catch (error) {
			console.error('Error patching oxygen saturation:', error);
		}
	};

	const DisableButton = (): boolean => {
		return temperature === defaultTemperature;
	};

	return (
		<Modal visible={visible} animationType='fade' onRequestClose={onClose} transparent={true}>
			<TouchableWithoutFeedback onPressIn={onClose}>
				<View style={STYLES.defaultModalViewDeep}>
					<TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
						<View>
							<HvInputForm onPress={HandleMutation} disabled={DisableButton()}>
								<HvText size='xl' color='darkGreen' weight='semibold' center>
									Breyta líkamshita
								</HvText>
								<HvInputFormContainer textInput>
									<HvInputField
										itemState={temperature}
										setItemState={setTemperature}
										header='Hitastig'
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

export default EditTemperature;
