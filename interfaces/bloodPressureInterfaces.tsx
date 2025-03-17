import { IMeasurementBase } from './measurementBaseInterfaces';

export interface IAddBloodPressure {
	patientID: number;
	measureHand: string;
	bodyPosition: string;
	systolic: number;
	diastolic: number;
	pulse: number;
	status: string;
}

export interface IBloodPressure extends IAddBloodPressure, IMeasurementBase {}
