import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { useQueries } from '@tanstack/react-query';
import { useSession } from '@/hooks/ctx';
import {
	fetchBloodPressure,
	fetchBloodSugar,
	fetchBodyTemperature,
	fetchBodyWeight,
	fetchOxygenSaturation,
} from '@/queries/get';
import { WHITE } from '@/constants/colors';
import HvText from '@/components/ui/hvText';
import { PADDING } from '@/constants/constants';
import { LoadingView } from '@/components/queryStates';
import { getClaimBySubstring } from '@/utility/utility';
import { useTranslation } from 'react-i18next';
import HvButtonContainer from '@/components/ui/hvButtonContainer';
import { FlatGrid } from 'react-native-super-grid';

const MainMeasurements = (): JSX.Element => {
	const { t } = useTranslation();
	const { token, signOut } = useSession();

	const [BP, BS, BT, BW, OS] = useQueries({
		queries: [
			{
				queryKey: ['bloodpressure'],
				queryFn: async () => fetchBloodPressure(getClaimBySubstring(token, 'sub'), token),
			},
			{
				queryKey: ['bloodsugar'],
				queryFn: async () => fetchBloodSugar(getClaimBySubstring(token, 'sub'), token),
			},
			{
				queryKey: ['bodytemperature'],
				queryFn: async () => fetchBodyTemperature(getClaimBySubstring(token, 'sub'), token),
			},
			{
				queryKey: ['bodyweight'],
				queryFn: async () => fetchBodyWeight(getClaimBySubstring(token, 'sub'), token),
			},
			{
				queryKey: ['oxygensaturation'],
				queryFn: async () =>
					fetchOxygenSaturation(getClaimBySubstring(token, 'sub'), token), // Note: This is using fetchBodyWeight, might need correction
			},
		],
	});

	// expired, sign out
	if (BP.isError || BS.isError || BT.isError || BW.isError || OS.isError) {
		if (
			BP.error?.message === 'Token expired' ||
			BS.error?.message === 'Token expired' ||
			BT.error?.message === 'Token expired' ||
			BW.error?.message === 'Token expired' ||
			OS.error?.message === 'Token expired'
		) {
			signOut();
			return <></>;
		}
	}

	// loading
	if (BP.isLoading || BS.isLoading || BT.isLoading || BW.isLoading || OS.isLoading) {
		return <LoadingView />;
	}

	const mappedData = [
		{
			data: BP.data,
			press: () => router.push('/(app)/(measurements)/(bloodPressure)'),
			image: require('@/assets/images/heartDark.png'),
			label: t('measurements.bloodPressure'),
		},
		{
			data: BS.data,
			press: () => router.push('/(app)/(measurements)/(bloodSugar)'),
			image: require('@/assets/images/waterDark.png'),
			label: t('measurements.bloodSugar'),
		},
		{
			data: BW.data,
			press: () => router.push('/(app)/(measurements)/(weight)'),
			image: require('@/assets/images/scaleDark.png'),
			label: t('measurements.bodyWeight'),
		},
		{
			data: BT.data,
			press: () => router.push('/(app)/(measurements)/(temperature)'),
			image: require('@/assets/images/warmDark.png'),
			label: t('measurements.bodyTemperature'),
		},
		{
			data: OS.data,
			press: () => router.push('/(app)/(measurements)/(oxygenSaturation)'),
			image: require('@/assets/svgs/lungsDark.svg'),
			label: t('measurements.oxygenSaturation'),
		},
		{
			data: ['filler'],
			press: () => router.push('/(app)/(measurements)/(plan)'),
			image: require('@/assets/svgs/schedule.svg'),
			label: t('measurements.plan.plan'),
		},
	];

	const filteredData = mappedData.filter((item) => item.data && item.data.length > 0);

	return (
		<FlatGrid
			itemDimension={130}
			spacing={20}
			showsVerticalScrollIndicator={false}
			data={filteredData}
			renderItem={({ item }) => {
				if (item.data && item.data.length === 0) return null;
				return (
					<View style={Styles.itemContainer}>
						<HvButtonContainer style={Styles.item} onPress={item.press}>
							<Image
								source={item.image}
								contentFit='contain'
								style={Styles.itemImage}
							/>
							<HvText>{item.label}</HvText>
						</HvButtonContainer>
					</View>
				);
			}}
		/>
	);
};

const Styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '100%',
		padding: PADDING,
	},
	itemContainer: {
		aspectRatio: 1,
	},
	item: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		borderRadius: 10,
		backgroundColor: WHITE,
		boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
	},
	itemImage: {
		width: '66%',
		height: '66%',
	},
});

export default MainMeasurements;
