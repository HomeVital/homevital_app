export interface AddBloodPressure {
	patientID: number;
	measureHand: string;
	bodyPosition: string;
	systolic: number;
	diastolic: number;
	pulse: number;
	date: string;
	status: string;
}

export interface GetBloodPressure extends AddBloodPressure {
	id: number;
}
