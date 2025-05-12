import {
	BLOODPRESSURE_URL,
	BLOODSUGAR_URL,
	BODYTEMPERATURE_URL,
	BODYWEIGHT_URL,
	OXYGENSATURATION_URL,
} from '@/constants/api';
import axios from 'axios';
import {
	IBloodPressure,
	IBloodSugar,
	IBodyTemperature,
	IBodyWeight,
	IOxygenSaturation,
} from '@/interfaces/measurements';
import { isExpired } from '@/utility/utility';

export const deleteBodyWeight = async (itemId: string, token: string): Promise<IBodyWeight> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.delete(`${BODYWEIGHT_URL}/${itemId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error deleting weight:', error);
		throw error;
	}
};

export const deleteBodyTemperature = async (
	itemId: string,
	token: string,
): Promise<IBodyTemperature> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.delete(`${BODYTEMPERATURE_URL}/${itemId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error deleting temperature:', error);
		throw error;
	}
};

export const deleteBloodPressure = async (
	itemId: string,
	token: string,
): Promise<IBloodPressure> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.delete(`${BLOODPRESSURE_URL}/${itemId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error deleting blood pressure:', error);
		throw error;
	}
};

export const deleteBloodSugar = async (itemId: string, token: string): Promise<IBloodSugar> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.delete(`${BLOODSUGAR_URL}/${itemId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error deleting blood sugar:', error);
		throw error;
	}
};

export const deleteOxygenSaturation = async (
	itemId: string,
	token: string,
): Promise<IOxygenSaturation> => {
	if (isExpired(token)) {
		return Promise.reject(new Error('Token expired'));
	}
	try {
		const response = await axios.delete(`${OXYGENSATURATION_URL}/${itemId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error deleting oxygen saturation:', error);
		throw error;
	}
};
