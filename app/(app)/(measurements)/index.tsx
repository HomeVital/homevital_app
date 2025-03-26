import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import { useQueries } from '@tanstack/react-query';
// components
import { useSession } from '@/hooks/ctx';
import {
	fetchBloodPressure,
	fetchBloodSugar,
	fetchBodyTemperature,
	fetchBodyWeight,
} from '@/queries/queries';
// constants
import { STYLES } from '@/constants/styles';
import { WHITE } from '@/constants/colors';
import HvText from '@/components/ui/hvText';
import { WIN_WIDTH } from '@/constants/window';
import { PADDING } from '@/constants/constants';
import { LoadingView } from '@/components/queryStates';

const MainMeasurements = (): JSX.Element => {
	const { session } = useSession();

	const [bloodpressure, bloodsugar, bodytemperature, bodyweight, oxygensaturation] = useQueries({
		queries: [
			{
				queryKey: ['bloodpressure'],
				queryFn: async () => fetchBloodPressure(session?.toString() || ''),
			},
			{
				queryKey: ['bloodsugar'],
				queryFn: async () => fetchBloodSugar(session?.toString() || ''),
			},
			{
				queryKey: ['bodytemperature'],
				queryFn: async () => fetchBodyTemperature(session?.toString() || ''),
			},
			{
				queryKey: ['bodyweight'],
				queryFn: async () => fetchBodyWeight(session?.toString() || ''),
			},
			{
				queryKey: ['oxygensaturation'],
				queryFn: async () => fetchBodyWeight(session?.toString() || ''), // Note: This is using fetchBodyWeight, might need correction
			},
		],
	});

	if (
		bloodpressure.isLoading ||
		bloodsugar.isLoading ||
		bodytemperature.isLoading ||
		bodyweight.isLoading ||
		oxygensaturation.isLoading
	) {
		return <LoadingView />;
	}

	return (
		// <HvScrollView>
		<View style={STYLES.imageView}>
			<View style={Styles.container}>
				{bloodpressure.data && bloodpressure.data.length > 0 && (
					<View style={Styles.itemContainer}>
						<TouchableOpacity
							style={Styles.item}
							onPress={() => router.push('/(app)/(measurements)/(bloodPressure)')}
						>
							<Image
								source={require('@/assets/images/heartDark.png')}
								contentFit='contain'
								style={Styles.itemImage}
							/>
							<HvText>Blóðþrýstingur</HvText>
						</TouchableOpacity>
					</View>
				)}

				{bloodsugar.data && bloodsugar.data.length > 0 && (
					<View style={Styles.itemContainer}>
						<TouchableOpacity
							style={Styles.item}
							onPress={() => router.push('/(app)/(measurements)/(bloodSugar)')}
						>
							<Image
								source={require('@/assets/images/waterDark.png')}
								contentFit='contain'
								style={Styles.itemImage}
							/>
							<HvText>Blóðsykur</HvText>
						</TouchableOpacity>
					</View>
				)}

				{bodyweight.data && bodyweight.data.length > 0 && (
					<View style={Styles.itemContainer}>
						<TouchableOpacity
							style={Styles.item}
							onPress={() => router.push('/(app)/(measurements)/(weight)')}
						>
							<Image
								source={require('@/assets/images/scaleDark.png')}
								contentFit='contain'
								style={Styles.itemImage}
							/>
							<HvText>Þyngd</HvText>
						</TouchableOpacity>
					</View>
				)}

				{bodytemperature.data && bodytemperature.data.length > 0 && (
					<View style={Styles.itemContainer}>
						<TouchableOpacity
							style={Styles.item}
							onPress={() => router.push('/(app)/(measurements)/(temperature)')}
						>
							<Image
								source={require('@/assets/images/warmDark.png')}
								contentFit='contain'
								style={Styles.itemImage}
							/>
							<HvText>Hiti</HvText>
						</TouchableOpacity>
					</View>
				)}

				{oxygensaturation.data && oxygensaturation.data.length > 0 && (
					<View style={Styles.itemContainer}>
						<TouchableOpacity
							style={Styles.item}
							onPress={() => router.push('/(app)/(measurements)/(oxygenSaturation)')}
						>
							<Image
								source={require('@/assets/svgs/lungsDark.svg')}
								contentFit='contain'
								style={Styles.itemImage}
							/>
							<HvText>Súrefnismettun</HvText>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</View>
		// </HvScrollView>
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
		width: WIN_WIDTH / 2 - PADDING,
		height: WIN_WIDTH / 2 - PADDING,
		padding: PADDING,
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
		width: '70%',
		minHeight: '70%',
	},
});

export default MainMeasurements;
