import { IMeasurementBase } from './measurementBaseInterfaces';

export interface IAddBodyTemperature {
	patientID: number;
	temperature: number;
}

export interface IBodyTemperature extends IAddBodyTemperature, IMeasurementBase {}
