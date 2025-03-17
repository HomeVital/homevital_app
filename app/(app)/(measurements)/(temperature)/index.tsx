import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
// components
import HvToggler from '@/components/ui/hvToggler';
import HvText from '@/components/ui/hvText';
import { useSession } from '@/hooks/ctx';
import HvScrollView from '@/components/ui/HvScrollView';
// constants
import { STYLES } from '@/constants/styles';
import { fetchBodyTemperature } from '@/queries/queries';
import { PADDING } from '@/constants/sizes';
import { TAB_ICON_SIZE } from '@/constants/sizes';
// hooks
import { useToggle } from '@/hooks/UseToggle';
import HvCardMeasurement from '@/components/cards/hvCardMeasurement';
import { DARK_GREEN } from '@/constants/colors';
import HvGraph from '@/components/graphs/HvGraph';
import { IBodyTemperature } from '@/interfaces/bodyTemperatureInterfaces';
import { useState } from 'react';

const Temperature = (): JSX.Element => {
	const { session } = useSession();
	const { toggled, setToggledTrue, setToggledFalse } = useToggle();

	const { data, isError, isLoading } = useQuery({
		queryKey: ['bodytemperature'],
		queryFn: async () => fetchBodyTemperature(session?.toString() || ''),
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
		const [item, setItem] = useState(undefined as IBodyTemperature | undefined);
		const dataTypes = {
			temperature: { name: '°C', color: DARK_GREEN },
		};

		return (
			<View style={Styles.container}>
				<HvGraph
					data={
						data?.map((item) => ({
							...item,
							value: Math.round(item.temperature * 10) / 10,
						})) as IBodyTemperature[]
					}
					dataTypes={dataTypes}
					setItem={setItem}
				/>
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
});

export default Temperature;
