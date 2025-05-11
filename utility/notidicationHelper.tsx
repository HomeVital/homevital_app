import { NotificationService, PlanNotification } from './notificationService';

// Define a type for plan items (adjust based on your actual plan structure)
export interface PlanItem {
	id: string;
	title: string;
	description: string;
	scheduledTime: string; // ISO format date string
	type: string;
	// Add any other plan item properties
}

export const schedulePlanNotifications = async (planItems: PlanItem[]): Promise<void> => {
	try {
		// Request permissions first
		const hasPermission = await NotificationService.requestPermissions();
		if (!hasPermission) {
			return;
		}

		// Cancel any existing notifications to avoid duplicates
		await NotificationService.cancelAllNotifications();

		// Schedule new notifications for each plan item
		for (const item of planItems) {
			const scheduledDate = new Date(item.scheduledTime);

			// Only schedule future notifications
			if (scheduledDate > new Date()) {
				const notification: PlanNotification = {
					id: `plan-${item.id}`,
					title: item.title,
					body: item.description,
					data: { planItemId: item.id, type: item.type },
					trigger: {
						channelId: 'default',
						date: scheduledDate,
					},
				};

				await NotificationService.scheduleNotification(notification);
			}
		}
	} catch (error) {
		console.error('Error scheduling plan notifications:', error);
	}
};

// // Helper function to schedule medication reminders
// export const scheduleMedicationReminders = async (medications: any[]): Promise<void> => {
// 	// Implementation depends on your medication data structure
// 	// This is just a placeholder

// 	try {
// 		for (const med of medications) {
// 			// Example: Schedule daily medication reminders
// 			if (med.frequency === 'daily') {
// 				const [hours, minutes] = med.time.split(':');

// 				const notification: PlanNotification = {
// 					id: `med-${med.id}`,
// 					title: t('notifications.medicationReminder'),
// 					body: `${t('notifications.timeToTake')} ${med.name}`,
// 					data: { medicationId: med.id },
// 					trigger: {
// 						channelId: 'default',
// 						hour: parseInt(hours, 10),
// 						minute: parseInt(minutes, 10),
// 						repeats: true,
// 					},
// 				};

// 				await NotificationService.scheduleNotification(notification);
// 			}
// 		}
// 	} catch (error) {
// 		console.error('Error scheduling medication reminders:', error);
// 	}
// };
