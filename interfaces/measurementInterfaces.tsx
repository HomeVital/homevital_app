// import { IMeasurementBase } from './measurementBaseInterfaces';

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
