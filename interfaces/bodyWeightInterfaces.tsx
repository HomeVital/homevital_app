import { IMeasurementBase } from './measurementBaseInterfaces';

export interface IAddBodyWeight {
	patientID: number;
	weight: number;
}

export interface IBodyWeight extends IAddBodyWeight, IMeasurementBase {}
