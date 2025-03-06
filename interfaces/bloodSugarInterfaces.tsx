export interface IAddBloodSugar {
	patientID: number;
	bloodsugarLevel: number;
}

export interface IBloodSugar extends IAddBloodSugar {
	id: number;
	date: string;
}
