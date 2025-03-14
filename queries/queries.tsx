import {
	BLOODPRESSURE_URL,
	BLOODSUGAR_URL,
	BODYTEMPERATURE_URL,
	BODYWEIGHT_URL,
	LOGIN_URL,
	MOCK_LOGIN_URL,
	OXYGENSATURATION_URL,
	PATIENT_URL,
} from '@/constants/api';
import axios from 'axios';
import { IPatient } from '@/interfaces/patientInterfaces';
import { IBloodPressure } from '@/interfaces/bloodPressureInterfaces';
import { IBloodSugar } from '@/interfaces/bloodSugarInterfaces';
import { IBodyTemperature } from '@/interfaces/bodyTemperatureInterfaces';
import { IBodyWeight } from '@/interfaces/bodyWeightInterfaces';
import { IOxygenSaturation } from '@/interfaces/oxygenSaturationInterfaces';

/**
 * Sends a POST request to the MOCK_LOGIN_URL with the provided social security number (ssn).
 *
 * @param {string} ssn - The social security number to be sent in the request body.
 * @returns {Promise<string>} - A promise that resolves to the `kennitala` value from the response data.
 * @throws {Error} - Throws an error if the response is not ok.
 */
export const GetRafraenSkilriki = async (ssn: string): Promise<string> => {
	const response = await axios.post(MOCK_LOGIN_URL, { kennitala: ssn });
	// if (response.status !== 200) {
	// 	console.error('Response:', response);
	// 	throw new Error('Failed to sign in');
	// }
	return response.data;
};

/**
 * Sends a POST request to the LOGIN_URL with the provided social security number (SSN).
 *
 * @param {string} SSN - The social security number to be sent in the request body.
 * @returns {Promise<string>} - A promise that resolves to the `id` value from the response data.
 * @throws {Error} - Throws an error if the response is not ok.
 */
export const GetUserId = async (SSN: string): Promise<string> => {
	const response = await axios.post(LOGIN_URL, { kennitala: SSN });
	// if (response.status !== 200) {
	// 	throw new Error('Failed to set session');
	// }
	return response.data;
};

// get measurements by patient id
export const fetchBloodPressure = async (sessionId: string): Promise<IBloodPressure[]> => {
	const response = await axios.get(`${BLOODPRESSURE_URL}/${sessionId}`);
	return response.data;
};

export const fetchBloodSugar = async (sessionId: string): Promise<IBloodSugar[]> => {
	const response = await axios.get(`${BLOODSUGAR_URL}/${sessionId}`);
	return response.data;
};

export const fetchBodyTemperature = async (sessionId: string): Promise<IBodyTemperature[]> => {
	const response = await axios.get(`${BODYTEMPERATURE_URL}/${sessionId}`);
	return response.data;
};

export const fetchBodyWeight = async (sessionId: string): Promise<IBodyWeight[]> => {
	const response = await axios.get(`${BODYWEIGHT_URL}/${sessionId}`);
	return response.data;
};

// // get measurements by patient id
export const fetchOxygenSaturation = async (sessionId: string): Promise<IOxygenSaturation[]> => {
	const response = await axios.get(`${OXYGENSATURATION_URL}/${sessionId}`);
	return response.data;
};

// get measurements by patient id
export const fetchPatient = async (sessionId: string): Promise<IPatient> => {
	const response = await axios.get(`${PATIENT_URL}/${sessionId}`);
	return response.data;
};
