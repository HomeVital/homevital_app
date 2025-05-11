import React, { useContext, useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import CountryFlag from 'react-native-country-flag';
// components
// import HvDivider from '@/components/ui/hvDivider';
import HvText from '@/components/ui/hvText';
// constants
import { DARK_GREEN, DARK_RED, GREEN, LIGHT_THEME } from '@/constants/colors';
import { STYLES } from '@/constants/styles';
import { useSession } from '@/hooks/ctx';
import { useQuery } from '@tanstack/react-query';
import { fetchPatient } from '@/queries/get';
import { IPatient } from '@/interfaces/patient';
import { ErrorView, LoadingView } from '@/components/queryStates';
import HvCard from '@/components/cards/hvCard';
import HvButton from '@/components/ui/hvButton';
import { getClaimBySubstring } from '@/utility/utility';
import { useTranslation } from 'react-i18next';
import ChangeLanguage from '@/components/modals/changeLanguage';
import ModalContext from '@/contexts/modalContext';
import { useNotification } from '@/contexts/notificationContext';
import HvButtonContainer from '@/components/ui/hvButtonContainer';

const MainSettings = (): JSX.Element => {
	const { t, i18n } = useTranslation();
	const modals = useContext(ModalContext);
	const { session, signOut } = useSession();
	const { notificationsActive, setNotificationsActive } = useNotification();
	const [countryCode, setCountryCode] = useState(i18n.language); // TODO: change so that I don't have to use states

	const {
		data: patient,
		isError,
		isLoading,
	} = useQuery<IPatient>({
		queryKey: ['patient'],
		queryFn: async () => fetchPatient(getClaimBySubstring(session?.toString() || '', 'sub')),
	});

	if (isError) return <ErrorView />;

	if (isLoading) return <LoadingView />;

	if (!patient) return <></>;

	return (
		<>
			<View style={STYLES.defaultView}>
				{/* <HvDivider /> */}
				<HvCard padding={20} gap={20}>
					<View style={Styles.userContainer}>
						<HvText size='xl' weight='semibold'>
							{patient.name}
						</HvText>
						<View style={Styles.aboutLine}>
							<HvText style={{ width: '30%' }}>
								{/* Heimili */}
								{t('settings.home')}
							</HvText>
							<View>
								<HvText size='l' weight='semibold'>
									{patient.address.split(',')[0]}
								</HvText>
								<HvText size='m' weight='semibold'>
									{patient.address.split(', ')[1]?.replace(/,/g, '')}
								</HvText>
							</View>
						</View>
						<View style={Styles.aboutLine}>
							<HvText style={{ width: '30%' }}>
								{/* Sími */}
								{t('settings.phone')}
							</HvText>
							<HvText size='l' weight='semibold'>
								{patient.phone.slice(0, 3) + ' ' + patient.phone.slice(3)}
							</HvText>
						</View>
					</View>
					<View style={Styles.partContainer}>
						<HvButton
							// text='Tengiliðir'
							text={t('settings.contacts')}
							onPress={() => {}}
							small
							bright
							disabled
						/>
						<HvButton
							// text='Tæki'
							text={t('settings.devices')}
							onPress={() => {}}
							small
							bright
							disabled
						/>
						<HvButtonContainer
							onPress={() => {
								modals.setChangeLangVisible(true);
								modals.setIsOpen(true);
							}}
						>
							<View style={Styles.leftRightContainer}>
								<HvText>
									{/* Tungumál */}
									{t('settings.language.language')}
								</HvText>
								<CountryFlag
									isoCode={countryCode}
									size={25}
									style={{
										borderRadius: 4,
										// borderColor: DARK_GREEN,
										// borderWidth: 1,
										boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.5)',
									}}
								/>
							</View>
						</HvButtonContainer>
						<View style={Styles.leftRightContainer}>
							<HvText>
								{/* Áminningar */}
								{t('settings.notifications')}
							</HvText>
							<Switch
								value={notificationsActive}
								onValueChange={() => setNotificationsActive(!notificationsActive)}
								trackColor={{ false: '#767577', true: GREEN }}
								thumbColor={notificationsActive ? DARK_GREEN : '#f4f3f4'}
								ios_backgroundColor='#3e3e3e'
							/>
						</View>
					</View>
					<View style={Styles.bottomContainer}>
						<HvButton
							// text='Skrá út'
							text={t('settings.signOut')}
							onPress={() => signOut()}
							small
							bgColor={DARK_RED}
							bright
						/>
					</View>
				</HvCard>
			</View>
			<ChangeLanguage onChange={(lang: string) => setCountryCode(lang)} />
		</>
	);
};

const Styles = StyleSheet.create({
	userContainer: {
		paddingInline: 10,
		gap: 10,
		borderRadius: 10,
	},
	partContainer: {
		padding: 20,
		gap: 20,
		borderRadius: 10,
		backgroundColor: LIGHT_THEME,
	},
	bottomContainer: {
		paddingTop: 10,
		paddingInline: 20,
	},
	leftRightContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	aboutLine: {
		flexDirection: 'row',
		gap: 5,
	},
});

export default MainSettings;
