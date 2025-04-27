import { View } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { useState } from 'react';
import EditBodyWeight from '@/components/modals/EditBodyWeight';
import HvModalEdit from '@/components/modals/hvModalEdit';
import { getClaimBySubstring } from '@/utility/utility';
import { deleteBodyWeight } from '@/queries/delete';

const Weight = (): JSX.Element => {
	const { session } = useSession();
	const queryClient = useQueryClient();
	const { toggled, setToggledTrue, setToggledFalse } = useToggle();
	// details modal
	const [modalVisible, setModalVisible] = useState(false);
	const [modalData, setModalData] = useState<IBodyWeight | null>(null);
	// edit modal
	const [editModalVisible, setEditModalVisible] = useState(false);

	// query
	const { data, isError, isLoading, refetch } = useQuery({
		queryKey: ['bodyweight'],
		queryFn: async () => fetchBodyWeight(getClaimBySubstring(session?.toString() || '', 'sub')),
	});

	const { mutateAsync: deleteMutation } = useMutation({
		mutationFn: async (itemId: string) => deleteBodyWeight(itemId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['bodyweight'] });
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
			console.error('Error deleting body weight:', error);
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
							setModalData(itemData);
							setModalVisible(true);
						}}
						editable
					/>
					{/* Modal for details */}
					{modalData && (
						<HvModalEdit
							title='Þyngd'
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
							item={modalData as IBodyWeight}
						/>
					)}
					{/* Modal for editing */}
					{modalData && (
						<EditBodyWeight
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

export default Weight;
