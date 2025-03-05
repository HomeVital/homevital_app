import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
// components
import HvToggler from '@/components/ui/hvToggler';
import { STYLES } from '@/constants/styles';
import HvText from '@/components/ui/hvText';
import { useSession } from '@/authentication/ctx';
import { useQuery } from '@tanstack/react-query';
import { fetchBodyTemperature } from '@/queries/queries';
import HvScrollView from '@/components/ui/HvScrollView';
import { useState } from 'react';
import HvCard from '@/components/ui/hvCard';
import { formatDate } from '@/utility/utility';
import { PADDING } from '@/constants/sizes';

const Temperature = (): JSX.Element => {
	const { session } = useSession();
	const [toggle, setToggle] = useState(false);

	const { data, isError, isLoading } = useQuery({
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
		<HvScrollView>
			<View style={STYLES.defaultView}>
				<HvToggler
					toggled={toggle}
					setToggled={setToggle}
					textLeft='Graf'
					textRight='Mælingar'
				/>
				<View style={Styles.container}>
					{data?.map((item) => (
						<HvCard key={item.id} style={{ paddingInline: 20, height: 90 }}>
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
			</View>
		</HvScrollView>
	);
};

const Styles = StyleSheet.create({
	container: {
		paddingVertical: PADDING,
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
