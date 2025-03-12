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

		const refRanges = { '7': 50, '30': 50 * 0.2333, '90': 50 * 0.0777 };
		const spacingX = refRanges['7'];

		// Object.keys(refRanges).forEach((key) => {
		// 	switch (key) {
		// 		case '7':
		// 			spacingX = refRanges[key];
		// 		case '30':
		// 			spacingX = refRanges[key];
		// 		case '90':
		// 			break;
		// 		default:
		// 			break;
		// 	}
		// });

		return (
			<HvCard
				style={{
					gap: 30,
				}}
				spacing='flex-start'
			>
				<HvText size='xl' weight='semibold'>
					7 daga
				</HvText>
				<LineChart
					data={SYS}
					data2={DIA}
					data3={pulse}
					focusEnabled
					// line on touch
					showStripOnFocus
					stripHeight={200}
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
		);
	};

	// const GraphView = () => {
	// 	// Extract systolic and diastolic values
	// 	const systolicValues = data?.slice(-5).map((item) => item.systolic) || [];
	// 	const diastolicValues = data?.slice(-5).map((item) => item.diastolic) || [];
	// 	const dates =
	// 		data?.slice(-5).map((item) => {
	// 			const date = new Date(item.date);
	// 			return `${date.getDate()}/${date.getMonth() + 1}`;
	// 		}) || [];

	// 	// Find max value for scaling
	// 	const maxValue = Math.max(...systolicValues, ...diastolicValues, 140);
	// 	const chartHeight = 180;
	// 	const chartWidth = 300;

	// 	return (
	// 		<View>
	// 			<HvText size='xl' weight='semibold'>
	// 				Blood Pressure Chart
	// 			</HvText>

	// 			{/* Chart container */}
	// 			<View style={{ marginTop: 20, height: chartHeight + 30, width: '100%' }}>
	// 				{/* Y-axis labels */}
	// 				<View
	// 					style={{
	// 						position: 'absolute',
	// 						height: chartHeight,
	// 						justifyContent: 'space-between',
	// 					}}>
	// 					{[0, 1, 2, 3].map((i) => (
	// 						<HvText key={i} style={{ fontSize: 10, color: '#666' }}>
	// 							{Math.round((maxValue / 3) * (3 - i))}
	// 						</HvText>
	// 					))}
	// 				</View>

	// 				{/* Chart area */}
	// 				<View style={{ marginLeft: 25, height: chartHeight, position: 'relative' }}>
	// 					{/* Horizontal grid lines */}
	// 					{[0, 1, 2, 3].map((i) => (
	// 						<View
	// 							key={i}
	// 							style={{
	// 								position: 'absolute',
	// 								top: (i * chartHeight) / 3,
	// 								width: '100%',
	// 								height: 1,
	// 								backgroundColor: '#ddd',
	// 							}}
	// 						/>
	// 					))}

	// 					{/* Systolic Line */}
	// 					{systolicValues.map((value, index) => {
	// 						if (index === 0) return null;
	// 						const prevValue = systolicValues[index - 1];
	// 						const startX = ((index - 1) / (systolicValues.length - 1)) * chartWidth;
	// 						const startY = chartHeight - (prevValue / maxValue) * chartHeight;
	// 						const endX = (index / (systolicValues.length - 1)) * chartWidth;
	// 						const endY = chartHeight - (value / maxValue) * chartHeight;

	// 						return (
	// 							<View
	// 								key={`sys-${index}`}
	// 								style={{
	// 									position: 'absolute',
	// 									left: startX,
	// 									top: startY,
	// 									width: endX - startX,
	// 									height: 2,
	// 									backgroundColor: '#3A7283',
	// 									transform: [
	// 										{
	// 											rotate: `${Math.atan2(endY - startY, endX - startX) * (180 / Math.PI)}deg`,
	// 										},
	// 									],
	// 									transformOrigin: 'left',
	// 								}}
	// 							/>
	// 						);
	// 					})}

	// 					{/* Diastolic Line */}
	// 					{diastolicValues.map((value, index) => {
	// 						if (index === 0) return null;
	// 						const prevValue = diastolicValues[index - 1];
	// 						const startX =
	// 							((index - 1) / (diastolicValues.length - 1)) * chartWidth;
	// 						const startY = chartHeight - (prevValue / maxValue) * chartHeight;
	// 						const endX = (index / (diastolicValues.length - 1)) * chartWidth;
	// 						const endY = chartHeight - (value / maxValue) * chartHeight;

	// 						return (
	// 							<View
	// 								key={`dia-${index}`}
	// 								style={{
	// 									position: 'absolute',
	// 									left: startX,
	// 									top: startY,
	// 									width: endX - startX,
	// 									height: 2,
	// 									backgroundColor: '#8FC0CE',
	// 									transform: [
	// 										{
	// 											rotate: `${Math.atan2(endY - startY, endX - startX) * (180 / Math.PI)}deg`,
	// 										},
	// 									],
	// 									transformOrigin: 'left',
	// 								}}
	// 							/>
	// 						);
	// 					})}

	// 					{/* Data points - systolic */}
	// 					{systolicValues.map((value, index) => (
	// 						<View
	// 							key={`sys-dot-${index}`}
	// 							style={{
	// 								position: 'absolute',
	// 								left: (index / (systolicValues.length - 1)) * chartWidth - 4,
	// 								top: chartHeight - (value / maxValue) * chartHeight - 4,
	// 								width: 8,
	// 								height: 8,
	// 								borderRadius: 4,
	// 								backgroundColor: '#3A7283',
	// 							}}
	// 						/>
	// 					))}

	// 					{/* Data points - diastolic */}
	// 					{diastolicValues.map((value, index) => (
	// 						<View
	// 							key={`dia-dot-${index}`}
	// 							style={{
	// 								position: 'absolute',
	// 								left: (index / (diastolicValues.length - 1)) * chartWidth - 4,
	// 								top: chartHeight - (value / maxValue) * chartHeight - 4,
	// 								width: 8,
	// 								height: 8,
	// 								borderRadius: 4,
	// 								backgroundColor: '#8FC0CE',
	// 							}}
	// 						/>
	// 					))}
	// 				</View>

	// 				{/* X-axis labels */}
	// 				<View
	// 					style={{
	// 						marginLeft: 25,
	// 						marginTop: 5,
	// 						flexDirection: 'row',
	// 						justifyContent: 'space-between',
	// 					}}>
	// 					{dates.map((date, index) => (
	// 						<HvText
	// 							key={index}
	// 							style={{
	// 								fontSize: 10,
	// 								color: '#666',
	// 								position: 'absolute',
	// 								left: (index / (dates.length - 1)) * chartWidth - 10,
	// 							}}>
	// 							{date}
	// 						</HvText>
	// 					))}
	// 				</View>
	// 			</View>

	// 			{/* Legend */}
	// 			<View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
	// 				<View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
	// 					<View
	// 						style={{
	// 							width: 10,
	// 							height: 10,
	// 							backgroundColor: '#3A7283',
	// 							marginRight: 5,
	// 						}}
	// 					/>
	// 					<HvText style={{ fontSize: 12 }}>Systolic</HvText>
	// 				</View>
	// 				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
	// 					<View
	// 						style={{
	// 							width: 10,
	// 							height: 10,
	// 							backgroundColor: '#8FC0CE',
	// 							marginRight: 5,
	// 						}}
	// 					/>
	// 					<HvText style={{ fontSize: 12 }}>Diastolic</HvText>
	// 				</View>
	// 			</View>
	// 		</View>
	// 	);
	// };

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
