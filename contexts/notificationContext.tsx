import React, { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';

import * as Notifications from 'expo-notifications';

// import { Subscription } from 'expo-modules-core';

import { registerForPushNotificationsAsync } from '@/utility/registerForPushNotificationsAsync';

interface NotificationContextType {
	expoPushToken: string | null;

	notification: Notifications.Notification | null;

	error: Error | null;

	// requestNotificationPermission: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = (): NotificationContextType => {
	const context = useContext(NotificationContext);

	if (context === undefined) {
		throw new Error('useNotification must be used within a NotificationProvider');
	}

	return context;
};

interface NotificationProviderProps {
	children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
	const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

	const [notification, setNotification] = useState<Notifications.Notification | null>(null);

	const [error, setError] = useState<Error | null>(null);

	const notificationListener = useRef<Notifications.Subscription | null>(null);

	const responseListener = useRef<Notifications.Subscription | null>(null);

	useEffect(() => {
		registerForPushNotificationsAsync().then(
			(token) => {
				setExpoPushToken(token ?? null);
			},

			(error) => setError(error),
		);

		notificationListener.current = Notifications.addNotificationReceivedListener(
			(notification) => {
				setNotification(notification);
			},
		);

		responseListener.current = Notifications.addNotificationResponseReceivedListener(
			(response) => {
				console.log(
					'notification response received, user interacted with the notification: ',

					JSON.stringify(response, null, 2),

					JSON.stringify(response.notification.request.content.data, null, 2),
				);
			},
		);

		return () => {
			if (notificationListener.current) {
				Notifications.removeNotificationSubscription(notificationListener.current);
			}

			if (responseListener.current) {
				Notifications.removeNotificationSubscription(responseListener.current);
			}
		};
	}, []);

	return (
		<NotificationContext.Provider
			value={{
				expoPushToken,

				notification,

				error,
			}}
		>
			{children}
		</NotificationContext.Provider>
	);
};

export default NotificationProvider;
