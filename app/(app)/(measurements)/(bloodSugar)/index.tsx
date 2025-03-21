import { View } from 'react-native';
// components
import HvToggler from '@/components/ui/hvToggler';
import { STYLES } from '@/constants/styles';
import { useSession } from '@/hooks/ctx';
import { useQuery } from '@tanstack/react-query';
import { fetchBloodSugar } from '@/queries/queries';
import HvScrollView from '@/components/ui/HvScrollView';
import { useToggle } from '@/hooks/UseToggle';
import { HvCardMeasurements } from '@/components/cards/hvCardMeasurements';
import { IBloodSugar } from '@/interfaces/measurements';
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
					data={data as IBloodSugar[]}
					dataTypes={{ bloodsugarLevel: { name: 'mmol/L', color: DARK_GREEN } }}
				/>
			) : (
				<HvScrollView onRefresh={() => refetch()} isRefreshing={isLoading}>
					<HvCardMeasurements items={data as IBloodSugar[]} />
				</HvScrollView>
			)}
		</View>
	);
};

export default BloodSugar;
