import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
// components
import { STYLES } from '@/constants/styles';
import { DARK_GREEN, GREEN, WHITE } from '@/constants/colors';
import HvText from '@/components/ui/hvText';
import { useSession } from '@/authentication/ctx';
import { useQuery } from '@tanstack/react-query';
import { fetchBodyWeight } from '@/queries/queries';
import HvScrollView from '@/components/ui/HvScrollView';
import { useState } from 'react';

const Weight = (): JSX.Element => {
	const { session } = useSession();
	const [toggle, setToggle] = useState(false);

	const {
		data: bodyweight,
		isError,
		isLoading,
	} = useQuery({
		queryKey: ['bodyweight'],
		queryFn: async () => fetchBodyWeight(session?.toString() || ''),
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

	const formatDate = (dateString: string): string => {
		const date = new Date(dateString);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}.${month}.${year}`;
	};

	return (
		<HvScrollView>
			<View style={STYLES.defaultView}>
				<View style={Styles.container}>
					<TouchableOpacity
						style={[toggle ? Styles.toggled : {}, Styles.toggler]}
						onPress={() => setToggle(true)}
					>
						<HvText color='white' weight='bold'>
							Graf
						</HvText>
					</TouchableOpacity>

					<TouchableOpacity
						style={[toggle ? {} : Styles.toggled, Styles.toggler]}
						onPress={() => setToggle(false)}
					>
						<HvText color='white' weight='bold'>
							Mælingar
						</HvText>
					</TouchableOpacity>
				</View>

				<View>
					{bodyweight?.map((item) => (
						<View key={item.id} style={Styles.item}>
							<View style={Styles.left}>
								<HvText weight='semibold'>{formatDate(item.date)}</HvText>
								<Image
									source={require('@/assets/svgs/measurementLabel/good.svg')}
									contentFit='contain'
									style={Styles.indicator}
								/>
							</View>
							<HvText size='xxl' weight='semibold'>
								{item.weight} Kg
							</HvText>
						</View>
					))}
				</View>
			</View>
		</HvScrollView>
	);
};

const Styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: GREEN,
		height: 44,
		padding: 3,
		borderRadius: 10,
	},
	toggler: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
	},
	toggled: {
		backgroundColor: DARK_GREEN,
	},
	item: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingInline: 20,
		paddingBlock: 10,
		height: 80,
		borderRadius: 10,
		backgroundColor: WHITE,
		boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
	},
	left: {
		height: '100%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	indicator: {
		width: 26,
		height: 26,
	},
	// itemContainer: {
	// 	width: WIN_WIDTH / 2 - PADDING,
	// 	height: WIN_WIDTH / 2 - PADDING,
	// 	padding: PADDING,
	// },
	// item: {
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// 	width: '100%',
	// 	height: '100%',
	// 	borderRadius: 10,
	// 	backgroundColor: WHITE,
	// 	boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
	// },
	// itemImage: {
	// 	width: '70%',
	// 	minHeight: '70%',
	// },
});

export default Weight;
