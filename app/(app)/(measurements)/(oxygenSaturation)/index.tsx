import { View } from 'react-native';
// components
import HvToggler from '@/components/ui/hvToggler';
import { STYLES } from '@/constants/styles';
import { useSession } from '@/hooks/ctx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { getClaimBySubstring } from '@/utility/utility';
import { deleteOxygenSaturation } from '@/queries/delete';

const OxygenSaturation = (): JSX.Element => {
	const { session } = useSession();
	const queryClient = useQueryClient();
	const { toggled, setToggledTrue, setToggledFalse } = useToggle();
	// details modal
	const [modalVisible, setModalVisible] = useState(false);
	const [modalData, setModalData] = useState<IOxygenSaturation | null>(null);
	// edit modal
	const [editModalVisible, setEditModalVisible] = useState(false);

	// query
	const { data, isError, isLoading, refetch } = useQuery({
		queryKey: ['oxygensaturation'],
		queryFn: async () =>
			fetchOxygenSaturation(getClaimBySubstring(session?.toString() || '', 'sub')),
	});

	const { mutateAsync: deleteMutation } = useMutation({
		mutationFn: async (itemId: string) => deleteOxygenSaturation(itemId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['oxygensaturation'] });
			queryClient.invalidateQueries({ queryKey: ['recentmeasurements'] });
			// status popup
			setModalVisible(false);
			setModalData(null);
		},
	});

	const handleMutation = async (itemId: string): Promise<void> => {
		try {
			await deleteMutation(itemId);
		} catch (error) {
			console.error('Error deleting oxygen saturation:', error);
		}
	};

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
						editable
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
							onDelete={() => {
								handleMutation(modalData.id.toString());
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
