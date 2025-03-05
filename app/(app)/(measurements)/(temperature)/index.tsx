import { StyleSheet, TouchableOpacity, View } from 'react-native';
// constants
import { STYLES } from '@/constants/styles';
import { WHITE } from '@/constants/colors';
import HvText from '@/components/ui/hvText';
import { Image } from 'expo-image';
import { WIN_WIDTH } from '@/constants/window';
import { PADDING } from '@/constants/sizes';
import { useSession } from '@/authentication/ctx';
import { useQuery } from '@tanstack/react-query';
import { fetchBodyTemperature } from '@/queries/queries';

const MainMeasurements = (): JSX.Element => {
	const { session } = useSession();

	const {
		data: bodytemperature,
		isError,
		isLoading,
	} = useQuery({
		queryKey: ['bodytemperature'],
		queryFn: async () => fetchBodyTemperature(session?.toString() || ''),
	});

	if (isError) {
		return (
			<View style={STYLES.defaultView}>
				<HvText>Error loading bloodpressure measurements</HvText>
			</View>
		);
	}

	if (isLoading) {
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
				{bodytemperature && bodytemperature.length > 0 && (
					<View style={Styles.itemContainer}>
						<TouchableOpacity
							style={Styles.item}
							// onPress={() =>
							// 	handleTabRoute(
							// 		'/app/measurements/bloodPressure',
							// 		'/app/measurements',
							// 	)
							// }
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
