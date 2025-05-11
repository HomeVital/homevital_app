import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as Notifications from 'expo-notifications';
import { NotificationService } from '@/utility/notificationService';

interface NotificationContextType {
	notifications: Notifications.Notification[];
	setNotifications: React.Dispatch<React.SetStateAction<Notifications.Notification[]>>;
	notificationCount: number;
	setNotificationCount: React.Dispatch<React.SetStateAction<number>>;
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
	const [notifications, setNotifications] = useState<Notifications.Notification[]>([]);
	const [notificationCount, setNotificationCount] = useState<number>(0);

	useEffect(() => {
		// Set up listener for notifications received while app is in foreground
		NotificationService.addForegroundNotificationListener((notification) => {
			setNotifications((prevNotifications) => [...prevNotifications, notification]);
			setNotificationCount((prevCount) => prevCount + 1);
		});

		// Clean up the listener when component unmounts
		return () => {
			NotificationService.removeForegroundNotificationListener();
		};
	}, []);
	return (
		<NotificationContext.Provider
			value={{ notifications, setNotifications, notificationCount, setNotificationCount }}
		>
			{children}
		</NotificationContext.Provider>
	);
};

export default NotificationProvider;
