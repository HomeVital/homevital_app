import { View } from 'react-native';
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
import { getClaimBySubstring, showToastWarning } from '@/utility/utility';
import ModalContext from '@/contexts/modalContext';
import { useTranslation } from 'react-i18next';

const BloodPressure = (): JSX.Element => {
	const { t } = useTranslation();
	const { token, signOut } = useSession();
	const modals = useContext(ModalContext);
	const { toggled, setToggledTrue, setToggledFalse } = useToggle();

	// query
	const { data, isError, error, isLoading, refetch } = useQuery({
		queryKey: ['bloodpressure'],
		queryFn: async () => fetchBloodPressure(getClaimBySubstring(token, 'sub'), token),
	});

	if (isError) {
		if (error.message === 'Token expired') {
			signOut();
			return <></>;
		}
		return <ErrorView />;
	}

	if (isLoading) return <LoadingView />;

	return (
		<View style={STYLES.defaultNoPadView}>
			<HvToggler
				toggler={toggled}
				setToggledTrue={setToggledTrue}
				setToggledFalse={setToggledFalse}
				textLeft={t('measurements.page.graph')}
				textRight={t('measurements.page.measurements')}
				margin={20}
			/>
			{toggled ? (
				<HvGraph
					data={data as IBloodPressure[]}
					dataTypes={{
						systolic: { name: 'SYS', color: LIGHT_GREEN },
						diastolic: { name: 'DIA', color: DARK_GREEN },
						pulse: { name: t('measurements.bpm'), color: LIGHT_BLUE },
					}}
				/>
			) : (
				<HvScrollView onRefresh={() => refetch()} isRefreshing={isLoading}>
					<HvCardMeasurements
						items={data as IBloodPressure[]}
						onPress={(itemData: IBloodPressure) => {
							if (
								new Date().getTime() - new Date(itemData.date).getTime() <
								24 * 60 * 60 * 1000
							) {
								modals.setIsOpen(true);
								modals.setIsEditOpen(true);
								modals.setEditModalData({
									title: t('measurements.bloodPressure'),
									item: itemData,
								});
							} else {
								showToastWarning(
									t('toast.warning.header'),
									t('toast.warning.text'),
								);
							}
						}}
						editable
					/>
				</HvScrollView>
			)}
		</View>
	);
};

export default BloodPressure;
