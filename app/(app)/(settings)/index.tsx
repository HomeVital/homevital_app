import React, { useState } from 'react';
import { View, StyleSheet, Switch } from 'react-native';
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
			<HvCard padding={20} gap={12}>
				<View style={Styles.partContainer}>
					<HvText size='xl' weight='semibold' center>
						{patient.name}
					</HvText>
					<View style={Styles.aboutLine}>
						<HvText style={{ width: '33%' }}>Heimili</HvText>
						<HvText size='l' weight='semibold'>
							{patient.address}
						</HvText>
					</View>
					<View style={Styles.aboutLine}>
						<HvText style={{ width: '33%' }}>Sími</HvText>
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
	partContainer: {
		marginTop: 10,
		padding: 20,
		gap: 20,
		borderRadius: 10,
		backgroundColor: LIGHT_THEME,
		maxWidth: 800,
	},
	leftRightContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	aboutLine: {
		flexDirection: 'row',
	},
});

export default MainSettings;
