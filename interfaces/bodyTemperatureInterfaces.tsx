export interface IAddBodyTemperature {
	patientID: number;
	temperature: number;
	date: string;
}

export interface IBodyTemperature extends IAddBodyTemperature {
	id: number;
}
