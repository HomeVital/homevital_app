import { IMeasurementBase } from './measurementBaseInterfaces';

export interface IAddOxygenSaturation {
	patientID: number;
	oxygenSaturationValue: number;
}

export interface IOxygenSaturation extends IAddOxygenSaturation, IMeasurementBase {}
