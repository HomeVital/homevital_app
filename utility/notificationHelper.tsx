import { IPlan, PlanItem } from '@/interfaces/patient';
import { NotificationService, PlanNotification } from './notificationService';
import * as Notifications from 'expo-notifications';

/**
 * Schedules notifications for the given plan.
 * @param {IPlan} plan - The plan containing the measurement days.
 * @param {function} t - Translation function.
 */
export const scheduleNotifications = async (
	plan: IPlan,
	t: (key: string, options?: Record<string, unknown>) => string,
	todayMeasurements: string[],
): Promise<void> => {
	try {
		//
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
				// morning
				const planSetDate = new Date(currentDate);
				planSetDate.setHours(8, 0, 0, 0); // 8:00
				planItems.push({
					id: planItems.length.toString(),
					title: t('notifications.title'),
					description: t('notifications.message', { count: measurementCounter }),
					scheduledTime: new Date(planSetDate).toISOString(),
					type: 'measurements',
				});
				// afternoon reminder
				const planSetDate2 = new Date(currentDate);
				planSetDate2.setHours(17, 0, 0, 0); // 17:00
				// if today, check if already done with the measurements
				if (planSetDate2.toDateString() === new Date().toDateString()) {
					if (
						todayMeasurements.length > 0 &&
						todayMeasurements.length < measurementCounter
					) {
						let todayStringMeasurements = '';
						for (let i = 0; i < todayMeasurements.length; i++) {
							todayStringMeasurements += `${t('measurements.' + todayMeasurements[i][0].toLowerCase() + todayMeasurements[i].slice(1))}`;
							if (i < todayMeasurements.length - 1) {
								todayStringMeasurements += ', ';
							}
						}
						// some missing
						planItems.push({
							id: (planItems.length + 1000).toString(),
							title: t('notifications.titleReminderMissing'),
							description: todayStringMeasurements,
							scheduledTime: new Date(planSetDate2).toISOString(),
							type: 'measurements',
						});
					} else if (todayMeasurements.length === 0) {
						// all missing
						planItems.push({
							id: (planItems.length + 1000).toString(),
							title: t('notifications.titleReminder'),
							description: t('notifications.messageReminder', {
								count: measurementCounter,
							}),
							scheduledTime: new Date(planSetDate2).toISOString(),
							type: 'measurements',
						});
					}
				} else {
					planItems.push({
						id: (planItems.length + 1000).toString(),
						title: t('notifications.titleReminder'),
						description: t('notifications.messageReminder', {
							count: measurementCounter,
						}),
						scheduledTime: new Date(planSetDate2).toISOString(),
						type: 'measurements',
					});
				}
			}

			currentDate.setDate(currentDate.getDate() + 1);
			scheduleCounter++;
		}

		// planItems.push({
		// 	id: Math.floor(Math.random() * 10000 + 1).toString(),
		// 	title: t('notifications.titleReminder'),
		// 	description: t('notifications.messageReminder', { count: 4 }),
		// 	scheduledTime: new Date(new Date().getTime() + 5000).toISOString(),
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
						type: Notifications.SchedulableTriggerInputTypes.DATE,
						date: scheduledDate,
					},
				};

				await NotificationService.scheduleNotification(notification);
				//
			}
		}
	} catch (error) {
		console.error('Error scheduling notifications:', error);
	}
};
