import HvCard from './hvCard';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { formatDate } from '@/utility/utility';
import HvText from '../ui/hvText';
import { IMeasurement } from '@/interfaces/measurements';
import HvImage from '../ui/hvImage';
import { RelativePathString, router } from 'expo-router';

interface Props {
	items: IMeasurement[];
}

const measurementLink = (item: IMeasurement): RelativePathString => {
	switch (item.measurementType) {
		case 'BodyWeight':
			return '/(app)/(measurements)/(weight)' as RelativePathString;
		case 'OxygenSaturation':
			return '/(app)/(measurements)/(oxygenSaturation)' as RelativePathString;
		case 'BloodSugar':
			return '/(app)/(measurements)/(bloodSugar)' as RelativePathString;
		case 'BodyTemperature':
			return '/(app)/(measurements)/(temperature)' as RelativePathString;
		case 'BloodPressure':
			return '/(app)/(measurements)/(bloodPressure)' as RelativePathString;
		default:
			return '' as RelativePathString;
	}
};

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

const measurementTypeString = (item: IMeasurement): string => {
	switch (item.measurementType) {
		case 'BodyWeight':
			return 'Þyngd';
		case 'OxygenSaturation':
			return 'Súrefnismettun';
		case 'BloodSugar':
			return 'Blóðsykur';
		case 'BodyTemperature':
			return 'Hitastig';
		case 'BloodPressure':
			return 'Blóðþrýstingur';
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
				<TouchableOpacity onPress={() => router.push(measurementLink(item))} key={item.uid}>
					<HvCard
						key={item.uid}
						style={Styles.container}
						row
						padding={10}
						gap={10}
						border
						borderColor={item.measurementValues.status}
					>
						<View style={Styles.left}>
							<View style={{ height: 80 }}>
								<HvImage source={item.measurementType} size={80} />
								{/* <HvImage
									source={item.measurementValues.status}
									size={20}
									style={{ position: 'absolute', bottom: 0, right: 0 }}
								/> */}
							</View>
							<HvText weight='semibold' size='s'>
								{formatDate(item.measurementDate)}
							</HvText>
						</View>
						<View style={Styles.right}>
							<View style={Styles.text}>
								<HvText weight='semibold'>{measurementTypeString(item)}</HvText>
								<HvImage
									source={'View'}
									size={36}
									style={{ marginLeft: 'auto', marginRight: 10 }}
								/>
							</View>
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
									<HvImage
										source={item.measurementValues.bodyPosition}
										size={34}
									/>
									<HvImage
										source={item.measurementValues.measureHand}
										size={36}
									/>
								</View>
							</View>
						</View>
					</HvCard>
				</TouchableOpacity>
			))}
		</>
	);
};

const Styles = StyleSheet.create({
	container: {
		height: 150,
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
	text: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 40,
		marginRight: -10,
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
