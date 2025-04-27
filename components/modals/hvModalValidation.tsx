import { Modal, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import HvImage from '../ui/hvImage';
import HvButtonCheck from '../ui/hvButtonCheck';
import { STYLES } from '@/constants/styles';
import { DARK_RED, TRANSLUCENT_TEXT } from '@/constants/colors';
import HvText from '../ui/hvText';

interface Props {
	visible: boolean;
	onClose: () => void;
	validationStatus: string;
}

const ValidationString = (status: string): string => {
	switch (status) {
		case 'Normal':
			return 'NormalImage';
		case 'Raised':
			return 'RaisedImage';
		case 'High':
			return 'HighImage';
		case 'Critical':
			return 'HighImage';
		case 'CriticalHigh':
			return 'HighImage';
		case 'Invalid':
			return 'HighImage';
		default:
			return '';
	}
};

const HvModalValidation = ({ visible, onClose, validationStatus }: Props): JSX.Element => {
	return (
		<Modal visible={visible} animationType='fade' onRequestClose={onClose} transparent={true}>
			<TouchableWithoutFeedback onPressIn={onClose}>
				<View style={Styles.container}>
					<TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
						<View>
							<View style={STYLES.checkmarkPosCenter}>
								<HvButtonCheck cancel onPress={onClose} bgColor={DARK_RED} />
							</View>
							<View style={Styles.popupContainer}>
								<View style={Styles.popupBackground}>
									<HvText
										style={{ marginTop: 20 }}
										weight='bold'
										size='l'
										color={TRANSLUCENT_TEXT}
										center
									>
										{validationStatus}
									</HvText>
								</View>
							</View>
							<HvImage source={ValidationString(validationStatus)} size={300} />
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

const Styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		width: '100%',
		// alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	popupContainer: {
		width: '100%',
		height: 280,
		alignItems: 'center',
	},
	popupBackground: {
		width: 250,
		height: '100%',
		borderRadius: 10,
		backgroundColor: '#f8e3e3',
	},
});

export default HvModalValidation;
