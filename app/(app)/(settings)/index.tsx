import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Switch } from 'react-native-paper';
// components
import HvDivider from '@/components/ui/hvDivider';
import HvText from '@/components/ui/hvText';
// constants
import { BRIGHT_GREEN } from '@/constants/colors';
import { STYLES } from '@/constants/styles';
import { useSession } from '@/hooks/ctx';
import { useQuery } from '@tanstack/react-query';
import { fetchPatient } from '@/queries/queries';
import { IPatient } from '@/interfaces/patientInterfaces';
import { ErrorView, LoadingView } from '@/components/queryStates';

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
			<HvDivider />
			<HvText>{patient.name}</HvText>
			<HvText>Heimili: {patient.address}</HvText>
			<HvText>Sími: {patient.phone}</HvText>
			<HvDivider />
			{/* <Link href="/(app)/(measurements)/eitthvað"> */}
			<HvText>Tengiliðir</HvText>
			{/* </Link> */}
			<HvDivider />
			{/* <Link href="/(app)/(measurements)/eitthvað"> */}
			<HvText>Tæki</HvText>
			{/* </Link> */}
			<HvDivider />
			<View style={Styles.leftRightContainer}>
				<HvText>Tungumál</HvText>
				{/* tungumál takki með mynd */}
			</View>
			<View style={Styles.leftRightContainer}>
				<HvText>Áminningar</HvText>
				<Switch value={isSwitchOn} onValueChange={onToggleSwitch} color={BRIGHT_GREEN} />
			</View>
		</View>
	);
};

const Styles = StyleSheet.create({
	leftRightContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

export default MainSettings;
