import {
	BLOODPRESSURE_URL,
	BLOODSUGAR_URL,
	BODYTEMPERATURE_URL,
	BODYWEIGHT_URL,
	OXYGENSATURATION_URL,
} from '@/constants/api';
import {
	IBloodPressure,
	IBloodSugar,
	IBodyTemperature,
	IBodyWeight,
	IOxygenSaturation,
	IPatchBloodPressure,
	IPatchBloodSugar,
	IPatchBodyTemperature,
	IPatchBodyWeight,
	IPatchOxygenSaturation,
} from '@/interfaces/measurements';
import { isExpired } from '@/utility/utility';
import axios from 'axios';

/**
 * Patch oxygen saturation measurements for a patient.
 * @param itemId - The ID of the item to patch
 * @param measurement - The measurement data to patch
 * @param token - The authentication token
 * @returns The patched oxygen saturation measurement
 */
export const patchOxygenSaturation = async (
	itemId: string,
	measurement: IPatchOxygenSaturation,
	token: string,
): Promise<IOxygenSaturation> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.patch(`${OXYGENSATURATION_URL}/${itemId}`, measurement, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error patching oxygen saturation:', error);
		throw error;
	}
};

/**
 * Patch blood sugar measurements for a patient.
 * @param itemId - The ID of the item to patch
 * @param measurement - The measurement data to patch
 * @param token - The authentication token
 * @returns The patched blood sugar measurement
 */
export const patchBloodSugar = async (
	itemId: string,
	measurement: IPatchBloodSugar,
	token: string,
): Promise<IBloodSugar> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.patch(`${BLOODSUGAR_URL}/${itemId}`, measurement, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error patching blood sugar:', error);
		throw error;
	}
};

/**
 * Patch body temperature measurements for a patient.
 * @param itemId - The ID of the item to patch
 * @param measurement - The measurement data to patch
 * @param token - The authentication token
 * @returns The patched body temperature measurement
 */
export const patchTemperature = async (
	itemId: string,
	measurement: IPatchBodyTemperature,
	token: string,
): Promise<IBodyTemperature> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.patch(`${BODYTEMPERATURE_URL}/${itemId}`, measurement, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error patching temperature:', error);
		throw error;
	}
};

/**
 * Patch body weight measurements for a patient.
 * @param itemId - The ID of the item to patch
 * @param measurement - The measurement data to patch
 * @param token - The authentication token
 * @returns The patched body weight measurement
 */
export const patchBloodPressure = async (
	itemId: string,
	measurement: IPatchBloodPressure,
	token: string,
): Promise<IBloodPressure> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.patch(`${BLOODPRESSURE_URL}/${itemId}`, measurement, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error patching blood pressure:', error);
		throw error;
	}
};

/**
 * Patch body weight measurements for a patient.
 * @param itemId - The ID of the item to patch
 * @param measurement - The measurement data to patch
 * @param token - The authentication token
 * @returns The patched body weight measurement
 */
export const patchBodyWeight = async (
	itemId: string,
	measurement: IPatchBodyWeight,
	token: string,
): Promise<IBodyWeight> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.patch(`${BODYWEIGHT_URL}/${itemId}`, measurement, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error patching weight:', error);
		throw error;
	}
};
