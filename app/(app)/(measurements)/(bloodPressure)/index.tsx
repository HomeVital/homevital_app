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

	const ScrollView = () => {
		return data
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

	// Call it in your component

	const GraphView = () => {
		const SYS = data?.map((item) => ({ value: Number(item.systolic) })) || [];
		const DIA = data?.map((item) => ({ value: Number(item.diastolic) })) || [];
		const pulse = data?.map((item) => ({ value: Number(item.pulse) })) || [];

		// const [currentData, setCurrentData] = useState([SYS, DIA, pulse]);
		const currentData = [SYS, DIA, pulse];
		const [item, setItem] = useState(undefined as IBloodPressure | undefined);

		// const handleChangeData = () => {
		// 	const newData = [
		// 		SYS.map((item) => ({ value: item.value + Math.floor(Math.random() * 31) + 10 })),
		// 		DIA.map((item) => ({ value: item.value + Math.floor(Math.random() * 31) + 10 })),
		// 		pulse.map((item) => ({ value: item.value + Math.floor(Math.random() * 31) + 10 })),
		// 	];
		// 	setCurrentData(newData);
		// };

		// month range
		const refRanges = { '7': 50, '30': 50 * 0.2333, '90': 50 * 0.0777 };
		const spacingX = refRanges['7'];

		// selected data point indexing
		let INDEX = undefined as number | undefined;
		const [focusIndex, setFocusIndex] = useState(undefined as number | undefined);
		const [moving, setMoving] = useState(false);

		const handleFocus = (index: number | undefined) => {
			// focusIndex === index ? setFocusIndex(undefined) : setFocusIndex(index);
			if (focusIndex === index) {
				setFocusIndex(undefined);
				setItem(undefined);
			} else {
				setFocusIndex(index);
				// item = data[]
				if (index !== undefined) {
					// const itemId = IDs[index].id;
					// item = data?.find((item) => item.id === itemId);
					setItem(data && data[index]);
					//
				}
			}
		};

		return (
			<View>
				<HvCard
					style={{
						gap: 30,
					}}
					spacing='flex-start'
				>
					<HvText size='xl' weight='semibold'>
						7 daga
					</HvText>

					{/* {focusIndex !== undefined && (
					<View
						style={{
							alignItems: 'center',
							marginTop: 10,
							padding: 12,
							backgroundColor: '#F5F5F5',
							borderRadius: 8,
						}}>
						<HvText weight='semibold'>Selected Data Point</HvText>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								width: '100%',
								marginTop: 8,
							}}>
							<View style={{ alignItems: 'center' }}>
								<View
									style={{
										width: 15,
										height: 15,
										backgroundColor: LIGHT_GREEN,
										marginBottom: 5,
									}}
								/>
								<HvText size='lg' weight='semibold'>
									{currentData[0][focusIndex]?.value || '-'}
								</HvText>
								<HvText size='sm'>SYS</HvText>
							</View>

							<View style={{ alignItems: 'center' }}>
								<View
									style={{
										width: 15,
										height: 15,
										backgroundColor: DARK_GREEN,
										marginBottom: 5,
									}}
								/>
								<HvText size='lg' weight='semibold'>
									{currentData[1][focusIndex]?.value || '-'}
								</HvText>
								<HvText size='sm'>DIA</HvText>
							</View>

							<View style={{ alignItems: 'center' }}>
								<View
									style={{
										width: 15,
										height: 15,
										backgroundColor: LIGHT_BLUE,
										marginBottom: 5,
									}}
								/>
								<HvText size='lg' weight='semibold'>
									{currentData[2][focusIndex]?.value || '-'}
								</HvText>
								<HvText size='sm'>PÚLS</HvText>
							</View>
						</View>

						{data && focusIndex < data.length && (
							<HvText style={{ marginTop: 8 }}>
								{formatDate(data[data.length - 1 - focusIndex]?.date)}
							</HvText>
						)}
					</View>
				)} */}

					<LineChart
						data={currentData[0]}
						data2={currentData[1]}
						data3={currentData[2]}
						scrollToEnd
						onDataChangeAnimationDuration={500}
						animateOnDataChange
						animationDuration={1000}
						animationEasing={'ease-in-out'}
						isAnimated
						animateTogether
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
						showDataPointOnFocus
						focusedDataPointRadius={7}
						focusedDataPointColor={DARK_GREEN}
						// data lines
						curved
						curveType={CurveType.QUADRATIC}
						// curvature={0.17}
						thickness={3.5}
						width={WIN_WIDTH - 95}
						color1={LIGHT_GREEN}
						color2={DARK_GREEN}
						color3={LIGHT_BLUE}
						stripColor='black'
						yAxisOffset={30}
						// rules (long x-axis lines)
						noOfSections={4}
						rulesType='solid'
						rulesColor={LIGHT_GRAY}
						xAxisColor={LIGHT_GRAY}
						initialSpacing={7} // distance from left side of start chart
						spacing={spacingX} // distance between each point
						disableScroll
						// y-axis
						yAxisThickness={0}
						yAxisTextStyle={{ color: DARK_GREEN, fontSize: 16 }}
						// horizontalRulesStyle={{ width: 100 }}
					/>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							gap: 40,
							marginTop: -40,
							marginBottom: 10,
						}}
					>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<View
								style={{
									width: 30,
									height: 10,
									backgroundColor: LIGHT_GREEN,
									marginRight: 8,
								}}
							/>
							<HvText>SYS</HvText>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<View
								style={{
									width: 30,
									height: 10,
									backgroundColor: DARK_GREEN,
									marginRight: 8,
								}}
							/>
							<HvText>DIA</HvText>
						</View>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<View
								style={{
									width: 30,
									height: 10,
									backgroundColor: LIGHT_BLUE,
									marginRight: 8,
								}}
							/>
							<HvText>Púls</HvText>
						</View>
					</View>
				</HvCard>
				{focusIndex !== undefined && (
					<HvCard style={{ paddingInline: 20, height: 90 }} row>
						<View style={Styles.left}>
							<Image
								source={require('@/assets/svgs/measurementLabel/good.svg')}
								contentFit='contain'
								style={Styles.indicator}
							/>
							<HvText weight='semibold'>{formatDate(item?.date as string)}</HvText>
						</View>
						<HvText size='xxl' weight='semibold'>
							{item?.systolic}/{item?.diastolic}
						</HvText>
						<View style={Styles.right}>
							{item?.bodyPosition === 'Laying' ? (
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
							{item?.measureHand === 'Left' ? (
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
				)}
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
