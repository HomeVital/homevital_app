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

interface Props<
	T = IBloodPressure | IOxygenSaturation | IBodyTemperature | IBodyWeight | IBloodSugar,
> {
	item: T extends IMeasurementBase ? T : never;
}

// Type guards
const isBloodPressure = (item: unknown): item is IBloodPressure =>
	item !== null && typeof item === 'object' && 'systolic' in item && 'diastolic' in item;

const isOxygenSaturation = (item: unknown): item is IOxygenSaturation =>
	item !== null && typeof item === 'object' && 'oxygenSaturationValue' in item;

const isBodyTemperature = (item: unknown): item is IBodyTemperature =>
	item !== null && typeof item === 'object' && 'temperature' in item;

const isBodyWeight = (item: unknown): item is IBodyWeight =>
	item !== null && typeof item === 'object' && 'weight' in item;

const isBloodSugar = (item: unknown): item is IBloodSugar =>
	item !== null && typeof item === 'object' && 'bloodsugarLevel' in item;

/**
 * Card component for displaying a measurement
 * @param item - measurement to display
 * @returns card component for displaying a measurement
 */
const HvCardMeasurement = <T,>({ item }: Props<T>): JSX.Element => {
	const renderMeasurementValue = () => {
		if (isBloodPressure(item)) {
			return `${item.systolic}/${item.diastolic}`;
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
	icon: {
		width: 34,
		height: 34,
	},
});

export default HvCardMeasurement;
