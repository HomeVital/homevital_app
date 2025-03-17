import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import { useQuery } from '@tanstack/react-query';
// components
import HvCard from '@/components/ui/hvCard';
import HvToggler from '@/components/ui/hvToggler';
import HvText from '@/components/ui/hvText';
import { useSession } from '@/hooks/ctx';
import HvScrollView from '@/components/ui/HvScrollView';
import { formatDate } from '@/utility/utility';
// constants
import { STYLES } from '@/constants/styles';
import { fetchBodyTemperature } from '@/queries/queries';
import { PADDING } from '@/constants/sizes';
import { TAB_ICON_SIZE } from '@/constants/sizes';
// hooks
import { useToggle } from '@/hooks/UseToggle';

const Temperature = (): JSX.Element => {
	const { session } = useSession();
	const { toggled, setToggledTrue, setToggledFalse } = useToggle();

	const { data, isError, isLoading } = useQuery({
		queryKey: ['bodytemperature'],
		queryFn: async () => fetchBodyTemperature(session?.toString() || ''),
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
				toggler={toggled}
				setToggledTrue={setToggledTrue}
				setToggledFalse={setToggledFalse}
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
							<HvCard key={item.id} style={{ paddingInline: 20, height: 90 }} row>
								<View style={Styles.left}>
									<Image
										source={require('@/assets/svgs/measurementLabel/good.svg')}
										contentFit='contain'
										style={Styles.indicator}
									/>
									<HvText weight='semibold'>{formatDate(item.date)}</HvText>
								</View>
								<HvText size='xxl' weight='semibold'>
									{item.temperature} °C
								</HvText>
							</HvCard>
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

export default Temperature;
