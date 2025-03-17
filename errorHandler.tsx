import { AxError } from './interfaces/axErrorInterfaces';
import { IBloodPressure } from './interfaces/bloodPressureInterfaces';
import { ISignIn } from './interfaces/signInInterfaces';

// error statuses

export const GetErrorMessage = (error: AxError, type: ISignIn | IBloodPressure): string => {
	if (error.response) {
		if (error.response.data.error) {
			return error.response.data.error;
		}
		if (error.response.status === 401) {
			return 'Unauthorized';
		}
		if (error.response.status === 403) {
			return 'Forbidden';
		}
		if (error.response.status === 404) {
			if ((type as ISignIn) !== undefined) {
				return 'Wrong social security number';
			}
			if ((type as IBloodPressure) !== undefined) {
				return 'Blood pressure measurements not found';
			}
			return 'Not Found';
		}
		if (error.response.status === 500) {
			return 'Internal Server Error';
		}
		return String(error.response.status);
	}
	return error.message;
};
