import { View, StyleSheet } from 'react-native';
// components
import { STYLES } from '@/constants/styles';
import { useSession } from '@/hooks/ctx';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { Calendar, LocaleConfig, DateData } from 'react-native-calendars';

import HvText from '@/components/ui/hvText';
import React, { useEffect } from 'react';
import HvImage from '@/components/ui/hvImage';
import { DARK_GREEN } from '@/constants/colors';
import HvCard from '@/components/cards/hvCard';
import { fetchPlan } from '@/queries/get';
import { formatDate, getClaimBySubstring } from '@/utility/utility';
import { ErrorView, LoadingView } from '@/components/queryStates';

const Plan = (): JSX.Element => {
	const { i18n } = useTranslation();
	const { session } = useSession();
	const [markedDates, setMarkedDates] = React.useState<{
		[key: string]: {
			customStyles: {
				container: {
					borderColor: string;
					borderWidth: number;
					width: number;
					height: number;
					borderRadius: string;
					top: number;
				};
			};
			BW: boolean;
			BS: boolean;
			BP: boolean;
			OS: boolean;
			BT: boolean;
		};
	}>({});
	const [selectedDate, setSelectedDate] = React.useState<DateData | null>(null);

	const { data, isError, isLoading } = useQuery({
		queryKey: ['plan'],
		queryFn: async () => fetchPlan(getClaimBySubstring(session?.toString() || '', 'sub')),
	});

	useEffect(() => {
		if (data) {
			const startDate = new Date(data.startDate);
			const endDate = new Date(data.endDate);
			const markedDaysOfWeek = {
				weightMeasurementDays: [...data.weightMeasurementDays],
				bloodSugarMeasurementDays: [...data.bloodSugarMeasurementDays],
				bloodPressureMeasurementDays: [...data.bloodPressureMeasurementDays],
				oxygenSaturationMeasurementDays: [...data.oxygenSaturationMeasurementDays],
				bodyTemperatureMeasurementDays: [...data.bodyTemperatureMeasurementDays],
			};
			const currentDate = new Date(startDate);

			while (currentDate <= endDate) {
				const dayOfWeek = currentDate.getDay();
				const dateNow = new Date();

				let borderColor = '#e3e3e3';

				if (currentDate > dateNow) {
					borderColor = DARK_GREEN;
				}
				// Checks if any measurement is scheduled for this day of the week and adds to marked
				if (
					markedDaysOfWeek.weightMeasurementDays[dayOfWeek] ||
					markedDaysOfWeek.bloodSugarMeasurementDays[dayOfWeek] ||
					markedDaysOfWeek.bloodPressureMeasurementDays[dayOfWeek] ||
					markedDaysOfWeek.oxygenSaturationMeasurementDays[dayOfWeek] ||
					markedDaysOfWeek.bodyTemperatureMeasurementDays[dayOfWeek]
				) {
					const formattedDate = currentDate.toISOString().split('T')[0];
					setMarkedDates((prevMarkedDates) => ({
						...prevMarkedDates,
						[formattedDate]: {
							customStyles: {
								container: {
									borderColor: borderColor,
									borderWidth: 1.5,
									width: 40,
									height: 40,
									borderRadius: '50%',
									top: -1,
								},
							},
							BW: markedDaysOfWeek.weightMeasurementDays[dayOfWeek] ? true : false,
							BS: markedDaysOfWeek.bloodSugarMeasurementDays[dayOfWeek]
								? true
								: false,
							BP: markedDaysOfWeek.bloodPressureMeasurementDays[dayOfWeek]
								? true
								: false,
							BT: markedDaysOfWeek.bodyTemperatureMeasurementDays[dayOfWeek]
								? true
								: false,
							OS: markedDaysOfWeek.oxygenSaturationMeasurementDays[dayOfWeek]
								? true
								: false,
						},
					}));
				}
				currentDate.setDate(currentDate.getDate() + 1);
			}
		}
	}, [data]);

	const handleArrow = (direction: string) => {
		if (direction === 'left') {
			return <HvImage source={'Back'} size={34} />;
		} else if (direction === 'right') {
			return <HvImage source={'Forward'} size={34} />;
		}
	};

	const handleSelectDay = (day: DateData) => {
		if (selectedDate?.dateString === day.dateString) {
			setSelectedDate(null);
		} else {
			setSelectedDate(day);
		}
	};

	LocaleConfig.locales['is'] = {
		monthNames: [
			'Janúar',
			'Febrúar',
			'Mars',
			'Apríl',
			'Maí',
			'Júní',
			'Júlí',
			'Ágúst',
			'Sepember',
			'Október',
			'Nóvember',
			'Desember',
		],
		dayNames: [
			'Sunnudagur',
			'Mánudagur',
			'Þriðjudagur',
			'Miðvikudagur',
			'Fimmtudagur',
			'Föstudagur',
			'Laugardagur',
		],
		dayNamesShort: ['SUN', 'MÁN', 'ÞRI', 'MIÐ', 'FIM', 'FÖS', 'LAU'],
	};

	LocaleConfig.locales['us'] = {
		monthNames: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		],
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		dayNamesShort: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
	};

	LocaleConfig.locales['pl'] = {
		monthNames: [
			'Styczeń',
			'Luty',
			'Marzec',
			'Kwiecień',
			'Maj',
			'Czerwiec',
			'Lipiec',
			'Sierpień',
			'Wrzesień',
			'Październik',
			'Listopad',
			'Grudzień',
		],
		dayNames: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
		dayNamesShort: ['NIE', 'PON', 'WTO', 'ŚRO', 'CZW', 'PIĄ', 'SOB'],
	};

	LocaleConfig.defaultLocale = i18n.language;

	if (isError) return <ErrorView />;

	if (isLoading) return <LoadingView />;

	return (
		<View style={STYLES.defaultView}>
			<Calendar
				theme={{
					textSectionTitleDisabledColor: '#d9e1e8',
					todayTextColor: DARK_GREEN,
					dayTextColor: DARK_GREEN,
					monthTextColor: DARK_GREEN,
					selectedDayBackgroundColor: DARK_GREEN,
					textDayFontFamily: 'OpenSans',
					textMonthFontFamily: 'OpenSansSemibold',
					textDayHeaderFontFamily: 'OpenSans',
					textDayFontSize: 22,
					textMonthFontSize: 22,
					textDayHeaderFontSize: 12,
				}}
				style={{
					borderRadius: 10,
					paddingBottom: 10,
					boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
				}}
				renderArrow={(direction: string) => handleArrow(direction)}
				hideExtraDays={true}
				markingType={'custom'}
				markedDates={{
					...markedDates,
					[new Date().toISOString().split('T')[0]]: {
						// marked: true,
						customStyles: {
							container: {
								// boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.25)',
								backgroundColor: '#e3e3e3',
								width: 40,
								height: 40,
								borderRadius: '50%',
								top: -0.5,
							},
							text: {
								fontWeight: 'bold',
							},
						},
					},
					//selected date
					[selectedDate?.dateString || '']: {
						customStyles: {
							container: {
								backgroundColor: DARK_GREEN,
								width: 40,
								height: 40,
								borderRadius: '50%',
								top: -0.5,
							},
							text: {
								color: '#fff',
							},
						},
					},
				}}
				onDayPress={(day: DateData) => {
					handleSelectDay(day);
				}}
			/>
			{selectedDate && selectedDate.dateString in markedDates && (
				<HvCard padding={12} gap={8}>
					<HvText weight='semibold' size='l'>
						{formatDate(selectedDate.dateString)}
					</HvText>

					{markedDates[selectedDate.dateString].BW && (
						<View style={Styles.todo}>
							<HvImage source={'BodyWeight'} size={30} />
							<HvText>{`${i18n.t('measurements.plan.bw')}`}</HvText>
						</View>
					)}
					{markedDates[selectedDate.dateString].BS && (
						<View style={Styles.todo}>
							<HvImage source={'BloodSugar'} size={30} />
							<HvText>{`${i18n.t('measurements.plan.bs')}`}</HvText>
						</View>
					)}
					{markedDates[selectedDate.dateString].BP && (
						<View style={Styles.todo}>
							<HvImage source={'BloodPressure'} size={30} />
							<HvText>{`${i18n.t('measurements.plan.bp')}`}</HvText>
						</View>
					)}
					{markedDates[selectedDate.dateString].OS && (
						<View style={Styles.todo}>
							<HvImage source={'OxygenSaturation'} size={30} />
							<HvText>{`${i18n.t('measurements.plan.os')}`}</HvText>
						</View>
					)}
					{markedDates[selectedDate.dateString].BT && (
						<View style={Styles.todo}>
							<HvImage source={'BodyTemperature'} size={30} />
							<HvText>{`${i18n.t('measurements.plan.bt')}`}</HvText>
						</View>
					)}
				</HvCard>
			)}
		</View>
	);
};

const Styles = StyleSheet.create({
	todo: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		paddingLeft: 10,
	},
});

export default Plan;
