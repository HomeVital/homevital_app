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
import { useState } from 'react';
import HvModalEdit from '@/components/modals/hvModalEdit';
import EditTemperature from '@/components/modals/EditTemperature';

const Temperature = (): JSX.Element => {
	const { session } = useSession();
	const { toggled, setToggledTrue, setToggledFalse } = useToggle();
	// details modal
	const [modalVisible, setModalVisible] = useState(false);
	const [modalData, setModalData] = useState<IBodyTemperature | null>(null);
	// edit modal
	const [editModalVisible, setEditModalVisible] = useState(false);

	const { data, isError, isLoading, refetch } = useQuery({
		queryKey: ['bodytemperature'],
		queryFn: async () => fetchBodyTemperature(session?.toString() || ''),
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
							setModalData(itemData);
							setModalVisible(true);
						}}
					/>
					{/* Modal for details */}
					{modalData && (
						<HvModalEdit
							title='Líkamshiti'
							visible={modalVisible}
							visibleDetails={!editModalVisible}
							onEdit={() => {
								setEditModalVisible(true);
							}}
							onClose={() => {
								setModalVisible(false);
								setModalData(null);
							}}
							item={modalData as IBodyTemperature}
						/>
					)}
					{/* Modal for editing */}
					{modalData && (
						<EditTemperature
							visible={editModalVisible}
							onClose={() => {
								setEditModalVisible(false);
							}}
							onSubmit={() => {
								setEditModalVisible(false);
								setModalVisible(false);
								setModalData(null);
							}}
							itemId={modalData.id.toString()}
							item={modalData}
						/>
					)}
				</HvScrollView>
			)}
		</View>
	);
};

export default Temperature;
