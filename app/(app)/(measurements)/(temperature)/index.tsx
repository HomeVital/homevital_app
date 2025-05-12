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
import { useContext } from 'react';
import { getClaimBySubstring } from '@/utility/utility';
import ModalContext from '@/contexts/modalContext';
import { useTranslation } from 'react-i18next';

const Temperature = (): JSX.Element => {
	const { t } = useTranslation();
	const { token, signOut } = useSession();
	const modals = useContext(ModalContext);
	const { toggled, setToggledTrue, setToggledFalse } = useToggle();
	// query
	const { data, isError, error, isLoading, refetch } = useQuery({
		queryKey: ['bodytemperature'],
		queryFn: async () => fetchBodyTemperature(getClaimBySubstring(token, 'sub'), token),
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
							if (
								new Date().getTime() - new Date(itemData.date).getTime() <
								24 * 60 * 60 * 1000
							) {
								modals.setIsOpen(true);
								modals.setIsEditOpen(true);
								modals.setEditModalData({
									title: t('measurements.bodyTemperature'),
									item: itemData,
								});
							}
						}}
						editable
					/>
				</HvScrollView>
			)}
		</View>
	);
};

export default Temperature;
