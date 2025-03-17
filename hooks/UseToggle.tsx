import { useState } from 'react';

/**
 * Custom hook to toggle a boolean state
 * @param initialState initial state of the toggle
 * @returns toggled state and functions to set the state
 */
export const useToggle = (
	initialState = false,
): {
	toggled: boolean;
	setToggled: (value: boolean) => void;
	toggle: () => void;
	setToggledTrue: () => void;
	setToggledFalse: () => void;
} => {
	const [toggled, setToggled] = useState(initialState);

	const toggle = () => {
		setToggled((prev) => !prev);
	};

	const setToggledTrue = () => {
		setToggled(true);
	};

	const setToggledFalse = () => {
		setToggled(false);
	};

	return {
		toggled,
		setToggled,
		toggle,
		setToggledTrue,
		setToggledFalse,
	};
};

/**
 * 
 * Þegar ég pósta, tékkar þú i repository layer hvort hluturinn sem er að pósta er in a good range. 
 * 
 * T.d. ef ég pósta body temperature, þá tékkar þú hjá þér hvort þetta er good/not ok/critical temp. 
 * Gerir Bara endapunkt GET /api/vitalrange/bodytemperature/{patientId} sem skilar valid range'um. 
 * Þessi endapuntkur mundi skila something like this: 
 * {
 * 		"temperatureGoodMin": 36,
 * 		"temperatureGoodMax": 37,
 * 		"temperatureUnderAverage": 35.9,
 * 		"temperatureNotOkMin": 37.1,
 * 		"temperatureNotOkMax": 38,
 * 		"temperatureCriticalMin": 38.1,
 * 		"temperatureCriticalMax": 42.2
 * }
 * 
 * Þarft líklega líka endapunkt fyrir vitalRange sem væri GET /api/vitalrange/eitthvað/{vitalId}.
 * Það sem þessi endapunktur mundi skila væri eitthvað svona:
 * {
 * 		"id": 1,
 * 		"range": "good",
 * }
 * 
 * Póstar síðan bara eitthvað svona: 
 * {
 * 		"id": 0,
 * 		"patientID": 0,
 * 		"temperature": 0,
 *  	"vitalrangeId": 1, <--- þetta er id fyrir "good" range i vitalrange
 * 		"date": "2025-03-17T17:57:25.395Z"
 * }
 * 
 * Ástæðan fyrir að hafa id en ekki texta beint, er að hjúkka gæti hafa sett inn vitlaust range fyrir patient, 
 * og þá ef hún vill breyta því at some point, gæti hún patchað hlutinn og uppfært "vitalrangeId" í staðinn fyrir
 * að tékka hvort textinn segir að þetta er good/not ok/critical og uppfæra hann. 
 * 
 * 
 * 
 * ------------------------------------------------
 * 
 * 
 * Graph er average. 
 * 
 * 
 * Laga patch. Það uppfærir dagsetningu líka, en á ekki að gera það
 * 
 * 
 * {
 * 		"bodyTemperatureRange": {
 * 		"id": 1,
 * 		"temperatureGoodMin": 36,
 * 		"temperatureGoodMax": 37,
 * 		"temperatureUnderAverage": 35.9,
 * 		"temperatureNotOkMin": 37.1,
 * 		"temperatureNotOkMax": 38,
 * 		"temperatureCriticalMin": 38.1,
 * 		"temperatureCriticalMax": 42.2
 * 	},
  "bloodPressureRange": {
    "id": 2,
    "systolicGood": 120,
    "diastolicGood": 80,
    "systolicOkMin": 120,
    "systolicOkMax": 129,
    "diastolicOkMin": 0,
    "diastolicOkMax": 80,
    "systolicNotOkMin": 130,
    "systolicNotOkMax": 139,
    "diastolicNotOkMin": 80,
    "diastolicNotOkMax": 89,
    "systolicCriticalMin": 140,
    "systolicCriticalMax": 1000,
    "diastolicCriticalMin": 90,
    "diastolicCriticalMax": 1000,
    "systolicCriticalStage3Min": 180,
    "systolicCriticalStage3Max": 1000,
    "diastolicCriticalStage3Min": 120,
    "diastolicCriticalStage3Max": 1000
  },
  "bloodSugarRange": {
    "id": 3,
    "bloodSugarGoodMin": 80,
    "bloodSugarGoodMax": 100,
    "bloodSugarNotOkMin": 101,
    "bloodSugarNotOkMax": 125,
    "bloodSugarCriticalMin": 126,
    "bloodSugarCriticalMax": 1000,
    "bloodSugarlowMin": 0,
    "bloodSugarlowMax": 79
  },
  "bodyWeightRange": {
    "id": 4,
    "weightLossFluctuationPercentageGood": 5,
    "weightGainPercentageGoodMax": 5,
    "weightGainFluctuationPercentageGood": 5
  },
  "oxygenSaturationRange": {
    "id": 5,
    "oxygenSaturationGood": 95,
    "oxygenSaturationOkMin": 94,
    "oxygenSaturationOkMax": 95,
    "oxygenSaturationNotOkMin": 91,
    "oxygenSaturationNotOkMax": 93,
    "oxygenSaturationCriticalMin": 0,
    "oxygenSaturationCriticalMax": 90
  }
}
 */
