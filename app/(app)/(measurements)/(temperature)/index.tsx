import { View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
// components
import HvToggler from '@/components/ui/hvToggler';
import { useSession } from '@/hooks/ctx';
import HvScrollView from '@/components/ui/HvScrollView';
// constants
import { STYLES } from '@/constants/styles';
import { fetchBodyTemperature } from '@/queries/get';
// hooks
import { useToggle } from '@/hooks/UseToggle';
import { HvCardMeasurements } from '@/components/cards/hvCardMeasurements';
import { DARK_GREEN } from '@/constants/colors';
import HvGraph from '@/components/graphs/HvGraph';
import { IBodyTemperature } from '@/interfaces/measurements';
import { ErrorView, LoadingView } from '@/components/queryStates';
import { useContext } from 'react';
import { getClaimBySubstring } from '@/utility/utility';
import ModalContext from '@/contexts/modalContext';

const Temperature = (): JSX.Element => {
	const { session } = useSession();
	const modals = useContext(ModalContext);
	const { toggled, setToggledTrue, setToggledFalse } = useToggle();
	// query
	const { data, isError, isLoading, refetch } = useQuery({
		queryKey: ['bodytemperature'],
		queryFn: async () =>
			fetchBodyTemperature(getClaimBySubstring(session?.toString() || '', 'sub')),
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
					data={data as IBodyTemperature[]}
					dataTypes={{
						temperature: { name: '°C', color: DARK_GREEN },
					}}
				/>
			) : (
				<HvScrollView onRefresh={() => refetch()} isRefreshing={isLoading}>
					<HvCardMeasurements
						items={data as IBodyTemperature[]}
						onPress={(itemData: IBodyTemperature) => {
							modals.setIsEditOpen(true);
							modals.setEditModalData({
								title: 'Líkamshiti',
								item: itemData,
							});
						}}
						editable
					/>
				</HvScrollView>
			)}
		</View>
	);
};

export default Temperature;
