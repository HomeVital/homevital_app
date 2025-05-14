import { ColorValue, View, StyleSheet } from 'react-native';
import HvText from '../ui/hvText';
import HvCard from '../cards/hvCard';
import { CurveType, LineChart } from 'react-native-gifted-charts';
import { useState } from 'react';
import { DARK_GREEN, LIGHT_GRAY } from '@/constants/colors';
import { WIN_WIDTH } from '@/constants/window';
import {
	IBloodPressure,
	IBloodSugar,
	IBodyTemperature,
	IBodyWeight,
	IOxygenSaturation,
} from '@/interfaces/measurements';
import { PADDING, TAB_ICON_SIZE } from '@/constants/constants';
import { HvCardMeasurement } from '../cards/hvCardMeasurements';
import {
	isBloodPressure,
	isBloodSugar,
	isBodyTemperature,
	isBodyWeight,
	isOxygenSaturation,
} from '@/constants/typeGuards';
import { useTranslation } from 'react-i18next';
import HvButtonContainer from '../ui/hvButtonContainer';

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
}

interface PropsObject<T> extends Props<T> {
	setItem: (item: T | undefined) => void;
}

const HvGraph = <T,>({ data, dataTypes }: Props<T>): JSX.Element => {
	const [item, setItem] = useState<T | undefined>(undefined);

	return (
		<View style={Styles.container}>
			<HvGraphObject
				data={data.toReversed() as T[]}
				dataTypes={dataTypes}
				setItem={setItem}
			/>

			{item &&
				(isBloodPressure(item) ||
				isOxygenSaturation(item) ||
				isBodyTemperature(item) ||
				isBodyWeight(item) ||
				isBloodSugar(item) ? (
					<HvCardMeasurement item={item} />
				) : null)}
		</View>
	);
};

/**
 * Graph component
 * @param data - data to display
 * @param dataTypes - data types to display
 * @param setItem - function to set the selected item
 * @returns graph component
 */
const HvGraphObject = <T,>({ data, dataTypes, setItem }: PropsObject<T>): JSX.Element => {
	const { t } = useTranslation();

	const legends = Object.entries(dataTypes).map(
		([_, value]) => [value.name, value.color] as [string, ColorValue],
	);

	const [focusIndex, setFocusIndex] = useState(undefined as number | undefined);
	const [moving, setMoving] = useState(false);
	let INDEX = undefined as number | undefined;
	const [dateRange, setDateRange] = useState('10');

	// Filter data based on the selected date range
	const dataToShow = data.slice(
		data.length - (parseInt(dateRange) > data.length ? data.length : parseInt(dateRange)),
		data.length,
	);
	// selected data point indexing
	const filteredData = Object.keys(dataTypes).map((key) =>
		dataToShow.map((item) => ({ value: Number(item[key as keyof T]) })),
	);

	/**
	 * Handle focus on a data point
	 * @param index - index of the data point
	 */
	const handleFocus = (index: number | undefined) => {
		const indexRange = data.length;
		let filterAdjustedIndex =
			index !== undefined ? indexRange - Number(dateRange) + index : undefined;

		if (parseInt(dateRange) > data.length) {
			filterAdjustedIndex = index !== undefined ? index : 0;
		}

		if (focusIndex === filterAdjustedIndex) {
			setFocusIndex(undefined);
			setItem(undefined);
		} else {
			setFocusIndex(filterAdjustedIndex);
			if (filterAdjustedIndex !== undefined) {
				setItem(data && data[filterAdjustedIndex]);
			}
		}
	};

	/**
	 * Handle date range change
	 * @param range - date range to display
	 * @returns void
	 */
	const handleDateRange = (range: string) => {
		if (dateRange === range) return;
		setDateRange(range);
		setFocusIndex(undefined);
		setItem(undefined);
	};

	/**
	 * Calculate the y-axis bounds based on the data
	 * @returns y-axis bounds
	 */
	const calculateYAxisBounds = () => {
		const allValues = filteredData
			.flatMap((dataset) => dataset.map((item) => item.value))
			.filter((value) => !isNaN(value));

		if (allValues.length === 0) return { min: 0, max: 10 };

		const minValue = Math.min(...allValues);
		const maxValue = Math.max(...allValues);

		return {
			min: Math.max(0, Math.floor(minValue / 10) * 10 - 10), // Round down to nearest 10
			max: Math.ceil(maxValue / 10) * 10, // Round up to nearest 10
		};
	};

	const { min, max } = calculateYAxisBounds();

	return (
		<HvCard spacing='flex-start'>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					width: '100%',
					paddingHorizontal: 20,
					gap: 5,
				}}
			>
				<HvButtonContainer
					onPress={() => {
						handleDateRange('10');
					}}
					style={{
						marginVertical: 20,
						paddingVertical: 4,
						opacity: dateRange === '10' ? 1 : 0.3,
						flex: 1,
					}}
				>
					<HvText weight='bold' size='m' center>
						{t('measurements.page.days')} 10
					</HvText>
				</HvButtonContainer>
				<HvButtonContainer
					onPress={() => {
						handleDateRange('30');
					}}
					style={{
						marginVertical: 20,
						paddingVertical: 4,
						opacity: dateRange === '30' ? 1 : 0.3,
						flex: 1,
					}}
				>
					<HvText weight='bold' size='m' center>
						{t('measurements.page.days')} 30
					</HvText>
				</HvButtonContainer>
				<HvButtonContainer
					onPress={() => {
						handleDateRange('60');
					}}
					style={{
						marginVertical: 20,
						paddingVertical: 4,
						opacity: dateRange === '60' ? 1 : 0.3,
						flex: 1,
					}}
				>
					<HvText weight='bold' size='m' center>
						{t('measurements.page.days')} 60
					</HvText>
				</HvButtonContainer>
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
				maxValue={max - min}
				// data lines
				curved
				curveType={CurveType.QUADRATIC}
				animationDuration={500}
				animationEasing={'ease-in-out'}
				isAnimated
				animateTogether
				thickness={3.5}
				height={200}
				width={WIN_WIDTH - 95}
				color1={Object.values(dataTypes)[0].color}
				color2={Object.values(dataTypes)[1]?.color}
				color3={Object.values(dataTypes)[2]?.color}
				stripColor='black'
				yAxisOffset={min}
				// rules (long x-axis lines)
				noOfSections={4}
				rulesType='solid'
				rulesColor={LIGHT_GRAY}
				xAxisColor={LIGHT_GRAY}
				initialSpacing={7} // distance from left side of start chart
				// spacing={refRanges[dateRange as keyof typeof refRanges]} // distance between each point
				disableScroll
				// y-axis
				yAxisThickness={0}
				yAxisTextStyle={{ color: DARK_GREEN, fontSize: 16 }}
				adjustToWidth={true}
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

const Styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingVertical: PADDING,
		marginBottom: TAB_ICON_SIZE + PADDING,
		gap: 12,
	},
});

export default HvGraph;
