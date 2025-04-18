import React, { useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import CountryFlag from 'react-native-country-flag';
// components
// import HvDivider from '@/components/ui/hvDivider';
import HvText from '@/components/ui/hvText';
// constants
import { DARK_GREEN, GREEN, LIGHT_THEME } from '@/constants/colors';
import { STYLES } from '@/constants/styles';
import { useSession } from '@/hooks/ctx';
import { useQuery } from '@tanstack/react-query';
import { fetchPatient } from '@/queries/get';
import { IPatient } from '@/interfaces/patient';
import { ErrorView, LoadingView } from '@/components/queryStates';
import HvCard from '@/components/cards/hvCard';
import HvButton from '@/components/ui/hvButton';

const MainSettings = (): JSX.Element => {
	const { session } = useSession();
	const [countryCode] = useState('is'); // TODO: change so that I don't have to use states
	const [isSwitchOn, setIsSwitchOn] = useState(false); // TODO: change so that I don't have to use states

	const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

	const {
		data: patient,
		isError,
		isLoading,
	} = useQuery<IPatient>({
		queryKey: ['patient'],
		queryFn: async () => fetchPatient(session?.toString() || ''),
	});

	if (isError) return <ErrorView />;

	if (isLoading) return <LoadingView />;

	if (!patient) return <></>;

	return (
		<View style={STYLES.defaultView}>
			{/* <HvDivider /> */}
			<HvCard padding={20} gap={20}>
				<View style={Styles.userContainer}>
					<HvText size='xl' weight='semibold'>
						{patient.name}
					</HvText>
					<View style={Styles.aboutLine}>
						<HvText style={{ width: '25%' }}>Heimili</HvText>
						<HvText size='l' weight='semibold'>
							{patient.address}
						</HvText>
					</View>
					<View style={Styles.aboutLine}>
						<HvText style={{ width: '25%' }}>Sími</HvText>
						<HvText size='l' weight='semibold'>
							{patient.phone}
						</HvText>
					</View>
				</View>
				<View style={Styles.partContainer}>
					<HvButton text='Tengiliðir' onPress={() => {}} small bright />
					<HvButton text='Tæki' onPress={() => {}} small bright />
					<View style={Styles.leftRightContainer}>
						<HvText>Tungumál</HvText>
						{/* tungumál takki með mynd */}
						<CountryFlag isoCode={countryCode} size={25} style={{ borderRadius: 4 }} />
					</View>
					<View style={Styles.leftRightContainer}>
						<HvText>Áminningar</HvText>
						{/* <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color={BRIGHT_GREEN} /> */}
						<Switch
							value={isSwitchOn}
							onValueChange={onToggleSwitch}
							trackColor={{ false: '#767577', true: GREEN }}
							thumbColor={isSwitchOn ? DARK_GREEN : '#f4f3f4'}
							ios_backgroundColor='#3e3e3e'
						/>
					</View>
				</View>
				{/* <View style={Styles.partContainer}>
				</View> */}
			</HvCard>
			{/* <HvDivider /> */}
			{/* <Link href="/(app)/(measurements)/eitthvað"> */}
			{/* <HvText>Tengiliðir</HvText> */}
			{/* </Link> */}
			{/* <HvDivider /> */}
			{/* <Link href="/(app)/(measurements)/eitthvað"> */}
			{/* <HvText>Tæki</HvText> */}
			{/* </Link> */}
			{/* <HvDivider /> */}
		</View>
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
	leftRightContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	aboutLine: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});

export default MainSettings;
