import { ActivityIndicator, StyleSheet, View } from 'react-native';
// components
import HvToggler from '@/components/ui/hvToggler';
import { STYLES } from '@/constants/styles';
import HvText from '@/components/ui/hvText';
import { useSession } from '@/hooks/ctx';
import { useQuery } from '@tanstack/react-query';
import { fetchBloodSugar } from '@/queries/queries';
import HvScrollView from '@/components/ui/HvScrollView';
import { PADDING, TAB_ICON_SIZE } from '@/constants/sizes';
import { useToggle } from '@/hooks/UseToggle';
import HvCardMeasurement from '@/components/cards/hvCardMeasurement';
import { useState } from 'react';
import { IBloodSugar } from '@/interfaces/bloodSugarInterfaces';
import { DARK_GREEN } from '@/constants/colors';
import HvGraph from '@/components/graphs/HvGraph';

const BloodSugar = (): JSX.Element => {
	const { session } = useSession();
	const { toggled, setToggledTrue, setToggledFalse } = useToggle();

	const { data, isError, isLoading } = useQuery({
		queryKey: ['bloodsugar'],
		queryFn: async () => fetchBloodSugar(session?.toString() || ''),
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
		const [item, setItem] = useState(undefined as IBloodSugar | undefined);
		const dataTypes = {
			bloodsugarLevel: { name: 'mmol/L', color: DARK_GREEN },
		};

		return (
			<View style={Styles.container}>
				<HvGraph
					data={
						data?.map((item) => ({
							...item,
							value: Math.round(item.bloodsugarLevel * 10) / 10,
						})) as IBloodSugar[]
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

export default BloodSugar;
