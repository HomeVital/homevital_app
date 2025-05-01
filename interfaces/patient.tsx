export interface IPatient {
	id: number;
	name: string;
	phone: string;
	status: string;
	address: string;
	teamID: number;
}

export interface IPlan {
	id: number;
	name: string;
	startDate: string;
	endDate: string;
	patientID: number;
	instructions: string;
	teamID: number;
	isActive: boolean;
	weightMeasurementDays: [number, number, number, number, number, number, number];
	bloodSugarMeasurementDays: [number, number, number, number, number, number, number];
	bloodPressureMeasurementDays: [number, number, number, number, number, number, number];
	oxygenSaturationMeasurementDays: [number, number, number, number, number, number, number];
	bodyTemperatureMeasurementDays: [number, number, number, number, number, number, number];
}
