import {
	IBloodPressure,
	IBloodSugar,
	IBodyTemperature,
	IBodyWeight,
	IMeasurementBase,
	IOxygenSaturation,
} from '@/interfaces/measurements';
import HvCard from './hvCard';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { formatDate } from '@/utility/utility';
import HvText from '../ui/hvText';
import {
	isBloodPressure,
	isBloodSugar,
	isBodyTemperature,
	isBodyWeight,
	isOxygenSaturation,
} from '@/constants/typeGuards';
import HvImage from '../ui/hvImage';
import { PADDING, TAB_ICON_SIZE } from '@/constants/constants';

interface Props<
	T = IBloodPressure | IOxygenSaturation | IBodyTemperature | IBodyWeight | IBloodSugar,
> {
	item: T extends IMeasurementBase ? T : never;
}

interface PropsItems<
	T = IBloodPressure | IOxygenSaturation | IBodyTemperature | IBodyWeight | IBloodSugar,
> {
	items: T[] extends IMeasurementBase[] ? T[] : never[];
	onPress?: (itemId: T extends IMeasurementBase ? T : never) => void;
}

/**
 * Card component for displaying a measurement
 * @param item - measurement to display
 * @returns card component for displaying a measurement
 */
export const HvCardMeasurement = <T,>({ item }: Props<T>): JSX.Element => {
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
			// return `${item.bloodsugarLevel} Mg/DL`;
		}
		return '';
	};

	return (
		<HvCard key={item.id} style={Styles.container} row>
			<View style={Styles.left}>
				{/* {MeasurementStatus(item.status)} */}
				<HvImage source={item.status} size={26} />
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

export const HvCardMeasurements = <T,>({ items, onPress }: PropsItems<T>): JSX.Element => {
	return (
		<View style={Styles.pageContainer}>
			{items.map((item) => {
				if (isBloodPressure(item)) {
					return (
						<TouchableOpacity onPress={() => onPress?.(item as never)} key={item.id}>
							<HvCardMeasurement key={item.id} item={item as never} />
						</TouchableOpacity>
					);
				}
				return (
					<TouchableOpacity onPress={() => onPress?.(item as never)} key={item.id}>
						<HvCardMeasurement key={item.id} item={item as never} />
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

const Styles = StyleSheet.create({
	pageContainer: {
		paddingHorizontal: 20,
		paddingVertical: PADDING,
		marginBottom: TAB_ICON_SIZE + PADDING,
		gap: 12,
	},
	container: {
		paddingInline: 20,
		height: 90,
	},
	left: {
		height: '100%',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	right: {
		flexDirection: 'row',
	},
});
