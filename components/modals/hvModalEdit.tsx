import { Modal, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import HvButton from '../ui/hvButton';
import {
	IBloodPressure,
	IBloodSugar,
	IBodyTemperature,
	IBodyWeight,
	IOxygenSaturation,
} from '@/interfaces/measurements';
import { HvCardMeasurement } from '../cards/hvCardMeasurements';
import HvCard from '../cards/hvCard';
import { DARK_RED, LIGHT_THEME } from '@/constants/colors';
import HvText from '../ui/hvText';
import { STYLES } from '@/constants/styles';
import HvButtonCheck from '../ui/hvButtonCheck';
import { useContext, useEffect } from 'react';
import ModalContext from '@/contexts/modalContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	deleteBloodPressure,
	deleteBloodSugar,
	deleteBodyTemperature,
	deleteBodyWeight,
	deleteOxygenSaturation,
} from '@/queries/delete';
import {
	isBloodPressure,
	isBloodSugar,
	isBodyTemperature,
	isBodyWeight,
	isOxygenSaturation,
} from '@/constants/typeGuards';
import { useTranslation } from 'react-i18next';
import { useSession } from '@/hooks/ctx';

const HvModalEdit = (): JSX.Element => {
	const { t } = useTranslation();
	const { token, signOut } = useSession();
	const queryClient = useQueryClient();
	const modals = useContext(ModalContext);

	const visibleDetails =
		modals.editBOVisible ||
		modals.editBPVisible ||
		modals.editBSVisible ||
		modals.editBWVisible ||
		modals.editBTVisible;

	const { mutateAsync: deleteBT } = useMutation({
		mutationFn: async (item: IBodyTemperature) =>
			deleteBodyTemperature(item.id.toString(), token),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['bodytemperature'] });
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			// status popup
			modals.setIsEditOpen(false);
			modals.setIsOpen(false);
		},
		onError: (error) => {
			if (error.message === 'Token expired') {
				signOut();
			}
		},
	});

	const { mutateAsync: deleteBW } = useMutation({
		mutationFn: async (item: IBodyWeight) => deleteBodyWeight(item.id.toString(), token),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['bodyweight'] });
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			// status popup
			modals.setIsEditOpen(false);
			modals.setIsOpen(false);
		},
		onError: (error) => {
			if (error.message === 'Token expired') {
				signOut();
			}
		},
	});

	const { mutateAsync: deleteBS } = useMutation({
		mutationFn: async (item: IBloodSugar) => deleteBloodSugar(item.id.toString(), token),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['bloodsugar'] });
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			// status popup
			modals.setIsEditOpen(false);
			modals.setIsOpen(false);
		},
		onError: (error) => {
			if (error.message === 'Token expired') {
				signOut();
			}
		},
	});

	const { mutateAsync: deleteBP } = useMutation({
		mutationFn: async (item: IBloodPressure) => deleteBloodPressure(item.id.toString(), token),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['bloodpressure'] });
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			// status popup
			modals.setIsEditOpen(false);
			modals.setIsOpen(false);
		},
		onError: (error) => {
			if (error.message === 'Token expired') {
				signOut();
			}
		},
	});

	const { mutateAsync: deleteBO } = useMutation({
		mutationFn: async (item: IOxygenSaturation) =>
			deleteOxygenSaturation(item.id.toString(), token),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['oxygensaturation'] });
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			// status popup
			modals.setIsEditOpen(false);
			modals.setIsOpen(false);
		},
		onError: (error) => {
			if (error.message === 'Token expired') {
				signOut();
			}
		},
	});

	/**
	 * Handle delete mutation
	 * @param {IBloodPressure | IOxygenSaturation | IBodyTemperature | IBodyWeight | IBloodSugar} item
	 * @returns {Promise<void>}
	 * */
	const deleteMutation = async (
		item: IBloodPressure | IOxygenSaturation | IBodyTemperature | IBodyWeight | IBloodSugar,
	) => {
		if (isOxygenSaturation(item)) {
			await deleteBO(item);
		} else if (isBloodPressure(item)) {
			await deleteBP(item);
		} else if (isBodyTemperature(item)) {
			await deleteBT(item);
		} else if (isBloodSugar(item)) {
			await deleteBS(item);
		} else if (isBodyWeight(item)) {
			await deleteBW(item);
		} else {
			throw new Error('Unknown measurement type');
		}
	};

	/**
	 * Handle mutation
	 * @returns {Promise<void>}
	 */
	const handleMutation = async (
		item: IBloodPressure | IOxygenSaturation | IBodyTemperature | IBodyWeight | IBloodSugar,
	): Promise<void> => {
		try {
			await deleteMutation(item);
		} catch (error) {
			console.error('Error deleting measurement:', error);
		}
	};

	/**
	 * Handle close modal
	 * @returns {void}
	 */
	const handleOnClose = () => {
		modals.setIsEditOpen(false);
		modals.setIsOpen(false);
	};

	/**
	 * Handle edit button
	 * @returns {void}
	 */
	const handleOnEdit = () => {
		modals.setIsEditOpen(false);
		if (isOxygenSaturation(modals.editModalData.item)) {
			modals.setEditBOVisible(true);
		} else if (isBloodPressure(modals.editModalData.item)) {
			modals.setEditBPVisible(true);
		} else if (isBodyTemperature(modals.editModalData.item)) {
			modals.setEditBTVisible(true);
		} else if (isBloodSugar(modals.editModalData.item)) {
			modals.setEditBSVisible(true);
		} else if (isBodyWeight(modals.editModalData.item)) {
			modals.setEditBWVisible(true);
		}
	};

	useEffect(() => {}, [modals.editModalData, modals.isEditOpen]);

	return (
		<Modal
			visible={modals.isEditOpen}
			animationType={modals.contentReady ? 'fade' : 'none'}
			onRequestClose={handleOnClose}
			transparent={true}
		>
			<TouchableWithoutFeedback onPressIn={handleOnClose}>
				<View style={[STYLES.defaultModalViewDeep, { opacity: modals.modalVisible }]}>
					<TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
						<View>
							<HvCard
								gap={36}
								padding={20}
								bgColor={LIGHT_THEME}
								style={{ opacity: !visibleDetails ? 1 : 0 }}
							>
								<View style={STYLES.checkmarkPos}>
									<HvButtonCheck
										cancel
										onPress={handleOnClose}
										bgColor={DARK_RED}
									/>
								</View>
								<View style={Styles.titleContainer}>
									<HvText size='xl' color='darkGreen' weight='semibold' center>
										{modals.editModalData.title}
									</HvText>
									<HvCardMeasurement item={modals.editModalData.item} />
								</View>
								<View style={Styles.buttonsContainer}>
									<HvButton
										text={t('modals.buttons.edit')}
										onPress={handleOnEdit}
										bright
									/>
									<HvButton
										text={t('modals.buttons.delete')}
										bgColor={DARK_RED}
										onPress={() => handleMutation(modals.editModalData.item)}
										bright
									/>
								</View>
							</HvCard>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

const Styles = StyleSheet.create({
	titleContainer: {
		width: '100%',
		gap: 20,
	},
	buttonsContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		gap: 24,
	},
});

export default HvModalEdit;
