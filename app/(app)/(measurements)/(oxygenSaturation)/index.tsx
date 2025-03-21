import { View } from 'react-native';
// components
import HvToggler from '@/components/ui/hvToggler';
import { STYLES } from '@/constants/styles';
import { useSession } from '@/hooks/ctx';
import { useQuery } from '@tanstack/react-query';
import { fetchOxygenSaturation } from '@/queries/queries';
import HvScrollView from '@/components/ui/HvScrollView';
import { DARK_GREEN } from '@/constants/colors';
import { IOxygenSaturation } from '@/interfaces/measurements';
import { useToggle } from '@/hooks/UseToggle';
import HvGraph from '@/components/graphs/HvGraph';
import { HvCardMeasurements } from '@/components/cards/hvCardMeasurements';
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
				<HvGraph
					data={data as IOxygenSaturation[]}
					dataTypes={{ oxygenSaturationValue: { name: '%', color: DARK_GREEN } }}
				/>
			) : (
				<HvScrollView onRefresh={() => refetch()} isRefreshing={isLoading}>
					<HvCardMeasurements items={data as IOxygenSaturation[]} />
				</HvScrollView>
			)}
		</View>
	);
};

export default BloodPressure;
