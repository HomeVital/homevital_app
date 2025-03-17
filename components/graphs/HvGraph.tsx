import { ColorValue, TouchableOpacity, View } from 'react-native';
import HvText from '../ui/hvText';
import HvCard from '../ui/hvCard';
import { CurveType, LineChart } from 'react-native-gifted-charts';
import { useState } from 'react';
import { DARK_GREEN, LIGHT_GRAY } from '@/constants/colors';
import { WIN_WIDTH } from '@/constants/window';
import { IBloodPressure } from '@/interfaces/bloodPressureInterfaces';
import { IOxygenSaturation } from '@/interfaces/oxygenSaturationInterfaces';
import { IBodyTemperature } from '@/interfaces/bodyTemperatureInterfaces';
import { IBodyWeight } from '@/interfaces/bodyWeightInterfaces';
import { IBloodSugar } from '@/interfaces/bloodSugarInterfaces';

interface IDataType {
	name: string;
	color: string;
}

interface Props<
	T = IBloodPressure | IOxygenSaturation | IBodyTemperature | IBodyWeight | IBloodSugar,
> {
	data: T[];
	dataTypes: {
		[key: string]: IDataType;
	};
	setItem: (item: T | undefined) => void;
}

/**
 * Graph component
 * @param data - data to display
 * @param dataTypes - data types to display
 * @param setItem - function to set the selected item
 * @returns graph component
 */
const HvGraph = <T,>({ data, dataTypes, setItem }: Props<T>): JSX.Element => {
	// selected data point indexing
	const filteredData = Object.keys(dataTypes).map((key) =>
		data?.map((item) => ({ value: Number(item[key as keyof T]) })),
	);

	const legends = Object.entries(dataTypes).map(
		([_, value]) => [value.name, value.color] as [string, ColorValue],
	);

	const [focusIndex, setFocusIndex] = useState(undefined as number | undefined);
	const [moving, setMoving] = useState(false);
	let INDEX = undefined as number | undefined;
	// month range
	const refRanges = { '7': 50, '30': 50 * 0.2333, '90': 50 * 0.0777 };
	const [dateRange, setDateRange] = useState('7');

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
		if (dateRange === range) return;
		setDateRange(range);
		setFocusIndex(undefined);
		setItem(undefined);
	};

	return (
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
			{HvGraphLegend(legends)}
		</HvCard>
	);
};

/**
 * Graph legend component
 * @param legends - array of legend names and colors
 * @returns graph legend component
 */
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

export default HvGraph;
