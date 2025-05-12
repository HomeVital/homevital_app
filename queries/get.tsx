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
	PLAN_URL,
	TOKEN_URL,
} from '@/constants/api';
import axios from 'axios';
import { IPatient, IPlan } from '@/interfaces/patient';
import {
	IBloodPressure,
	IBloodSugar,
	IBodyTemperature,
	IBodyWeight,
	IMeasurement,
	IOxygenSaturation,
} from '@/interfaces/measurements';
import { AxError, ISignIn } from '@/interfaces/api';
import { GetErrorFromStatus } from '@/errorHandler';
import { isExpired } from '@/utility/utility';

export const GetToken = async (ssn: string): Promise<string> => {
	try {
		const response = await axios.post(TOKEN_URL, { kennitala: ssn });
		return response.data.token;
	} catch (error) {
		const signInData: ISignIn = { ssn };
		const errorMessage = GetErrorFromStatus(
			(error as AxError).response?.status || 0,
			signInData,
		);
		throw new Error(`${errorMessage}`);
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
export const fetchBloodPressure = async (
	sessionId: string,
	token: string,
): Promise<IBloodPressure[]> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.get(`${BLOODPRESSURE_URL}/${sessionId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		//
		return response.data;
	} catch (error) {
		console.error('Error fetching Blood Pressure:', error);
		throw error;
	}
};

export const fetchBloodSugar = async (sessionId: string, token: string): Promise<IBloodSugar[]> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.get(`${BLOODSUGAR_URL}/${sessionId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching Blood Sugar:', error);
		throw error;
	}
};

export const fetchBodyTemperature = async (
	sessionId: string,
	token: string,
): Promise<IBodyTemperature[]> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.get(`${BODYTEMPERATURE_URL}/${sessionId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching Body Temperature:', error);
		throw error;
	}
};

export const fetchBodyWeight = async (sessionId: string, token: string): Promise<IBodyWeight[]> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.get(`${BODYWEIGHT_URL}/${sessionId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching Body Weight:', error);
		throw error;
	}
};

// // get measurements by patient id
export const fetchOxygenSaturation = async (
	sessionId: string,
	token: string,
): Promise<IOxygenSaturation[]> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.get(`${OXYGENSATURATION_URL}/${sessionId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching Oxygen Saturation:', error);
		throw error;
	}
};

// get measurements by patient id
export const fetchPatient = async (sessionId: string, token: string): Promise<IPatient> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.get(`${PATIENT_URL}/${sessionId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching Patient:', error);
		throw error;
	}
};

export const fetchRecentMeasurements = async (
	sessionId: string,
	token: string,
): Promise<IMeasurement[]> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.get(`${MEASUREMENTS_URL}/${sessionId}/latest/10`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching Recent Measurements:', error);
		throw error;
	}
};

export const fetchPlan = async (sessionId: string, token: string): Promise<IPlan | null> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.get(`${PLAN_URL}/${sessionId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (response.data.length === 0) {
			return null;
		}
		let returnData = null;

		for (const p in response.data) {
			if (response.data[p].isActive === true) {
				returnData = response.data[p];
				break;
			}
			//
			// else if (response.data[p].)
		}

		if (returnData === null) {
			return null;
		}

		returnData.weightMeasurementDays = [
			...returnData.weightMeasurementDays.slice(-1),
			...returnData.weightMeasurementDays.slice(0, -1),
		];

		// shift bloodSugarMeasurementDays to the right
		returnData.bloodSugarMeasurementDays = [
			...returnData.bloodSugarMeasurementDays.slice(-1),
			...returnData.bloodSugarMeasurementDays.slice(0, -1),
		];

		// shift bloodPressureMeasurementDays to the right
		returnData.bloodPressureMeasurementDays = [
			...returnData.bloodPressureMeasurementDays.slice(-1),
			...returnData.bloodPressureMeasurementDays.slice(0, -1),
		];
		// shift oxygenSaturationMeasurementDays to the right
		returnData.oxygenSaturationMeasurementDays = [
			...returnData.oxygenSaturationMeasurementDays.slice(-1),
			...returnData.oxygenSaturationMeasurementDays.slice(0, -1),
		];
		// shift bodyTemperatureMeasurementDays to the right
		returnData.bodyTemperatureMeasurementDays = [
			...returnData.bodyTemperatureMeasurementDays.slice(-1),
			...returnData.bodyTemperatureMeasurementDays.slice(0, -1),
		];

		return returnData;
	} catch (error) {
		console.error('Error fetching Plan:', error);
		throw error;
	}
};
