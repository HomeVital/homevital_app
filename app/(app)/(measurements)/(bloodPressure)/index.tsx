import { View } from 'react-native';
// components
import HvToggler from '@/components/ui/hvToggler';
import { STYLES } from '@/constants/styles';
import { useSession } from '@/hooks/ctx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchBloodPressure } from '@/queries/get';
import HvScrollView from '@/components/ui/HvScrollView';
import { DARK_GREEN, LIGHT_BLUE, LIGHT_GREEN } from '@/constants/colors';
import { IBloodPressure } from '@/interfaces/measurements';
import HvGraph from '@/components/graphs/HvGraph';
import { useToggle } from '@/hooks/UseToggle';
import { HvCardMeasurements } from '@/components/cards/hvCardMeasurements';
import { ErrorView, LoadingView } from '@/components/queryStates';
import { useState } from 'react';
import HvModalEdit from '@/components/modals/hvModalEdit';
import EditBloodPressure from '@/components/modals/EditBloodPressure';
import { getClaimBySubstring } from '@/utility/utility';
import { deleteBloodPressure } from '@/queries/delete';

const BloodPressure = (): JSX.Element => {
	const { session } = useSession();
	const queryClient = useQueryClient();
	const { toggled, setToggledTrue, setToggledFalse } = useToggle();
	// details modal
	const [modalVisible, setModalVisible] = useState(false);
	const [modalData, setModalData] = useState<IBloodPressure | null>(null);
	// edit modal
	const [editModalVisible, setEditModalVisible] = useState(false);

	// query
	const { data, isError, isLoading, refetch } = useQuery({
		queryKey: ['bloodpressure'],
		queryFn: async () =>
			fetchBloodPressure(getClaimBySubstring(session?.toString() || '', 'sub')),
	});

	const { mutateAsync: deleteMutation } = useMutation({
		mutationFn: async (itemId: string) => deleteBloodPressure(itemId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['bloodpressure'] });
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
			console.error('Error deleting blood pressure:', error);
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
							setModalData(itemData);
							setModalVisible(true);
						}}
						editable
					/>
					{/* Modal for details */}
					{modalData && (
						<HvModalEdit
							title='Blóðþrýstingur'
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
							item={modalData as IBloodPressure}
						/>
					)}
					{/* Modal for editing */}
					{modalData && (
						<EditBloodPressure
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

export default BloodPressure;
