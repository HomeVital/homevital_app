import { Platform } from 'react-native';

import * as Notifications from 'expo-notifications';

import * as Device from 'expo-device';

import Constants from 'expo-constants';
import { GREEN } from '@/constants/colors';

export async function registerForPushNotificationsAsync(): Promise<string | void> {
	if (Platform.OS === 'android') {
		await Notifications.setNotificationChannelAsync('default', {
			name: 'default',

			importance: Notifications.AndroidImportance.MAX,

			vibrationPattern: [0, 250, 250, 250],

			lightColor: GREEN,
		});
	}

	if (Device.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();

		let finalStatus = existingStatus;

		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();

			finalStatus = status;
		}

		if (finalStatus !== 'granted') {
			console.error('Permission not granted to get push token for push notification!');

			return;
		}

		const projectId =
			Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;

		if (!projectId) {
			console.error('Project ID not found');
		}

		try {
			const pushTokenString = (
				await Notifications.getExpoPushTokenAsync({
					projectId,
				})
			).data;

			return pushTokenString;
		} catch (e: unknown) {
			console.error(`${e}`);
		}
	} else {
		console.error('Must use physical device for push notifications');
	}
}
