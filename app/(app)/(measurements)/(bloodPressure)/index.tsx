import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
// components
import HvToggler from '@/components/ui/hvToggler';
import { STYLES } from '@/constants/styles';
import HvText from '@/components/ui/hvText';
import { useSession } from '@/authentication/ctx';
import { useQuery } from '@tanstack/react-query';
import { fetchBloodPressure } from '@/queries/queries';
import HvScrollView from '@/components/ui/HvScrollView';
import { useState } from 'react';
import HvCard from '@/components/ui/hvCard';
import { formatDate } from '@/utility/utility';
import { PADDING } from '@/constants/sizes';

const BloodPressure = (): JSX.Element => {
	const { session } = useSession();
	const [toggle, setToggle] = useState(false);

	const { data, isError, isLoading } = useQuery({
		queryKey: ['bloodpressure'],
		queryFn: async () => fetchBloodPressure(session?.toString() || ''),
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
								{item.systolic}/{item.diastolic}
							</HvText>
							<View style={Styles.right}>
								{item.bodyPosition === 'Laying' ? (
									<Image
										source={require('@/assets/svgs/laying.svg')}
										contentFit='contain'
										style={Styles.indicator}
									/>
								) : (
									<Image
										source={require('@/assets/svgs/sitting.svg')}
										contentFit='contain'
										style={Styles.indicator}
									/>
								)}
								{item.measureHand === 'Left' ? (
									<Image
										source={require('@/assets/svgs/handLeft.svg')}
										contentFit='contain'
										style={Styles.indicator}
									/>
								) : (
									<Image
										source={require('@/assets/svgs/handRight.svg')}
										contentFit='contain'
										style={Styles.indicator}
									/>
								)}
							</View>
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
	right: {
		flexDirection: 'row',
	},
});

export default BloodPressure;
