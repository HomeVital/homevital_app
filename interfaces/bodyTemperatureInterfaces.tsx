export interface IAddBodyTemperature {
	patientID: number;
	temperature: number;
}

export interface IBodyTemperature extends IAddBodyTemperature {
	id: number;
	date: string;
}
