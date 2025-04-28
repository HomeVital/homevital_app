import { Modal, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { TEXT_DEFAULT, TRANSLUCENT_TEXT } from '@/constants/colors';
import HvText from '../ui/hvText';
import HvImage from '../ui/hvImage';
import HvButton from '../ui/hvButton';

interface Props {
	visible: boolean;
	onClose: () => void;
	validationStatus: string;
}

const ValidationHeader = (status: string): string => {
	switch (status) {
		case 'Normal':
			return 'Vel gert!';
		case 'Raised':
			return 'Rétt utan marka!';
		case 'High':
			return 'Utan marka!';
		case 'Critical':
			return 'Utan marka!';
		case 'CriticalHigh':
			return 'Utan marka!';
		default:
			return 'Ógildur?';
	}
};

const ValidationText = (status: string): string => {
	switch (status) {
		case 'Normal':
			return 'Þú ert innan eðlilega marka. Eigðu góðan dag.';
		case 'Raised':
			return 'Þetta getur verið eðlilegt en heimahjúkrun fer yfir mælinguna. Eigðu góðan dag.';
		case 'High':
			return 'Heimahjúkrun mun hafa samband við þig innan stundar og leiðbeina þér með framhaldið.';
		case 'Critical':
			return 'Heimahjúkrun mun hafa samband við þig innan stundar og leiðbeina þér með framhaldið.';
		case 'CriticalHigh':
			return 'Heimahjúkrun mun hafa samband við þig innan stundar og leiðbeina þér með framhaldið.';
		default:
			return 'Eitthvað sem á eftir að laga okkar megin. Hafðu samband við okkur og láttu okkur vita af þessu.';
	}
};

const ValidationBackground = (status: string): string => {
	switch (status) {
		case 'Normal':
			return '#EEFFEE';
		case 'Raised':
			return '#FFFFCC';
		case 'High':
			return '#F8E3E3';
		case 'Critical':
			return '#F8E3E3';
		case 'CriticalHigh':
			return '#F8E3E3';
		default:
			return '#F8E3E3';
	}
};

const ValidationImg = (status: string): string => {
	switch (status) {
		case 'Normal':
			return 'Healthy';
		case 'Raised':
			return 'HealthyWarning';
		case 'High':
			return 'Unhealthy';
		case 'Critical':
			return 'Unhealthy';
		case 'CriticalHigh':
			return 'Unhealthy';
		default:
			return 'Unhealthy';
	}
};

const HvModalValidation = ({ visible, onClose, validationStatus }: Props): JSX.Element => {
	return (
		<Modal visible={visible} animationType='slide' onRequestClose={onClose} transparent={true}>
			<TouchableWithoutFeedback onPressIn={onClose}>
				<View style={Styles.container}>
					<TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
						<View>
							<View style={Styles.popupContainer}>
								<View
									style={[
										Styles.popupBackground,
										{ backgroundColor: ValidationBackground(validationStatus) },
									]}
								>
									<View style={Styles.imageCenter}>
										<HvImage
											source={ValidationImg(validationStatus)}
											size={100}
										/>
									</View>
									<HvText
										style={{ marginTop: 20 }}
										weight='bold'
										size='xl'
										color={TRANSLUCENT_TEXT}
										center
									>
										{ValidationHeader(validationStatus)}
									</HvText>
									<HvText
										style={{ marginTop: 20, marginBottom: 20 }}
										weight='regular'
										size='lg'
										color={TRANSLUCENT_TEXT}
										center
									>
										{ValidationText(validationStatus)}
									</HvText>

									<View style={Styles.imageCenter}>
										<HvButton
											text={'Loka'}
											onPress={onClose}
											bright
											seeThrough
											width={100}
											bgColor={TEXT_DEFAULT}
										/>
									</View>
								</View>
							</View>
							{/* <HvImage source={ValidationString(validationStatus)} size={300} /> */}
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
		// backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	popupContainer: {
		width: '100%',
		// height: 320,
		alignItems: 'center',
	},
	popupBackground: {
		width: 290,
		// height: '100%',
		borderRadius: 10,
		padding: 16,
	},
	imageCenter: {
		alignItems: 'center',
	},
});

export default HvModalValidation;
