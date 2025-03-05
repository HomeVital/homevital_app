export interface IAddBodyWeight {
	patientID: number;
	weight: number;
	date: string;
}

export interface IBodyWeight extends IAddBodyWeight {
	id: number;
}
