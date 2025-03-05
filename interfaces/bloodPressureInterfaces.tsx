export interface IAddBloodPressure {
	patientID: number;
	measureHand: string;
	bodyPosition: string;
	systolic: number;
	diastolic: number;
	pulse: number;
	status: string;
	date: string;
}

export interface IBloodPressure extends IAddBloodPressure {
	id: number;
}
