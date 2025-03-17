import { IMeasurementBase } from './measurementBaseInterfaces';

export interface IAddBloodSugar {
	patientID: number;
	bloodsugarLevel: number;
}

export interface IBloodSugar extends IAddBloodSugar, IMeasurementBase {}
