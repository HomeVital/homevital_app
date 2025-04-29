import { View } from 'react-native';
// components
import HvToggler from '@/components/ui/hvToggler';
import { STYLES } from '@/constants/styles';
import { useSession } from '@/hooks/ctx';
import { useQuery } from '@tanstack/react-query';
import { fetchBloodPressure } from '@/queries/get';
import HvScrollView from '@/components/ui/HvScrollView';
import { DARK_GREEN, LIGHT_BLUE, LIGHT_GREEN } from '@/constants/colors';
import { IBloodPressure } from '@/interfaces/measurements';
import HvGraph from '@/components/graphs/HvGraph';
import { useToggle } from '@/hooks/UseToggle';
import { HvCardMeasurements } from '@/components/cards/hvCardMeasurements';
import { ErrorView, LoadingView } from '@/components/queryStates';
import { useContext } from 'react';
import { getClaimBySubstring } from '@/utility/utility';
import ModalContext from '@/contexts/modalContext';

const BloodPressure = (): JSX.Element => {
	const { session } = useSession();
	const modals = useContext(ModalContext);
	const { toggled, setToggledTrue, setToggledFalse } = useToggle();

	// query
	const { data, isError, isLoading, refetch } = useQuery({
		queryKey: ['bloodpressure'],
		queryFn: async () =>
			fetchBloodPressure(getClaimBySubstring(session?.toString() || '', 'sub')),
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
					<HvCardMeasurements
						items={data as IBloodPressure[]}
						onPress={(itemData: IBloodPressure) => {
							modals.setIsEditOpen(true);
							modals.setEditModalData({
								title: 'Blóðþrýstingur',
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

export default BloodPressure;
