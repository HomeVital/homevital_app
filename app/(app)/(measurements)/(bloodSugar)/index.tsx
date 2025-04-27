import { View } from 'react-native';
// components
import HvToggler from '@/components/ui/hvToggler';
import { STYLES } from '@/constants/styles';
import { useSession } from '@/hooks/ctx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchBloodSugar } from '@/queries/get';
import HvScrollView from '@/components/ui/HvScrollView';
import { useToggle } from '@/hooks/UseToggle';
import { HvCardMeasurements } from '@/components/cards/hvCardMeasurements';
import { IBloodSugar } from '@/interfaces/measurements';
import { DARK_GREEN } from '@/constants/colors';
import HvGraph from '@/components/graphs/HvGraph';
import { ErrorView, LoadingView } from '@/components/queryStates';
import { useState } from 'react';
import HvModalEdit from '@/components/modals/hvModalEdit';
import EditBloodSugar from '@/components/modals/EditBloodSugar';
import { getClaimBySubstring } from '@/utility/utility';
import { deleteBloodSugar } from '@/queries/delete';

const BloodSugar = (): JSX.Element => {
	const { session } = useSession();
	const queryClient = useQueryClient();
	const { toggled, setToggledTrue, setToggledFalse } = useToggle();
	// details modal
	const [modalVisible, setModalVisible] = useState(false);
	const [modalData, setModalData] = useState<IBloodSugar | null>(null);
	// edit modal
	const [editModalVisible, setEditModalVisible] = useState(false);

	// query
	const { data, isError, isLoading, refetch } = useQuery({
		queryKey: ['bloodsugar'],
		queryFn: async () => fetchBloodSugar(getClaimBySubstring(session?.toString() || '', 'sub')),
	});

	const { mutateAsync: deleteMutation } = useMutation({
		mutationFn: async (itemId: string) => deleteBloodSugar(itemId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['bloodsugar'] });
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
			console.error('Error deleting blood sugar:', error);
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
					data={data as IBloodSugar[]}
					dataTypes={{ bloodsugarLevel: { name: 'mmol/L', color: DARK_GREEN } }}
				/>
			) : (
				<HvScrollView onRefresh={() => refetch()} isRefreshing={isLoading}>
					<HvCardMeasurements
						items={data as IBloodSugar[]}
						onPress={(itemData: IBloodSugar) => {
							setModalData(itemData);
							setModalVisible(true);
						}}
						editable
					/>
					{/* Modal for details */}
					{modalData && (
						<HvModalEdit
							title='Blóðsykur'
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
							item={modalData as IBloodSugar}
						/>
					)}
					{/* Modal for editing */}
					{modalData && (
						<EditBloodSugar
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

export default BloodSugar;
