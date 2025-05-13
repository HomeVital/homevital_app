import {
	BLOODPRESSURE_URL,
	BLOODSUGAR_URL,
	BODYTEMPERATURE_URL,
	BODYWEIGHT_URL,
	OXYGENSATURATION_URL,
} from '@/constants/api';
import {
	IAddBloodPressure,
	IAddBloodSugar,
	IAddBodyTemperature,
	IAddBodyWeight,
	IAddOxygenSaturation,
	IBloodPressure,
} from '@/interfaces/measurements';
import { isExpired } from '@/utility/utility';
import axios from 'axios';

/**
 * Post a new blood sugar measurement.
 * @param measurement - The measurement data to post
 * @param token - The authentication token
 * @returns The posted blood sugar measurement
 */
export const postBloodSugar = async (
	measurement: IAddBloodSugar,
	token: string,
): Promise<IAddBloodSugar> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.post(
			`${BLOODSUGAR_URL}/${measurement.patientID}`,
			measurement,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error posting blood sugar:', error);
		throw error;
	}
};

/**
 * Post a new oxygen saturation measurement.
 * @param measurement - The measurement data to post
 * @param token - The authentication token
 * @returns The posted oxygen saturation measurement
 */
export const postOxygenSaturation = async (
	measurement: IAddOxygenSaturation,
	token: string,
): Promise<IAddOxygenSaturation> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.post(
			`${OXYGENSATURATION_URL}/${measurement.patientID}`,
			measurement,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error posting oxygen saturation:', error);
		throw error;
	}
};

/**
 * Post a new blood pressure measurement.
 * @param measurement - The measurement data to post
 * @param token - The authentication token
 * @returns The posted blood pressure measurement
 */
export const postBloodPressure = async (
	measurement: IAddBloodPressure,
	token: string,
): Promise<IBloodPressure> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.post(
			`${BLOODPRESSURE_URL}/${measurement.patientID}`,
			measurement,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error posting blood pressure:', error);
		throw error;
	}
};

/**
 * Post a new body temperature measurement.
 * @param measurement - The measurement data to post
 * @param token - The authentication token
 * @returns The posted body temperature measurement
 */
export const postBodyTemperature = async (
	measurement: IAddBodyTemperature,
	token: string,
): Promise<IAddBodyTemperature> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.post(
			`${BODYTEMPERATURE_URL}/${measurement.patientID}`,
			measurement,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error posting body temperature:', error);
		throw error;
	}
};

/**
 * Post a new body weight measurement.
 * @param measurement - The measurement data to post
 * @param token - The authentication token
 * @returns The posted body weight measurement
 */
export const postBodyWeight = async (
	measurement: IAddBodyWeight,
	token: string,
): Promise<IAddBodyWeight> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.post(
			`${BODYWEIGHT_URL}/${measurement.patientID}`,
			measurement,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Error posting body weight:', error);
		throw error;
	}
};
