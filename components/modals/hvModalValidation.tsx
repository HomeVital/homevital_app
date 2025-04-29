import { Modal, TouchableWithoutFeedback, StyleSheet, View } from 'react-native';
import { TEXT_DEFAULT, TRANSLUCENT_TEXT } from '@/constants/colors';
import HvText from '../ui/hvText';
import HvImage from '../ui/hvImage';
import HvButton from '../ui/hvButton';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
	visible: boolean;
	onClose: () => void;
	validationStatus: string;
}

const HvModalValidation = ({ visible, onClose, validationStatus }: Props): JSX.Element => {
	const { t } = useTranslation();
	// visibility
	const [contentReady, setContentReady] = useState(false);
	const [modalVisible, setModalVisible] = useState(0);

	useEffect(() => {
		if (visible) {
			setTimeout(() => {
				setModalVisible(1);
				setContentReady(true);
			}, 250);
		} else {
			setContentReady(false);
			setModalVisible(0);
		}
	}, [visible]);

	const data = {
		header: '',
		text: '',
		background: '',
		img: '',
	};

	switch (validationStatus) {
		case 'Normal':
			// data.header = 'Vel gert!';
			data.header = t('modals.validation.normal.header');
			// data.text = 'Þú ert innan eðlilega marka. Eigðu góðan dag.';
			data.text = t('modals.validation.normal.text');
			data.background = '#EEFFEE';
			data.img = 'Healthy';
			break;
		case 'Raised':
			// data.header = 'Rétt utan marka!';
			// data.text =
			// 	'Þetta getur verið eðlilegt en heimahjúkrun fer yfir mælinguna. Eigðu góðan dag.';
			data.header = t('modals.validation.raised.header');
			data.text = t('modals.validation.raised.text');
			data.background = '#FFFFCC';
			data.img = 'HealthyWarning';
			break;
		case 'High':
			// data.header = 'Utan marka!';
			// data.text =
			// 	'Heimahjúkrun mun hafa samband við þig innan stundar og leiðbeina þér með framhaldið.';
			data.header = t('modals.validation.high.header');
			data.text = t('modals.validation.high.text');
			data.background = '#F8E3E3';
			data.img = 'Unhealthy';
			break;
		case 'Critical':
			// data.header = 'Utan marka!';
			// data.text =
			// 	'Heimahjúkrun mun hafa samband við þig innan stundar og leiðbeina þér með framhaldið.';
			data.header = t('modals.validation.high.header');
			data.text = t('modals.validation.high.text');
			data.background = '#F8E3E3';
			data.img = 'Unhealthy';
			break;
		case 'CriticalHigh':
			// data.header = 'Utan marka!';
			// data.text =
			// 	'Heimahjúkrun mun hafa samband við þig innan stundar og leiðbeina þér með framhaldið.';
			data.header = t('modals.validation.high.header');
			data.text = t('modals.validation.high.text');
			data.background = '#F8E3E3';
			data.img = 'Unhealthy';
			break;
		default:
			// data.header = 'Ógildur?';
			// data.text =
			// 	'Eitthvað sem á eftir að laga okkar megin. Hafðu samband við okkur og láttu okkur vita af þessu.';
			data.header = t('modals.validation.unknown.header');
			data.text = t('modals.validation.unknown.text');
			data.background = '#F8E3E3';
			data.img = 'Unhealthy';
			break;
	}

	return (
		<Modal
			visible={visible}
			animationType={contentReady ? 'fade' : 'none'}
			onRequestClose={onClose}
			transparent={true}
		>
			<TouchableWithoutFeedback onPressIn={onClose}>
				<View style={[Styles.container, { opacity: modalVisible }]}>
					<TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
						<View style={Styles.popupContainer}>
							<View
								style={[
									Styles.popupBackground,
									{ backgroundColor: data.background },
								]}
							>
								<View style={Styles.imageCenter}>
									<HvImage source={data.img} size={100} />
								</View>
								<HvText
									style={{ marginTop: 20 }}
									weight='bold'
									size='xl'
									color={TRANSLUCENT_TEXT}
									center
								>
									{data.header}
								</HvText>
								<HvText
									style={{ marginTop: 20, marginBottom: 20 }}
									weight='regular'
									size='lg'
									color={TRANSLUCENT_TEXT}
									center
								>
									{data.text}
								</HvText>

								<View style={Styles.imageCenter}>
									<HvButton
										text={t('modals.validation.close')}
										onPress={onClose}
										bright
										seeThrough
										width={100}
										bgColor={TEXT_DEFAULT}
									/>
								</View>
							</View>
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
	},
	popupContainer: {
		width: '100%',
		alignItems: 'center',
	},
	popupBackground: {
		width: 290,
		borderRadius: 10,
		padding: 16,
	},
	imageCenter: {
		alignItems: 'center',
	},
});

export default HvModalValidation;
