import { IMeasurementBase } from './measurementBaseInterfaces';

export interface IAddOxygenSaturation {
	patientID: number;
	oxygenSaturationLevel: number;
}

export interface IOxygenSaturation extends IAddOxygenSaturation, IMeasurementBase {}
