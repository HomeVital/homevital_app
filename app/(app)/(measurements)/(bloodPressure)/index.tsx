import { ActivityIndicator, StyleSheet, View } from 'react-native';
// components
import HvToggler from '@/components/ui/hvToggler';
import { STYLES } from '@/constants/styles';
import HvText from '@/components/ui/hvText';
import { useSession } from '@/hooks/ctx';
import { useQuery } from '@tanstack/react-query';
import { fetchBloodPressure } from '@/queries/queries';
import HvScrollView from '@/components/ui/HvScrollView';
import { useState } from 'react';
import { PADDING } from '@/constants/sizes';
import { TAB_ICON_SIZE } from '@/constants/sizes';
import { DARK_GREEN, LIGHT_BLUE, LIGHT_GREEN } from '@/constants/colors';
import React from 'react';
import { IBloodPressure } from '@/interfaces/bloodPressureInterfaces';
import HvGraph from '@/components/graphs/HvGraph';
import { useToggle } from '@/hooks/UseToggle';
import HvCardMeasurement from '@/components/cards/hvCardMeasurement';

const BloodPressure = (): JSX.Element => {
	const { session } = useSession();
	const { toggled, setToggledTrue, setToggledFalse } = useToggle();

	const { data, isError, isLoading } = useQuery({
		queryKey: ['bloodpressure'],
		queryFn: async () => fetchBloodPressure(session?.toString() || ''),
	});

	if (isError) {
		return (
			<View style={STYLES.loadingView}>
				<HvText>Error loading</HvText>
			</View>
		);
	}

	if (isLoading) {
		return (
			<View style={STYLES.loadingView}>
				<ActivityIndicator size='large' color='#3A7283' />
			</View>
		);
	}

	const ScrollView = () => {
		return (
			<View style={Styles.container}>
				{data?.map((item) => <HvCardMeasurement key={item.id} item={item} />)}
			</View>
		);
	};

	const GraphView = () => {
		const [item, setItem] = useState(undefined as IBloodPressure | undefined);
		const dataTypes = {
			systolic: { name: 'SYS', color: LIGHT_GREEN },
			diastolic: { name: 'DIA', color: DARK_GREEN },
			pulse: { name: 'Púls', color: LIGHT_BLUE },
		};

		return (
			<View style={Styles.container}>
				<HvGraph data={data as IBloodPressure[]} dataTypes={dataTypes} setItem={setItem} />
				{item !== undefined && <HvCardMeasurement item={item} />}
			</View>
		);
	};

	return (
		<View style={STYLES.defaultNoPadView}>
			<HvToggler
				toggler={toggled}
				setToggledTrue={setToggledTrue}
				setToggledFalse={setToggledFalse}
				textLeft='Graf'
				textRight='Mælingar'
				margin={20}
			/>
			<HvScrollView>{toggled ? <GraphView /> : <ScrollView />}</HvScrollView>
		</View>
	);
};

const Styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingVertical: PADDING,
		marginBottom: TAB_ICON_SIZE + PADDING,
		gap: 12,
	},
	left: {
		height: '100%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	indicator: {
		width: 26,
		height: 26,
	},
	right: {
		flexDirection: 'row',
	},
	icon: {
		width: 34,
		height: 34,
	},
});

export default BloodPressure;
