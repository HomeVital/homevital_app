import { Modal, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { STYLES } from '@/constants/styles';
import { useContext, useState } from 'react';
import HvText from '../ui/hvText';
import HvButtonCheck from '../ui/hvButtonCheck';
import { DARK_RED, LIGHT_THEME } from '@/constants/colors';
import ModalContext from '@/contexts/modalContext';
import { useTranslation } from 'react-i18next';
import HvInputForm from '../ui/hvInputForm/hvInputForm';
import CountryFlag from 'react-native-country-flag';
import HvButtonContainer from '../ui/hvButtonContainer';

interface Props {
	onChange: (newLangCode: string) => void;
}

const ChangeLanguage = ({ onChange }: Props): JSX.Element => {
	const { t, i18n } = useTranslation();
	const modals = useContext(ModalContext);

	const languages = ['is', 'us', 'pl'];

	// measurements
	const defaultLangCode = i18n.language;
	const [langCode, setLangCode] = useState(defaultLangCode);

	/**
	 * Handle change language
	 * @param {string} newLangCode
	 * @returns {void}
	 */
	const handleChange = (newLangCode: string): void => {
		i18n.changeLanguage(newLangCode);
		onChange(newLangCode);
		modals.setChangeLangVisible(false);
		modals.setIsOpen(false);
	};

	/**
	 * Handle close
	 * @returns {void}
	 */
	const handleClose = (): void => {
		modals.setChangeLangVisible(false);
		modals.setIsOpen(false);
	};

	/**
	 * Disable button if input is invalid
	 * @returns {boolean}
	 */
	const DisableButton = (): boolean => {
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
								<View style={Styles.itemsContainer}>
									{languages.map((lang, index) => (
										<View key={lang}>
											<HvButtonContainer onPress={() => setLangCode(lang)}>
												<View style={Styles.row}>
													<HvText
														weight={
															lang === langCode
																? 'semibold'
																: 'regular'
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
															style={{
																borderRadius: 4,
																boxShadow:
																	'0px 0px 4px rgba(0, 0, 0, 0.5)',
															}}
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
											</HvButtonContainer>
											{index !== languages.length - 1 && (
												<View style={Styles.spacer} />
											)}
										</View>
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
	spacer: {
		borderBottomWidth: 1,
		borderColor: '#E0E0E0',
	},
	itemsContainer: {
		padding: 20,
		backgroundColor: LIGHT_THEME,
		borderRadius: 10,
	},
});

export default ChangeLanguage;
