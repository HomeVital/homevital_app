import { ActivityIndicator, ColorValue, StyleSheet, TouchableOpacity, View } from 'react-native';
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
import { CurveType, LineChart } from 'react-native-gifted-charts';
import { WIN_WIDTH } from '@/constants/window';
import { DARK_GREEN, LIGHT_BLUE, LIGHT_GRAY, LIGHT_GREEN } from '@/constants/colors';
import React from 'react';
import { IBloodPressure } from '@/interfaces/bloodPressureInterfaces';

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

	const cardItem = (item: IBloodPressure) => {
		return (
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
		);
	};

	const ScrollView = () => {
		return (
			<View style={Styles.container}>
				{data
					?.slice()
					.reverse()
					.map((item) => cardItem(item))}
			</View>
		);
	};

	const HvGraphLegend = (legends: [string, ColorValue][]) => {
		return (
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					gap: 40,
					marginBottom: 15,
				}}
			>
				{legends.map(([name, color], index) => (
					<View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
						<View
							style={{
								width: 30,
								height: 10,
								backgroundColor: color,
								marginRight: 8,
							}}
						/>
						<HvText>{name}</HvText>
					</View>
				))}
			</View>
		);
	};

	// Call it in your component

	const GraphView = () => {
		const dataTypes = {
			systolic: { name: 'SYS', color: LIGHT_GREEN },
			diastolic: { name: 'DIA', color: DARK_GREEN },
			pulse: { name: 'Púls', color: LIGHT_BLUE },
		};
		const [item, setItem] = useState(undefined as IBloodPressure | undefined);
		// selected data point indexing
		const [focusIndex, setFocusIndex] = useState(undefined as number | undefined);
		const [moving, setMoving] = useState(false);
		let INDEX = undefined as number | undefined;
		// month range
		const refRanges = { '7': 50, '30': 50 * 0.2333, '90': 50 * 0.0777 };
		const [dateRange, setDateRange] = useState('7');
		// processed data
		const filteredData = Object.keys(dataTypes).map((key) =>
			data?.map((item) => ({ value: Number(item[key as keyof IBloodPressure]) })),
		);

		// pointer and item data
		const handleFocus = (index: number | undefined) => {
			if (focusIndex === index) {
				setFocusIndex(undefined);
				setItem(undefined);
			} else {
				setFocusIndex(index);
				if (index !== undefined) {
					setItem(data && data[index]);
				}
			}
		};

		const handleDateRange = (range: string) => {
			setDateRange(range);
			setFocusIndex(undefined);
			setItem(undefined);
		};

		return (
			<View style={Styles.container}>
				<HvCard spacing='flex-start'>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-evenly',
							width: '100%',
						}}
					>
						<TouchableOpacity
							onPress={() => {
								handleDateRange('7');
							}}
							style={{
								marginVertical: 20,
								paddingVertical: 4,
								opacity: dateRange === '7' ? 1 : 0.3,
								width: 90,
							}}
						>
							<HvText weight='bold' size='l' center>
								7 daga
							</HvText>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								handleDateRange('30');
							}}
							style={{
								marginVertical: 20,
								paddingVertical: 4,
								opacity: dateRange === '30' ? 1 : 0.3,
								width: 90,
							}}
						>
							<HvText weight='bold' size='l' center>
								30 daga
							</HvText>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								handleDateRange('90');
							}}
							style={{
								marginVertical: 20,
								paddingVertical: 4,
								opacity: dateRange === '90' ? 1 : 0.3,
								width: 90,
							}}
						>
							<HvText weight='bold' size='l' center>
								90 daga
							</HvText>
						</TouchableOpacity>
					</View>

					<LineChart
						data={filteredData[0]}
						data2={filteredData.length > 1 ? filteredData[1] : undefined}
						data3={filteredData.length > 2 ? filteredData[2] : undefined}
						// scrollToEnd
						pointerConfig={{
							pointerColor: DARK_GREEN,
							hidePointers: !focusIndex && !moving,
							pointerStripWidth: !focusIndex && !moving ? 0 : 1,
							pointerStripColor: 'black',
							radius: 8,
							dynamicLegendComponent: (_: [], index: number) => {
								if (index !== -1) INDEX = index;
							},
							onResponderGrant: () => {
								setMoving(true);
							},
							onResponderEnd: () => {
								handleFocus(INDEX);
								setMoving(false);
							},
							pointerVanishDelay: Infinity,
							resetPointerIndexOnRelease: true,
							activatePointersInstantlyOnTouch: true,

							pointerStripUptoDataPoint: true,
							showPointerStrip: true,
						}}
						// line on touch
						showStripOnFocus
						stripWidth={1}
						//data points
						hideDataPoints
						// data lines
						curved
						curveType={CurveType.QUADRATIC}
						// animateOnDataChange
						// onDataChangeAnimationDuration={500}
						animationDuration={2000}
						animationEasing={'ease-in-out'}
						isAnimated
						animateTogether
						thickness={3.5}
						width={WIN_WIDTH - 95}
						color1={Object.values(dataTypes)[0].color}
						color2={Object.values(dataTypes)[1]?.color}
						color3={Object.values(dataTypes)[2]?.color}
						stripColor='black'
						yAxisOffset={30}
						// rules (long x-axis lines)
						noOfSections={4}
						rulesType='solid'
						rulesColor={LIGHT_GRAY}
						xAxisColor={LIGHT_GRAY}
						initialSpacing={7} // distance from left side of start chart
						spacing={refRanges[dateRange as keyof typeof refRanges]} // distance between each point
						disableScroll
						// y-axis
						yAxisThickness={0}
						yAxisTextStyle={{ color: DARK_GREEN, fontSize: 16 }}
						// horizontalRulesStyle={{ width: 100 }}
					/>
					{HvGraphLegend(
						Object.entries(dataTypes).map(
							([_, value]) => [value.name, value.color] as [string, ColorValue],
						),
					)}
				</HvCard>
				{focusIndex !== undefined && cardItem(item as IBloodPressure)}
			</View>
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
			<HvScrollView>{toggle ? <GraphView /> : <ScrollView />}</HvScrollView>
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
