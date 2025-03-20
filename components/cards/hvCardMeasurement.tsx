import { IBloodPressure } from '@/interfaces/bloodPressureInterfaces';
import { IBloodSugar } from '@/interfaces/bloodSugarInterfaces';
import { IBodyTemperature } from '@/interfaces/bodyTemperatureInterfaces';
import { IBodyWeight } from '@/interfaces/bodyWeightInterfaces';
import { IOxygenSaturation } from '@/interfaces/oxygenSaturationInterfaces';
import HvCard from './hvCard';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { formatDate } from '@/utility/utility';
import HvText from '../ui/hvText';
import { IMeasurementBase } from '@/interfaces/measurementBaseInterfaces';
import {
	isBloodPressure,
	isBloodSugar,
	isBodyTemperature,
	isBodyWeight,
	isOxygenSaturation,
} from '@/constants/typeGuards';
import HvImage from '../ui/hvImage';

interface Props<
	T = IBloodPressure | IOxygenSaturation | IBodyTemperature | IBodyWeight | IBloodSugar,
> {
	item: T extends IMeasurementBase ? T : never;
}

/**
 * Card component for displaying a measurement
 * @param item - measurement to display
 * @returns card component for displaying a measurement
 */
const HvCardMeasurement = <T,>({ item }: Props<T>): JSX.Element => {
	const renderMeasurementValue = () => {
		if (isBloodPressure(item)) {
			return `${item.systolic} / ${item.diastolic}`;
		} else if (isOxygenSaturation(item)) {
			return `${item.oxygenSaturationValue} %`;
		} else if (isBodyTemperature(item)) {
			return `${item.temperature} °C`;
		} else if (isBodyWeight(item)) {
			return `${item.weight} Kg`;
		} else if (isBloodSugar(item)) {
			return `${item.bloodsugarLevel} mmol/L`;
		}
		return '';
	};

	return (
		<HvCard key={item.id} style={Styles.container} row>
			<View style={Styles.left}>
				<Image
					source={require('@/assets/svgs/measurementLabel/good.svg')}
					contentFit='contain'
					style={Styles.indicator}
				/>
				<HvText weight='semibold'>{formatDate(item.date)}</HvText>
			</View>
			<HvText size='xxl' weight='semibold'>
				{renderMeasurementValue()}
			</HvText>
			{isBloodPressure(item) && (
				<View style={Styles.right}>
					<HvImage source={item.bodyPosition} size={34} />
					<HvImage source={item.measureHand} size={34} />
				</View>
			)}
		</HvCard>
	);
};

const Styles = StyleSheet.create({
	container: {
		paddingInline: 20,
		height: 90,
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

export default HvCardMeasurement;
