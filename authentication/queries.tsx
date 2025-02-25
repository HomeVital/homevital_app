// import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LOGIN_URL, MOCK_LOGIN_URL } from '@/constants/api';

/**
 * Sends a POST request to the MOCK_LOGIN_URL with the provided social security number (ssn).
 *
 * @param {string} ssn - The social security number to be sent in the request body.
 * @returns {Promise<string>} - A promise that resolves to the `kennitala` value from the response data.
 * @throws {Error} - Throws an error if the response is not ok.
 */
export const GetRafraenSkilriki = async (ssn: string): Promise<string> => {
	const response = await fetch(MOCK_LOGIN_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			accept: 'text/plain',
		},
		body: JSON.stringify({ kennitala: ssn }),
	});
	if (!response.ok) {
		console.error('Response:', response);
		throw new Error('Failed to sign in');
	}
	const data = await response.json();

	return data.kennitala;
};

export const GetUserId = async (SSN: string): Promise<string> => {
	const response = await fetch(LOGIN_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ kennitala: SSN }),
	});
	if (!response.ok) {
		throw new Error('Failed to set session');
	}
	const sessionData = await response.json();

	return sessionData.id;
};
