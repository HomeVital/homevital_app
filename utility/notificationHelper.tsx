import { IPlan, PlanItem } from '@/interfaces/patient';
import { NotificationService, PlanNotification } from './notificationService';
import * as Notifications from 'expo-notifications';

// Define a type for plan items (adjust based on your actual plan structure)

// export const getNotificationSchedule = (plan: IPlan): PlanItem[] => {
// 	const { t } = useTranslation();
//
// 	const planItems: PlanItem[] = [];
// 	const currentDate = new Date();

// 	let scheduleCounter = 0;
// 	while (currentDate <= new Date(plan.endDate) && scheduleCounter < 7) {
// 		const weekday = currentDate.getDay();
// 		let measurementCounter = 0;

// 		if (plan.weightMeasurementDays[weekday]) {
// 			measurementCounter++;
// 		}
// 		if (plan.bloodSugarMeasurementDays[weekday]) {
// 			measurementCounter++;
// 		}
// 		if (plan.bloodPressureMeasurementDays[weekday]) {
// 			measurementCounter++;
// 		}
// 		if (plan.oxygenSaturationMeasurementDays[weekday]) {
// 			measurementCounter++;
// 		}
// 		if (plan.bodyTemperatureMeasurementDays[weekday]) {
// 			measurementCounter++;
// 		}
// 		if (measurementCounter >= 1) {
// 			const planSetDate = new Date(currentDate);
// 			planSetDate.setHours(8, 0, 0, 0); // Set time to 8:00 AM
// 			planItems.push({
// 				id: planItems.length.toString(),
// 				title: t('notifications.title'),
// 				description: t('notifications.message', { count: measurementCounter }),
// 				scheduledTime: new Date(planSetDate).toISOString(),
// 				type: 'measurements',
// 			});
// 		}

// 		currentDate.setDate(currentDate.getDate() + 1);
// 		scheduleCounter++;
// 	}

// 	planItems.push({
// 		id: Math.floor(Math.random() * 10000 + 1).toString(),
// 		title: t('notifications.title'),
// 		description: t('notifications.message', { count: 4 }),
// 		scheduledTime: new Date(new Date().getTime() + 5000).toISOString(),
// 		type: 'test',
// 	});

// 	planItems.push({
// 		id: Math.floor(Math.random() * 10000 + 1).toString(),
// 		title: t('notifications.title'),
// 		description: t('notifications.message', { count: 1 }),
// 		scheduledTime: new Date(new Date().getTime() + 10000).toISOString(),
// 		type: 'test',
// 	});

// 	planItems.push({
// 		id: Math.floor(Math.random() * 10000 + 1).toString(),
// 		title: t('notifications.title'),
// 		description: t('notifications.message', { count: 3 }),
// 		scheduledTime: new Date(new Date().getTime() + 15000).toISOString(),
// 		type: 'test',
// 	});

// 	planItems.push({
// 		id: Math.floor(Math.random() * 10000 + 1).toString(),
// 		title: t('notifications.title'),
// 		description: t('notifications.message', { count: 4 }),
// 		scheduledTime: new Date(new Date().getTime() + 20000).toISOString(),
// 		type: 'test',
// 	});

// 	planItems.push({
// 		id: Math.floor(Math.random() * 10000 + 1).toString(),
// 		title: t('notifications.title'),
// 		description: t('notifications.message', { count: 2 }),
// 		scheduledTime: new Date(new Date().getTime() + 25000).toISOString(),
// 		type: 'test',
// 	});

// 	planItems.push({
// 		id: Math.floor(Math.random() * 10000 + 1).toString(),
// 		title: t('notifications.title'),
// 		description: t('notifications.message', { count: 2 }),
// 		scheduledTime: new Date(new Date().getTime() + 30000).toISOString(),
// 		type: 'test',
// 	});
//
// 	// scheduleNotifications(planItems);
// 	return planItems;
// };

// export const testFunc = async (plan: IPlan) => {
// 	const { t } = useTranslation();
//
// 	await scheduleNotifications(plan);
// };

export const scheduleNotifications = async (
	plan: IPlan,
	t: (key: string, options?: Record<string, unknown>) => string,
): Promise<void> => {
	try {
		// Request permissions first
		const hasPermission = await NotificationService.requestPermissions();
		if (!hasPermission) {
			return;
		}
		// Cancel any existing notifications to avoid duplicates
		await NotificationService.cancelAllNotifications();

		// Get the plan items to schedule
		const planItems: PlanItem[] = [];
		const currentDate = new Date();

		let scheduleCounter = 0;
		while (currentDate <= new Date(plan.endDate) && scheduleCounter < 7) {
			const weekday = currentDate.getDay();
			let measurementCounter = 0;

			if (plan.weightMeasurementDays[weekday]) {
				measurementCounter++;
			}
			if (plan.bloodSugarMeasurementDays[weekday]) {
				measurementCounter++;
			}
			if (plan.bloodPressureMeasurementDays[weekday]) {
				measurementCounter++;
			}
			if (plan.oxygenSaturationMeasurementDays[weekday]) {
				measurementCounter++;
			}
			if (plan.bodyTemperatureMeasurementDays[weekday]) {
				measurementCounter++;
			}
			if (measurementCounter >= 1) {
				const planSetDate = new Date(currentDate);
				planSetDate.setHours(8, 0, 0, 0); // Set time to 8:00 AM
				planItems.push({
					id: planItems.length.toString(),
					title: t('notifications.title'),
					description: t('notifications.message', { count: measurementCounter }),
					scheduledTime: new Date(planSetDate).toISOString(),
					type: 'measurements',
				});
			}

			currentDate.setDate(currentDate.getDate() + 1);
			scheduleCounter++;
		}

		// planItems.push({
		// 	id: Math.floor(Math.random() * 10000 + 1).toString(),
		// 	title: t('notifications.title'),
		// 	description: t('notifications.message', { count: 4 }),
		// 	scheduledTime: new Date(new Date().getTime() + 5000).toISOString(),
		// 	type: 'test',
		// });

		// planItems.push({
		// 	id: Math.floor(Math.random() * 10000 + 1).toString(),
		// 	title: t('notifications.title'),
		// 	description: t('notifications.message', { count: 1 }),
		// 	scheduledTime: new Date(new Date().getTime() + 10000).toISOString(),
		// 	type: 'test',
		// });

		// planItems.push({
		// 	id: Math.floor(Math.random() * 10000 + 1).toString(),
		// 	title: t('notifications.title'),
		// 	description: t('notifications.message', { count: 3 }),
		// 	scheduledTime: new Date(new Date().getTime() + 15000).toISOString(),
		// 	type: 'test',
		// });

		// planItems.push({
		// 	id: Math.floor(Math.random() * 10000 + 1).toString(),
		// 	title: t('notifications.title'),
		// 	description: t('notifications.message', { count: 4 }),
		// 	scheduledTime: new Date(new Date().getTime() + 20000).toISOString(),
		// 	type: 'test',
		// });

		// planItems.push({
		// 	id: Math.floor(Math.random() * 10000 + 1).toString(),
		// 	title: t('notifications.title'),
		// 	description: t('notifications.message', { count: 2 }),
		// 	scheduledTime: new Date(new Date().getTime() + 25000).toISOString(),
		// 	type: 'test',
		// });

		// planItems.push({
		// 	id: Math.floor(Math.random() * 10000 + 1).toString(),
		// 	title: t('notifications.title'),
		// 	description: t('notifications.message', { count: 2 }),
		// 	scheduledTime: new Date(new Date().getTime() + 30000).toISOString(),
		// 	type: 'test',
		// });

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
						// channelId: 'default',
						type: Notifications.SchedulableTriggerInputTypes.DATE,
						date: scheduledDate,
					},
				};

				await NotificationService.scheduleNotification(notification);
			}
		}
	} catch (error) {
		console.error('Error scheduling notifications:', error);
	}
};
