import { View } from 'react-native';
import HvToggler from '@/components/ui/hvToggler';
import { STYLES } from '@/constants/styles';
import { useSession } from '@/hooks/ctx';
import { useQuery } from '@tanstack/react-query';
import { fetchBloodSugar } from '@/queries/get';
import HvScrollView from '@/components/ui/HvScrollView';
import { useToggle } from '@/hooks/UseToggle';
import { HvCardMeasurements } from '@/components/cards/hvCardMeasurements';
import { IBloodSugar } from '@/interfaces/measurements';
import { DARK_GREEN } from '@/constants/colors';
import HvGraph from '@/components/graphs/HvGraph';
import { ErrorView, LoadingView } from '@/components/queryStates';
import { useContext } from 'react';
import { getClaimBySubstring, showToastWarning } from '@/utility/utility';
import ModalContext from '@/contexts/modalContext';
import { useTranslation } from 'react-i18next';

const BloodSugar = (): JSX.Element => {
	const { t } = useTranslation();
	const { token, signOut } = useSession();
	const modals = useContext(ModalContext);
	const { toggled, setToggledTrue, setToggledFalse } = useToggle();
	// query
	const { data, isError, error, isLoading, refetch } = useQuery({
		queryKey: ['bloodsugar'],
		queryFn: async () => fetchBloodSugar(getClaimBySubstring(token, 'sub'), token),
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
					data={data as IBloodSugar[]}
					dataTypes={{ bloodsugarLevel: { name: 'mmol/L', color: DARK_GREEN } }}
				/>
			) : (
				<HvScrollView onRefresh={() => refetch()} isRefreshing={isLoading}>
					<HvCardMeasurements
						items={data as IBloodSugar[]}
						onPress={(itemData: IBloodSugar) => {
							if (
								new Date().getTime() - new Date(itemData.date).getTime() <
								24 * 60 * 60 * 1000
							) {
								modals.setIsOpen(true);
								modals.setIsEditOpen(true);
								modals.setEditModalData({
									title: t('measurements.bloodSugar'),
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

export default BloodSugar;
