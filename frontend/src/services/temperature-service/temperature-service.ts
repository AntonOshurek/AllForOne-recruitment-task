import { reportUnitValue } from "../../variables/variables";

class TemperatureService {
	convertToKelvin(type: reportUnitValue, value: number): number {
		switch(type) {
			case reportUnitValue.C:
				return Math.round(value + 273.15);
			case reportUnitValue.K:
				return Math.round(value);
			case reportUnitValue.F:
				return Math.round((value + 459.67) * (5 / 9));
			default:
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const _: never = type;
				throw new Error('[TemperatureService] uncorrect temperature type');
		};
	};
};

const temperatureService = new TemperatureService();

export default temperatureService;
