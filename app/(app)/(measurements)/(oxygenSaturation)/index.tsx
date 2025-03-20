import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
// components
import HvToggler from '@/components/ui/hvToggler';
import { STYLES } from '@/constants/styles';
import { useSession } from '@/hooks/ctx';
import { useQuery } from '@tanstack/react-query';
import { fetchOxygenSaturation } from '@/queries/queries';
import HvScrollView from '@/components/ui/HvScrollView';
import { PADDING } from '@/constants/sizes';
import { TAB_ICON_SIZE } from '@/constants/sizes';
import { DARK_GREEN } from '@/constants/colors';
import { IOxygenSaturation } from '@/interfaces/oxygenSaturationInterfaces';
import { useToggle } from '@/hooks/UseToggle';
import HvGraph from '@/components/graphs/HvGraph';
import { HvCardMeasurement, HvCardMeasurements } from '@/components/cards/hvCardMeasurement';
import { ErrorView, LoadingView } from '@/components/queryStates';

const BloodPressure = (): JSX.Element => {
	const { session } = useSession();
	const { toggled, setToggledTrue, setToggledFalse } = useToggle();

	const { data, isError, isLoading, refetch } = useQuery({
		queryKey: ['oxygensaturation'],
		queryFn: async () => fetchOxygenSaturation(session?.toString() || ''),
	});

	if (isError) return <ErrorView />;

	if (isLoading) return <LoadingView />;

	const GraphView = () => {
		const [item, setItem] = useState(undefined as IOxygenSaturation | undefined);
		const dataTypes = {
			oxygenSaturationValue: { name: '%', color: DARK_GREEN },
		};
		return (
			<View style={Styles.container}>
				<HvGraph
					data={data?.toReversed() as IOxygenSaturation[]}
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
			{toggled ? (
				<GraphView />
			) : (
				<HvScrollView onRefresh={() => refetch()} isRefreshing={isLoading}>
					<HvCardMeasurements items={data as IOxygenSaturation[]} />
				</HvScrollView>
			)}
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
});

export default BloodPressure;
