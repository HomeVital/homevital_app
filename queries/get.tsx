import {
	BLOODPRESSURE_URL,
	BLOODSUGAR_URL,
	BODYTEMPERATURE_URL,
	BODYWEIGHT_URL,
	LOGIN_URL,
	MEASUREMENTS_URL,
	MOCK_LOGIN_URL,
	OXYGENSATURATION_URL,
	PATIENT_URL,
	TOKEN_URL,
} from '@/constants/api';
import axios from 'axios';
import { IPatient } from '@/interfaces/patient';
import {
	IBloodPressure,
	IBloodSugar,
	IBodyTemperature,
	IBodyWeight,
	IMeasurement,
	IOxygenSaturation,
} from '@/interfaces/measurements';

export const GetToken = async (ssn: string): Promise<string> => {
	try {
		const response = await axios.post(TOKEN_URL, { kennitala: ssn });
		return response.data.token;
	} catch (error) {
		console.error('Error fetching Token:', error);
		throw error;
	}
};

/**
 * Sends a POST request to the MOCK_LOGIN_URL with the provided social security number (ssn).
 *
 * @param {string} ssn - The social security number to be sent in the request body.
 * @returns {Promise<string>} - A promise that resolves to the `kennitala` value from the response data.
 * @throws {Error} - Throws an error if the response is not ok.
 */
export const GetRafraenSkilriki = async (ssn: string): Promise<string> => {
	try {
		const response = await axios.post(MOCK_LOGIN_URL, { kennitala: ssn });
		return response.data;
	} catch (error) {
		console.error('Error fetching Rafraen Skilriki:', error);
		throw error;
	}
};

/**
 * Sends a POST request to the LOGIN_URL with the provided social security number (SSN).
 *
 * @param {string} SSN - The social security number to be sent in the request body.
 * @returns {Promise<string>} - A promise that resolves to the `id` value from the response data.
 * @throws {Error} - Throws an error if the response is not ok.
 */
export const GetUserId = async (ssn: string): Promise<string> => {
	try {
		const response = await axios.post(LOGIN_URL, { kennitala: ssn });
		return response.data;
	} catch (error) {
		console.error('Error fetching User ID:', error);
		throw error;
	}
};

// get measurements by patient id
export const fetchBloodPressure = async (sessionId: string): Promise<IBloodPressure[]> => {
	try {
		const response = await axios.get(`${BLOODPRESSURE_URL}/${sessionId}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching Blood Pressure:', error);
		throw error;
	}
};

export const fetchBloodSugar = async (sessionId: string): Promise<IBloodSugar[]> => {
	try {
		const response = await axios.get(`${BLOODSUGAR_URL}/${sessionId}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching Blood Sugar:', error);
		throw error;
	}
};

export const fetchBodyTemperature = async (sessionId: string): Promise<IBodyTemperature[]> => {
	try {
		const response = await axios.get(`${BODYTEMPERATURE_URL}/${sessionId}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching Body Temperature:', error);
		throw error;
	}
};

export const fetchBodyWeight = async (sessionId: string): Promise<IBodyWeight[]> => {
	try {
		const response = await axios.get(`${BODYWEIGHT_URL}/${sessionId}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching Body Weight:', error);
		throw error;
	}
};

// // get measurements by patient id
export const fetchOxygenSaturation = async (sessionId: string): Promise<IOxygenSaturation[]> => {
	try {
		const response = await axios.get(`${OXYGENSATURATION_URL}/${sessionId}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching Oxygen Saturation:', error);
		throw error;
	}
};

// get measurements by patient id
export const fetchPatient = async (sessionId: string): Promise<IPatient> => {
	try {
		const response = await axios.get(`${PATIENT_URL}/${sessionId}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching Patient:', error);
		throw error;
	}
};

export const fetchRecentMeasurements = async (sessionId: string): Promise<IMeasurement[]> => {
	try {
		const response = await axios.get(`${MEASUREMENTS_URL}/${sessionId}/latest/3`);
		return response.data;
	} catch (error) {
		console.error('Error fetching Recent Measurements:', error);
		throw error;
	}
};
