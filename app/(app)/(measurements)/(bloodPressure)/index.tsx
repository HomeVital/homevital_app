import { ActivityIndicator, StyleSheet, View } from 'react-native';
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
import { TAB_ICON_SIZE } from '@/constants/sizes';

const BloodPressure = (): JSX.Element => {
	const { session } = useSession();
	const [toggle, setToggle] = useState(false);

	const { data, isError, isLoading } = useQuery({
		queryKey: ['bloodpressure'],
		queryFn: async () => fetchBloodPressure(session?.toString() || ''),
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

	const ScrollView = () => {
		return data
			?.slice()
			.reverse()
			.map((item) => (
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
								style={Styles.icon}
							/>
						) : (
							<Image
								source={require('@/assets/svgs/sitting.svg')}
								contentFit='contain'
								style={Styles.icon}
							/>
						)}
						{item.measureHand === 'Left' ? (
							<Image
								source={require('@/assets/svgs/handLeft.svg')}
								contentFit='contain'
								style={Styles.icon}
							/>
						) : (
							<Image
								source={require('@/assets/svgs/handRight.svg')}
								contentFit='contain'
								style={Styles.icon}
							/>
						)}
					</View>
				</HvCard>
			));
	};

	const GraphView = () => {
		return (
			<HvText size='xl' weight='semibold'>
				Chart
			</HvText>
		);
	};

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
				<View style={Styles.container}>{toggle ? <GraphView /> : <ScrollView />}</View>
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
	right: {
		flexDirection: 'row',
	},
	icon: {
		width: 34,
		height: 34,
	},
});

export default BloodPressure;
