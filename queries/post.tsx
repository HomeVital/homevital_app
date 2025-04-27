import { BLOODPRESSURE_URL } from '@/constants/api';
import { IAddBloodPressure, IBloodPressure } from '@/interfaces/measurements';
import axios from 'axios';

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
