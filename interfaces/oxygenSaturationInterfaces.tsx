export interface IAddOxygenSaturation {
	patientID: number;
	oxygenSaturationLevel: number;
}

export interface IOxygenSaturation extends IAddOxygenSaturation {
	id: number;
	date: string;
}
