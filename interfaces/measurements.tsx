export interface IMeasurementBase {
	id: number;
	date: string;
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
}

export interface IAddBodyTemperature {
	patientID: number;
	temperature: number;
}

export interface IAddBodyWeight {
	patientID: number;
	weight: number;
}

export interface IAddOxygenSaturation {
	patientID: number;
	oxygenSaturationValue: number;
}

export interface IBloodPressure extends IAddBloodPressure, IMeasurementBase {}
export interface IBloodSugar extends IAddBloodSugar, IMeasurementBase {}
export interface IBodyTemperature extends IAddBodyTemperature, IMeasurementBase {}
export interface IBodyWeight extends IAddBodyWeight, IMeasurementBase {}
export interface IOxygenSaturation extends IAddOxygenSaturation, IMeasurementBase {}
