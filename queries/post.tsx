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
import axios from 'axios';

export const postBloodSugar = async (measurement: IAddBloodSugar): Promise<IAddBloodSugar> => {
	try {
		const response = await axios.post(
			`${BLOODSUGAR_URL}/${measurement.patientID}`,
			measurement,
		);
		return response.data;
	} catch (error) {
		console.error('Error posting blood sugar:', error);
		throw error;
	}
};

export const postOxygenSaturation = async (
	measurement: IAddOxygenSaturation,
): Promise<IAddOxygenSaturation> => {
	try {
		const response = await axios.post(
			`${OXYGENSATURATION_URL}/${measurement.patientID}`,
			measurement,
		);
		return response.data;
	} catch (error) {
		console.error('Error posting oxygen saturation:', error);
		throw error;
	}
};

export const postBloodPressure = async (
	measurement: IAddBloodPressure,
): Promise<IBloodPressure> => {
	try {
		const response = await axios.post(
			`${BLOODPRESSURE_URL}/${measurement.patientID}`,
			measurement,
		);
		return response.data;
	} catch (error) {
		console.error('Error posting blood pressure:', error);
		throw error;
	}
};

export const postBodyTemperature = async (
	measurement: IAddBodyTemperature,
): Promise<IAddBodyTemperature> => {
	try {
		const response = await axios.post(
			`${BODYTEMPERATURE_URL}/${measurement.patientID}`,
			measurement,
		);
		return response.data;
	} catch (error) {
		console.error('Error posting body temperature:', error);
		throw error;
	}
};

export const postBodyWeight = async (measurement: IAddBodyWeight): Promise<IAddBodyWeight> => {
	try {
		const response = await axios.post(
			`${BODYWEIGHT_URL}/${measurement.patientID}`,
			measurement,
		);
		return response.data;
	} catch (error) {
		console.error('Error posting body weight:', error);
		throw error;
	}
};
