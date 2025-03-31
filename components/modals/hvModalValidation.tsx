import { Modal, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import HvImage from '../ui/hvImage';

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
			<TouchableWithoutFeedback onPressOut={onClose}>
				<View style={Styles.container}>
					<HvImage source={ValidationString(validationStatus)} size={300} />
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

const Styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
});

export default HvModalValidation;
