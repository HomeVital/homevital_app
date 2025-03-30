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
import axios from 'axios';

export const patchOxygenSaturation = async (
	itemId: string,
	measurement: IPatchOxygenSaturation,
): Promise<IOxygenSaturation> => {
	try {
		const response = await axios.patch(`${OXYGENSATURATION_URL}/${itemId}`, measurement);
		return response.data;
	} catch (error) {
		console.error('Error patching oxygen saturation:', error);
		throw error;
	}
};

export const patchBloodSugar = async (
	itemId: string,
	measurement: IPatchBloodSugar,
): Promise<IBloodSugar> => {
	try {
		const response = await axios.patch(`${BLOODSUGAR_URL}/${itemId}`, measurement);
		return response.data;
	} catch (error) {
		console.error('Error patching blood sugar:', error);
		throw error;
	}
};

export const patchTemperature = async (
	itemId: string,
	measurement: IPatchBodyTemperature,
): Promise<IBodyTemperature> => {
	try {
		const response = await axios.patch(`${BODYTEMPERATURE_URL}/${itemId}`, measurement);
		return response.data;
	} catch (error) {
		console.error('Error patching temperature:', error);
		throw error;
	}
};

export const patchBloodPressure = async (
	itemId: string,
	measurement: IPatchBloodPressure,
): Promise<IBloodPressure> => {
	try {
		const response = await axios.patch(`${BLOODPRESSURE_URL}/${itemId}`, measurement);
		return response.data;
	} catch (error) {
		console.error('Error patching blood pressure:', error);
		throw error;
	}
};

export const patchBodyWeight = async (
	itemId: string,
	measurement: IPatchBodyWeight,
): Promise<IBodyWeight> => {
	try {
		const response = await axios.patch(`${BODYWEIGHT_URL}/${itemId}`, measurement);
		return response.data;
	} catch (error) {
		console.error('Error patching weight:', error);
		throw error;
	}
};
