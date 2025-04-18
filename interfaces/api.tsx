export interface AxError extends Error {
	response?: {
		status: number;
		data: {
			error: string;
		};
	};
}

export interface ISignIn {
	ssn: string;
}
