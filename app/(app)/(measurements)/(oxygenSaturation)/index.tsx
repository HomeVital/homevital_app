import { View } from 'react-native';
// components
import HvToggler from '@/components/ui/hvToggler';
import { STYLES } from '@/constants/styles';
import { useSession } from '@/hooks/ctx';
import { useQuery } from '@tanstack/react-query';
import { fetchOxygenSaturation } from '@/queries/get';
import HvScrollView from '@/components/ui/HvScrollView';
import { DARK_GREEN } from '@/constants/colors';
import { IOxygenSaturation } from '@/interfaces/measurements';
import { useToggle } from '@/hooks/UseToggle';
import HvGraph from '@/components/graphs/HvGraph';
import { HvCardMeasurements } from '@/components/cards/hvCardMeasurements';
import { ErrorView, LoadingView } from '@/components/queryStates';
import HvModalEdit from '@/components/modals/hvModalEdit';
import { useState } from 'react';
import EditBloodOxygen from '@/components/modals/EditBloodOxygen';

const OxygenSaturation = (): JSX.Element => {
	const { session } = useSession();
	const { toggled, setToggledTrue, setToggledFalse } = useToggle();
	// details modal
	const [modalVisible, setModalVisible] = useState(false);
	const [modalData, setModalData] = useState<IOxygenSaturation | null>(null);
	// edit modal
	const [editModalVisible, setEditModalVisible] = useState(false);

	// query
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
					<HvCardMeasurements
						items={data as IOxygenSaturation[]}
						onPress={(itemData: IOxygenSaturation) => {
							setModalData(itemData);
							setModalVisible(true);
						}}
					/>
					{/* Modal for details */}
					{modalData && (
						<HvModalEdit
							title='Súrefnismettun'
							visible={modalVisible}
							visibleDetails={!editModalVisible}
							onEdit={() => {
								setEditModalVisible(true);
							}}
							onClose={() => {
								setModalVisible(false);
								setModalData(null);
							}}
							item={modalData as IOxygenSaturation}
						/>
					)}
					{/* Modal for editing */}
					{modalData && (
						<EditBloodOxygen
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

export default OxygenSaturation;
