export interface IAddBodyWeight {
	patientID: number;
	weight: number;
}

export interface IBodyWeight extends IAddBodyWeight {
	id: number;
	date: string;
}
