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

export const deleteBodyWeight = async (itemId: string): Promise<IBodyWeight> => {
	try {
		const response = await axios.delete(`${BODYWEIGHT_URL}/${itemId}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting weight:', error);
		throw error;
	}
};

export const deleteBodyTemperature = async (itemId: string): Promise<IBodyTemperature> => {
	try {
		const response = await axios.delete(`${BODYTEMPERATURE_URL}/${itemId}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting temperature:', error);
		throw error;
	}
};

export const deleteBloodPressure = async (itemId: string): Promise<IBloodPressure> => {
	try {
		const response = await axios.delete(`${BLOODPRESSURE_URL}/${itemId}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting blood pressure:', error);
		throw error;
	}
};

export const deleteBloodSugar = async (itemId: string): Promise<IBloodSugar> => {
	try {
		const response = await axios.delete(`${BLOODSUGAR_URL}/${itemId}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting blood sugar:', error);
		throw error;
	}
};

export const deleteOxygenSaturation = async (itemId: string): Promise<IOxygenSaturation> => {
	try {
		const response = await axios.delete(`${OXYGENSATURATION_URL}/${itemId}`);
		return response.data;
	} catch (error) {
		console.error('Error deleting oxygen saturation:', error);
		throw error;
	}
};
