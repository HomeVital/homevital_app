export interface IMeasurementBase {
	id: number;
	date: string;
	status: string;
}

export interface IMeasurement {
	uid: number;
	id: number;
	measurementType: string;
	measurementDate: string;
	measurementValues: {
		systolic: number;
		diastolic: number;
		bpm: number;
		measureHand: string;
		bodyPosition: string;
		bloodSugar: number;
		weight: number;
		temperature: number;
		oxygenSaturation: number;
		status: string;
	};
}

export interface IAddBloodPressure {
	patientID: number;
	measureHand: string;
	bodyPosition: string;
	systolic: number;
	diastolic: number;
	pulse: number;
	status: string;
}

export interface IAddBloodSugar {
	patientID: number;
	bloodsugarLevel: number;
	status: string;
}

export interface IAddBodyTemperature {
	patientID: number;
	temperature: number;
	status: string;
}

export interface IAddBodyWeight {
	patientID: number;
	weight: number;
	status: string;
}

export interface IAddOxygenSaturation {
	patientID: number;
	oxygenSaturationValue: number;
	status: string;
}

export interface IPatchBloodPressure {
	measureHand: string;
	bodyPosition: string;
	systolic: number;
	diastolic: number;
	pulse: number;
	status: string;
}

export interface IPatchBloodSugar {
	bloodsugarLevel: number;
	status: string;
}

export interface IPatchBodyTemperature {
	temperature: number;
	status: string;
}

export interface IPatchBodyWeight {
	weight: number;
	status: string;
}

export interface IPatchOxygenSaturation {
	oxygenSaturationValue: number;
	status: string;
}

export interface IBloodPressure extends IAddBloodPressure, IMeasurementBase {}
export interface IBloodSugar extends IAddBloodSugar, IMeasurementBase {}
export interface IBodyTemperature extends IAddBodyTemperature, IMeasurementBase {}
export interface IBodyWeight extends IAddBodyWeight, IMeasurementBase {}
export interface IOxygenSaturation extends IAddOxygenSaturation, IMeasurementBase {}
