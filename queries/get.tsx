import {
	BLOODPRESSURE_URL,
	BLOODSUGAR_URL,
	BODYTEMPERATURE_URL,
	BODYWEIGHT_URL,
	MEASUREMENTS_URL,
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

/**
 * Get the authentication token.
 * @param ssn - The social security number
 * @returns The authentication token
 */
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
 * Fetch blood pressure measurements for a patient.
 * @param sessionId - The ID of the session
 * @param token - The authentication token
 * @returns An array of blood pressure measurements
 */
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
		return response.data;
	} catch (error) {
		if ((error as AxError).response?.status === 404) {
			return [];
		}
		console.error('Error fetching Blood Pressure:', error);
		throw error;
	}
};

/**
 * Fetch blood sugar measurements for a patient.
 * @param sessionId - The ID of the session
 * @param token - The authentication token
 * @returns An array of blood sugar measurements
 */
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
		if ((error as AxError).response?.status === 404) {
			return [];
		}
		console.error('Error fetching Blood Sugar:', error);
		throw error;
	}
};

/**
 * Fetch body temperature measurements for a patient.
 * @param sessionId - The ID of the session
 * @param token - The authentication token
 * @returns An array of body temperature measurements
 */
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
		if ((error as AxError).response?.status === 404) {
			return [];
		}
		console.error('Error fetching Body Temperature:', error);
		throw error;
	}
};

/**
 * Fetch body weight measurements for a patient.
 * @param sessionId - The ID of the session
 * @param token - The authentication token
 * @returns An array of body weight measurements
 */
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
		if ((error as AxError).response?.status === 404) {
			return [];
		}
		console.error('Error fetching Body Weight:', error);
		throw error;
	}
};

/**
 * Fetch oxygen saturation measurements for a patient.
 * @param sessionId - The ID of the session
 * @param token - The authentication token
 * @returns An array of oxygen saturation measurements
 */
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
		if ((error as AxError).response?.status === 404) {
			return [];
		}
		console.error('Error fetching Oxygen Saturation:', error);
		throw error;
	}
};

/**
 * Fetch patient information.
 * @param sessionId - The ID of the session
 * @param token - The authentication token
 * @returns An object containing patient information
 */
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

/**
 * Fetch recent measurements for a patient.
 * @param sessionId - The ID of the session
 * @param token - The authentication token
 * @returns An array of recent measurements
 */
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

/**
 * Fetch the HealthCare schedule for a patient.
 * @param sessionId - The ID of the session
 * @param token - The authentication token
 * @returns An object containing the schedule information
 */
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
		}

		if (returnData === null) {
			return null;
		}

		// shift all arrays to the right by one
		returnData.weightMeasurementDays = [
			...returnData.weightMeasurementDays.slice(-1),
			...returnData.weightMeasurementDays.slice(0, -1),
		];
		returnData.bloodSugarMeasurementDays = [
			...returnData.bloodSugarMeasurementDays.slice(-1),
			...returnData.bloodSugarMeasurementDays.slice(0, -1),
		];
		returnData.bloodPressureMeasurementDays = [
			...returnData.bloodPressureMeasurementDays.slice(-1),
			...returnData.bloodPressureMeasurementDays.slice(0, -1),
		];
		returnData.oxygenSaturationMeasurementDays = [
			...returnData.oxygenSaturationMeasurementDays.slice(-1),
			...returnData.oxygenSaturationMeasurementDays.slice(0, -1),
		];
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
