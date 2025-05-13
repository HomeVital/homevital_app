import HvImage from '@/components/ui/hvImage';
import HvText from '@/components/ui/hvText';
import { DARK_GREEN, DARK_RED, WHITE } from '@/constants/colors';
import { IMeasurement } from '@/interfaces/measurements';
import { IPlan } from '@/interfaces/patient';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { View } from 'react-native';
import Toast, { BaseToastProps } from 'react-native-toast-message';

/**
 * Formats a date string into a more readable format.
 * @param dateString - The date string to format.
 * @param hour - Optional parameter to include hours and minutes in the format.
 * @returns The formatted date string.
 * @example '2025-06-01T12:00:00Z' => '01.06.2025, 12:00'
 */
export const formatDate = (dateString: string, hour?: boolean): string => {
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	if (hour) {
		return `${day}.${month}.${year}, ${hours}:${minutes}`;
	}
	return `${day}.${month}.${year}`;
};

type JWTClaims = {
	[key: string]: never;
};

/**
 * Retrieves claims from a JWT token based on a substring match.
 * @param token - The JWT token to decode.
 * @param includes - Optional array of substrings to include in the claims.
 * @returns - The filtered claims from the token.
 */
export function getClaimsBySubstring(token: string, includes?: string[]): Partial<JWTClaims> {
	const payload = jwtDecode<JWTClaims>(token);

	if (!includes || includes.length === 0) return payload;

	const filtered: Partial<JWTClaims> = {};
	for (const key in payload) {
		if (includes.some((sub) => key.includes(sub))) {
			filtered[key] = payload[key];
		}
	}
	return filtered;
}

/**
 * Retrieves a specific claim from a JWT token based on a substring match.
 * @param token - The JWT token to decode.
 * @param includes - The substring to include in the claim key.
 * @returns - The value of the claim if found, otherwise '-1'.
 */
export const getClaimBySubstring = (token: string, includes: string): string => {
	const payload = jwtDecode<JWTClaims>(token);

	if (!includes) return '';

	for (const key in payload) {
		if (key.includes(includes)) {
			return payload[key];
		}
	}

	return '-1';
};

/**
 * Checks if a JWT token is expired.
 * @param token - The JWT token to check.
 * @returns - True if the token is expired, otherwise false.
 */
export const isExpired = (token: string): boolean => {
	const payload = jwtDecode<JWTClaims>(token);
	const exp = payload.exp as number;
	const now = Math.floor(Date.now() / 1000);
	return exp < now;
};

let toastTimeoutId: NodeJS.Timeout | null = null;

/**
 * Hides the toast message after a specified delay.
 * @param doHide - Boolean indicating whether to hide the toast.
 * @param delay - Delay in milliseconds before hiding the toast.
 */
export const hideToastWithTimeout = (doHide: boolean, delay = 2000): void => {
	// Clear any existing timeout first
	if (toastTimeoutId) {
		clearTimeout(toastTimeoutId);
		toastTimeoutId = null;
	}

	// Set a new timeout
	toastTimeoutId = setTimeout(() => {
		if (doHide) {
			Toast.hide();
		}
		toastTimeoutId = null;
	}, delay);
};

/**
 * Returns a custom toast config.
 * @param type - The type of the toast message.
 * @param header - The header text of the toast message.
 * @param content - The content of the toast message.
 */
export const toastConfig = {
	useCustomWarning: ({ ...props }: BaseToastProps): JSX.Element => {
		const [doHide, setDoHide] = useState(true);
		hideToastWithTimeout(doHide);

		return (
			<View
				style={{
					height: 90,
					width: 380,
					backgroundColor: DARK_RED,
					borderRadius: 10,
					paddingVertical: 20,
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
				onTouchStart={() => {
					setDoHide(false);
				}}
				onTouchEnd={() => {
					Toast.hide();
					setTimeout(() => setDoHide(true), 200);
				}}
			>
				<HvText color='white' weight='bold' size='m'>
					{props.text1}
				</HvText>
				<HvText color='white' weight='normal' size='s'>
					{props.text2}
				</HvText>
			</View>
		);
	},

	useCustomNotification: ({ ...props }: BaseToastProps): JSX.Element => {
		const [doHide, setDoHide] = useState(true);
		hideToastWithTimeout(doHide, 4000);

		return (
			<View
				style={{
					height: 90,
					width: 380,
					backgroundColor: WHITE,
					borderRadius: 10,
					paddingVertical: 20,
					paddingHorizontal: 20,
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'center',
					gap: 20,
					borderColor: DARK_GREEN,
					borderWidth: 2,
				}}
				onTouchStart={() => {
					setDoHide(false);
				}}
				onTouchEnd={() => {
					Toast.hide();
					setTimeout(() => setDoHide(true), 200);
				}}
			>
				<HvImage source='NotificationBell' size={24} />
				<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
					<HvText weight='bold' size='m'>
						{props.text1}
					</HvText>
					<HvText weight='normal' size='s'>
						{props.text2}
					</HvText>
				</View>
			</View>
		);
	},
};

/**
 * Displays a custom warning toast message.
 * @returns - A toast message indicating that changes can only be made within 24 hours.
 */
export const showToastWarning = (header: string, content: string): void => {
	Toast.show({
		type: 'useCustomWarning',
		text1: header,
		text2: content,
		avoidKeyboard: true,
		text1Style: {
			fontSize: 18,
			fontWeight: 'bold',
		},
		text2Style: {
			fontSize: 14,
			fontWeight: 'normal',
		},
		autoHide: false,
	});
};

/**
 * Displays a custom warning toast message.
 * @returns - A toast message indicating that you got a notification.
 */
export const showToastNotification = (header: string, content: string): void => {
	Toast.show({
		type: 'useCustomNotification',
		text1: header,
		text2: content,
		avoidKeyboard: true,
		text1Style: {
			fontSize: 16,
			fontWeight: 'bold',
		},
		text2Style: {
			fontSize: 12,
			fontWeight: 'normal',
		},
		autoHide: false,
	});
};

/**
 * Filters measurements done today from a list of recent measurements.
 * @param recentMeasurements - The list of recent measurements.
 * @returns - An array of measurements done today.
 */
export const measurementsDoneToday = (
	recentMeasurements: IMeasurement[] | undefined,
): IMeasurement[] => {
	const todayMeasurements = recentMeasurements?.filter((measurement) => {
		const measurementDate = new Date(measurement.measurementDate);
		const today = new Date();
		return (
			measurementDate.getDate() === today.getDate() &&
			measurementDate.getMonth() === today.getMonth() &&
			measurementDate.getFullYear() === today.getFullYear()
		);
	});
	return todayMeasurements ?? [];
};

/**
 * Checks which measurements are left to be done today based on the schedule.
 * @param recentMeasurements - The list of recent measurements.
 * @param schedule - The schedule containing measurement days.
 * @returns - An array of measurements left to be done today.
 */
export const measurementsLeftToday = (
	recentMeasurements: IMeasurement[] | undefined,
	schedule: IPlan | null | undefined,
): string[] => {
	const todayMeasurements = measurementsDoneToday(recentMeasurements);
	const today = new Date();
	const weekday = today.getDay();

	const todayMeasurementsLeft = [] as string[];

	if (
		schedule &&
		schedule.endDate &&
		today <= new Date(schedule.endDate) &&
		schedule.startDate &&
		today >= new Date(schedule.startDate)
	) {
		if (schedule.weightMeasurementDays[weekday]) {
			if (todayMeasurements && todayMeasurements.length > 0) {
				let found = false;
				for (let i = 0; i < todayMeasurements.length; i++) {
					if (todayMeasurements[i].measurementType === 'BodyWeight') {
						found = true;
						break;
					}
				}
				if (!found) {
					todayMeasurementsLeft.push('BodyWeight');
				}
			} else {
				todayMeasurementsLeft.push('BodyWeight');
			}
		}
		if (schedule.bloodSugarMeasurementDays[weekday]) {
			if (todayMeasurements && todayMeasurements.length > 0) {
				let found = false;
				for (let i = 0; i < todayMeasurements.length; i++) {
					if (todayMeasurements[i].measurementType === 'BloodSugar') {
						found = true;
						break;
					}
				}
				if (!found) {
					todayMeasurementsLeft.push('BloodSugar');
				}
			} else {
				todayMeasurementsLeft.push('BloodSugar');
			}
		}
		if (schedule.bloodPressureMeasurementDays[weekday]) {
			if (todayMeasurements && todayMeasurements.length > 0) {
				let found = false;
				for (let i = 0; i < todayMeasurements.length; i++) {
					if (todayMeasurements[i].measurementType === 'BloodPressure') {
						found = true;
						break;
					}
				}
				if (!found) {
					todayMeasurementsLeft.push('BloodPressure');
				}
			} else {
				todayMeasurementsLeft.push('BloodPressure');
			}
		}
		if (schedule.oxygenSaturationMeasurementDays[weekday]) {
			if (todayMeasurements && todayMeasurements.length > 0) {
				let found = false;
				for (let i = 0; i < todayMeasurements.length; i++) {
					if (todayMeasurements[i].measurementType === 'OxygenSaturation') {
						found = true;
						break;
					}
				}
				if (!found) {
					todayMeasurementsLeft.push('OxygenSaturation');
				}
			} else {
				todayMeasurementsLeft.push('OxygenSaturation');
			}
		}
		if (schedule.bodyTemperatureMeasurementDays[weekday]) {
			if (todayMeasurements && todayMeasurements.length > 0) {
				let found = false;
				for (let i = 0; i < todayMeasurements.length; i++) {
					if (todayMeasurements[i].measurementType === 'BodyTemperature') {
						found = true;
						break;
					}
				}
				if (!found) {
					todayMeasurementsLeft.push('BodyTemperature');
				}
			} else {
				todayMeasurementsLeft.push('BodyTemperature');
			}
		}
	}
	return todayMeasurementsLeft;
};
