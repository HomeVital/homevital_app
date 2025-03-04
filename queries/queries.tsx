import { BLOODPRESSURE_URL, LOGIN_URL, MOCK_LOGIN_URL, PATIENT_URL } from '@/constants/api';
import axios from 'axios';
import { GetPatient } from '@/interfaces/patientInterfaces';
import { GetBloodPressure } from '@/interfaces/bloodPressureInterfaces';

/**
 * Sends a POST request to the MOCK_LOGIN_URL with the provided social security number (ssn).
 *
 * @param {string} ssn - The social security number to be sent in the request body.
 * @returns {Promise<string>} - A promise that resolves to the `kennitala` value from the response data.
 * @throws {Error} - Throws an error if the response is not ok.
 */
export const GetRafraenSkilriki = async (ssn: string): Promise<string> => {
	const response = await axios.post(
		MOCK_LOGIN_URL,
		{ kennitala: ssn },
		{
			headers: {
				'Content-Type': 'application/json',
				accept: 'text/plain',
			},
		},
	);
	if (response.status !== 200) {
		console.error('Response:', response);
		throw new Error('Failed to sign in');
	}
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
	const response = await axios.post(
		LOGIN_URL,
		{ kennitala: SSN },
		{
			headers: {
				'Content-Type': 'application/json',
				accept: 'text/plain',
			},
		},
	);
	if (response.status !== 200) {
		throw new Error('Failed to set session');
	}
	return response.data;
};

// get measurements by patient id
export const fetchBloodPressure = async (sessionId: string): Promise<GetBloodPressure[]> => {
	const response = await axios.get(`${BLOODPRESSURE_URL}/${sessionId}`);
	return response.data;
};

// get measurements by patient id
export const fetchPatient = async (sessionId: string): Promise<GetPatient> => {
	const response = await axios.get(`${PATIENT_URL}/${sessionId}`);
	return response.data;
};
