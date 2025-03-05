export interface IAddBloodSugar {
	patientID: number;
	bloodsugarLevel: number;
	date: string;
}

export interface IBloodSugar extends IAddBloodSugar {
	id: number;
}
