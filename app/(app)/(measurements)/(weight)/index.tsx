import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
// components
import HvToggler from '@/components/ui/hvToggler';
import { STYLES } from '@/constants/styles';
import HvText from '@/components/ui/hvText';
import { useSession } from '@/authentication/ctx';
import { useQuery } from '@tanstack/react-query';
import { fetchBodyWeight } from '@/queries/queries';
import HvScrollView from '@/components/ui/HvScrollView';
import { useState } from 'react';
import HvCard from '@/components/ui/hvCard';
import { formatDate } from '@/utility/utility';
import { PADDING, TAB_ICON_SIZE } from '@/constants/sizes';

const Weight = (): JSX.Element => {
	const { session } = useSession();
	const [toggle, setToggle] = useState(false);

	const { data, isError, isLoading } = useQuery({
		queryKey: ['bodyweight'],
		queryFn: async () => fetchBodyWeight(session?.toString() || ''),
	});

	if (isError) {
		return (
			<View style={STYLES.loadingView}>
				<HvText>Error loading</HvText>
			</View>
		);
	}

	if (isLoading) {
		return (
			<View style={STYLES.loadingView}>
				<ActivityIndicator size='large' color='#3A7283' />
			</View>
		);
	}

	return (
		<View style={STYLES.defaultNoPadView}>
			<HvToggler
				toggled={toggle}
				setToggled={setToggle}
				textLeft='Graf'
				textRight='Mælingar'
				margin={20}
			/>
			<HvScrollView>
				<View style={Styles.container}>
					{data
						?.slice()
						.reverse()
						.map((item) => (
							<TouchableOpacity key={item.id}>
								<HvCard style={{ paddingInline: 20, height: 90 }} row>
									<View style={Styles.left}>
										<Image
											source={require('@/assets/svgs/measurementLabel/good.svg')}
											contentFit='contain'
											style={Styles.indicator}
										/>
										<HvText weight='semibold'>{formatDate(item.date)}</HvText>
									</View>
									<HvText size='xxl' weight='semibold'>
										{item.weight} Kg
									</HvText>
								</HvCard>
							</TouchableOpacity>
						))}
				</View>
			</HvScrollView>
		</View>
	);
};

const Styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingVertical: PADDING,
		marginBottom: TAB_ICON_SIZE + PADDING,
		gap: 12,
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
});

export default Weight;
