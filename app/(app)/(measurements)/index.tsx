import { StyleSheet, TouchableOpacity, View } from 'react-native';
// components
// import HvScrollView from '@/components/ui/HvScrollView';
// constants
import { STYLES } from '@/constants/styles';
import { WHITE } from '@/constants/colors';
import HvText from '@/components/ui/hvText';
import { Image } from 'expo-image';
import { WIN_WIDTH } from '@/constants/window';
import { PADDING } from '@/constants/sizes';
import { useSession } from '@/authentication/ctx';
import { useQuery } from '@tanstack/react-query';
import {
	fetchBloodPressure,
	fetchBloodSugar,
	fetchBodyTemperature,
	fetchBodyWeight,
} from '@/queries/queries';

const MainMeasurements = (): JSX.Element => {
	const { session } = useSession();

	const { data: bloodpressure, isLoading: bpLoading } = useQuery({
		queryKey: ['bloodpressure'],
		queryFn: async () => fetchBloodPressure(session?.toString() || ''),
	});

	const { data: bloodsugar, isLoading: bsLoading } = useQuery({
		queryKey: ['bloodsugar'],
		queryFn: async () => fetchBloodSugar(session?.toString() || ''),
	});

	const { data: bodytemperature, isLoading: btLoading } = useQuery({
		queryKey: ['bodytemperature'],
		queryFn: async () => fetchBodyTemperature(session?.toString() || ''),
	});

	const { data: bodyweight, isLoading: bwLoading } = useQuery({
		queryKey: ['bodyweight'],
		queryFn: async () => fetchBodyWeight(session?.toString() || ''),
	});

	if (bpLoading || bsLoading || btLoading || bwLoading) {
		return (
			<View style={STYLES.defaultView}>
				<HvText>Loading...</HvText>
			</View>
		);
	}

	return (
		// <HvScrollView>
		<View style={STYLES.imageView}>
			<View style={Styles.container}>
				{bloodpressure && bloodpressure.length > 0 && (
					<View style={Styles.itemContainer}>
						<TouchableOpacity
							style={Styles.item}
							// onPress={() => }
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

				{bloodsugar && bloodsugar.length > 0 && (
					<View style={Styles.itemContainer}>
						<TouchableOpacity
							style={Styles.item}
							// onPress={() => }
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

				{bodyweight && bodyweight.length > 0 && (
					<View style={Styles.itemContainer}>
						<TouchableOpacity
							style={Styles.item}
							// onPress={() => }
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

				{bodytemperature && bodytemperature.length > 0 && (
					<View style={Styles.itemContainer}>
						<TouchableOpacity
							style={Styles.item}
							// onPress={() => }
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
		width: '80%',
		minHeight: '80%',
	},
});

export default MainMeasurements;
