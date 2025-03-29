import HvCard from './hvCard';
import { View, StyleSheet } from 'react-native';
import { formatDate } from '@/utility/utility';
import HvText from '../ui/hvText';
import { IMeasurement } from '@/interfaces/measurements';
import HvImage from '../ui/hvImage';

interface Props {
	items: IMeasurement[];
}

const measurementString = (item: IMeasurement): string => {
	switch (item.measurementType) {
		case 'BodyWeight':
			return `${item.measurementValues.weight} Kg`;
		case 'OxygenSaturation':
			return `${item.measurementValues.oxygenSaturation} %`;
		case 'BloodSugar':
			return `${item.measurementValues.bloodSugar} mmol/L`;
		case 'BodyTemperature':
			return `${item.measurementValues.temperature} °C`;
		case 'BloodPressure':
			return `${item.measurementValues.systolic} / ${item.measurementValues.diastolic}`;
		default:
			return '';
	}
};
/**
 * Card component for displaying a measurement
 * @param item - measurement to display
 * @returns card component for displaying a measurement
 */
const HvCardRecentMeasurements = ({ items }: Props): JSX.Element => {
	return (
		<>
			{items.map((item) => (
				<HvCard key={item.uid} style={Styles.container} row>
					<View style={Styles.left}>
						<View style={{ height: 80 }}>
							<HvImage source={item.measurementType} size={80} />
							<HvImage
								source={item.measurementValues.status}
								size={20}
								style={{ position: 'absolute', bottom: 0, right: 0 }}
							/>
						</View>
						<HvText weight='semibold' size='s'>
							{formatDate(item.measurementDate)}
						</HvText>
					</View>
					<View style={Styles.right}>
						<HvText weight='semibold'>{item.measurementType}</HvText>
						<View style={Styles.measurement}>
							<View style={Styles.measurementLeft}>
								<HvText weight='semibold' size='xxl'>
									{measurementString(item)}
								</HvText>
								{item.measurementType === 'BloodPressure' && (
									<HvText weight='semibold' size='l'>
										{item.measurementValues.bpm + ' púls'}
									</HvText>
								)}
							</View>
							<View style={Styles.measurementRight}>
								<HvImage source={item.measurementValues.bodyPosition} size={34} />
								<HvImage source={item.measurementValues.measureHand} size={34} />
							</View>
						</View>
					</View>
				</HvCard>
			))}
		</>
	);
};

const Styles = StyleSheet.create({
	container: {
		padding: 10,
		height: 150,
		gap: 10,
	},
	left: {
		height: '100%',
		alignItems: 'center',
		gap: 14,
	},
	right: {
		height: '100%',
		flex: 1,
	},
	measurement: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: '100%',
		flex: 1,
		paddingLeft: 30,
	},
	measurementLeft: {
		justifyContent: 'center',
		gap: 14,
	},
	measurementRight: {
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
});

export default HvCardRecentMeasurements;
