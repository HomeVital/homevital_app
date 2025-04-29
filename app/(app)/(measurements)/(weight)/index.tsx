import { View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
// components
import HvToggler from '@/components/ui/hvToggler';
import { useSession } from '@/hooks/ctx';
import { fetchBodyWeight } from '@/queries/get';
import HvScrollView from '@/components/ui/HvScrollView';
import { useToggle } from '@/hooks/UseToggle';
import { HvCardMeasurements } from '@/components/cards/hvCardMeasurements';
import { IBodyWeight } from '@/interfaces/measurements';
import { STYLES } from '@/constants/styles';
import { DARK_GREEN } from '@/constants/colors';
import HvGraph from '@/components/graphs/HvGraph';
import { ErrorView, LoadingView } from '@/components/queryStates';
import { useContext } from 'react';
import { getClaimBySubstring } from '@/utility/utility';
import ModalContext from '@/contexts/modalContext';

const Weight = (): JSX.Element => {
	const { session } = useSession();
	const modals = useContext(ModalContext);
	const { toggled, setToggledTrue, setToggledFalse } = useToggle();
	// query
	const { data, isError, isLoading, refetch } = useQuery({
		queryKey: ['bodyweight'],
		queryFn: async () => fetchBodyWeight(getClaimBySubstring(session?.toString() || '', 'sub')),
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
					data={data as IBodyWeight[]}
					dataTypes={{
						weight: { name: 'Kg', color: DARK_GREEN },
					}}
				/>
			) : (
				<HvScrollView onRefresh={() => refetch()} isRefreshing={isLoading}>
					<HvCardMeasurements
						items={data as IBodyWeight[]}
						onPress={(itemData: IBodyWeight) => {
							modals.setIsEditOpen(true);
							modals.setEditModalData({
								title: 'Líkamsþyngd',
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

export default Weight;
