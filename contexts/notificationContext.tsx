import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as Notifications from 'expo-notifications';
import { NotificationService } from '@/utility/notificationService';
import { useStorageState } from '@/hooks/useStorageState';
import { showToastNotification } from '@/utility/utility';

interface NotificationContextType {
	notificationsActive?: string | null;
	getNotificationState: () => boolean;
	setNotificationsOn: (value: string | null) => void;
	loading: boolean;
	language: string | null;
	setLanguage: (value: string | null) => void;
	loading2: boolean;
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
	// const [notificationsActive, setNotificationsActive] = useState(true);
	const [[loading, notificationsActive], setNotificationsActive] =
		useStorageState('notificationsActive');
	const [[loading2, language], setLanguage] = useStorageState('language');
	const [notifications, setNotifications] = useState<Notifications.Notification[]>([]);
	const [notificationCount, setNotificationCount] = useState<number>(0);

	useEffect(() => {
		// Set up listener for notifications received while app is in foreground
		NotificationService.addForegroundNotificationListener((notification) => {
			setNotifications((prevNotifications) => [notification, ...prevNotifications]);
			setNotificationCount((prevCount) => prevCount + 1);
			showToastNotification(
				notification.request.content.title ?? '',
				notification.request.content.body ?? '',
			);
		});

		// Clean up the listener when component unmounts
		return () => {
			NotificationService.removeForegroundNotificationListener();
		};
	}, []);
	return (
		<NotificationContext.Provider
			value={{
				notifications,
				setNotifications,
				notificationCount,
				setNotificationCount,
				loading,
				notificationsActive,
				setNotificationsOn: (value: string | null) => {
					setNotificationsActive(value);
				},
				getNotificationState: () => {
					return notificationsActive ? false : true;
				},
				loading2,
				language,
				setLanguage: (value: string | null) => {
					setLanguage(value);
				},
			}}
		>
			{children}
		</NotificationContext.Provider>
	);
};

export default NotificationProvider;
