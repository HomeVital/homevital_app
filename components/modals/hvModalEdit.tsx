import { Modal, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import HvButton from '../ui/hvButton';
import {
	IBloodPressure,
	IBloodSugar,
	IBodyTemperature,
	IBodyWeight,
	IMeasurementBase,
	IOxygenSaturation,
} from '@/interfaces/measurements';
import { HvCardMeasurement } from '../cards/hvCardMeasurements';
import HvCard from '../cards/hvCard';
import { DARK_RED, LIGHT_THEME } from '@/constants/colors';
import HvText from '../ui/hvText';
import { STYLES } from '@/constants/styles';
import HvButtonCheck from '../ui/hvButtonCheck';

interface Props<
	T = IBloodPressure | IOxygenSaturation | IBodyTemperature | IBodyWeight | IBloodSugar,
> {
	title: string;
	visible: boolean;
	visibleDetails: boolean;
	onClose: () => void;
	onEdit: () => void;
	onDelete: () => void;
	item: T extends IMeasurementBase ? T : never;
}

const HvModalEdit = ({
	title,
	visible,
	visibleDetails,
	onClose,
	onEdit,
	onDelete,
	item,
}: Props): JSX.Element => {
	return (
		<Modal visible={visible} animationType='fade' onRequestClose={onClose} transparent={true}>
			<TouchableWithoutFeedback onPressIn={onClose}>
				<View style={STYLES.defaultModalView}>
					<TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
						<View>
							<HvCard
								gap={36}
								padding={20}
								bgColor={LIGHT_THEME}
								style={{ opacity: visibleDetails ? 1 : 0 }}
							>
								<View style={STYLES.checkmarkPos}>
									<HvButtonCheck cancel onPress={onClose} bgColor={DARK_RED} />
								</View>
								<View style={Styles.titleContainer}>
									<HvText size='xl' color='darkGreen' weight='semibold' center>
										{title}
									</HvText>
									<HvCardMeasurement item={item} />
								</View>
								<View style={Styles.buttonsContainer}>
									<HvButton text='Breyta' onPress={onEdit} bright />
									<HvButton
										text='Eyða'
										bgColor={DARK_RED}
										onPress={onDelete}
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
