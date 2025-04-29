import { IBodyWeight, IPatchBodyWeight } from '@/interfaces/measurements';
import { Modal, TouchableWithoutFeedback, View } from 'react-native';
import HvInputForm from '../ui/hvInputForm/hvInputForm';
import HvInputFormContainer from '../ui/hvInputForm/hvInputFormContainer';
import HvInputField from '../ui/hvInputForm/hvInputField';
import { STYLES } from '@/constants/styles';
import { useContext, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import HvText from '../ui/hvText';
import { patchBodyWeight } from '@/queries/patch';
import HvButtonCheck from '../ui/hvButtonCheck';
import { DARK_RED } from '@/constants/colors';
import ModalContext from '@/contexts/modalContext';

const EditBodyWeight = (): JSX.Element => {
	const queryClient = useQueryClient();
	const modals = useContext(ModalContext);
	const item = modals.editModalData.item as IBodyWeight;
	const itemId = item.id.toString();

	// measurements
	const [defaultWeight, setDefaultWeight] = useState(item.weight.toString());
	const [weight, setWeight] = useState(item.weight.toString());

	useEffect(() => {
		setWeight(item.weight.toString());
		setDefaultWeight(item.weight.toString());
	}, [modals.editBWVisible]);

	// mutations (posting new data)
	const { mutateAsync: addMutation } = useMutation({
		mutationFn: async (measurement: IPatchBodyWeight) => patchBodyWeight(itemId, measurement),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['bodyweight'] });
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			modals.setEditBWVisible(false);
			modals.setIsEditOpen(false);
		},
	});

	const HandleMutation = async (): Promise<void> => {
		try {
			await addMutation({
				weight: parseFloat(weight),
				status: item.status,
			});
		} catch (error) {
			console.error('Error patching body weight:', error);
		}
	};

	// validation
	const DisableButton = (): boolean => {
		return weight === defaultWeight;
	};

	return (
		<Modal
			visible={modals.editBWVisible}
			animationType='fade'
			onRequestClose={() => modals.setEditBWVisible(false)}
			transparent={true}
		>
			<TouchableWithoutFeedback onPressIn={() => modals.setEditBWVisible(false)}>
				<View style={STYLES.defaultModalViewDeep}>
					<TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
						<View>
							<HvInputForm onPress={HandleMutation} disabled={DisableButton()}>
								<View style={STYLES.checkmarkPos}>
									<HvButtonCheck
										cancel
										onPress={() => modals.setEditBWVisible(false)}
										bgColor={DARK_RED}
									/>
								</View>
								<HvText size='xl' color='darkGreen' weight='semibold' center>
									Breyta þyngd
								</HvText>
								<HvInputFormContainer textInput>
									<HvInputField
										itemState={weight}
										setItemState={setWeight}
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

export default EditBodyWeight;
