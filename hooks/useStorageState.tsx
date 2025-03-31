import { useEffect, useCallback, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

/**
 * Hook to get and set async state
 * @param initialValue - initial value of the state
 * @returns state and function to set the state
 */
const useAsyncState = <T,>(initialValue: [boolean, T | null] = [true, null]): UseStateHook<T> => {
	return useReducer(
		(state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [
			false,
			action,
		],
		initialValue,
	) as UseStateHook<T>;
};

/**
 * Set item in storage
 * @param key - key to store the item under
 * @param value - value to store
 */
export const setStorageItemAsync = async (key: string, value: string | null): Promise<void> => {
	if (Platform.OS === 'web') {
		try {
			if (value === null) {
				localStorage.removeItem(key);
			} else {
				localStorage.setItem(key, value);
			}
		} catch (e) {
			console.error('Local storage is unavailable:', e);
		}
	} else {
		if (value == null) {
			await SecureStore.deleteItemAsync(key);
		} else {
			await SecureStore.setItemAsync(key, value);
		}
	}
};

/**
 * Hook to get and set state in storage
 * @param key - key to store the state under
 * @returns state and function to set the state
 */
export const useStorageState = (key: string): UseStateHook<string> => {
	// Public
	const [state, setState] = useAsyncState<string>();

	// Get
	useEffect(() => {
		if (Platform.OS === 'web') {
			try {
				if (typeof localStorage !== 'undefined') {
					setState(localStorage.getItem(key));
				}
			} catch (e) {
				console.error('Local storage is unavailable:', e);
			}
		} else {
			SecureStore.getItemAsync(key).then((value) => {
				setState(value);
			});
		}
	}, [key, setState]);

	// Set
	const setValue = useCallback(
		(value: string | null) => {
			setState(value);
			setStorageItemAsync(key, value);
		},
		[key, setState],
	);

	return [state, setValue];
};
