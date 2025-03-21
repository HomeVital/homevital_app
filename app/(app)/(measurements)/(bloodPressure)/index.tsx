import { View } from 'react-native';
// components
import HvToggler from '@/components/ui/hvToggler';
import { STYLES } from '@/constants/styles';
import { useSession } from '@/hooks/ctx';
import { useQuery } from '@tanstack/react-query';
import { fetchBloodPressure } from '@/queries/queries';
import HvScrollView from '@/components/ui/HvScrollView';
import { DARK_GREEN, LIGHT_BLUE, LIGHT_GREEN } from '@/constants/colors';
import { IBloodPressure } from '@/interfaces/measurements';
import HvGraph from '@/components/graphs/HvGraph';
import { useToggle } from '@/hooks/UseToggle';
import { HvCardMeasurements } from '@/components/cards/hvCardMeasurements';
import { ErrorView, LoadingView } from '@/components/queryStates';

const BloodPressure = (): JSX.Element => {
	const { session } = useSession();
	const { toggled, setToggledTrue, setToggledFalse } = useToggle();

	const { data, isError, isLoading, refetch } = useQuery({
		queryKey: ['bloodpressure'],
		queryFn: async () => fetchBloodPressure(session?.toString() || ''),
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
					data={data as IBloodPressure[]}
					dataTypes={{
						systolic: { name: 'SYS', color: LIGHT_GREEN },
						diastolic: { name: 'DIA', color: DARK_GREEN },
						pulse: { name: 'Púls', color: LIGHT_BLUE },
					}}
				/>
			) : (
				<HvScrollView onRefresh={() => refetch()} isRefreshing={isLoading}>
					<HvCardMeasurements items={data as IBloodPressure[]} />
				</HvScrollView>
			)}
		</View>
	);
};

export default BloodPressure;
