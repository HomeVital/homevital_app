import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { EventSubscription } from 'expo-modules-core';

// Configure how notifications appear when app is in foreground
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: false,
		shouldPlaySound: false,
		shouldSetBadge: false,
		shouldShowInForeground: false,
	}),
});

interface PlanData {
	planItemId: string;
	type: string;
}

export interface PlanNotification {
	id: string;
	title: string;
	body: string;
	data?: PlanData;
	trigger: Notifications.NotificationTriggerInput;
}

export class NotificationService {
	private static foregroundSubscription: EventSubscription | null = null;
	private static notificationReceivedCallback:
		| ((notification: Notifications.Notification) => void)
		| null = null;

	static addForegroundNotificationListener(
		callback: (notification: Notifications.Notification) => void,
	): void {
		// Remove any existing subscription to prevent memory leaks
		if (this.foregroundSubscription) {
			this.foregroundSubscription.remove();
		}

		this.notificationReceivedCallback = callback;
		this.foregroundSubscription = Notifications.addNotificationReceivedListener(
			(notification) => {
				if (this.notificationReceivedCallback) {
					this.notificationReceivedCallback(notification);
				}
			},
		);
	}

	/**
	 * Remove the foreground notification listener
	 */
	static removeForegroundNotificationListener(): void {
		if (this.foregroundSubscription) {
			this.foregroundSubscription.remove();
			this.foregroundSubscription = null;
		}
		this.notificationReceivedCallback = null;
	}

	/**
	 * Request permission to send notifications
	 */
	static async requestPermissions(): Promise<boolean> {
		const { status: existingStatus } = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;

		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}

		if (finalStatus !== 'granted') {
			return false;
		}

		if (Platform.OS === 'android') {
			await Notifications.setNotificationChannelAsync('default', {
				name: 'Default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 300, 300, 300],
				lightColor: '#FF231F7C',
			});
		}

		return true;
	}

	/**
	 * Schedule a notification
	 */
	static async scheduleNotification(notification: PlanNotification): Promise<string> {
		try {
			const id = await Notifications.scheduleNotificationAsync({
				content: {
					title: notification.title,
					body: notification.body,
					data: notification.data || {},
					sound: true,
				},
				trigger: notification.trigger,
				identifier: notification.id,
			});

			return id;
		} catch (error) {
			console.error('Error scheduling notification:', error);
			throw error;
		}
	}

	/**
	 * Cancel all scheduled notifications
	 */
	static async cancelAllNotifications(): Promise<void> {
		await Notifications.cancelAllScheduledNotificationsAsync();
	}

	/**
	 * Cancel a specific notification by ID
	 */
	static async cancelNotification(id: string): Promise<void> {
		await Notifications.cancelScheduledNotificationAsync(id);
	}

	/**
	 * Get all scheduled notifications
	 */
	static async getAllScheduledNotifications(): Promise<Notifications.NotificationRequest[]> {
		return await Notifications.getAllScheduledNotificationsAsync();
	}
}
