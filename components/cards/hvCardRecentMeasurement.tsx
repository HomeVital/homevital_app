import HvCard from './hvCard';
import { View, StyleSheet } from 'react-native';
import { formatDate } from '@/utility/utility';
import HvText from '../ui/hvText';
import { IMeasurement } from '@/interfaces/measurements';
import HvImage from '../ui/hvImage';
import { RelativePathString, router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import HvButtonContainer from '../ui/hvButtonContainer';

interface Props {
	items: IMeasurement[];
}

/**
 * Card component for displaying a measurement
 * @param item - measurement to display
 * @returns card component for displaying a measurement
 */
const HvCardRecentMeasurements = ({ items }: Props): JSX.Element => {
	const { t } = useTranslation();

	interface IInfo {
		link: RelativePathString;
		measurement: string;
		measurementType: string;
	}

	/**
	 * Parse a measurement item into its information components
	 * @param item - measurement to parse
	 * @returns information components of the measurement
	 */
	const measurementInfo = (item: IMeasurement): IInfo => {
		switch (item.measurementType) {
			case 'BodyWeight':
				return {
					link: '/(app)/(measurements)/(weight)' as RelativePathString,
					measurement: `${item.measurementValues.weight} Kg`,
					measurementType: t('measurements.bodyWeight'),
				};
			case 'OxygenSaturation':
				return {
					link: '/(app)/(measurements)/(oxygenSaturation)' as RelativePathString,
					measurement: `${item.measurementValues.oxygenSaturation} %`,
					measurementType: t('measurements.oxygenSaturation'),
				};
			case 'BloodSugar':
				return {
					link: '/(app)/(measurements)/(bloodSugar)' as RelativePathString,
					measurement: `${item.measurementValues.bloodSugar} mmol/L`,
					measurementType: t('measurements.bloodSugar'),
				};
			case 'BodyTemperature':
				return {
					link: '/(app)/(measurements)/(temperature)' as RelativePathString,
					measurement: `${item.measurementValues.temperature} °C`,
					measurementType: t('measurements.bodyTemperature'),
				};
			case 'BloodPressure':
				return {
					link: '/(app)/(measurements)/(bloodPressure)' as RelativePathString,
					measurement: `${item.measurementValues.systolic} / ${item.measurementValues.diastolic}`,
					measurementType: t('measurements.bloodPressure'),
				};
			default:
				return {
					link: '' as RelativePathString,
					measurement: '',
					measurementType: '',
				};
		}
	};

	return (
		<>
			{items.map((item) => (
				<HvButtonContainer
					onPress={() => router.push(measurementInfo(item).link)}
					key={item.uid}
				>
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
							</View>
							<HvText weight='semibold' size='s'>
								{formatDate(item.measurementDate)}
							</HvText>
						</View>
						<View style={Styles.right}>
							<View style={Styles.text}>
								<HvText weight='semibold'>
									{measurementInfo(item).measurementType}
								</HvText>
								<HvImage
									source={'View'}
									size={36}
									style={{ marginLeft: 'auto', marginRight: 10 }}
								/>
							</View>
							<View style={Styles.measurement}>
								<View style={Styles.measurementLeft}>
									<HvText weight='semibold' size='xxl'>
										{measurementInfo(item).measurement}
									</HvText>
									{item.measurementType === 'BloodPressure' && (
										<HvText weight='semibold' size='l'>
											{item.measurementValues.bpm + t('measurements.bpm')}
										</HvText>
									)}
								</View>
								<View style={Styles.measurementRight}>
									<HvImage
										source={item.measurementValues.bodyPosition}
										size={34}
									/>
									<HvImage
										source={item.measurementValues.measuredHand}
										size={36}
									/>
								</View>
							</View>
						</View>
					</HvCard>
				</HvButtonContainer>
			))}
		</>
	);
};

const Styles = StyleSheet.create({
	container: {
		height: 130,
	},
	left: {
		height: '100%',
		alignItems: 'center',
		justifyContent: 'space-evenly',
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
		justifyContent: 'flex-end',
		height: '100%',
		flex: 1,
		paddingLeft: 30,
	},
	measurementLeft: {
		flex: 1,
		justifyContent: 'space-between',
	},
	measurementRight: {
		alignItems: 'flex-end',
		flexDirection: 'row',
	},
});

export default HvCardRecentMeasurements;
