import { Modal, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { STYLES } from '@/constants/styles';
import { useContext, useState } from 'react';
import HvText from '../ui/hvText';
import HvButtonCheck from '../ui/hvButtonCheck';
import { DARK_RED } from '@/constants/colors';
import ModalContext from '@/contexts/modalContext';
import { useTranslation } from 'react-i18next';
import HvInputForm from '../ui/hvInputForm/hvInputForm';
import CountryFlag from 'react-native-country-flag';

interface Props {
	onChange: (newLangCode: string) => void;
}

const ChangeLanguage = ({ onChange }: Props): JSX.Element => {
	const { t, i18n } = useTranslation();
	const modals = useContext(ModalContext);

	const languages = ['is', 'us'];

	// measurements
	const defaultLangCode = i18n.language;
	const [langCode, setLangCode] = useState(defaultLangCode);

	// handle change
	const handleChange = (newLangCode: string): void => {
		i18n.changeLanguage(newLangCode);
		onChange(newLangCode);
		modals.setChangeLangVisible(false);
		modals.setIsOpen(false);
	};

	// handle close
	const handleClose = (): void => {
		modals.setChangeLangVisible(false);
		modals.setIsOpen(false);
	};

	// validation
	const DisableButton = (): boolean => {
		// return bloodOxygen === '' || parseFloat(bloodOxygen) <= 0 || parseFloat(bloodOxygen) > 100;
		return defaultLangCode === langCode;
	};

	return (
		<Modal
			visible={modals.changeLangVisible}
			animationType={modals.contentReady ? 'fade' : 'none'}
			onRequestClose={handleClose}
			transparent={true}
		>
			<TouchableWithoutFeedback onPressIn={handleClose}>
				<View style={[STYLES.defaultModalViewDeep, { opacity: modals.modalVisible }]}>
					<TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
						<View>
							<HvInputForm
								onPress={() => handleChange(langCode)}
								disabled={DisableButton()}
							>
								<View style={STYLES.checkmarkPos}>
									<HvButtonCheck
										cancel
										onPress={handleClose}
										bgColor={DARK_RED}
									/>
								</View>
								<HvText size='xl' color='darkGreen' weight='semibold' center>
									{t('modals.language.changeTitle')}
								</HvText>
								<View>
									{languages.map((lang) => (
										<TouchableOpacity
											key={lang}
											onPress={() => setLangCode(lang)}
										>
											<View style={Styles.row}>
												<HvText
													weight={
														lang === langCode ? 'semibold' : 'regular'
													}
												>
													{t('settings.language.' + lang)}
												</HvText>
												<View
													style={{
														flexDirection: 'row',
														alignItems: 'center',
														gap: 10,
													}}
												>
													<CountryFlag
														isoCode={lang}
														size={25}
														style={{ borderRadius: 4 }}
													/>
													<View style={{ width: 16, height: 25 }}>
														{lang === langCode && (
															<HvText
																size='xl'
																color='darkGreen'
																weight='bold'
																center
															>
																✓
															</HvText>
														)}
													</View>
												</View>
											</View>
										</TouchableOpacity>
									))}
								</View>
							</HvInputForm>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

const Styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
});

export default ChangeLanguage;
