import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
// components
import HvToggler from '@/components/ui/hvToggler';
import { STYLES } from '@/constants/styles';
import { useSession } from '@/hooks/ctx';
import { useQuery } from '@tanstack/react-query';
import { fetchBloodSugar } from '@/queries/queries';
import HvScrollView from '@/components/ui/HvScrollView';
import { PADDING, TAB_ICON_SIZE } from '@/constants/sizes';
import { useToggle } from '@/hooks/UseToggle';
import { HvCardMeasurement, HvCardMeasurements } from '@/components/cards/hvCardMeasurement';
import { IBloodSugar } from '@/interfaces/bloodSugarInterfaces';
import { DARK_GREEN } from '@/constants/colors';
import HvGraph from '@/components/graphs/HvGraph';
import { ErrorView, LoadingView } from '@/components/queryStates';

const BloodSugar = (): JSX.Element => {
	const { session } = useSession();
	const { toggled, setToggledTrue, setToggledFalse } = useToggle();

	const { data, isError, isLoading, refetch } = useQuery({
		queryKey: ['bloodsugar'],
		queryFn: async () => fetchBloodSugar(session?.toString() || ''),
	});

	if (isError) return <ErrorView />;

	if (isLoading) return <LoadingView />;

	const GraphView = () => {
		const [item, setItem] = useState(undefined as IBloodSugar | undefined);
		const dataTypes = {
			bloodsugarLevel: { name: 'mmol/L', color: DARK_GREEN },
		};
		return (
			<View style={Styles.container}>
				<HvGraph
					data={
						data?.toReversed().map((item) => ({
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
			{toggled ? (
				<GraphView />
			) : (
				<HvScrollView onRefresh={() => refetch()} isRefreshing={isLoading}>
					<HvCardMeasurements items={data as IBloodSugar[]} />
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

export default BloodSugar;
